import api from './api';
import { getToken } from './authService';

// ✅ Admin: Get all complaints
export const getAllComplaints = async () => {
  const token = getToken();
  const res = await api.get('/admins/complaints', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Admin: Get all agents
export const getAllAgents = async () => {
  const token = getToken();
  const res = await api.get('/admins/agents', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Admin: Assign complaint to agent
export const assignComplaintToAgent = async (complaintId, agentId) => {
  const token = getToken();
  const res = await api.post('/admins/assign', {
    complaintId,
    agentId,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};


// ✅ User: Submit complaint
export const submitComplaint = async (data) => {
  const token = getToken();
  const res = await api.post('/complaints', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ User: Get own complaints
export const getUserComplaints = async () => {
  const token = getToken();
  const res = await api.get('/complaints', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Agent: Get assigned complaints
export const getAssignedComplaints = async () => {
  const token = getToken();
  const res = await api.get('/agents/complaints', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateComplaintStatus = async (id, status) => {
  const token = getToken(); // or localStorage.getItem("token")
  const res = await api.put(`/agents/complaints/${id}`, { status }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
