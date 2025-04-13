"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertsForm } from "@/components/alerts/alerts-form"
import { AlertsList } from "@/components/alerts/alerts-list"

interface AlertsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AlertsModal({ open, onOpenChange }: AlertsModalProps) {
  const [activeTab, setActiveTab] = useState("configure")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Stock Alerts</DialogTitle>
          <DialogDescription>
            Configure email alerts for AI sentiment summaries of your chosen stocks.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="configure">Configure New Alert</TabsTrigger>
            <TabsTrigger value="manage">Manage Existing Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="configure" className="mt-4">
            <AlertsForm onSuccess={() => setActiveTab("manage")} />
          </TabsContent>

          <TabsContent value="manage" className="mt-4">
            <AlertsList />
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
