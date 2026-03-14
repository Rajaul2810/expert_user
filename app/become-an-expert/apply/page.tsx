"use client"

import * as React from "react"
import Link from "next/link"
import {
  User,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  EXPERT_CATEGORIES,
  CATEGORY_LABELS,
  getSubcategories,
} from "@/lib/expert-categories"
import { cn } from "@/lib/utils"

const STEPS = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Expertise", icon: Briefcase },
  { id: 3, title: "Availability & Pricing", icon: Calendar },
] as const

const DURATIONS = ["30 min", "60 min"] as const

type FormData = {
  fullName: string
  email: string
  phone: string
  profilePhoto: string
  bio: string
  languages: string
  category: string
  customCategory: string
  subcategory: string
  yearsExperience: string
  qualifications: string
  sessionPrice: string
  sessionDuration: string
  availability: string
}

const initialForm: FormData = {
  fullName: "",
  email: "",
  phone: "",
  profilePhoto: "",
  bio: "",
  languages: "",
  category: "",
  customCategory: "",
  subcategory: "",
  yearsExperience: "",
  qualifications: "",
  sessionPrice: "",
  sessionDuration: "",
  availability: "",
}

export default function BecomeExpertApplyPage() {
  const [step, setStep] = React.useState(1)
  const [form, setForm] = React.useState<FormData>(initialForm)
  const [submitted, setSubmitted] = React.useState(false)

  const subcategories = form.category ? getSubcategories(form.category) : []
  const showSubcategory = form.category && subcategories.length > 0

  const update = (key: keyof FormData, value: string) => {
    setForm((p) => ({ ...p, [key]: value }))
    if (key === "category") setForm((p) => ({ ...p, subcategory: "" }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep((s) => s + 1)
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-background py-16">
        <div className="mx-auto max-w-lg px-4 sm:px-6">
          <Card className="border-border text-center">
            <CardHeader>
              <CardTitle>Application Submitted</CardTitle>
              <CardDescription>
                We will review your profile and get back to you soon. Check your email for updates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/become-an-expert">Back to Become an Expert</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="mb-8">
          <Link
            href="/become-an-expert"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
            Back
          </Link>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Expert Application
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Step {step} of 3: {STEPS[step - 1].title}
          </p>
        </div>

        <div className="mb-8 flex gap-2">
          {STEPS.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.id}
                className={cn(
                  "flex flex-1 items-center gap-2 rounded-lg border px-3 py-2 text-sm",
                  step >= s.id
                    ? "border-primary/50 bg-primary/5 text-foreground"
                    : "border-border bg-muted/30 text-muted-foreground"
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span className="hidden sm:inline">{s.title}</span>
              </div>
            )
          })}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Personal Info</CardTitle>
                <CardDescription>Basic contact and profile details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+880..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Profile Photo</Label>
                  <div className="flex h-24 w-24 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30">
                    <Upload className="size-6 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">Upload in next phase</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio / Description</Label>
                  <Textarea
                    id="bio"
                    value={form.bio}
                    onChange={(e) => update("bio", e.target.value)}
                    placeholder="Short intro and expertise"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="languages">Languages</Label>
                  <Input
                    id="languages"
                    value={form.languages}
                    onChange={(e) => update("languages", e.target.value)}
                    placeholder="e.g. English, Bengali"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Expertise</CardTitle>
                <CardDescription>Professional category and experience.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    id="category"
                    value={form.category}
                    onChange={(e) => update("category", e.target.value)}
                    required
                  >
                    <option value="">Select category</option>
                    {CATEGORY_LABELS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Select>
                </div>
                {showSubcategory && (
                  <div className="space-y-2">
                    <Label htmlFor="subcategory">Subcategory</Label>
                    <Select
                      id="subcategory"
                      value={form.subcategory}
                      onChange={(e) => update("subcategory", e.target.value)}
                    >
                      <option value="">Select subcategory</option>
                      {subcategories.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </Select>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="customCategory">If not listed: Write your category</Label>
                  <Input
                    id="customCategory"
                    value={form.customCategory}
                    onChange={(e) => update("customCategory", e.target.value)}
                    placeholder="e.g. Architecture, Design"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearsExperience">Years of experience</Label>
                  <Input
                    id="yearsExperience"
                    type="number"
                    min={0}
                    value={form.yearsExperience}
                    onChange={(e) => update("yearsExperience", e.target.value)}
                    placeholder="e.g. 5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qualifications">Certifications / Qualification</Label>
                  <Textarea
                    id="qualifications"
                    value={form.qualifications}
                    onChange={(e) => update("qualifications", e.target.value)}
                    placeholder="Degrees, certificates, training"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Availability & Pricing</CardTitle>
                <CardDescription>Session rate and when you are available.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionPrice">Session Price (BDT)</Label>
                  <Input
                    id="sessionPrice"
                    type="number"
                    min={0}
                    value={form.sessionPrice}
                    onChange={(e) => update("sessionPrice", e.target.value)}
                    placeholder="e.g. 800"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionDuration">Session Duration</Label>
                  <Select
                    id="sessionDuration"
                    value={form.sessionDuration}
                    onChange={(e) => update("sessionDuration", e.target.value)}
                    required
                  >
                    <option value="">Select duration</option>
                    {DURATIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Textarea
                    id="availability"
                    value={form.availability}
                    onChange={(e) => update("availability", e.target.value)}
                    placeholder="e.g. Monday 6PM–9PM, Tuesday 7PM–10PM"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="gap-1"
            >
              <ChevronLeft className="size-4" />
              Previous
            </Button>
            {step < 3 ? (
              <Button type="submit" className="gap-1">
                Next
                <ChevronRight className="size-4" />
              </Button>
            ) : (
              <Button type="submit">Submit Application</Button>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}
