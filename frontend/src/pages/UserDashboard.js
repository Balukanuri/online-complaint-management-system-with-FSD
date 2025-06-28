import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserComplaints, submitComplaint } from '../services/complaintService';
import { logoutUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
  const { authData, setAuthData } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await getUserComplaints();
      setComplaints(res);
    } catch (err) {
      console.error('❌ Error fetching complaints', err);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setAuthData(null);
    navigate('/login');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.title || !form.description) {
      setError('Both title and description are required.');
      return;
    }
    try {
      await submitComplaint(form);
      alert('✅ Complaint submitted!');
      setForm({ title: '', description: '' });
      fetchComplaints();
    } catch (err) {
      console.error('❌ Complaint submission failed', err);
      setError('Submission failed. Try again later.');
    }
  };

  const calculateProgress = () => {
    if (complaints.length === 0) return 0;
    const resolved = complaints.filter(c => c.status === 'Resolved').length;
    return Math.round((resolved / complaints.length) * 100);
  };

  const filteredComplaints = complaints
    .filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Welcome, {authData?.name || 'User'}</h3>
        <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
      </div>

      {/* Search and Sort Controls */}
      <div className="card mb-4 shadow-sm p-3">
        <div className="row g-3 align-items-center">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search complaints"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="card mb-4 shadow-sm p-3">
        <h5 className="mb-2">📈 Complaint Resolution Progress</h5>
        <ProgressBar now={calculateProgress()} label={`${calculateProgress()}% Resolved`} />
      </div>

      {/* Submit Complaint */}
      <div className="card mb-4 shadow-sm p-4">
        <h5 className="mb-3">📝 Submit New Complaint</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Complaint Title"
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your issue..."
              rows="4"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit Complaint</button>
        </form>
      </div>

      {/* Complaint List */}
      <div className="card shadow-sm p-4">
        <h5 className="mb-3">📋 Your Complaints</h5>
        {filteredComplaints.length === 0 ? (
          <p className="text-muted">📭 No complaints found.</p>
        ) : (
          <div className="row">
            {filteredComplaints.map((c) => (
              <div key={c._id} className="col-md-6 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{c.title}</h5>
                    <p className="card-text text-muted">Status: <strong>{c.status}</strong></p>
                    <p className="card-text">{c.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
