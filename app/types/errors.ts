// HTTP status codes
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503
}

// Error types
export interface ApiError {
  message: string
  status: number
  code?: string
  errors?: Record<string, string[]>
  exception?: string
  file?: string
  line?: number
}

// Validation error
export interface ValidationError extends ApiError {
  status: HttpStatus.UNPROCESSABLE_ENTITY
  errors: Record<string, string[]>
}

// Authentication error
export interface AuthError extends ApiError {
  status: HttpStatus.UNAUTHORIZED
  code: 'UNAUTHENTICATED' | 'TOKEN_EXPIRED' | 'TOKEN_INVALID'
}

// Authorization error
export interface AuthorizationError extends ApiError {
  status: HttpStatus.FORBIDDEN
  code: 'UNAUTHORIZED_ACTION'
}

// Not found error
export interface NotFoundError extends ApiError {
  status: HttpStatus.NOT_FOUND
  code: 'RESOURCE_NOT_FOUND'
}

// Rate limiting error
export interface RateLimitError extends ApiError {
  status: HttpStatus.TOO_MANY_REQUESTS
  code: 'RATE_LIMIT_EXCEEDED'
  retryAfter?: number
}

// Server error
export interface ServerError extends ApiError {
  status: HttpStatus.INTERNAL_SERVER_ERROR
  code: 'SERVER_ERROR'
}

// Network error
export interface NetworkError {
  message: string
  code: 'NETWORK_ERROR' | 'TIMEOUT' | 'CONNECTION_FAILED'
  isNetworkError: true
}

// Combined error type
export type AppError =
  | ValidationError
  | AuthError
  | AuthorizationError
  | NotFoundError
  | RateLimitError
  | ServerError
  | NetworkError
  | ApiError

// Error handling utility types
export interface ErrorHandler {
  (error: AppError): void
}

export interface ErrorHandlers {
  validation?: (error: ValidationError) => void
  auth?: (error: AuthError) => void
  authorization?: (error: AuthorizationError) => void
  notFound?: (error: NotFoundError) => void
  rateLimit?: (error: RateLimitError) => void
  server?: (error: ServerError) => void
  network?: (error: NetworkError) => void
  default?: (error: ApiError) => void
}