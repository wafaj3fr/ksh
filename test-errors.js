#!/usr/bin/env node

/**
 * Test script to demonstrate improved error messages
 */

async function testValidationErrors() {
  console.log('🧪 Testing improved validation error messages...\n');

  const testCases = [
    {
      name: 'Missing required fields',
      data: {
        jobId: '',
        fullName: '',
        email: 'invalid-email',
        phone: '',
        coverLetter: ''
      }
    },
    {
      name: 'Invalid phone number',
      data: {
        jobId: 'test-job-123',
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '123', // too short
        coverLetter: 'This is a test cover letter that is definitely longer than 50 characters to meet the minimum requirement.'
      }
    },
    {
      name: 'Cover letter too short',
      data: {
        jobId: 'test-job-123',
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '0125817547',
        coverLetter: 'Too short' // less than 50 characters
      }
    },
    {
      name: 'Invalid name format',
      data: {
        jobId: 'test-job-123',
        fullName: 'John123', // contains numbers
        email: 'john@example.com', 
        phone: '0125817547',
        coverLetter: 'This is a test cover letter that is definitely longer than 50 characters to meet the minimum requirement.'
      }
    }
  ];

  for (const testCase of testCases) {
    console.log(`\n📋 Testing: ${testCase.name}`);
    console.log('Data sent:', JSON.stringify(testCase.data, null, 2));

    const form = new FormData();
    Object.entries(testCase.data).forEach(([key, value]) => {
      form.append(key, value);
    });

    // Add a dummy CV file
    const dummyPdf = Buffer.from('%PDF-1.4 dummy');
    form.append('cv', new Blob([dummyPdf], { type: 'application/pdf' }), 'test-cv.pdf');

    try {
      const response = await fetch('http://localhost:3000/api/forms/apply', {
        method: 'POST',
        body: form
      });

      const result = await response.json();
      
      console.log(`Status: ${response.status}`);
      console.log('Response:', JSON.stringify(result, null, 2));
      
      if (result.details && Array.isArray(result.details)) {
        console.log('\n📝 Validation Errors:');
        result.details.forEach((error, index) => {
          console.log(`  ${index + 1}. ${error.field}: ${error.message}`);
        });
      }
      
    } catch (error) {
      console.error('❌ Request failed:', error.message);
    }
    
    console.log('\n' + '='.repeat(80));
  }
}

// Test missing CV file
async function testMissingFile() {
  console.log('\n🧪 Testing missing CV file error...\n');

  const form = new FormData();
  form.append('jobId', 'test-job-123');
  form.append('fullName', 'John Doe');
  form.append('email', 'john@example.com');
  form.append('phone', '0125817547');
  form.append('coverLetter', 'This is a valid cover letter that is longer than 50 characters for testing purposes.');
  // Intentionally not adding CV file

  try {
    const response = await fetch('http://localhost:3000/api/forms/apply', {
      method: 'POST',
      body: form
    });

    const result = await response.json();
    console.log(`Status: ${response.status}`);
    console.log('Response:', JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

async function main() {
  console.log('🚀 Testing User-Friendly Error Messages\n');
  
  // Check if server is running
  try {
    const response = await fetch('http://localhost:3000');
    if (!response.ok) throw new Error('Server not responding');
    console.log('✅ Server is running\n');
  } catch (error) {
    console.log('❌ Server is not running. Please start with: npm run dev');
    return;
  }

  await testValidationErrors();
  await testMissingFile();
  
  console.log('\n✨ Error message testing complete!');
}

main().catch(console.error);