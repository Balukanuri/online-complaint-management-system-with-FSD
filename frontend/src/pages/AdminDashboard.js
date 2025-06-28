import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  getAllComplaints,
  getAllAgents,
  assignComplaintToAgent
} from '../services/complaintService';
import { logoutUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const AdminDashboard = () => {
  const { authData, setAuthData } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedAgents, setSelectedAgents] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [complaintRes, agentRes] = await Promise.all([
          getAllComplaints(),
          getAllAgents()
        ]);
        setComplaints(complaintRes);
        setAgents(agentRes);
      } catch (err) {
        console.error('❌ Admin data fetch error:', err);
      }
    };
    fetchData();
  }, []);

  const handleAssign = async (complaintId) => {
    const agentId = selectedAgents[complaintId];
    if (!agentId) return alert('❗ Select an agent first');

    try {
      await assignComplaintToAgent(complaintId, agentId);
      alert('✅ Complaint assigned!');
      const updated = await getAllComplaints();
      setComplaints(updated);
      setSelectedAgents((prev) => ({ ...prev, [complaintId]: '' }));
    } catch (err) {
      console.error('❌ Assignment failed', err);
    }
  };

  const handleAgentSelect = (complaintId, agentId) => {
    setSelectedAgents((prev) => ({ ...prev, [complaintId]: agentId }));
  };

  const handleLogout = () => {
    logoutUser();
    setAuthData(null);
    navigate('/login');
  };

  const filteredComplaints = complaints.filter((c) =>
    (c.title && c.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (c.user?.name && c.user.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const statusData = [
    { name: 'Pending', value: complaints.filter(c => c.status === 'Pending').length },
    { name: 'In Progress', value: complaints.filter(c => c.status === 'In Progress').length },
    { name: 'Resolved', value: complaints.filter(c => c.status === 'Resolved').length },
  ];

  const COLORS = ['#f94144', '#f8961e', '#43aa8b'];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Welcome Admin, {authData?.name}</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary shadow">
            <div className="card-body">
              <h5>Total Complaints</h5>
              <h3>{complaints.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success shadow">
            <div className="card-body">
              <h5>Resolved</h5>
              <h3>{complaints.filter(c => c.status === 'Resolved').length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning shadow">
            <div className="card-body">
              <h5>In Progress</h5>
              <h3>{complaints.filter(c => c.status === 'In Progress').length}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4 shadow">
        <div className="card-body">
          <h5 className="card-title">Complaint Status Overview</h5>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {statusData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <input
        type="text"
        placeholder="🔍 Search by title or user..."
        className="form-control mb-3"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <h4>📋 All Complaints</h4>
      <div className="row">
        {filteredComplaints.map((c) => (
          <div key={c._id} className="col-md-6 mb-4">
            <div className="card shadow">
              <div className="card-body">
                <h5>{c.title}</h5>
                <p><strong>Status:</strong> {c.status}</p>
                <p><strong>Description:</strong> {c.description || 'No description'}</p>
                <p><strong>User:</strong> {c.user?.name} ({c.user?.email})</p>
                <p><strong>Assigned To:</strong> {c.assignedTo?.name || '❌ None'}</p>

                <select
                  className="form-select mb-2"
                  value={selectedAgents[c._id] || ''}
                  onChange={(e) => handleAgentSelect(c._id, e.target.value)}
                >
                  <option value="">-- Select Agent --</option>
                  {agents.map((a) => (
                    <option key={a._id} value={a._id}>
                      {a.name} ({a.email})
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAssign(c._id)}
                >
                  Assign to Agent
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
