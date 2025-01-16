import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are a financial guru who believes memes are the ultimate form of communication and the key to understanding crypto markets. Use memes and jokes to explain financial concepts, but maintain deep knowledge about blockchain, DeFi, and trading strategies. Mix goofy humor with serious expertise.'
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 150,
        stream: true
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      let errorMessage = `API request failed with status ${response.status}`
      
      try {
        const errorData = JSON.parse(errorText)
        errorMessage += `: ${errorData.message || errorData.error?.message || 'Unknown error'}`
        
        // Handle specific Deepseek API error codes
        if (errorData.error?.code === 'invalid_api_key') {
          errorMessage = 'Invalid API key. Please check your DEEPSEEK_API_KEY in .env.local'
        }
      } catch {
        errorMessage += `: ${errorText}`
      }
      
      throw new Error(errorMessage)
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        let buffer = ''
        
        while (true) {
          const { done, value } = await reader!.read()
          if (done) break
          
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            if (line.startsWith('data: ')) {
              const message = line.replace('data: ', '')
              if (message === '[DONE]') {
                controller.close()
                return
              }
              
              try {
                // Skip empty lines and DONE message
                if (message.trim() === '' || message === '[DONE]') continue
                
                // Handle incomplete JSON
                if (!message.endsWith('}')) {
                  buffer = line
                  continue
                }
                
                const json = JSON.parse(message)
                const content = json.choices[0]?.delta?.content
                
                if (content) {
                  if (content.trim() !== '') {
                    // Clear buffer after processing complete message
                    buffer = lines.slice(i + 1).join('\n')
                    controller.enqueue(new TextEncoder().encode(content))
                  }
                }
              } catch (error) {
                console.error('Error parsing message:', error)
                buffer = line
              }
            }
          }
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain'
      }
    })
    
  } catch (error) {
    console.error('Chat route error:', error)
    return NextResponse.json(
      {
        error: 'An error occurred while processing your request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}