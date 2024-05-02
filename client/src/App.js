import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Import your other page components
import AddTruck from './pages/AddTruck';
import AssignTruck from './pages/AssignTruck';
import Maintenance from './pages/Maintenance';
import ViewRequests from './pages/ViewRequests';
import MaintenanceSummary from './pages/MaintenanceSummary';
import AssignTruckForm from './pages/AssignTruckForm';
import Dashboard from './pages/Dashboard';
import EditTruck from './pages/EditTruck';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        
        <div style={{ flex: '1' }}>
          <Routes>
            <Route path="/add-truck" element={<AddTruck />} />
            <Route path="/assign-truck" element={<AssignTruck />} />
            <Route path="/assign-truck-form" element={<AssignTruckForm />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/maintenance-summary" element={<MaintenanceSummary />} />
            <Route path="/view-requests" element={<ViewRequests />} />
            <Route path="/assign-truck/:id" element={<AssignTruckForm />} />
            <Route path="/edit-truck/:id" element={<EditTruck />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
