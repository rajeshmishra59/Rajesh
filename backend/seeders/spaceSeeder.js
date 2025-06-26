// 📁 D:\AppDevelopment\instay-app\backend\seeders\spaceSeeder.js

const axios = require('axios');
const baseURL = 'http://localhost:5000/api/spaces';
const token = '<YOUR_ADMIN_TOKEN_HERE>'; // Replace with actual token while testing

// 5 spaces (Room 101 with 3 beds, Room 102 with 2 beds)
const spaces = [
  { roomNumber: 'R101', bedNumber: 'B1', sharingType: 'Triple', monthlyRent: 5500 },
  { roomNumber: 'R101', bedNumber: 'B2', sharingType: 'Triple', monthlyRent: 5500 },
  { roomNumber: 'R101', bedNumber: 'B3', sharingType: 'Triple', monthlyRent: 5500 },
  { roomNumber: 'R102', bedNumber: 'B1', sharingType: 'Double', monthlyRent: 6500 },
  { roomNumber: 'R102', bedNumber: 'B2', sharingType: 'Double', monthlyRent: 6500 },
];

(async () => {
  for (const space of spaces) {
    try {
      const res = await axios.post(baseURL, space, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`✅ Created: ${res.data.space.roomNumber} ${res.data.space.bedNumber}`);
    } catch (err) {
      if (err.response?.status === 409) {
        console.log(`⚠️ Duplicate skipped: ${space.roomNumber} ${space.bedNumber}`);
      } else {
        console.error(`❌ Error creating space ${space.roomNumber} ${space.bedNumber}:`, err.message);
      }
    }
  }
})();
