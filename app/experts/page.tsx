"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Star, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DEMO_EXPERTS, EXPERT_CATEGORIES_FILTER } from "@/lib/experts-data"
import { cn } from "@/lib/utils"

export default function ExpertsPage() {
  const [search, setSearch] = React.useState("")
  const [category, setCategory] = React.useState<string>("All")
  const [sortBy, setSortBy] = React.useState<"rating" | "sessions" | "price">("rating")

  const filtered = React.useMemo(() => {
    let list = DEMO_EXPERTS.filter((e) => {
      const matchSearch =
        !search.trim() ||
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.category.toLowerCase().includes(search.toLowerCase()) ||
        e.bio.toLowerCase().includes(search.toLowerCase())
      const matchCategory = category === "All" || e.category === category
      return matchSearch && matchCategory
    })
    list = [...list].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "sessions") return b.sessions - a.sessions
      return Number(a.price.replace(/[^0-9]/g, "")) - Number(b.price.replace(/[^0-9]/g, ""))
    })
    return list
  }, [search, category, sortBy])

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Find an Expert
          </h1>
          <p className="mt-1 text-muted-foreground">
            Book verified professionals for video consultation.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 pl-9"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort:</span>
              <div className="flex rounded-lg border border-border bg-background p-0.5">
                {(["rating", "sessions", "price"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSortBy(s)}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                      sortBy === s
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {s === "rating" ? "Rating" : s === "sessions" ? "Sessions" : "Price"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {EXPERT_CATEGORIES_FILTER.map((cat) => (
              <Badge
                key={cat}
                variant={category === cat ? "default" : "outline"}
                className="cursor-pointer transition-colors hover:opacity-90"
                onClick={() => setCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <p className="mb-6 text-sm text-muted-foreground">
          {filtered.length} expert{filtered.length !== 1 ? "s" : ""} found
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((expert) => (
            <Card
              key={expert.id}
              className="overflow-hidden transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                <Image
                  src={expert.image}
                  alt={expert.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute right-2 top-2">
                  <Badge variant="secondary" className="gap-1">
                    <Star className="size-3 fill-amber-400 text-amber-400" />
                    {expert.rating}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <Badge variant="outline" className="mb-2 text-xs">
                  {expert.category}
                </Badge>
                <h2 className="font-semibold text-foreground">{expert.name}</h2>
                <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
                  {expert.bio}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span>{expert.sessions} sessions</span>
                  <span>{expert.duration}</span>
                  <span className="font-medium text-foreground">{expert.price}</span>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 border-t border-border p-4">
                <Button size="sm" className="flex-1 gap-1.5" asChild>
                  <Link href={`/experts/${expert.id}`}>
                    <Video className="size-4" />
                    Book Consultation
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
            <Search className="size-12 text-muted-foreground" />
            <p className="mt-4 font-medium text-foreground">No experts match your filters</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different search or category.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearch("")
                setCategory("All")
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
