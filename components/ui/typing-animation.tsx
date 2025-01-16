"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  text: string;
  speed?: number; // characters per second
  className?: string;
}

export function TypingAnimation({
  text,
  speed = 10, // default to 10 characters per second
  className,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const animationRef = useRef<number>();

  useEffect(() => {
    let currentIndex = 0;
    
    let lastTime = 0;
    const delay = 1000 / speed; // milliseconds per character
    
    const animate = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      
      if (timestamp - lastTime >= delay && currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex]);
        currentIndex++;
        lastTime = timestamp;
      }
      
      if (currentIndex < text.length) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [text]);

  useEffect(() => {
    setDisplayedText("");
  }, [text]);

  return (
    <h1
      className={cn(
        "font-display text-center text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm",
        className,
      )}
    >
      {displayedText ? displayedText : text}
    </h1>
  );
}