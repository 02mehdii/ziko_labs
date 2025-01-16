import { AuroraBackground } from "@/components/ui/aurora-background"
import { AnimeNavBarDemo } from "@/components/ui/anime-navbar.demo"
import { FlickeringGrid } from "@/components/ui/flickering-grid"
import { SplineSceneBasic } from "@/components/ui/splite.demo"
import { HyperText } from "@/components/ui/hyper-text"

export default function Home() {
  return (
    <AuroraBackground>
      <FlickeringGrid
        className="fixed inset-0 -z-10"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
      />
      <AnimeNavBarDemo />
      <div className="container mx-auto px-4 pt-20">
        <HyperText
          text="Ziko Labs"
          className="text-5xl font-bold mb-8 text-white"
        />
        <SplineSceneBasic />
      </div>
      
    </AuroraBackground>
  );
}
