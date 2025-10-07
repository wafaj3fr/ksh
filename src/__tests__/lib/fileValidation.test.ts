import { validateUploadedFile, FILE_SIZE_LIMITS } from '../../lib/fileValidation';

// Mock the file-type module at the module level
const mockFileTypeFromBuffer = jest.fn();

jest.doMock('file-type', () => ({
  fileTypeFromBuffer: mockFileTypeFromBuffer,
}));

describe('File Validation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFileTypeFromBuffer.mockReset();
  });

  describe('validateUploadedFile', () => {
    it('should validate a valid PDF file', async () => {
      const mockFile = new File(['PDF content'], 'test.pdf', { 
        type: 'application/pdf' 
      });

      // Mock file-type to return PDF
      mockFileTypeFromBuffer.mockResolvedValue({
        ext: 'pdf',
        mime: 'application/pdf'
      });

      const result = await validateUploadedFile(mockFile, mockFile.name, mockFile.type);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.fileInfo).toEqual({
        name: 'test.pdf',
        size: mockFile.size,
        type: 'application/pdf',
        extension: 'pdf'
      });
    });

    it('should validate a valid DOC file', async () => {
      const mockFile = new File(['DOC content'], 'test.doc', { 
        type: 'application/msword' 
      });

      mockFileTypeFromBuffer.mockResolvedValue({
        ext: 'doc',
        mime: 'application/msword'
      });

      const result = await validateUploadedFile(mockFile, mockFile.name, mockFile.type);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.fileInfo?.extension).toBe('doc');
    });

    it('should validate a valid DOCX file', async () => {
      const mockFile = new File(['DOCX content'], 'test.docx', { 
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
      });

      mockFileTypeFromBuffer.mockResolvedValue({
        ext: 'docx',
        mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });

      const result = await validateUploadedFile(mockFile, mockFile.name, mockFile.type);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.fileInfo?.extension).toBe('docx');
    });

    it('should reject files that are too large', async () => {
      // Create a file larger than the CV limit (10MB)
      const largeContent = new ArrayBuffer(FILE_SIZE_LIMITS.CV + 1);
      const mockFile = new File([largeContent], 'large.pdf', { 
        type: 'application/pdf' 
      });

      const result = await validateUploadedFile(mockFile, mockFile.name, mockFile.type);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('File size must be less than 10MB');
    });

    it('should reject files with invalid extensions', async () => {
      const mockFile = new File(['text content'], 'test.txt', { 
        type: 'text/plain' 
      });

      
      mockFileTypeFromBuffer.mockResolvedValue({
        ext: 'txt',
        mime: 'text/plain'
      });

      const result = await validateUploadedFile(mockFile, mockFile.name, mockFile.type);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Only PDF, DOC, and DOCX files are allowed');
    });

    it('should reject files with mismatched MIME types', async () => {
      // File claims to be PDF but is actually a text file
      const mockFile = new File(['text content'], 'fake.pdf', { 
        type: 'application/pdf' 
      });

      
      mockFileTypeFromBuffer.mockResolvedValue({
        ext: 'txt',
        mime: 'text/plain'
      });

      const result = await validateUploadedFile(mockFile, mockFile.name, mockFile.type);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('File content does not match the expected file type');
    });

    it('should reject executable files', async () => {
      const mockFile = new File(['executable content'], 'malware.exe', { 
        type: 'application/octet-stream' 
      });

      
      mockFileTypeFromBuffer.mockResolvedValue({
        ext: 'exe',
        mime: 'application/x-msdownload'
      });

      const result = await validateUploadedFile(mockFile, mockFile.name, mockFile.type);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Only PDF, DOC, and DOCX files are allowed');
    });

    it('should reject script files', async () => {
      const mockFile = new File(['script content'], 'script.js', { 
        type: 'application/javascript' 
      });

      
      mockFileTypeFromBuffer.mockResolvedValue({
        ext: 'js',
        mime: 'application/javascript'
      });

      const result = await validateUploadedFile(mockFile, mockFile.name, mockFile.type);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Only PDF, DOC, and DOCX files are allowed');
    });

    it('should handle files without detectable type', async () => {
      const mockFile = new File(['unknown content'], 'unknown.pdf', { 
        type: 'application/pdf' 
      });

      
      mockFileTypeFromBuffer.mockResolvedValue(undefined);

      const result = await validateUploadedFile(mockFile, mockFile.name, mockFile.type);

      // Should still validate since it's an allowed MIME type
      expect(result.isValid).toBe(true);
    });

    it('should handle empty files', async () => {
      const mockFile = new File([], 'empty.pdf', { 
        type: 'application/pdf' 
      });

      const result = await validateUploadedFile(mockFile, mockFile.name, mockFile.type);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('File size must be less than 10MB');
    });

    it('should handle files with suspicious content patterns', async () => {
      const suspiciousContent = '<script>alert("xss")</script>';
      const mockFile = new File([suspiciousContent], 'malicious.pdf', { 
        type: 'application/pdf' 
      });

      
      mockFileTypeFromBuffer.mockResolvedValue({
        ext: 'pdf',
        mime: 'application/pdf'
      });

      const result = await validateUploadedFile(mockFile, mockFile.name, mockFile.type);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('File contains potentially malicious content');
    });

    it('should handle different file size limits', async () => {
      const mockFile = new File(['PDF content'], 'attachment.pdf', { 
        type: 'application/pdf' 
      });

      
      mockFileTypeFromBuffer.mockResolvedValue({
        ext: 'pdf',
        mime: 'application/pdf'
      });

      // Test with custom size limit
      const result = await validateUploadedFile(mockFile, mockFile.name, mockFile.type, FILE_SIZE_LIMITS.ATTACHMENT);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should handle file-type library errors gracefully', async () => {
      const mockFile = new File(['content'], 'test.pdf', { 
        type: 'application/pdf' 
      });

      
      mockFileTypeFromBuffer.mockRejectedValue(new Error('file-type error'));

      const result = await validateUploadedFile(mockFile, mockFile.name, mockFile.type);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('File content does not match the expected file type');
    });

    it('should validate file names correctly', async () => {
      const mockFile = new File(['PDF content'], 'résumé with spaces & symbols!.pdf', { 
        type: 'application/pdf' 
      });

      
      mockFileTypeFromBuffer.mockResolvedValue({
        ext: 'pdf',
        mime: 'application/pdf'
      });

      const result = await validateUploadedFile(mockFile, mockFile.name, mockFile.type);

      expect(result.isValid).toBe(true);
      expect(result.fileInfo?.name).toBe('résumé with spaces & symbols!.pdf');
    });

    it('should handle files with no extension', async () => {
      const mockFile = new File(['PDF content'], 'document_without_extension', { 
        type: 'application/pdf' 
      });

      
      mockFileTypeFromBuffer.mockResolvedValue({
        ext: 'pdf',
        mime: 'application/pdf'
      });

      const result = await validateUploadedFile(mockFile, mockFile.name, mockFile.type);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('File must have a valid extension (.pdf, .doc, or .docx)');
    });
  });

  describe('FILE_SIZE_LIMITS', () => {
    it('should have correct size limits', () => {
      expect(FILE_SIZE_LIMITS.CV).toBe(10 * 1024 * 1024); // 10MB
      expect(FILE_SIZE_LIMITS.ATTACHMENT).toBe(10 * 1024 * 1024); // 10MB
      expect(FILE_SIZE_LIMITS.COVER_LETTER).toBe(5 * 1024 * 1024); // 5MB
    });
  });

  describe('Edge cases', () => {
    it('should handle malformed parameters gracefully', async () => {
      const mockFile = new File(['content'], 'test.pdf', { 
        type: 'application/pdf' 
      });

      // Test with empty filename
      const result1 = await validateUploadedFile(mockFile, '', mockFile.type);
      expect(result1.isValid).toBe(false);

      // Test with empty MIME type
      const result2 = await validateUploadedFile(mockFile, mockFile.name, '');
      expect(result2.isValid).toBe(false);
    });

    it('should handle very large file content safely', async () => {
      // Create a large buffer but not exceeding memory limits
      const largeContent = Buffer.alloc(1024 * 1024, 'A'); // 1MB of 'A' characters
      const mockFile = new File([largeContent], 'large.pdf', { 
        type: 'application/pdf' 
      });

      
      mockFileTypeFromBuffer.mockResolvedValue({
        ext: 'pdf',
        mime: 'application/pdf'
      });

      const result = await validateUploadedFile(mockFile, mockFile.name, mockFile.type);
      expect(result.isValid).toBe(true);
    });

    it('should handle buffer input correctly', async () => {
      const buffer = Buffer.from('PDF content');
      
      
      mockFileTypeFromBuffer.mockResolvedValue({
        ext: 'pdf',
        mime: 'application/pdf'
      });

      const result = await validateUploadedFile(buffer, 'test.pdf', 'application/pdf');
      expect(result.isValid).toBe(true);
      expect(result.fileInfo?.size).toBe(buffer.length);
    });
  });
});