const getBaseUrl = () =>
  typeof window !== "undefined" ? "" : process.env.NEXT_PUBLIC_APP_URL ?? ""

export class ApiError extends Error {
  status: number
  body?: unknown

  constructor(message: string, status: number, body?: unknown) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.body = body
  }
}

type RequestOptions = Omit<RequestInit, "method" | "body">

async function parseResponse<T>(res: Response): Promise<T> {
  const text = await res.text()
  if (!text) return undefined as T
  try {
    return JSON.parse(text) as T
  } catch {
    return text as T
  }
}

async function request<T>(path: string, init: RequestInit): Promise<T> {
  const url = path.startsWith("http") ? path : `${getBaseUrl()}${path}`
  const headers = new Headers(init.headers)

  if (
    init.body &&
    !(init.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json")
  }

  const res = await fetch(url, { ...init, headers })

  if (!res.ok) {
    let body: unknown
    try {
      body = await parseResponse(res.clone())
    } catch {
      body = undefined
    }
    throw new ApiError(res.statusText || `HTTP ${res.status}`, res.status, body)
  }

  return parseResponse<T>(res)
}

function jsonBody(body?: unknown): BodyInit | undefined {
  if (body === undefined) return undefined
  return JSON.stringify(body)
}

export function get<T = unknown>(path: string, options?: RequestOptions) {
  return request<T>(path, { ...options, method: "GET" })
}

export function post<T = unknown>(
  path: string,
  body?: unknown,
  options?: RequestOptions
) {
  return request<T>(path, { ...options, method: "POST", body: jsonBody(body) })
}

export function put<T = unknown>(
  path: string,
  body?: unknown,
  options?: RequestOptions
) {
  return request<T>(path, { ...options, method: "PUT", body: jsonBody(body) })
}

export function patch<T = unknown>(
  path: string,
  body?: unknown,
  options?: RequestOptions
) {
  return request<T>(path, { ...options, method: "PATCH", body: jsonBody(body) })
}

export function del<T = unknown>(path: string, options?: RequestOptions) {
  return request<T>(path, { ...options, method: "DELETE" })
}
