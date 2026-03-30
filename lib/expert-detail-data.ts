import type { ExpertItem } from "./experts-data"
import { DEMO_EXPERTS } from "./experts-data"

export type EducationItem = {
  degree: string
  institution: string
  year: string
}

export type ReviewItem = {
  id: string
  author: string
  rating: number
  comment: string
  date: string
}

export type WorkExperienceItem = {
  organization: string
  designation: string
  department: string
  employment: string
  period: string
}

export type ExpertDetail = ExpertItem & {
  verified: boolean
  yearsExperience: number
  languages: string[]
  education: EducationItem[]
  expertise: string[]
  demoVideoEmbedUrl: string
  reviews: ReviewItem[]
  responseTime: string
  identityVerified: boolean
  joinedYear: number
  degreesLine: string
  currentWorkplace: string
  registrationLabel: string
  registrationValue: string
  isOnline: boolean
  workExperience: WorkExperienceItem[]
}

const BASE_EMBED = "https://www.youtube.com/embed/ScMzIvxBSi4"

const EXTRA: Record<
  string,
  Omit<
    ExpertDetail,
    keyof ExpertItem | "verified" | "identityVerified" | "joinedYear"
  > & {
    yearsExperience: number
    languages: string[]
    education: EducationItem[]
    expertise: string[]
    demoVideoEmbedUrl: string
    reviews: ReviewItem[]
    responseTime: string
    degreesLine: string
    currentWorkplace: string
    registrationLabel: string
    registrationValue: string
    isOnline: boolean
    workExperience: WorkExperienceItem[]
  }
> = {
  "1": {
    yearsExperience: 12,
    degreesLine: "LL.B (Hons), University of Dhaka · Bar enrolled",
    currentWorkplace: "Independent legal practice · Dhaka",
    registrationLabel: "Bar enrollment",
    registrationValue: "BD-11234",
    isOnline: true,
    languages: ["English", "Bengali"],
    workExperience: [
      {
        organization: "Supreme Court Bar Association",
        designation: "Advocate",
        department: "Civil & family",
        employment: "2015 – Present",
        period: "10+ years",
      },
      {
        organization: "Legal Aid Clinic Dhaka",
        designation: "Senior Counsel",
        department: "Family disputes",
        employment: "2011 – 2015",
        period: "4 years",
      },
    ],
    education: [
      { degree: "LL.B (Hons)", institution: "University of Dhaka", year: "2010" },
      { degree: "Bar Council Enrollment", institution: "Bangladesh Bar Council", year: "2011" },
    ],
    expertise: ["Civil law", "Family law", "Property disputes", "Legal drafting"],
    demoVideoEmbedUrl: BASE_EMBED,
    reviews: [
      {
        id: "r1",
        author: "Karim H.",
        rating: 5,
        comment: "Clear advice on my property case. Very professional.",
        date: "2025-02-10",
      },
      {
        id: "r2",
        author: "Nadia R.",
        rating: 5,
        comment: "Responded quickly and explained options in simple terms.",
        date: "2025-01-28",
      },
    ],
    responseTime: "Usually within 2 hours",
  },
  "2": {
    yearsExperience: 8,
    degreesLine: "M.Ed., University of Melbourne · B.A. English",
    currentWorkplace: "Independent study abroad consultant",
    registrationLabel: "Professional ID",
    registrationValue: "SA-8821",
    isOnline: true,
    languages: ["English", "Bengali"],
    workExperience: [
      {
        organization: "Global Edu Partners",
        designation: "Senior Consultant",
        department: "UK & Australia",
        employment: "2018 – Present",
        period: "7+ years",
      },
      {
        organization: "BRAC University",
        designation: "Admissions Advisor",
        department: "International office",
        employment: "2016 – 2018",
        period: "2 years",
      },
    ],
    education: [
      { degree: "M.Ed. Higher Education", institution: "University of Melbourne", year: "2016" },
      { degree: "B.A. English", institution: "BRAC University", year: "2012" },
    ],
    expertise: ["UK admissions", "Australia visas", "SOP review", "Scholarship guidance"],
    demoVideoEmbedUrl: BASE_EMBED,
    reviews: [
      {
        id: "r1",
        author: "Rafi M.",
        rating: 5,
        comment: "Helped me get into my dream program in Australia.",
        date: "2025-02-05",
      },
      {
        id: "r2",
        author: "Tasnim A.",
        rating: 4,
        comment: "Great tips for IELTS and application timeline.",
        date: "2025-01-15",
      },
    ],
    responseTime: "Usually within 4 hours",
  },
  "3": {
    yearsExperience: 15,
    degreesLine: "Dawrah Hadith · Islamic Studies",
    currentWorkplace: "Jamia Islamia · Community counseling",
    registrationLabel: "Scholar ID",
    registrationValue: "IS-4401",
    isOnline: false,
    languages: ["Arabic", "Bengali", "English"],
    workExperience: [
      {
        organization: "Jamia Islamia",
        designation: "Resident Scholar",
        department: "Fiqh & counseling",
        employment: "2010 – Present",
        period: "15+ years",
      },
      {
        organization: "Islamic University",
        designation: "Guest Lecturer",
        department: "Islamic studies",
        employment: "2008 – 2010",
        period: "2 years",
      },
    ],
    education: [
      { degree: "Dawrah Hadith", institution: "Jamia Islamia", year: "2008" },
      { degree: "Islamic Studies", institution: "Islamic University", year: "2005" },
    ],
    expertise: ["Fiqh", "Family matters", "Spiritual counseling", "Quran interpretation"],
    demoVideoEmbedUrl: BASE_EMBED,
    reviews: [
      {
        id: "r1",
        author: "Anonymous",
        rating: 5,
        comment: "Patient and respectful guidance. Highly recommended.",
        date: "2025-02-12",
      },
    ],
    responseTime: "Usually within 1 hour",
  },
  "4": {
    yearsExperience: 10,
    degreesLine: "MBBS, Dhaka Medical College · FCPS (part)",
    currentWorkplace: "City General Hospital · Telehealth",
    registrationLabel: "BMDC Number",
    registrationValue: "A-56789",
    isOnline: true,
    languages: ["English", "Bengali"],
    workExperience: [
      {
        organization: "City General Hospital",
        designation: "Resident Physician",
        department: "General medicine",
        employment: "2019 – Present",
        period: "6+ years",
      },
      {
        organization: "Dhaka Medical College Hospital",
        designation: "Medical Officer",
        department: "OPD",
        employment: "2014 – 2019",
        period: "5 years",
      },
    ],
    education: [
      { degree: "MBBS", institution: "Dhaka Medical College", year: "2014" },
      { degree: "FCPS (part)", institution: "BCPS", year: "2019" },
    ],
    expertise: ["General health", "Preventive care", "Lifestyle advice", "Referrals"],
    demoVideoEmbedUrl: BASE_EMBED,
    reviews: [
      {
        id: "r1",
        author: "Saima K.",
        rating: 5,
        comment: "Clear and caring consultation online.",
        date: "2025-02-01",
      },
      {
        id: "r2",
        author: "Omar F.",
        rating: 4,
        comment: "Good follow-up suggestions.",
        date: "2025-01-20",
      },
    ],
    responseTime: "Usually within 3 hours",
  },
  "5": {
    yearsExperience: 14,
    degreesLine: "LL.M Corporate Law, University of London",
    currentWorkplace: "Corporate law chamber · Dhaka",
    registrationLabel: "Bar enrollment",
    registrationValue: "BD-99821",
    isOnline: true,
    languages: ["English", "Bengali"],
    workExperience: [
      {
        organization: "Chamber of Barrister Tariq",
        designation: "Partner",
        department: "Corporate & immigration",
        employment: "2016 – Present",
        period: "9+ years",
      },
      {
        organization: "International Law Firm BD",
        designation: "Associate",
        department: "Compliance",
        employment: "2012 – 2016",
        period: "4 years",
      },
    ],
    education: [
      { degree: "LL.M Corporate Law", institution: "University of London", year: "2012" },
      { degree: "LL.B", institution: "University of Dhaka", year: "2008" },
    ],
    expertise: ["Corporate law", "Immigration", "Contracts", "Compliance"],
    demoVideoEmbedUrl: BASE_EMBED,
    reviews: [
      {
        id: "r1",
        author: "Tech Startup BD",
        rating: 5,
        comment: "Solid legal framework for our company setup.",
        date: "2025-02-08",
      },
    ],
    responseTime: "Usually within 6 hours",
  },
  "6": {
    yearsExperience: 7,
    degreesLine: "M.Sc. Education Policy, University of Toronto",
    currentWorkplace: "Independent admissions coach",
    registrationLabel: "Professional ID",
    registrationValue: "SA-12004",
    isOnline: true,
    languages: ["English", "Bengali"],
    workExperience: [
      {
        organization: "Admissions Coach Network",
        designation: "Lead Consultant",
        department: "USA & Europe",
        employment: "2020 – Present",
        period: "5+ years",
      },
      {
        organization: "IUB Career Center",
        designation: "Advisor",
        department: "Study abroad",
        employment: "2018 – 2020",
        period: "2 years",
      },
    ],
    education: [
      { degree: "M.Sc. Education Policy", institution: "University of Toronto", year: "2018" },
      { degree: "BBA", institution: "IUB", year: "2014" },
    ],
    expertise: ["USA applications", "Europe admissions", "Essay coaching", "Interview prep"],
    demoVideoEmbedUrl: BASE_EMBED,
    reviews: [
      {
        id: "r1",
        author: "Lamia S.",
        rating: 5,
        comment: "Got multiple admits with her help!",
        date: "2025-02-03",
      },
      {
        id: "r2",
        author: "Imran P.",
        rating: 5,
        comment: "Very organized and encouraging.",
        date: "2025-01-22",
      },
    ],
    responseTime: "Usually within 5 hours",
  },
}

export function getExpertDetail(slug: string): ExpertDetail | null {
  const base = DEMO_EXPERTS.find((e) => e.id === slug)
  const extra = EXTRA[slug]
  if (!base || !extra) return null
  return {
    ...base,
    ...extra,
    verified: true,
    identityVerified: true,
    joinedYear: 2021,
  }
}
