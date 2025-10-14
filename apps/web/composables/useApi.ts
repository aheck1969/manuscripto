import type { FetchOptions } from 'ofetch'

export const useApi = () => {
  const config = useRuntimeConfig()
  const { locale } = useI18n()

  /**
   * Enhanced $fetch with automatic language header
   */
  const apiFetch = async <T>(url: string, options: FetchOptions = {}): Promise<T> => {
    const baseURL = config.public.apiBase
    
    // Add language header to all API requests
    const headers = {
      'Accept-Language': locale.value,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers
    }

    return $fetch<T>(url, {
      baseURL,
      headers,
      ...options
    })
  }

  /**
   * GET request with language support
   */
  const get = async <T>(url: string, options: FetchOptions = {}): Promise<T> => {
    return apiFetch<T>(url, { ...options, method: 'GET' })
  }

  /**
   * POST request with language support
   */
  const post = async <T>(url: string, body?: any, options: FetchOptions = {}): Promise<T> => {
    return apiFetch<T>(url, { ...options, method: 'POST', body })
  }

  /**
   * PUT request with language support
   */
  const put = async <T>(url: string, body?: any, options: FetchOptions = {}): Promise<T> => {
    return apiFetch<T>(url, { ...options, method: 'PUT', body })
  }

  /**
   * PATCH request with language support
   */
  const patch = async <T>(url: string, body?: any, options: FetchOptions = {}): Promise<T> => {
    return apiFetch<T>(url, { ...options, method: 'PATCH', body })
  }

  /**
   * DELETE request with language support
   */
  const del = async <T>(url: string, options: FetchOptions = {}): Promise<T> => {
    return apiFetch<T>(url, { ...options, method: 'DELETE' })
  }

  /**
   * Upload file with language support
   */
  const upload = async <T>(url: string, file: File, options: FetchOptions = {}): Promise<T> => {
    const formData = new FormData()
    formData.append('file', file)

    return apiFetch<T>(url, {
      ...options,
      method: 'POST',
      body: formData,
      headers: {
        'Accept-Language': locale.value,
        // Don't set Content-Type for FormData, let browser set it
        ...options.headers
      }
    })
  }

  return {
    apiFetch,
    get,
    post,
    put,
    patch,
    delete: del,
    upload
  }
}
