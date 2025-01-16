"use client"

import { useState } from "react"
import { Input } from "./input"
import { Button } from "./button"
import { SuccessDialog } from "./success-dialog"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./dialog"

export function WaitlistForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [twitterHandle, setTwitterHandle] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Add form submission logic
    setShowSuccess(true)
  }

  const handleClose = () => {
    setShowSuccess(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[425px] bg-black">
        <DialogHeader>
          <DialogTitle className="text-white">Join Waitlist</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="twitter" className="text-white">X username</label>
            <Input
              id="twitter"
              placeholder="@username"
              value={twitterHandle}
              onChange={(e) => setTwitterHandle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="wallet" className="text-white">Wallet Address</label>
            <Input
              id="wallet"
              placeholder="solana address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full text-white border-white">
            Submit
          </Button>
        </form>
      </DialogContent>
      <SuccessDialog open={showSuccess} onOpenChange={(open) => !open && handleClose()} />
    </Dialog>
  )
}