"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type FormFields = z.infer<typeof formSchema>

export function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const callbackURL = searchParams.get("callback-url")

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: FormFields) {
    setIsLoading(true)
    const response = await signIn("credentials", {
      callbackUrl: callbackURL ?? "/",
      redirect: true,
      email: values.email,
      password: values.password,
    })
    setIsLoading(false)
  }

  return (
    <Card className="p-6 w-sm">
      <Form {...form}>
        {searchParams.get("error") ? (
          <h1 className="text-destructive text-2xl text-center py-3">
            {searchParams.get("error")}
          </h1>
        ) : (
          ""
        )}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="ali@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Omnia@123" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isLoading}
            type="submit"
            className="cursor-pointer w-full"
          >
            {isLoading && <Loader2 className="animate-spin" />}
            Submit
          </Button>

          {/* زرار Forgot Password */}
          <div className="text-center mt-4">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
        </form>
      </Form>
    </Card>
  )
}
