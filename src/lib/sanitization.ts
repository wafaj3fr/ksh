import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import validator from 'validator'

// Create a DOMPurify instance for server-side usage
const window = new JSDOM('').window
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const purify = DOMPurify(window as any)

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export function sanitizeHtml(dirty: string): string {
  return purify.sanitize(dirty, {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [],
  })
}

/**
 * Sanitize and validate email
 */
export function sanitizeEmail(email: string): string {
  const sanitized = validator.normalizeEmail(email.trim().toLowerCase()) || ''
  return validator.isEmail(sanitized) ? sanitized : ''
}

/**
 * Sanitize text input by removing potential XSS and unwanted characters
 */
export function sanitizeText(text: string): string {
  if (!text || typeof text !== 'string') return ''
  
  // Remove HTML tags and decode entities
  let sanitized = sanitizeHtml(text)
  
  // Trim whitespace
  sanitized = sanitized.trim()
  
  // Remove null bytes and control characters (except newline and tab)
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
  
  return sanitized
}

/**
 * Sanitize phone number
 */
export function sanitizePhone(phone: string): string {
  if (!phone || typeof phone !== 'string') return ''
  
  // Remove all non-digit characters except + at the beginning
  let sanitized = phone.trim()
  sanitized = sanitized.replace(/[^\d+]/g, '')
  
  // Ensure + is only at the beginning
  if (sanitized.includes('+')) {
    const parts = sanitized.split('+')
    sanitized = '+' + parts.join('')
  }
  
  return sanitized
}

/**
 * Sanitize file name to prevent directory traversal and other issues
 */
export function sanitizeFileName(fileName: string): string {
  if (!fileName || typeof fileName !== 'string') return ''
  
  // Remove path separators and dangerous characters
  let sanitized = fileName.replace(/[\/\\:*?"<>|]/g, '')
  
  // Remove leading/trailing dots and spaces
  sanitized = sanitized.replace(/^[.\s]+|[.\s]+$/g, '')
  
  // Limit length
  if (sanitized.length > 255) {
    const ext = sanitized.split('.').pop()
    const name = sanitized.substring(0, 255 - (ext?.length || 0) - 1)
    sanitized = ext ? `${name}.${ext}` : name
  }
  
  return sanitized || 'file'
}

/**
 * Comprehensive sanitization for form data
 */
export function sanitizeFormData(data: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {}
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      switch (key) {
        case 'email':
          sanitized[key] = sanitizeEmail(value)
          break
        case 'phone':
          sanitized[key] = sanitizePhone(value)
          break
        default:
          sanitized[key] = sanitizeText(value)
      }
    } else {
      sanitized[key] = value
    }
  }
  
  return sanitized
}