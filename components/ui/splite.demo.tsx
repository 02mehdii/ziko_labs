'use client'

import { SplineScene } from "@/components/ui/splite"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import Link from "next/link"
import { ShimmerButton } from "@/components/ui/shimmer-button"
 
export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex h-full">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Interactive Agents
          </h1>
          <p className="mt-4 text-neutral-300 max-w-lg">
            Bring your Agents to life. Create immersive experiences
            that capture attention and enhance your productivity.
          </p>
          <Link href="/demo">
            <ShimmerButton className="mt-6 px-4 py-2 text-sm">
              <span className="text-white">Try Agent Chat Demo</span>
            </ShimmerButton>
          </Link>
        </div>

        {/* Right content */}
        <div className="flex-1 relative">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}