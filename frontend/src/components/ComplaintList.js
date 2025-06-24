// 📁 D:\AppDevelopment\instay-app\frontend\src\components\ComplaintList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // AuthContext से useAuth इम्पोर्ट करें

const statusColors = {
  'Open': '#007bff',        // Blue
  'In Progress': '#ffc107', // Yellow/Orange
  'Resolved': '#28a745',    // Green
  'Closed': '#6c757d',      // Grey
  'Rejected': '#dc3545'     // Red
};

const ComplaintList = ({ refreshKey }) => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null); // अपडेट करने के लिए
  const [editForm, setEditForm] = useState({ // अपडेट फॉर्म के लिए
    status: '',
    priority: '',
    adminComments: '',
    studentFeedback: '',
  });

  const statuses = ['Open', 'In Progress', 'Resolved', 'Closed', 'Rejected'];
  const priorities = ['Low', 'Medium', 'High', 'Urgent'];

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      setError('');
      try {
        let response;
        if (user && user.role === 'Student' && user.student) {
          // छात्र केवल अपनी शिकायतें देखेगा
          response = await axios.get(`http://localhost:5000/api/complaints/student/${user.student._id}`);
        } else {
          // एडमिन/मैनेजर/वार्डन सभी शिकायतें देखेंगे
          response = await axios.get('http://localhost:5000/api/complaints');
        }
        setComplaints(response.data);
      } catch (err) {
        console.error('Error fetching complaints:', err);
        setError('Failed to fetch complaints. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [refreshKey, user]); // refreshKey या यूजर बदलने पर डेटा रीफ्रेश होगा

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this complaint record? This action cannot be undone.')) {
      try {
        await axios.delete(`http://localhost:5000/api/complaints/${id}`);
        setComplaints(complaints.filter(complaint => complaint._id !== id));
        alert('Complaint deleted successfully!');
      } catch (err) {
        console.error('Error deleting complaint:', err.response ? err.response.data : err.message);
        alert(`Error deleting complaint: ${err.response && err.response.data && err.response.data.message ? err.response.data.message : 'Please try again.'}`);
      }
    }
  };

  const handleEditClick = (complaint) => {
    setSelectedComplaint(complaint);
    setEditForm({
      status: complaint.status,
      priority: complaint.priority || 'Medium',
      adminComments: complaint.adminComments || '',
      studentFeedback: complaint.studentFeedback || '',
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    try {
      const dataToUpdate = {};
      if (user.role === 'Student') {
        dataToUpdate.studentFeedback = editForm.studentFeedback;
        // छात्र को अन्य फ़ील्ड अपडेट करने की अनुमति न दें
      } else { // Admin, Manager, Warden
        dataToUpdate.status = editForm.status;
        dataToUpdate.priority = editForm.priority;
        dataToUpdate.adminComments = editForm.adminComments;
        dataToUpdate.studentFeedback = editForm.studentFeedback; // एडमिन/मैनेजर भी स्टूडेंट फीडबैक देख/अपडेट कर सकते हैं
      }

      const response = await axios.put(`http://localhost:5000/api/complaints/${selectedComplaint._id}`, dataToUpdate);
      setComplaints(complaints.map(comp => comp._id === response.data._id ? response.data : comp));
      setSelectedComplaint(null); // मॉडल बंद करें
      alert('Complaint updated successfully!');
    } catch (err) {
      console.error('Error updating complaint:', err.response ? err.response.data : err.message);
      alert(`Error updating complaint: ${err.response && err.response.data && err.response.data.message ? err.response.data.message : 'Please try again.'}`);
    }
  };


  if (loading) return <p style={{ textAlign: 'center', margin: '20px' }}>Loading complaints...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red', margin: '20px' }}>{error}</p>;
  if (!complaints || complaints.length === 0) return <p style={{ textAlign: 'center', margin: '20px' }}>No complaints found.</p>;

  return (
    <div style={{ maxWidth: 1000, margin: '40px auto', padding: '20px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
      <h3 style={{ marginBottom: '20px', color: '#333' }}>All Complaints ({user?.role === 'Student' ? 'My Complaints' : 'All Complaints'})</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Ticket ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Student</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Room</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Category</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Description</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Status</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Priority</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Submitted On</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint._id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{complaint.ticketId}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{complaint.student ? `${complaint.student.firstName} ${complaint.student.lastName}` : 'N/A'}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{complaint.space ? `R: ${complaint.space.roomNumber}, B: ${complaint.space.bedNumber}` : 'N/A'}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{complaint.category}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{complaint.description}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                <span style={{ backgroundColor: statusColors[complaint.status] || '#ccc', color: 'white', padding: '5px 10px', borderRadius: '15px', fontSize: '0.8em', display: 'inline-block' }}>
                  {complaint.status}
                </span>
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{complaint.priority}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(complaint.createdAt).toLocaleDateString()}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <button
                  onClick={() => handleEditClick(complaint)}
                  style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    padding: '5px 10px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    marginRight: '5px'
                  }}
                >
                  View/Update
                </button>
                {['Admin', 'Manager'].includes(user?.role) && ( // केवल एडमिन और मैनेजर डिलीट कर सकते हैं
                  <button
                    onClick={() => handleDelete(complaint._id)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      padding: '5px 10px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                    }}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update/View Modal */}
      {selectedComplaint && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', maxWidth: '500px', width: '90%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}>
            <h4 style={{ marginBottom: '20px' }}>Complaint Details - Ticket ID: {selectedComplaint.ticketId}</h4>
            <form onSubmit={handleUpdate}>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Student:</strong> {selectedComplaint.student ? `${selectedComplaint.student.firstName} ${selectedComplaint.student.lastName}` : 'N/A'}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Room/Bed:</strong> {selectedComplaint.space ? `Room: ${selectedComplaint.space.roomNumber}, Bed: ${selectedComplaint.space.bedNumber}` : 'N/A'}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Category:</strong> {selectedComplaint.category}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Description:</strong> {selectedComplaint.description}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Submitted On:</strong> {new Date(selectedComplaint.createdAt).toLocaleString()}
              </div>
              {selectedComplaint.actualResolutionTime && (
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Resolved On:</strong> {new Date(selectedComplaint.actualResolutionTime).toLocaleString()}
                </div>
              )}

              {/* Status (Admin/Manager/Warden only) */}
              {user && ['Admin', 'Manager', 'Warden'].includes(user.role) && (
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="status" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Status:</label>
                  <select id="status" name="status" value={editForm.status} onChange={handleEditChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              )}

              {/* Priority (Admin/Manager/Warden only) */}
              {user && ['Admin', 'Manager', 'Warden'].includes(user.role) && (
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="priority" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Priority:</label>
                  <select id="priority" name="priority" value={editForm.priority} onChange={handleEditChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              )}

              {/* Admin Comments (Admin/Manager/Warden only) */}
              {user && ['Admin', 'Manager', 'Warden'].includes(user.role) && (
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="adminComments" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Admin Comments:</label>
                  <textarea id="adminComments" name="adminComments" value={editForm.adminComments} onChange={handleEditChange} rows="3" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
                </div>
              )}

              {/* Student Feedback (All roles can see, student can edit) */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="studentFeedback" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Student Feedback:</label>
                <textarea
                  id="studentFeedback"
                  name="studentFeedback"
                  value={editForm.studentFeedback}
                  onChange={handleEditChange}
                  readOnly={user.role !== 'Student' && !['Admin', 'Manager', 'Warden'].includes(user.role)} // केवल छात्र ही संपादित कर सकता है
                  rows="3"
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: user.role !== 'Student' && !['Admin', 'Manager', 'Warden'].includes(user.role) ? '#f0f0f0' : 'white' }}
                ></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>Update Complaint</button>
                <button type="button" onClick={() => setSelectedComplaint(null)} style={{ backgroundColor: '#6c757d', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintList;