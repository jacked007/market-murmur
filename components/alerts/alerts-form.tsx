"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { MultiSelect } from "@/components/alerts/multi-select"

const formSchema = z.object({
  stocks: z.array(z.string()).min(1, {
    message: "Please select at least one stock.",
  }),
  frequency: z.enum(["daily", "weekly", "monthly"], {
    required_error: "Please select a frequency.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

interface AlertsFormProps {
  onSuccess?: () => void
}

export function AlertsForm({ onSuccess }: AlertsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stocks: [],
      frequency: "daily",
      email: "",
    },
  })

  const stockOptions = [
    { label: "Apple (AAPL)", value: "AAPL" },
    { label: "Microsoft (MSFT)", value: "MSFT" },
    { label: "Google (GOOGL)", value: "GOOGL" },
    { label: "Amazon (AMZN)", value: "AMZN" },
    { label: "Tesla (TSLA)", value: "TSLA" },
    { label: "Meta (META)", value: "META" },
    { label: "NVIDIA (NVDA)", value: "NVDA" },
    { label: "JPMorgan Chase (JPM)", value: "JPM" },
    { label: "Visa (V)", value: "V" },
    { label: "Walmart (WMT)", value: "WMT" },
  ]

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log(values)

      toast({
        title: "Alert configured successfully",
        description: `You will receive ${values.frequency} alerts for ${values.stocks.length} stocks.`,
      })

      form.reset()

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="stocks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Stocks</FormLabel>
              <FormControl>
                <MultiSelect
                  options={stockOptions}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder="Select stocks..."
                />
              </FormControl>
              <FormDescription>Choose the stocks you want to receive sentiment alerts for.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alert Frequency</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="daily" />
                    </FormControl>
                    <FormLabel className="font-normal">Daily</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="weekly" />
                    </FormControl>
                    <FormLabel className="font-normal">Weekly</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="monthly" />
                    </FormControl>
                    <FormLabel className="font-normal">Monthly</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormDescription>We'll send the AI sentiment summaries to this email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Alert Configuration"
          )}
        </Button>
      </form>
    </Form>
  )
}
