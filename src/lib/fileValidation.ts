import { allowedFileTypes } from './validation'

// File size limits (in bytes)
export const FILE_SIZE_LIMITS = {
  CV: 10 * 1024 * 1024, // 10MB
  COVER_LETTER: 5 * 1024 * 1024, // 5MB
  ATTACHMENT: 10 * 1024 * 1024, // 10MB
} as const

// Allowed MIME types mapping
export const MIME_TYPE_EXTENSIONS = {
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
} as const

/**
 * Validate file type by checking magic bytes
 */
export async function validateFileType(buffer: Buffer, expectedMimeType: string): Promise<boolean> {
  try {
    const fileTypeModule: any = await import('file-type')
    const fromBufferFn =
      typeof fileTypeModule.fromBuffer === 'function'
        ? fileTypeModule.fromBuffer
        : typeof fileTypeModule.fileTypeFromBuffer === 'function'
          ? fileTypeModule.fileTypeFromBuffer
          : typeof fileTypeModule.default === 'function'
            ? fileTypeModule.default
            : typeof fileTypeModule.default?.fromBuffer === 'function'
              ? fileTypeModule.default.fromBuffer.bind(fileTypeModule.default)
              : null

    if (!fromBufferFn) {
      throw new Error('file-type fromBuffer function not available')
    }

    const detectedType = await fromBufferFn(buffer)
    
    if (!detectedType) {
      // For some files like plain text DOC files, file-type might not detect them
      // In this case, we'll rely on the MIME type provided by the browser
      return allowedFileTypes.includes(expectedMimeType as any)
    }
    
    return detectedType.mime === expectedMimeType
  } catch (error) {
    console.error('Error validating file type:', error)
    return false
  }
}

/**
 * Validate file size
 */
export function validateFileSize(size: number, maxSize: number): boolean {
  return size > 0 && size <= maxSize
}

/**
 * Validate file extension
 */
export function validateFileExtension(fileName: string, allowedExtensions: string[]): boolean {
  const extension = fileName.toLowerCase().split('.').pop()
  return extension ? allowedExtensions.includes(extension) : false
}

/**
 * Comprehensive file validation
 */
export interface FileValidationResult {
  isValid: boolean
  errors: string[]
  fileInfo?: {
    name: string
    size: number
    type: string
    extension: string
  }
}

export async function validateUploadedFile(
  file: File | Buffer,
  fileName: string,
  mimeType: string,
  maxSize: number = FILE_SIZE_LIMITS.CV
): Promise<FileValidationResult> {
  const errors: string[] = []
  const fileSize = file instanceof File ? file.size : file.length
  
  // Validate file size
  if (!validateFileSize(fileSize, maxSize)) {
    errors.push(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`)
  }
  
  // Validate MIME type
  if (!allowedFileTypes.includes(mimeType as any)) {
    errors.push('Only PDF, DOC, and DOCX files are allowed')
  }
  
  // Validate file extension
  const allowedExtensions = Object.values(MIME_TYPE_EXTENSIONS)
  if (!validateFileExtension(fileName, allowedExtensions)) {
    errors.push('File must have a valid extension (.pdf, .doc, or .docx)')
  }
  
  // Validate file content (magic bytes)
  let buffer: Buffer
  if (file instanceof File) {
    buffer = Buffer.from(await file.arrayBuffer())
  } else {
    buffer = file
  }
  
  const isValidType = await validateFileType(buffer, mimeType)
  if (!isValidType) {
    errors.push('File content does not match the expected file type')
  }
  
  // Check for malicious content patterns
  const maliciousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /vbscript:/gi,
    /onload\s*=/gi,
    /onerror\s*=/gi,
  ]
  
  const fileContent = buffer.toString('utf8', 0, Math.min(buffer.length, 1024))
  for (const pattern of maliciousPatterns) {
    if (pattern.test(fileContent)) {
      errors.push('File contains potentially malicious content')
      break
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    fileInfo: {
      name: fileName,
      size: fileSize,
      type: mimeType,
      extension: fileName.toLowerCase().split('.').pop() || '',
    },
  }
}

/**
 * Validate multiple files
 */
export async function validateMultipleFiles(
  files: File[],
  maxSize: number = FILE_SIZE_LIMITS.ATTACHMENT
): Promise<{ isValid: boolean; results: FileValidationResult[] }> {
  const results = await Promise.all(
    files.map(file => 
      validateUploadedFile(file, file.name, file.type, maxSize)
    )
  )
  
  const isValid = results.every(result => result.isValid)
  
  return { isValid, results }
}