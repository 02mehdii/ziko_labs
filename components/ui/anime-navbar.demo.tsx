"use client"

import React, { useState } from "react"
import { Home, Twitter, Mail, UserPlus } from "lucide-react"
import { WaitlistForm } from "./waitlist-form"
import { AnimeNavBar } from "@/components/ui/anime-navbar"

const items = [
  {
    name: "Home",
    url: "/",
    icon: Home,
  },
  {
    name: "Twitter",
    url: "https://x.com/Ziko_Labs",
    href: "https://x.com/Ziko_Labs",
    icon: Twitter,
  },
  {
    name: "Demo",
    url: "/demo",
    icon: Mail,
  },
  {
    name: "Join Waitlist",
    url: "#",
    icon: UserPlus,
  },
]

export function AnimeNavBarDemo() {
  const [showWaitlistForm, setShowWaitlistForm] = useState(false)
  
  const updatedItems = items.map(item => ({
    ...item,
    onClick: item.name === "Join Waitlist" ? () => setShowWaitlistForm(true) : undefined
  }))

  return (
    <>
      <AnimeNavBar items={updatedItems} defaultActive="Home" />
      <WaitlistForm
        open={showWaitlistForm}
        onClose={() => setShowWaitlistForm(false)}
      />
    </>
  )
}