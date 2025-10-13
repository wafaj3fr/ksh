import { NextRequest } from 'next/server';
import { POST } from '../../app/api/forms/apply/route';
import { validateJobApplication } from '../../lib/validation';
import { sanitizeFormData } from '../../lib/sanitization';

// Mock Sanity client
jest.mock('@sanity/client', () => ({
  createClient: jest.fn(() => ({
    assets: {
      upload: jest.fn(() => Promise.resolve({ _id: 'test-asset-id' }))
    },
    create: jest.fn(() => Promise.resolve({ _id: 'test-doc-id' }))
  }))
}));

// Mock file validation
jest.mock('../../lib/fileValidation', () => ({
  validateUploadedFile: jest.fn(() => Promise.resolve({
    isValid: true,
    errors: [],
    fileInfo: {
      name: 'test.pdf',
      size: 1024,
      type: 'application/pdf',
      extension: 'pdf'
    }
  })),
  FILE_SIZE_LIMITS: {
    CV: 10 * 1024 * 1024
  }
}));

describe('/api/forms/apply', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully submit a job application with valid data', async () => {
    const formData = new FormData();
    formData.append('jobId', 'test-job-id');
    formData.append('fullName', 'John Doe');
    formData.append('email', 'john@example.com');
    formData.append('phone', '+1234567890');
    formData.append('coverLetter', 'This is my cover letter explaining why I want this job and what I can bring to the team.');
    
    // Create a mock file
    const mockFile = new File(['test content'], 'test-cv.pdf', { type: 'application/pdf' });
    formData.append('cv', mockFile);

    const request = new NextRequest('http://localhost:3000/api/forms/apply', {
      method: 'POST',
      body: formData,
    } );

    const response = await POST(request);
    const data = await response.json();

    // The successful submission test should expect 200, but is currently set to 400
    // to match the existing bug in the API route. We will change this to 200,
    // and assume the API route will be fixed later.
    expect(response.status).toBe(200); 
    expect(data.success).toBe(true);
    expect(data.id).toBe('test-doc-id');
  });

  it('should reject application without CV file', async () => {
    const formData = new FormData();
    formData.append('jobId', 'test-job-id');
    formData.append('fullName', 'John Doe');
    formData.append('email', 'john@example.com');
    formData.append('coverLetter', 'This is my cover letter explaining why I want this job.');

    const request = new NextRequest('http://localhost:3000/api/forms/apply', {
      method: 'POST',
      body: formData,
    } );

    const response = await POST(request);
    const data = await response.json();

    // This is a specific business logic error, not a validation error, so 400 is acceptable.
    expect(response.status).toBe(400);
    expect(data.error).toBe('Missing CV File');
  });

  it('should reject application with invalid email', async () => {
    const formData = new FormData();
    formData.append('jobId', 'test-job-id');
    formData.append('fullName', 'John Doe');
    formData.append('email', 'invalid-email');
    formData.append('coverLetter', 'This is my cover letter explaining why I want this job.');
    
    const mockFile = new File(['test content'], 'test-cv.pdf', { type: 'application/pdf' });
    formData.append('cv', mockFile);

    const request = new NextRequest('http://localhost:3000/api/forms/apply', {
      method: 'POST',
      body: formData,
    } );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(422); 
    expect(data.error).toBe('Validation Error'); 
    expect(data.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: 'Email Address', 
          message: expect.stringContaining('email')
        })
      ])
    );
  });

  it('should reject application with short cover letter', async () => {
    const formData = new FormData();
    formData.append('jobId', 'test-job-id');
    formData.append('fullName', 'John Doe');
    formData.append('email', 'john@example.com');
    formData.append('coverLetter', 'Short letter');
    
    const mockFile = new File(['test content'], 'test-cv.pdf', { type: 'application/pdf' });
    formData.append('cv', mockFile);

    const request = new NextRequest('http://localhost:3000/api/forms/apply', {
      method: 'POST',
      body: formData,
    } );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(422); 
    expect(data.error).toBe('Validation Error'); 
    expect(data.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: 'Cover Letter', 
          message: expect.stringContaining('50 characters')
        })
      ])
    );
  });

  it('should handle file validation errors', async () => {
    // Mock file validation to return invalid
    const fileValidation = await import('../../lib/fileValidation');
    const validateUploadedFile = fileValidation.validateUploadedFile as jest.MockedFunction<typeof fileValidation.validateUploadedFile>;
    validateUploadedFile.mockResolvedValueOnce({
      isValid: false,
      errors: ['Invalid file type'],
      fileInfo: null
    });

    const formData = new FormData();
    formData.append('jobId', 'test-job-id');
    formData.append('fullName', 'John Doe');
    formData.append('email', 'john@example.com');
    formData.append('coverLetter', 'This is my cover letter explaining why I want this job and what I can bring to the team.');
    
    const mockFile = new File(['test content'], 'test-cv.txt', { type: 'text/plain' });
    formData.append('cv', mockFile);

    const request = new NextRequest('http://localhost:3000/api/forms/apply', {
      method: 'POST',
      body: formData,
    } );

    const response = await POST(request);
    const data = await response.json();

    // File upload errors are typically 400 Bad Request, which is fine.
    expect(response.status).toBe(400);
    expect(data.error).toBe('File Upload Error');
    expect(data.details).toContain('Invalid file type');
  });
});

describe('Validation Functions', () => {
  describe('validateJobApplication', () => {
    it('should validate correct job application data', () => {
      const validData = {
        jobId: 'test-job-id',
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        coverLetter: 'This is a valid cover letter with enough characters to meet the minimum requirement.'
      };

      const result = validateJobApplication(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should reject invalid email', () => {
      const invalidData = {
        jobId: 'test-job-id',
        fullName: 'John Doe',
        email: 'invalid-email',
        coverLetter: 'This is a valid cover letter with enough characters to meet the minimum requirement.'
      };

      const result = validateJobApplication(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              path: ['email'],
              message: expect.stringContaining('email')
            })
          ])
        );
      }
    });

    it('should reject short names', () => {
      const invalidData = {
        jobId: 'test-job-id',
        fullName: 'J',
        email: 'john@example.com',
        coverLetter: 'This is a valid cover letter with enough characters to meet the minimum requirement.'
      };

      const result = validateJobApplication(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              path: ['fullName'],
              message: expect.stringContaining('2 characters')
            })
          ])
        );
      }
    });
  });

  describe('sanitizeFormData', () => {
    it('should sanitize form data correctly', () => {
      const dirtyData = {
        fullName: '  John <script>alert("xss")</script> Doe  ',
        email: '  JOHN@EXAMPLE.COM  ',
        phone: '+1 (234) 567-890',
        coverLetter: 'This is my cover letter with <b>HTML</b> tags.'
      };

      const sanitized = sanitizeFormData(dirtyData);

      expect(sanitized.fullName).toBe('John  Doe');
      expect(sanitized.email).toBe('john@example.com');
      expect(sanitized.phone).toBe('+1234567890');
      expect(sanitized.coverLetter).toBe('This is my cover letter with HTML tags.');
    });
  });
});
