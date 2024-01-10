import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Reservation from './components/Reservation';
import RootLayout from './components/RootLayout';
import { ReservationContextProvider } from './components/Reservation/ReservationProvider';
function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/reservation"
            element={
              <ReservationContextProvider>
                <Reservation />
              </ReservationContextProvider>
            }
          />
          {/** move this to Page not found page*/}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App;
