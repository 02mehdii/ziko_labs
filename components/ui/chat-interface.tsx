'use client'

import { useState, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function ChatInterface() {
  const [messages, setMessages] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = useCallback(async () => {
    if (!inputValue.trim()) return
    
    // Add user message
    const userMessage = `You: ${inputValue}`
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: inputValue
            }
          ]
        })
      })

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      
      while (true) {
        const { done, value } = await reader!.read()
        if (done) break
        
        const chunk = decoder.decode(value)
        
        // Update message by appending new chunk
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1]
          if (lastMessage && lastMessage.startsWith('AI:')) {
            return [...prev.slice(0, -1), lastMessage + chunk]
          }
          return [...prev, `AI: ${chunk}`]
        })
      }
    } catch {
      setMessages(prev => [...prev, `AI: An error occurred while processing your request`])
    } finally {
      setIsLoading(false)
    }
  }, [inputValue])

  return (
    <div className="w-full max-w-4xl bg-white/10 rounded-lg p-6">
      {/* Chat Messages */}
      <div className="h-[400px] overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <div className={`p-3 rounded-lg ${
              msg.startsWith('You:')
                 ? 'bg-blue-500/20 ml-auto w-fit'
                 : 'bg-white/10 w-fit'
            }`}>
              <p className="text-white">{msg}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-white/10 border-none text-white"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-white/10 hover:bg-white/20 text-white"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </div>
  )
}