"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Star, Video, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DEMO_EXPERTS, EXPERT_CATEGORIES_FILTER, type ExpertItem } from "@/lib/experts-data"
import { cn } from "@/lib/utils"

type SortOption = "rating" | "sessions" | "price"

function filterAndSort(
  list: ExpertItem[],
  search: string,
  category: string,
  sortBy: SortOption
): ExpertItem[] {
  let out = list.filter((e) => {
    const matchSearch =
      !search.trim() ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase()) ||
      e.bio.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === "All" || e.category === category
    return matchSearch && matchCategory
  })
  out = [...out].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating
    if (sortBy === "sessions") return b.sessions - a.sessions
    return Number(a.price.replace(/[^0-9]/g, "")) - Number(b.price.replace(/[^0-9]/g, ""))
  })
  return out
}

export function FeatureExperts() {
  const [search, setSearch] = React.useState("")
  const [category, setCategory] = React.useState<string>("All")
  const [sortBy, setSortBy] = React.useState<SortOption>("rating")
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const filtered = React.useMemo(
    () => filterAndSort(DEMO_EXPERTS, search, category, sortBy),
    [search, category, sortBy]
  )

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    const cardWidth = 320
    const gap = 24
    const step = (cardWidth + gap) * (dir === "left" ? -1 : 1)
    scrollRef.current.scrollBy({ left: step, behavior: "smooth" })
  }

  return (
    <section className="border-y border-border bg-muted/10 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">— Featured —</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Top Experts
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Book verified professionals for video consultation.
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/experts">View all experts <ArrowRight className="size-4" /></Link>
          </Button>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search experts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 pl-9"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">Sort:</span>
              <div className="flex rounded-lg border border-border bg-background p-0.5">
                {(["rating", "sessions", "price"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSortBy(s)}
                    className={cn(
                      "rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
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
          <div className="flex flex-wrap gap-2">
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

        <div className="relative mt-8">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {filtered.length === 0 ? (
              <div className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-border py-12 text-center">
                <Search className="size-10 text-muted-foreground" />
                <p className="mt-3 text-sm font-medium text-foreground">No experts match your filters</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => {
                    setSearch("")
                    setCategory("All")
                  }}
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              filtered.map((expert) => (
                <div
                  key={expert.id}
                  className="min-w-[280px] shrink-0 sm:min-w-[300px] lg:min-w-[320px]"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                    <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                      <Image
                        src={expert.image}
                        alt={expert.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 280px, (max-width: 1024px) 300px, 320px"
                      />
                      <div className="absolute right-2 top-2">
                        <Badge variant="secondary" className="gap-1 text-xs">
                          <Star className="size-3 fill-amber-400 text-amber-400" />
                          {expert.rating}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="outline" className="mb-2 text-xs">
                        {expert.category}
                      </Badge>
                      <h3 className="font-semibold text-foreground">{expert.name}</h3>
                      <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
                        {expert.bio}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span>{expert.sessions} sessions</span>
                        <span>{expert.duration}</span>
                        <span className="font-medium text-foreground">{expert.price}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-border p-4">
                      <Button size="sm" className="w-full gap-1.5" asChild>
                        <Link href={`/experts/${expert.id}`}>
                          <Video className="size-4" />
                          Book Consultation
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))
            )}
          </div>
          {filtered.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Previous experts"
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-2 rounded-full border border-border bg-card p-2 shadow-md transition-colors hover:bg-muted md:-translate-x-4"
              >
                <ChevronLeft className="size-5 text-foreground" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Next experts"
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-2 rounded-full border border-border bg-card p-2 shadow-md transition-colors hover:bg-muted md:translate-x-4"
              >
                <ChevronRight className="size-5 text-foreground" />
              </button>
            </>
          )}
        </div>

        {filtered.length > 0 && (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {filtered.length} expert{filtered.length !== 1 ? "s" : ""} — scroll or use arrows
          </p>
        )}
      </div>
    </section>
  )
}
