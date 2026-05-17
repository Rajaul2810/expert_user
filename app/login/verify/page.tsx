"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

function VerifyPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()
  const method = (searchParams.get("method") ?? "email") as "email" | "phone"
  const to = searchParams.get("to") ?? ""

  const [code, setCode] = React.useState("")
  const [resendCooldown, setResendCooldown] = React.useState(0)

  React.useEffect(() => {
    if (!resendCooldown) return
    const t = setInterval(() => setResendCooldown((c) => (c > 0 ? c - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [resendCooldown])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (code.length < 6) return
    login()
    router.push("/dashboard")
  }

  function handleResend() {
    if (resendCooldown > 0) return
    setResendCooldown(60)
  }

  const maskedTo = to
    ? method === "email"
      ? to.replace(/(.{2}).*@(.*)/, "$1***@$2")
      : to.slice(0, 4) + "****" + to.slice(-2)
    : "your " + method

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
          <h1 className="text-center text-2xl font-bold tracking-tight">Verify your account</h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">
            We sent a code to {maskedTo}. Enter it below.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="space-y-2">
              <label htmlFor="code" className="text-sm font-medium text-foreground">
                Verification code
              </label>
              <Input
                id="code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="000000"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                className="h-12 text-center text-lg tracking-[0.5em]"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-10"
              disabled={code.length < 6}
            >
              Verify & sign in
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={resendCooldown > 0}
              className="text-primary font-medium hover:underline disabled:opacity-50"
            >
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
            </button>
          </p>

          <Link
            href="/login"
            className="mt-4 flex justify-center text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to sign in
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <React.Suspense fallback={null}>
      <VerifyPageContent />
    </React.Suspense>
  )
}
