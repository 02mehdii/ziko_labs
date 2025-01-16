'use client'

import { AnimeNavBarDemo } from '@/components/ui/anime-navbar.demo'
import { WavyBackground } from '@/components/ui/wavy-background'
import { ChatInterface } from '@/components/ui/chat-interface'

export default function DemoPage() {
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
      
      <ChatInterface />
    </WavyBackground>
  )
}