import React, { useEffect, useState } from 'react';
import { getUserComplaints } from '../services/complaintService';

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getUserComplaints();
        setComplaints(data);
      } catch (err) {
        console.error('❌ Failed to load complaints', err);
      }
    };
    fetch();
  }, []);

  return (
    <div className="card p-3">
      <h4 className="mb-3">📋 Your Complaints</h4>
      {complaints.length === 0 ? (
        <p className="text-muted">No complaints yet.</p>
      ) : (
        <div className="list-group">
          {complaints.map((c) => (
            <div key={c._id} className="list-group-item">
              <strong>{c.title}</strong>
              <p className="mb-1">{c.description}</p>
              <span className={`badge bg-${c.status === 'resolved' ? 'success' : c.status === 'in_progress' ? 'warning' : 'secondary'}`}>
                {c.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplaintList;
