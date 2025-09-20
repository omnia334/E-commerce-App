"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card } from "@/components/ui/card"

const schema = z.object({
  resetCode: z.string().min(4, "Code is required"),
})

type FormValues = z.infer<typeof schema>

export default function VerifyResetCodeForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { resetCode: "" },
  })
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(values: FormValues) {
    setLoading(true)
    setError(null)
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resetCode: values.resetCode }),
        }
      )
      const data = await res.json()

      if (res.ok) {
        router.push(`/reset-password?email=${email}&code=${values.resetCode}`)
      } else {
        setError(data.message || "Invalid code")
      }
    setLoading(false)
  }

  return (
    <Card className="p-6 w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reset Code</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter the code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Verifying..." : "Verify Code"}
          </Button>
        </form>
      </Form>
    </Card>
  )
}
