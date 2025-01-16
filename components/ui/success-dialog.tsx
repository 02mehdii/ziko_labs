"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog"

export function SuccessDialog({
  open,
  onOpenChange
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-black">
        <DialogHeader>
          <DialogTitle className="text-white">Thanks for submitting!</DialogTitle>
        </DialogHeader>
        <p className="text-white">Send us a message @Ziko_Labs to expedite queue</p>
      </DialogContent>
    </Dialog>
  )
}