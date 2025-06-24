// 📁 D:\AppDevelopment\instay-app\frontend\src\components\SpaceList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SpaceList = ({ refreshKey }) => { // refreshKey prop अब हम Home.js से पास करेंगे
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/spaces'); // Space API से डेटा फ़ेच करें
        setSpaces(response.data);
        setError(null); // यदि कोई पिछला एरर था, तो उसे साफ़ करें
      } catch (err) {
        console.error('Error fetching spaces:', err);
        setError('Failed to fetch spaces.');
      } finally {
        setLoading(false);
      }
    };
    fetchSpaces();
  }, [refreshKey]); // refreshKey बदलने पर री-फ़ेच करें

  if (loading) return <p>Loading spaces...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (spaces.length === 0) return <p>No co-living spaces found. Please add some!</p>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {spaces.map(space => (
          <div key={space._id} style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '20px', 
            backgroundColor: '#fff', 
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)', 
            textAlign: 'left' 
          }}>
            <h3 style={{ color: '#007bff', marginBottom: '10px' }}>Room: {space.roomNumber} - Bed: {space.bedNumber}</h3>
            <p><strong>Sharing Type:</strong> {space.sharingType}</p>
            <p><strong>Monthly Rent:</strong> ₹{space.monthlyRent.toFixed(2)}</p>
            <p><strong>Status:</strong> <span style={{ 
                color: space.status === 'Available' ? 'green' : 
                       space.status === 'Occupied' ? 'red' : 
                       'orange', 
                fontWeight: 'bold' 
            }}>{space.status}</span></p>
            {space.isOccupied && space.occupiedBy && (
              <p><strong>Occupied By:</strong> {space.occupiedBy.name}</p>
            )}
            {space.description && <p><strong>Description:</strong> {space.description}</p>}
            <p style={{ fontSize: '0.8em', color: '#777', marginTop: '10px' }}>
              Created: {new Date(space.createdAt).toLocaleDateString()}
            </p>
            {/* ✨ भविष्य के लिए यहां एडिट/डिलीट बटन जोड़े जा सकते हैं */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpaceList;