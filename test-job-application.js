async function testJobApplication() {
  try {
    console.log('Testing job application API...');
    
    // Test simple POST without files first
    const response = await fetch('http://localhost:3001/api/forms/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        fullName: 'Test User',
        phone: '1234567890',
        position: 'Software Engineer'
      })
    });
    
    const result = await response.text();
    console.log('Response status:', response.status);
    console.log('Response:', result);
    
  } catch (error) {
    console.error('Error testing job application:', error);
  }
}

testJobApplication();