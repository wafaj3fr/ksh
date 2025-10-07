import { NextRequest } from 'next/server';
import { POST } from '../../app/api/forms/contact/route';
import { validateContactForm } from '../../lib/validation';
import { sanitizeFormData } from '../../lib/sanitization';

// Mock Sanity client
jest.mock('@sanity/client', () => ({
  createClient: jest.fn(() => ({
    create: jest.fn(() => Promise.resolve({ _id: 'test-contact-id' }))
  }))
}));

describe('/api/forms/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully submit a contact form with valid data', async () => {
    const formData = new FormData();
    formData.append('fullName', 'Jane Smith');
    formData.append('email', 'jane@example.com');
    formData.append('subject', 'Business Inquiry');
    formData.append('message', 'I would like to know more about your services and how we can work together.');

    const request = new NextRequest('http://localhost:3000/api/forms/contact', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.id).toBe('test-contact-id');
  });

  it('should successfully submit contact form without optional subject', async () => {
    const formData = new FormData();
    formData.append('fullName', 'Jane Smith');
    formData.append('email', 'jane@example.com');
    formData.append('message', 'This is a message without a subject line provided.');

    const request = new NextRequest('http://localhost:3000/api/forms/contact', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.id).toBe('test-contact-id');
  });

  it('should reject contact form with invalid email', async () => {
    const formData = new FormData();
    formData.append('fullName', 'Jane Smith');
    formData.append('email', 'invalid-email');
    formData.append('subject', 'Business Inquiry');
    formData.append('message', 'I would like to know more about your services.');

    const request = new NextRequest('http://localhost:3000/api/forms/contact', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Validation failed');
    expect(data.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: 'email',
          message: expect.stringContaining('email')
        })
      ])
    );
  });

  it('should reject contact form with short message', async () => {
    const formData = new FormData();
    formData.append('fullName', 'Jane Smith');
    formData.append('email', 'jane@example.com');
    formData.append('subject', 'Business Inquiry');
    formData.append('message', 'Short msg');

    const request = new NextRequest('http://localhost:3000/api/forms/contact', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Validation failed');
    expect(data.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: 'message',
          message: expect.stringContaining('10 characters')
        })
      ])
    );
  });

  it('should reject contact form with missing required fields', async () => {
    const formData = new FormData();
    formData.append('fullName', 'Jane Smith');
    // Missing email and message

    const request = new NextRequest('http://localhost:3000/api/forms/contact', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Validation failed');
    expect(data.details.length).toBeGreaterThan(0);
  });

  it('should sanitize HTML content in form fields', async () => {
    const formData = new FormData();
    formData.append('fullName', 'Jane <script>alert("xss")</script> Smith');
    formData.append('email', 'jane@example.com');
    formData.append('subject', 'Business <b>Inquiry</b>');
    formData.append('message', 'I would like to know more about your <script>malicious()</script> services.');

    const request = new NextRequest('http://localhost:3000/api/forms/contact', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it('should handle empty form data', async () => {
    const formData = new FormData();

    const request = new NextRequest('http://localhost:3000/api/forms/contact', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Validation failed');
    expect(data.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'fullName' }),
        expect.objectContaining({ field: 'email' }),
        expect.objectContaining({ field: 'message' })
      ])
    );
  });

  it('should handle only GET method rejection', async () => {
    const request = new NextRequest('http://localhost:3000/api/forms/contact', {
      method: 'GET',
    });

    const response = await POST(request);
    
    // If GET method handler doesn't exist, this should result in method not allowed
    expect([405, 404]).toContain(response.status);
  });
});

describe('Contact Form Validation Functions', () => {
  describe('validateContactForm', () => {
    it('should validate correct contact form data', () => {
      const validData = {
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        subject: 'Business Inquiry',
        message: 'I would like to know more about your services and how we can work together.'
      };

      const result = validateContactForm(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should reject invalid email format', () => {
      const invalidData = {
        fullName: 'Jane Smith',
        email: 'not-an-email',
        subject: 'Business Inquiry',
        message: 'I would like to know more about your services.'
      };

      const result = validateContactForm(invalidData);
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

    it('should reject too short names', () => {
      const invalidData = {
        fullName: 'J',
        email: 'jane@example.com',
        subject: 'Business Inquiry',
        message: 'I would like to know more about your services.'
      };

      const result = validateContactForm(invalidData);
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

    it('should reject too short messages', () => {
      const invalidData = {
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        subject: 'Business Inquiry',
        message: 'Short'
      };

      const result = validateContactForm(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              path: ['message'],
              message: expect.stringContaining('10 characters')
            })
          ])
        );
      }
    });

    it('should handle missing fields', () => {
      const invalidData = {
        fullName: 'Jane Smith'
        // Missing email and message (subject is optional)
      };

      const result = validateContactForm(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Contact Form Sanitization', () => {
    it('should sanitize contact form data', () => {
      const dirtyData = {
        fullName: '  Jane <script>alert("xss")</script> Smith  ',
        email: '  JANE@EXAMPLE.COM  ',
        subject: 'Business <b>Inquiry</b>',
        message: 'I would like to know more about your <script>malicious()</script> services.'
      };

      const sanitized = sanitizeFormData(dirtyData);

      expect(sanitized.fullName).toBe('Jane  Smith');
      expect(sanitized.email).toBe('jane@example.com');
      expect(sanitized.subject).toBe('Business Inquiry');
      expect(sanitized.message).toBe('I would like to know more about your  services.');
    });

    it('should handle null and undefined values', () => {
      const dirtyData = {
        fullName: null,
        email: undefined,
        subject: '',
        message: 'Valid message'
      };

      const sanitized = sanitizeFormData(dirtyData);

      expect(sanitized.fullName).toBe('');
      expect(sanitized.email).toBe('');
      expect(sanitized.subject).toBe('');
      expect(sanitized.message).toBe('Valid message');
    });
  });
});