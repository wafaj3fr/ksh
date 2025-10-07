# KSH Corporate Website

A modern, secure Next.js application with comprehensive form validation, file upload security, and CMS integration.

## 🚀 Features

- **Next.js 15** with App Router
- **Sanity CMS** integration for content management
- **Comprehensive Security**:
  - Input validation with Zod schemas
  - XSS prevention with DOMPurify
  - File upload validation with magic byte checking
  - CSRF protection
- **Form Handling**:
  - Contact forms with validation
  - Job application forms with file uploads
  - Email sanitization and normalization
- **Testing Suite**:
  - Unit tests with Jest
  - 48+ comprehensive test cases
  - Security validation testing
- **International Support**:
  - Phone number validation for multiple countries
  - Unicode character support

## 📋 Prerequisites

- Node.js 18.0 or later
- npm or yarn
- Sanity account and project

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ksh
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file with the following variables:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_WRITE_TOKEN=your_write_token
   ```

4. **Generate Sanity types**
   ```bash
   npm run typegen
   ```

## 🚀 Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🧪 Testing

Run the test suite:
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🏗️ Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm test` - Run tests
- `npm run test:coverage` - Generate test coverage
- `npm run clean` - Clean build artifacts
- `npm run typegen` - Generate Sanity types

## 🔒 Security Features

### Input Validation
- **Zod schemas** for type-safe validation
- **Email normalization** and format checking
- **Phone number validation** for international formats
- **File type validation** with magic byte checking

### XSS Prevention
- **DOMPurify integration** for HTML sanitization
- **Input sanitization** for all form fields
- **Content Security Policy** headers

### File Upload Security
- **Magic byte validation** to prevent file type spoofing
- **File size limits** configurable per file type
- **Malicious content detection** with pattern matching
- **MIME type verification**

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Import project from GitHub
   - Configure environment variables
   - Deploy automatically

### Environment Variables for Production

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_write_token
```

## 📞 Phone Number Support

The application supports international phone number formats including:
- **Sudan**: `+249 125817547`
- **US**: `+1 (555) 123-4567`
- **UK**: `+44 20 7946 0958`
- **International**: Any valid format with country code

## 🧪 Test Coverage

- **48+ test cases** covering:
  - Input validation scenarios
  - Security vulnerability prevention
  - File upload validation
  - Form submission workflows
  - Error handling

## 📝 API Documentation

### Contact Form API
- **Endpoint**: `POST /api/forms/contact`
- **Validation**: Name, email, message (subject optional)
- **Security**: Input sanitization, XSS prevention

### Job Application API
- **Endpoint**: `POST /api/forms/apply`
- **Validation**: Full application data + CV file
- **Security**: File validation, malicious content detection

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
