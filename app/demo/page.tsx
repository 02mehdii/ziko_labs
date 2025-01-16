'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AnimeNavBarDemo } from '@/components/ui/anime-navbar.demo'
import { WavyBackground } from '@/components/ui/wavy-background'


export default function DemoPage() {
  const [messages, setMessages] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
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
  }

  return (
    <WavyBackground
      className="flex flex-col items-center justify-center min-h-screen p-8 pt-24"
      colors={["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"]}
      waveWidth={60}
      backgroundFill="black"
      blur={10}
      speed="fast"
      waveOpacity={0.5}
    >
      <AnimeNavBarDemo />
      <h1 className="text-4xl font-bold text-white mb-8">Aiko Agent</h1>
      <p className="text-white/80 mb-8">Your crypto-savvy, meme-loving financial advisor</p>
      
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
    </WavyBackground>
  )
}