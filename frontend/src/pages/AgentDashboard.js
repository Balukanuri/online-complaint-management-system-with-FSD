import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getAssignedComplaints, updateComplaintStatus } from '../services/complaintService';
import { logoutUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';

const AgentDashboard = () => {
  const { authData, setAuthData } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await getAssignedComplaints();
      setComplaints(data);
    } catch (err) {
      console.error('❌ Failed to fetch assigned complaints:', err);
      setError('Could not load complaints');
    }
  };

  const handleLogout = () => {
    logoutUser();
    setAuthData(null);
    navigate('/login');
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateComplaintStatus(id, newStatus);
      fetchComplaints();
    } catch (err) {
      console.error('❌ Status update failed', err);
      setError('Failed to update status');
    }
  };

  const calculateProgress = () => {
    if (complaints.length === 0) return 0;
    const resolved = complaints.filter(c => c.status === 'Resolved').length;
    return Math.round((resolved / complaints.length) * 100);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Welcome Agent, {authData?.name}</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      <div className="mb-4">
        <h5>📈 Work Progress</h5>
        <ProgressBar now={calculateProgress()} label={`${calculateProgress()}% Resolved`} />
      </div>

      <h4>🛠️ Assigned Complaints</h4>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {complaints.length === 0 ? (
          <p>No complaints assigned yet.</p>
        ) : (
          complaints.map((c) => (
            <div key={c._id} className="col-md-6 mb-4">
              <div className="card shadow">
                <div className="card-body">
                  <h5>{c.title}</h5>
                  <p><strong>Status:</strong> {c.status}</p>
                  <p><strong>Description:</strong> {c.description}</p>
                  <div className="d-flex gap-2">
                    {['Pending', 'In Progress', 'Resolved'].map((status) => (
                      <button
                        key={status}
                        className={`btn btn-sm ${c.status === status ? 'btn-secondary' : 'btn-outline-primary'}`}
                        onClick={() => handleStatusUpdate(c._id, status)}
                        disabled={c.status === status}
                      >
                        Mark {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AgentDashboard;
