import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Reservation from './components/Reservation';
import RootLayout from './components/RootLayout';
function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reservation" element={<Reservation />} />
          {/** move this to Page not found page*/}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App;
