// Base Laravel API response types
export interface ApiResponse<T = any> {
  data?: T
  message?: string
  errors?: Record<string, string[]>
  meta?: {
    current_page?: number
    from?: number
    last_page?: number
    path?: string
    per_page?: number
    to?: number
    total?: number
  }
  links?: {
    first?: string
    last?: string
    prev?: string | null
    next?: string | null
  }
}

// Laravel validation error response
export interface ValidationErrorResponse {
  message: string
  errors: Record<string, string[]>
}

// Laravel exception response
export interface ExceptionResponse {
  message: string
  exception?: string
  file?: string
  line?: number
  trace?: Array<{
    file: string
    line: number
    function: string
    class?: string
    type?: string
  }>
}

// Generic Laravel response wrapper
export interface LaravelResponse<T = any> {
  data?: T
  message?: string
  errors?: Record<string, string[]>
  status?: number
  success?: boolean
}

// Paginated response
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  data: T[]
  meta: {
    current_page: number
    from: number
    last_page: number
    path: string
    per_page: number
    to: number
    total: number
  }
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
}

// Resource collection response
export interface ResourceCollection<T> {
  data: T[]
  links?: {
    first?: string
    last?: string
    prev?: string | null
    next?: string | null
  }
  meta?: {
    current_page?: number
    from?: number
    last_page?: number
    path?: string
    per_page?: number
    to?: number
    total?: number
  }
}

// More flexible response type that can handle any structure
export type FlexibleApiResponse<T = unknown> = {
  [K in keyof ApiResponse<T>]?: ApiResponse<T>[K]
} & Record<string, unknown>

// Type guard to check if response is an ApiResponse
export function isApiResponse<T = unknown>(response: unknown): response is ApiResponse<T> {
  return (
    typeof response === 'object' &&
    response !== null &&
    (
      'data' in response ||
      'message' in response ||
      'errors' in response ||
      'meta' in response ||
      'links' in response
    )
  )
}

// Type guard to check if response has data
export function hasData<T>(response: ApiResponse<T>): response is ApiResponse<T> & { data: T } {
  return response.data !== undefined
}

// Type guard to check if response has errors
export function hasErrors(response: ApiResponse): response is ApiResponse & { errors: Record<string, string[]> } {
  return response.errors !== undefined && Object.keys(response.errors).length > 0
}