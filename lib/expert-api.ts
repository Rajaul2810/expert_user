import { get, postForm, put } from "@/lib/api-client"
import type { ApiEnvelope } from "@/lib/auth-api"

const BASE = "https://admin.meetexpertbd.xyz"

export type EducationEntry = {
  institution: string
  degree: string
  year: number | string
}

export type ExperienceEntry = {
  title: string
  organization: string
  start_year: number | string
  end_year: number | string
  description: string
}

export type PortfolioEntry = {
  title: string
  url: string
}

export type ExpertApplication = {
  id?: number
  category_id: number
  subcategory_id: number
  professional_headline: string
  bio: string
  years_of_experience: number
  registration_value: string
  intro_video?: string
  languages: string[]
  skill_ids: number[]
  education: EducationEntry[]
  experience: ExperienceEntry[]
  portfolio: PortfolioEntry[]
  status?: "pending" | "approved" | "rejected"
  created_at?: string
  updated_at?: string
}

export type ExpertApplicationInput = Omit<ExpertApplication, "id" | "status" | "created_at" | "updated_at"> & {
  avatar?: File | null
}

function buildFormData(input: ExpertApplicationInput): FormData {
  const fd = new FormData()
  fd.append("category_id", String(input.category_id))
  fd.append("subcategory_id", String(input.subcategory_id))
  fd.append("professional_headline", input.professional_headline)
  fd.append("bio", input.bio)
  fd.append("years_of_experience", String(input.years_of_experience))
  fd.append("registration_value", input.registration_value)
  if (input.intro_video) fd.append("intro_video", input.intro_video)
  fd.append("languages", JSON.stringify(input.languages))
  fd.append("skill_ids", JSON.stringify(input.skill_ids))
  fd.append("education", JSON.stringify(input.education))
  fd.append("experience", JSON.stringify(input.experience))
  fd.append("portfolio", JSON.stringify(input.portfolio))
  if (input.avatar instanceof File) fd.append("avatar", input.avatar)
  return fd
}

export async function submitExpertApplication(token: string, input: ExpertApplicationInput) {
  return postForm<ApiEnvelope<ExpertApplication>>(
    `${BASE}/api/v1/expert/application`,
    buildFormData(input),
    { token }
  )
}

export async function fetchExpertApplication(token: string) {
  return get<ApiEnvelope<ExpertApplication>>(
    `${BASE}/api/v1/expert/application`,
    { token }
  )
}

export async function updateExpertApplication(token: string, input: Partial<ExpertApplicationInput>) {
  return put<ApiEnvelope<ExpertApplication>>(
    `${BASE}/api/v1/expert/application`,
    input,
    { token }
  )
}
