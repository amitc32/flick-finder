// Modal3.js
import React, { useState } from 'react';

const streamingServices = ['Netflix', 'Hulu', 'Disney+', 'Amazon Prime']; // Add more options as needed.

function Modal3({ setModalOpen, setPreferredServices }) {
  // State to hold the selected streaming services
  const [selectedServices, setSelectedServices] = useState([]);

  // Toggle service selection
  const handleServiceToggle = service => {
    setSelectedServices(prevSelection =>
      prevSelection.includes(service)
        ? prevSelection.filter(s => s !== service)
        : [...prevSelection, service]
    );
  };

  // Handle applying the preferences
  const handleApplyClick = () => {
    setPreferredServices(selectedServices);
    setModalOpen(false); // Close the modal
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <h2>Select your preferred streaming services</h2>
        <div>
          {streamingServices.map(service => (
            <label key={service}>
              <input
                type="checkbox"
                checked={selectedServices.includes(service)}
                onChange={() => handleServiceToggle(service)}
              />
              {service}
            </label>
          ))}
        </div>
        <button onClick={handleApplyClick}>Apply</button>
        <button onClick={() => setModalOpen(false)}>Close</button>
      </div>
    </div>
  );
}

export default Modal3;