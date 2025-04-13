"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AlertsModal } from "@/components/alerts/alerts-modal"

export function AlertsButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setIsOpen(true)} aria-label="Configure Alerts">
        <Bell className="h-4 w-4" />
      </Button>
      <AlertsModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}
