import { Search, CalendarCheck, Video, Clock, Wallet, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const steps = [
    {
        num: 1,
        title: "Find an Expert",
        desc: "Browse by category or search",
        icon: Search,
        color: "text-primary bg-primary/10 border-primary/30",
    },
    {
        num: 2,
        title: "Book a Time Slot",
        desc: "Pick a time that works",
        icon: CalendarCheck,
        color: "text-primary bg-primary/10 border-primary/30",
    },
    {
        num: 3,
        title: "Join Video Consultation",
        desc: "Get advice in minutes",
        icon: Video,
        color: "text-primary bg-primary/10 border-primary/30",
    },
]

const benefits = [
    { text: "Get answers in minutes", icon: Clock },
    { text: "Affordable expert advice", icon: Wallet },
    { text: "No travel required", icon: MapPin },
]

function HowItWork() {
    return (
        <section className="py-16 sm:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <p className="text-center text-sm font-medium text-primary">
                    — Booking Journey —
                </p>
                <h2 className="mb-12 text-center text-2xl font-bold tracking-tight sm:text-3xl">
                    How it works
                </h2>

                <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
                    <div className="rounded-xl overflow-hidden">
                        <Image
                            width={200}
                            height={200}
                            src="/howitwork.jpg"
                            alt="How it work"
                            className="w-full h-full rounded-xl"
                        />
                    </div>
                    <div>
                        {steps.map((step) => {
                            const Icon = step.icon
                            return (
                                <div
                                    key={step.num}
                                    className={cn(
                                        "group flex items-center rounded-xl border border-border bg-card p-4 gap-4 transition-all duration-300",
                                        "hover:border-primary/40 hover:bg-primary/5 hover:shadow-md hover:shadow-primary/5 my-2"
                                    )}
                                    style={{ position: "relative" }} // Fix: Ensure relative positioning for absolute children
                                >
                                    <div
                                        className={cn(
                                            "flex size-14 shrink-0 items-center justify-center rounded-full border-2 transition-transform duration-300 group-hover:scale-110",
                                            step.color
                                        )}
                                    >
                                        <Icon className="size-6" />
                                    </div>
                                    <span className="absolute top-0 right-0 text-3xl font-bold text-muted-foreground">
                                        {step.num < 10 ? `0${step.num}` : step.num}
                                    </span>
                                    <div>
                                        <h3 className="mt-2 font-semibold text-foreground">{step.title}</h3>
                                        <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
                                    </div>
                                </div>
                            )
                        })}

                        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                            {benefits.map(({ text, icon: BenefitIcon }) => (
                                <span
                                    key={text}
                                    className={cn(
                                        "flex items-center gap-2 rounded-full border border-border bg-muted/30 px-4 py-2 text-sm text-muted-foreground",
                                        "transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
                                    )}
                                >
                                    <BenefitIcon className="size-4 shrink-0 text-primary" />
                                    {text}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>


            </div>
        </section>
    )
}

export default HowItWork
