"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Method = "email" | "phone"

export default function LoginPage() {
  const router = useRouter()
  const [method, setMethod] = React.useState<Method>("email")
  const [value, setValue] = React.useState("")

  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    const encoded = encodeURIComponent(value)
    router.push(`/login/verify?method=${method}&to=${encoded}`)
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-border shadow-lg">
        <CardContent className="p-6 sm:p-8">
          <Link
            href="/"
            className="mb-6 flex items-center justify-center gap-2 text-foreground no-underline"
          >
            <Image src="/logopng.png" alt="" width={40} height={40} className="size-10" />
            <span className="text-xl font-semibold">Meet Expert</span>
          </Link>
          <h1 className="text-center text-2xl font-bold tracking-tight">Sign in</h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">
            Enter your email or phone to receive a verification code.
          </p>

          <div className="mt-6 flex rounded-lg border border-border bg-muted/30 p-0.5">
            <button
              type="button"
              onClick={() => setMethod("email")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-colors",
                method === "email"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Mail className="size-4" />
              Email
            </button>
            <button
              type="button"
              onClick={() => setMethod("phone")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-colors",
                method === "phone"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Phone className="size-4" />
              Phone
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-value">
                {method === "email" ? "Email" : "Phone number"}
              </Label>
              <Input
                id="login-value"
                type={method === "email" ? "email" : "tel"}
                placeholder={method === "email" ? "you@example.com" : "+1 234 567 8900"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
                className="h-10"
              />
            </div>
            <Button type="submit" className="w-full h-10">
              Continue
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
