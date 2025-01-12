import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeliveryDetails from './DeliveryDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/welcome/:userId" element={<DeliveryDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
