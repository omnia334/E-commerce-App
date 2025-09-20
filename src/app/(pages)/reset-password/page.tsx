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
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
})

type FormValues = z.infer<typeof schema>

export default function ResetPasswordForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { newPassword: "" },
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
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          method: "PUT", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            newPassword: values.newPassword,
          }),
        }
      )
      const data = await res.json()

      if (res.ok) {
        router.push("/login")
      } else {
        setError(data.message || "Something went wrong")
      }
    setLoading(false)
  }

  return (
    <Card className="p-6 w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </Form>
    </Card>
  )
}
