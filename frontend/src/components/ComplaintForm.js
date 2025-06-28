import React, { useState } from 'react';
import { submitComplaint } from '../services/complaintService';

const ComplaintForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitComplaint({ title, description, status });
      setSuccess('Complaint submitted!');
      setTitle('');
      setDescription('');
      setStatus('');
    } catch (err) {
      console.error('❌ Complaint submission failed:', err);
    }
  };

  return (
    <div className="card p-3 mb-4">
      <h4 className="mb-3">📝 Submit New Complaint</h4>
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Title</label>
          <input
            className="form-control"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Issue title"
          />
        </div>
        <div className="mb-2">
          <label>Description</label>
          <textarea
            className="form-control"
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue"
          ></textarea>
        </div>
        <div className="mb-3">
          <label>Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">-- Select Status --</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        <button className="btn btn-success w-100" type="submit">Submit Complaint</button>
      </form>
    </div>
  );
};

export default ComplaintForm;
