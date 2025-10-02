import type {
  ApiResponse,
  ValidationErrorResponse,
  ExceptionResponse,
  LaravelResponse
} from '~/types/api'
import type {
  AppError,
  ApiError,
  ValidationError,
  AuthError,
  NetworkError,
  HttpStatus
} from '~/types/errors'

// API response handler
export class ApiResponseHandler {
  /**
   * Check if response is successful
   */
  static isSuccess<T>(response: LaravelResponse<T>): boolean {
    return response.success === true || (!response.errors && response.data !== undefined)
  }

  /**
   * Extract data from successful response
   */
  static getData<T>(response: LaravelResponse<T>): T | null {
    if (this.isSuccess(response)) {
      return response.data || null
    }
    return null
  }

  /**
   * Extract error message from response
   */
  static getErrorMessage(response: LaravelResponse): string {
    if (response.errors) {
      const firstError = Object.values(response.errors)[0]
      return Array.isArray(firstError) ? firstError[0] : 'Validation error'
    }
    return response.message || 'An error occurred'
  }

  /**
   * Convert fetch response to typed Laravel response
   */
  static async handleFetchResponse<T = unknown>(
    response: Response
  ): Promise<LaravelResponse<T>> {
    try {
      const data: any = await response.json()

      return {
        data: data.data as T,
        message: data.message,
        errors: data.errors,
        status: response.status,
        success: response.ok && !data.errors
      }
    } catch (error) {
      throw this.createNetworkError('Failed to parse response')
    }
  }

  /**
   * Create API error from response
   */
  static createApiError(response: LaravelResponse, status: number): AppError {
    if (status === 422 && response.errors) {
      return {
        message: response.message || 'Validation failed',
        status: status as HttpStatus,
        errors: response.errors
      } as ValidationError
    }

    if (status === 401) {
      return {
        message: response.message || 'Unauthorized',
        status: status as HttpStatus,
        code: 'UNAUTHENTICATED'
      } as AuthError
    }

    return {
      message: response.message || 'An error occurred',
      status: status as HttpStatus,
      errors: response.errors
    } as ApiError
  }

  /**
   * Create network error
   */
  static createNetworkError(message: string): NetworkError {
    return {
      message,
      code: 'NETWORK_ERROR',
      isNetworkError: true
    }
  }
}

// Validation helpers
export class ValidationHelper {
  /**
   * Extract validation errors for a specific field
   */
  static getFieldErrors(errors: Record<string, string[]>, field: string): string[] {
    return errors[field] || []
  }

  /**
   * Get first error for a field
   */
  static getFirstFieldError(errors: Record<string, string[]>, field: string): string | null {
    const fieldErrors = this.getFieldErrors(errors, field)
    return fieldErrors.length > 0 ? fieldErrors[0] : null
  }

  /**
   * Check if field has errors
   */
  static hasFieldError(errors: Record<string, string[]>, field: string): boolean {
    return this.getFieldErrors(errors, field).length > 0
  }

  /**
   * Get all error messages as flat array
   */
  static getAllErrorMessages(errors: Record<string, string[]>): string[] {
    return Object.values(errors).flat()
  }

  /**
   * Get first error message
   */
  static getFirstErrorMessage(errors: Record<string, string[]>): string | null {
    const messages = this.getAllErrorMessages(errors)
    return messages.length > 0 ? messages[0] : null
  }
}

// HTTP client wrapper
export class HttpClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor(baseURL: string = '', defaultHeaders: Record<string, string> = {}) {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...defaultHeaders
    }
  }

  /**
   * Set authorization token
   */
  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  /**
   * Remove authorization token
   */
  removeAuthToken(): void {
    delete this.defaultHeaders['Authorization']
  }

  /**
   * Make HTTP request
   */
  private async request<T = unknown>(
    method: string,
    endpoint: string,
    options: RequestInit = {}
  ): Promise<LaravelResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`
      const response = await fetch(url, {
        method,
        headers: {
          ...this.defaultHeaders,
          ...options.headers
        },
        ...options
      })

      const result = await ApiResponseHandler.handleFetchResponse<T>(response)

      if (!response.ok) {
        throw ApiResponseHandler.createApiError(result, response.status)
      }

      return result
    } catch (error) {
      if (error instanceof Error && error.name === 'TypeError') {
        throw ApiResponseHandler.createNetworkError('Network request failed')
      }
      throw error
    }
  }

  /**
   * GET request
   */
  async get<T = unknown>(endpoint: string, options?: RequestInit): Promise<LaravelResponse<T>> {
    return this.request<T>('GET', endpoint, options)
  }

  /**
   * POST request
   */
  async post<T = unknown>(endpoint: string, data?: any, options?: RequestInit): Promise<LaravelResponse<T>> {
    return this.request<T>('POST', endpoint, {
      ...options,
      body: data ? JSON.stringify(data) : undefined
    })
  }

  /**
   * PUT request
   */
  async put<T = unknown>(endpoint: string, data?: any, options?: RequestInit): Promise<LaravelResponse<T>> {
    return this.request<T>('PUT', endpoint, {
      ...options,
      body: data ? JSON.stringify(data) : undefined
    })
  }

  /**
   * PATCH request
   */
  async patch<T = unknown>(endpoint: string, data?: any, options?: RequestInit): Promise<LaravelResponse<T>> {
    return this.request<T>('PATCH', endpoint, {
      ...options,
      body: data ? JSON.stringify(data) : undefined
    })
  }

  /**
   * DELETE request
   */
  async delete<T = unknown>(endpoint: string, options?: RequestInit): Promise<LaravelResponse<T>> {
    return this.request<T>('DELETE', endpoint, options)
  }
}