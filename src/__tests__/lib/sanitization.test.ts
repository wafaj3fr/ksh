import { 
  sanitizeInput
} from '../../../server/middleware/sanitizeInput';

describe('Sanitization Functions', () => {
  describe('sanitizeInput', () => {
    it('should remove HTML tags from strings', () => {
      const input = {
        name: 'John <script>alert("xss")</script> Doe',
        email: 'john@example.com<b>test</b>'
      };
      const result = sanitizeInput(input);
      expect(result.name).toBe('John alert("xss") Doe');
      expect(result.email).toBe('john@example.comtest'); // HTML tags are removed, no space preserved
    });

    it('should trim whitespace and normalize spaces', () => {
      const input = {
        name: '  John    Doe  ',
        message: 'Hello     world   '
      };
      const result = sanitizeInput(input);
      expect(result.name).toBe('John Doe');
      expect(result.message).toBe('Hello world');
    });

    it('should handle non-string values', () => {
      const input = {
        name: 'John Doe',
        age: 25,
        active: true,
        data: null
      };
      const result = sanitizeInput(input);
      expect(result.name).toBe('John Doe');
      expect(result.age).toBe(25);
      expect(result.active).toBe(true);
      expect(result.data).toBe(null);
    });

    it('should handle empty strings', () => {
      const input = {
        name: '',
        email: '   '
      };
      const result = sanitizeInput(input);
      expect(result.name).toBe('');
      expect(result.email).toBe('');
    });

    it('should remove various HTML tags', () => {
      const input = {
        content: 'Hello <div>world</div> <script>alert(1)</script> <img src="x"> test'
      };
      const result = sanitizeInput(input);
      expect(result.content).toBe('Hello world alert(1) test');
    });

    it('should handle special characters', () => {
      const input = {
        name: 'José María González',
        message: 'Message with special chars: áéíóú ñ'
      };
      const result = sanitizeInput(input);
      expect(result.name).toBe('José María González');
      expect(result.message).toBe('Message with special chars: áéíóú ñ');
    });

    it('should handle empty input object', () => {
      const input = {};
      const result = sanitizeInput(input);
      expect(result).toEqual({});
    });

    it('should handle nested HTML properly', () => {
      const input = {
        content: '<div><span><script>malicious</script></span></div>'
      };
      const result = sanitizeInput(input);
      expect(result.content).toBe('malicious');
    });
  });
});