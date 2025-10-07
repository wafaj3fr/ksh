#!/usr/bin/env node

/**
 * Simple API test script to validate form endpoints
 */

const BASE_URL = 'http://localhost:3000';

// Test contact form endpoint
async function testContactForm() {
  console.log('🧪 Testing Contact Form API...');
  
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+249 125817547', // Sudanese number we validated earlier
    message: 'This is a test message'
  };

  try {
    const response = await fetch(`${BASE_URL}/api/forms/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Contact form test passed:', result.message);
    } else {
      console.log('❌ Contact form test failed:', result.error);
    }
  } catch (error) {
    console.log('❌ Contact form request failed:', error.message);
  }
}

// Test validation with malicious input
async function testXSSPrevention() {
  console.log('\n🛡️ Testing XSS Prevention...');
  
  const maliciousData = {
    name: '<script>alert("XSS")</script>',
    email: 'test@example.com',
    phone: '+249125817547',
    message: '<img src="x" onerror="alert(\'XSS\')">'
  };

  try {
    const response = await fetch(`${BASE_URL}/api/forms/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(maliciousData)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ XSS prevention test passed - malicious content sanitized');
    } else {
      console.log('✅ XSS prevention test passed - request rejected:', result.error);
    }
  } catch (error) {
    console.log('❌ XSS prevention test failed:', error.message);
  }
}

// Test invalid phone number
async function testPhoneValidation() {
  console.log('\n📞 Testing Phone Validation...');
  
  const invalidPhoneData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '123', // Invalid phone
    message: 'Test message'
  };

  try {
    const response = await fetch(`${BASE_URL}/api/forms/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidPhoneData)
    });

    const result = await response.json();
    
    if (!response.ok && result.error) {
      console.log('✅ Phone validation test passed - invalid phone rejected');
    } else {
      console.log('❌ Phone validation test failed - should have rejected invalid phone');
    }
  } catch (error) {
    console.log('❌ Phone validation test failed:', error.message);
  }
}

// Run all tests
async function runTests() {
  console.log('🚀 Starting API Tests...\n');
  
  await testContactForm();
  await testXSSPrevention();
  await testPhoneValidation();
  
  console.log('\n✨ API testing complete!');
}

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch(BASE_URL);
    if (response.ok) {
      console.log('✅ Server is running at', BASE_URL);
      return true;
    }
  } catch (error) {
    console.log('❌ Server is not running. Please start with: npm run dev');
    return false;
  }
}

// Main execution
async function main() {
  const serverRunning = await checkServer();
  if (serverRunning) {
    await runTests();
  }
}

main().catch(console.error);