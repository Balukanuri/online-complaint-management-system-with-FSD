import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <aside style={{ width: '200px', background: '#eee', padding: '1rem' }}>
      {user.role === 'user' && <Link to="/UserDashboard/user">User Dashboard</Link>}
      {user.role === 'agent' && <Link to="/AgentDashboard/agent">Agent Dashboard</Link>}
      {user.role === 'admin' && <Link to="/AdminDashboard/admin">Admin Dashboard</Link>}
    </aside>
  );
};

export default Sidebar;
