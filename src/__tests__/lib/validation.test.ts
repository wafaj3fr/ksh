import { 
  validateJobApplication, 
  validateContactForm, 
  validateFile,
  cvFileSchema,
  jobApplicationSchema,
  contactFormSchema,
  emailSchema,
  nameSchema,
  phoneSchema
} from '../../lib/validation';

describe('Validation Schemas', () => {
  describe('emailSchema', () => {
    it('should validate correct email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        'firstname.lastname@company.com'
      ];

      validEmails.forEach(email => {
        const result = emailSchema.safeParse(email);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'user@',
        'user..name@example.com',
        'user@.com',
        '',
        'a@b.c', // too short
        'a'.repeat(250) + '@example.com' // too long
      ];

      invalidEmails.forEach(email => {
        const result = emailSchema.safeParse(email);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('nameSchema', () => {
    it('should validate correct names', () => {
      const validNames = [
        'John Doe',
        'Mary-Jane Watson',
        "O'Connor",
        'Jean-Pierre',
        'Anne Marie'
      ];

      validNames.forEach(name => {
        const result = nameSchema.safeParse(name);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid names', () => {
      const invalidNames = [
        'J', // too short
        'John123', // contains numbers
        'John@Doe', // contains special characters
        'John_Doe', // contains underscore
        'John.Doe', // contains period
        '', // empty
        'a'.repeat(101) // too long
      ];

      invalidNames.forEach(name => {
        const result = nameSchema.safeParse(name);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('phoneSchema', () => {
    it('should validate correct phone numbers', () => {
      const validPhones = [
        '+1234567890',
        '+447890123456',
        '+33123456789',
        '1234567890',
        '+249 125817547',    // Sudanese format with space
        '+249125817547',     // Sudanese format without space
        '+1 (555) 123-4567', // US format with formatting
        '+44 20 7946 0958',  // UK format
        '+81-3-1234-5678',   // Japanese format with dashes
        undefined // optional field
      ];

      validPhones.forEach(phone => {
        const result = phoneSchema.safeParse(phone);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid phone numbers', () => {
      const invalidPhones = [
        'abc123',
        '+',
        '++1234567890',
        'phone-number',
        '0123456789' // starts with 0
      ];

      invalidPhones.forEach(phone => {
        const result = phoneSchema.safeParse(phone);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('jobApplicationSchema', () => {
    it('should validate complete job application', () => {
      const validApplication = {
        jobId: 'software-engineer-2024',
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        coverLetter: 'I am writing to express my interest in the software engineer position. I have 5 years of experience in full-stack development and would love to contribute to your team.'
      };

      const result = jobApplicationSchema.safeParse(validApplication);
      expect(result.success).toBe(true);
    });

    it('should validate job application without optional phone', () => {
      const validApplication = {
        jobId: 'software-engineer-2024',
        fullName: 'John Doe',
        email: 'john@example.com',
        coverLetter: 'I am writing to express my interest in the software engineer position. I have 5 years of experience in full-stack development and would love to contribute to your team.'
      };

      const result = jobApplicationSchema.safeParse(validApplication);
      expect(result.success).toBe(true);
    });

    it('should reject job application with missing required fields', () => {
      const invalidApplication = {
        fullName: 'John Doe',
        email: 'john@example.com'
        // Missing jobId and coverLetter
      };

      const result = jobApplicationSchema.safeParse(invalidApplication);
      expect(result.success).toBe(false);
    });

    it('should reject job application with short cover letter', () => {
      const invalidApplication = {
        jobId: 'software-engineer-2024',
        fullName: 'John Doe',
        email: 'john@example.com',
        coverLetter: 'Short letter'
      };

      const result = jobApplicationSchema.safeParse(invalidApplication);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              path: ['coverLetter'],
              message: expect.stringContaining('50 characters')
            })
          ])
        );
      }
    });
  });

  describe('contactFormSchema', () => {
    it('should validate complete contact form', () => {
      const validContact = {
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        subject: 'Business Inquiry',
        message: 'I would like to know more about your services.'
      };

      const result = contactFormSchema.safeParse(validContact);
      expect(result.success).toBe(true);
    });

    it('should validate contact form without optional subject', () => {
      const validContact = {
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        message: 'I would like to know more about your services.'
      };

      const result = contactFormSchema.safeParse(validContact);
      expect(result.success).toBe(true);
    });

    it('should reject contact form with short subject', () => {
      const invalidContact = {
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        subject: 'Hi',
        message: 'I would like to know more about your services.'
      };

      const result = contactFormSchema.safeParse(invalidContact);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              path: ['subject'],
              message: expect.stringContaining('5 characters')
            })
          ])
        );
      }
    });
  });

  describe('File validation schemas', () => {
    describe('cvFileSchema', () => {
      it('should validate PDF files', () => {
        const validFile = {
          name: 'resume.pdf',
          size: 1024 * 1024, // 1MB
          type: 'application/pdf'
        };

        const result = cvFileSchema.safeParse(validFile);
        expect(result.success).toBe(true);
      });

      it('should validate DOC files', () => {
        const validFile = {
          name: 'resume.doc',
          size: 2 * 1024 * 1024, // 2MB
          type: 'application/msword'
        };

        const result = cvFileSchema.safeParse(validFile);
        expect(result.success).toBe(true);
      });

      it('should validate DOCX files', () => {
        const validFile = {
          name: 'resume.docx',
          size: 3 * 1024 * 1024, // 3MB
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        };

        const result = cvFileSchema.safeParse(validFile);
        expect(result.success).toBe(true);
      });

      it('should reject files with invalid types', () => {
        const invalidFiles = [
          {
            name: 'resume.txt',
            size: 1024,
            type: 'text/plain'
          },
          {
            name: 'resume.jpg',
            size: 1024,
            type: 'image/jpeg'
          },
          {
            name: 'resume.exe',
            size: 1024,
            type: 'application/x-msdownload'
          }
        ];

        invalidFiles.forEach(file => {
          const result = cvFileSchema.safeParse(file);
          expect(result.success).toBe(false);
        });
      });

      it('should reject files that are too large', () => {
        const largeFile = {
          name: 'resume.pdf',
          size: 15 * 1024 * 1024, // 15MB (over 10MB limit)
          type: 'application/pdf'
        };

        const result = cvFileSchema.safeParse(largeFile);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                message: expect.stringContaining('10MB')
              })
            ])
          );
        }
      });
    });
  });
});

describe('Validation Helper Functions', () => {
  describe('validateJobApplication', () => {
    it('should return success for valid data', () => {
      const validData = {
        jobId: 'test-job',
        fullName: 'John Doe',
        email: 'john@example.com',
        coverLetter: 'This is a comprehensive cover letter that explains my qualifications and interest in the position.'
      };

      const result = validateJobApplication(validData);
      expect(result.success).toBe(true);
    });

    it('should return error details for invalid data', () => {
      const invalidData = {
        jobId: '',
        fullName: 'J',
        email: 'invalid-email',
        coverLetter: 'Short'
      };

      const result = validateJobApplication(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });

  describe('validateContactForm', () => {
    it('should return success for valid data', () => {
      const validData = {
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        message: 'This is a valid message with enough characters.'
      };

      const result = validateContactForm(validData);
      expect(result.success).toBe(true);
    });

    it('should return error details for invalid data', () => {
      const invalidData = {
        fullName: '',
        email: 'invalid-email',
        message: 'Short'
      };

      const result = validateContactForm(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });

  describe('validateFile', () => {
    it('should validate file against CV schema', () => {
      const mockFile = {
        name: 'test.pdf',
        size: 1024,
        type: 'application/pdf'
      } as File;

      const result = validateFile(mockFile, cvFileSchema);
      expect(result.success).toBe(true);
    });

    it('should reject invalid file against CV schema', () => {
      const mockFile = {
        name: 'test.txt',
        size: 1024,
        type: 'text/plain'
      } as File;

      const result = validateFile(mockFile, cvFileSchema);
      expect(result.success).toBe(false);
    });
  });
});