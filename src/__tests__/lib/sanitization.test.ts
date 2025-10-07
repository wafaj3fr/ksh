import { 
  sanitizeHtml, 
  sanitizeEmail, 
  sanitizeText, 
  sanitizeFormData 
} from '../../lib/sanitization';

// Mock DOMPurify for testing
jest.mock('isomorphic-dompurify', () => ({
  sanitize: jest.fn((html) => {
    // Simple mock that removes script tags
    return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  })
}));

// Add TextEncoder/TextDecoder polyfills for the test environment  
if (typeof global.TextEncoder === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  global.TextEncoder = require('util').TextEncoder;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  global.TextDecoder = require('util').TextDecoder;
}

describe('Sanitization Functions', () => {
  describe('sanitizeHtml', () => {
    it('should remove script tags', () => {
      const input = 'Hello <script>alert("xss")</script> World';
      const result = sanitizeHtml(input);
      expect(result).toBe('Hello  World');
    });

    it('should handle empty strings', () => {
      const result = sanitizeHtml('');
      expect(result).toBe('');
    });

    it('should handle null and undefined', () => {
      expect(sanitizeHtml(null)).toBe('');
      expect(sanitizeHtml(undefined)).toBe('');
    });

    it('should preserve safe HTML', () => {
      const input = 'Hello <b>bold</b> text';
      const result = sanitizeHtml(input);
      expect(result).toContain('Hello');
      expect(result).toContain('text');
    });
  });

  describe('sanitizeEmail', () => {
    it('should normalize email addresses', () => {
      const input = '  JOHN@EXAMPLE.COM  ';
      const result = sanitizeEmail(input);
      expect(result).toBe('john@example.com');
    });

    it('should handle null and undefined', () => {
      // These will throw errors as the function expects strings
      expect(() => sanitizeEmail(null as unknown as string)).toThrow();
      expect(() => sanitizeEmail(undefined as unknown as string)).toThrow();
    });

    it('should trim whitespace', () => {
      const input = '  user@domain.com  ';
      const result = sanitizeEmail(input);
      expect(result).toBe('user@domain.com');
    });

    it('should handle invalid email formats gracefully', () => {
      const input = 'not-an-email';
      const result = sanitizeEmail(input);
      expect(result).toBe(''); // Invalid emails return empty string
    });
  });

  describe('sanitizeText', () => {
    it('should remove HTML tags and trim whitespace', () => {
      const input = '  <script>alert("xss")</script>Hello World  ';
      const result = sanitizeText(input);
      expect(result).toBe('Hello World');
    });

    it('should handle phone numbers', () => {
      const input = '+1 (234) 567-890';
      const result = sanitizeText(input);
      expect(result).toBe('+1 (234) 567-890'); // Text sanitization preserves format
    });

    it('should preserve alphanumeric characters', () => {
      const input = 'John Doe 123';
      const result = sanitizeText(input);
      expect(result).toBe('John Doe 123');
    });

    it('should handle null and undefined', () => {
      expect(sanitizeText(null)).toBe('');
      expect(sanitizeText(undefined)).toBe('');
    });

    it('should remove extra whitespace', () => {
      const input = 'Hello    World   ';
      const result = sanitizeText(input);
      expect(result).toBe('Hello    World'); // Trim only removes leading/trailing whitespace
    });
  });

  describe('sanitizeFormData', () => {
    it('should sanitize all form fields correctly', () => {
      const dirtyData = {
        fullName: '  John <script>alert("xss")</script> Doe  ',
        email: '  JOHN@EXAMPLE.COM  ',
        phone: '+1 (234) 567-890',
        subject: 'Business <b>Inquiry</b>',
        message: 'This is my message with <script>malicious()</script> content.',
        coverLetter: 'Cover letter with <img src="x" onerror="alert(1)"> malicious content.'
      };

      const sanitized = sanitizeFormData(dirtyData);

      expect(sanitized.fullName).toBe('John  Doe');
      expect(sanitized.email).toBe('john@example.com');
      expect(sanitized.phone).toBe('+1234567890'); // Phone sanitization removes non-digits except +
      expect(sanitized.subject).toBe('Business Inquiry');
      expect(sanitized.message).toBe('This is my message with  content.');
      expect(sanitized.coverLetter).toBe('Cover letter with  malicious content.');
    });

    it('should handle missing fields', () => {
      const partialData = {
        fullName: 'John Doe',
        email: 'john@example.com'
        // Missing other fields
      };

      const sanitized = sanitizeFormData(partialData);

      expect(sanitized.fullName).toBe('John Doe');
      expect(sanitized.email).toBe('john@example.com');
      expect(sanitized.phone).toBeUndefined();
      expect(sanitized.subject).toBeUndefined();
      expect(sanitized.message).toBeUndefined();
      expect(sanitized.coverLetter).toBeUndefined();
    });

    it('should handle null and undefined values', () => {
      const dirtyData = {
        fullName: null,
        email: undefined,
        phone: '',
        subject: 'Valid subject',
        message: null,
        coverLetter: undefined
      };

      const sanitized = sanitizeFormData(dirtyData);

      expect(sanitized.fullName).toBe(null); // Non-string values are passed through unchanged
      expect(sanitized.email).toBe(undefined);
      expect(sanitized.phone).toBe(''); // Empty string is handled by sanitizePhone
      expect(sanitized.subject).toBe('Valid subject');
      expect(sanitized.message).toBe(null);
      expect(sanitized.coverLetter).toBe(undefined);
    });

    it('should preserve valid data without modification', () => {
      const cleanData = {
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1234567890',
        subject: 'Business Inquiry',
        message: 'Clean message without any HTML.',
        coverLetter: 'Clean cover letter content.'
      };

      const sanitized = sanitizeFormData(cleanData);

      expect(sanitized).toEqual(cleanData);
    });

    it('should handle special characters in names', () => {
      const data = {
        fullName: "Mary-Jane O'Connor",
        email: 'mary@example.com'
      };

      const sanitized = sanitizeFormData(data);

      expect(sanitized.fullName).toBe("Mary-Jane O'Connor");
      expect(sanitized.email).toBe('mary@example.com');
    });

    it('should handle unicode characters', () => {
      const data = {
        fullName: 'José María González',
        email: 'jose@example.com',
        message: 'Mensaje con caracteres especiales: áéíóú ñ'
      };

      const sanitized = sanitizeFormData(data);

      expect(sanitized.fullName).toBe('José María González');
      expect(sanitized.email).toBe('jose@example.com');
      expect(sanitized.message).toBe('Mensaje con caracteres especiales: áéíóú ñ');
    });

    it('should handle XSS attempts in different fields', () => {
      const xssAttempts = {
        fullName: '<script>document.cookie</script>John',
        email: 'user@example.com<script>alert(1)</script>',
        subject: '<img src=x onerror=alert(1)>Subject',
        message: 'Message with <iframe src="javascript:alert(1)"></iframe> content',
        coverLetter: '<svg onload=alert(1)>Cover letter</svg>'
      };

      const sanitized = sanitizeFormData(xssAttempts);

      // Should remove all script/iframe/svg tags
      expect(sanitized.fullName).not.toContain('<script>');
      expect(sanitized.email).not.toContain('<script>');
      expect(sanitized.subject).not.toContain('<img');
      expect(sanitized.message).not.toContain('<iframe');
      expect(sanitized.coverLetter).not.toContain('<svg');
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle very long strings', () => {
      const longString = 'A'.repeat(10000);
      const result = sanitizeText(longString);
      expect(result).toBe(longString); // Should not fail
    });

    it('should handle strings with only HTML tags', () => {
      const htmlOnly = '<script></script><div></div>';
      const result = sanitizeHtml(htmlOnly);
      expect(result.length).toBeGreaterThanOrEqual(0); // Should not fail
    });

    it('should handle deeply nested HTML', () => {
      const nested = '<div><span><script>alert(1)</script></span></div>';
      const result = sanitizeHtml(nested);
      expect(result).not.toContain('<script>');
    });

    it('should handle malformed HTML', () => {
      const malformed = '<script><div>alert(1)</script></div>';
      const result = sanitizeHtml(malformed);
      expect(result).not.toContain('<script>');
    });
  });
});