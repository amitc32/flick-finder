import React, { useState } from 'react';
import './EditUserInfo.css';

function EditUserInfo() {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [oldDisplayName, setOldDisplayName] = useState('');
  const [newDisplayName, setNewDisplayName] = useState('');
  const [confirmNewDisplayName, setConfirmNewDisplayName] = useState('');
  const [notifications, setNotifications] = useState(false);

  const handleChangePasswordSubmit = async () => {
    // API call to change the password
    // Construct the payload
    const payload = {
      userID: username,
      old: oldPassword,
      newp: newPassword,
      confirmPassword: confirmNewPassword
    };
    console.log('Submitted Password Change:', { oldPassword, newPassword, confirmNewPassword });
    try {
      const response = await fetch('http://localhost:3004/api/flickfinder/updatePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }

      const data = await response.json();
      console.log('Password Update Response:', data);
      alert('Password updated successfully!'); // Alert or set a success message in state
    } catch (error) {
      console.error('Password Update Error:', error);
      alert(error.message); // Alert oSr set an error message in state
    }
    console.log('Submitting Password Change:', payload);
  };



  const handleChangeDisplayNameSubmit = async () => {
   // API call to change the password
    // Construct the payload
    const payload = {
        userID: username,
        old: oldDisplayName,
        newd: newDisplayName,
        confirmDisplay: confirmNewDisplayName
      };
      console.log('Submitted Password Change:', { oldDisplayName, newDisplayName, confirmNewDisplayName });
      try {
        const response = await fetch('http://localhost:3004/api/flickfinder/updateDisplay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
  
        if (!response.ok) {
          const message = await response.text();
          throw new Error(message);
        }
  
        const data = await response.json();
        console.log('Display Name Update Response:', data);
        alert('Display Name updated successfully!'); // Alert or set a success message in state
      } catch (error) {
        console.error('Display Name Update Error:', error);
        alert(error.message); // Alert or set an error message in state
      }
      console.log('Submitting Display Name Change:', payload);
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
    // API call to toggle notifications
    console.log('Notifications:', notifications ? 'On' : 'Off');
  };

  return (
    <div className="edit-user-container">
      <div className="edit-section">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div className="edit-section">
        <h3>Change Password:</h3>
        <input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <input type="password" placeholder="Confirm New Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
        <button onClick={handleChangePasswordSubmit}>Submit</button>
      </div>

      <div className="edit-section">
        <h3>Edit Display Name:</h3>
        <input type="text" placeholder="Old Display Name" value={oldDisplayName} onChange={(e) => setOldDisplayName(e.target.value)} />
        <input type="text" placeholder="New Display Name" value={newDisplayName} onChange={(e) => setNewDisplayName(e.target.value)} />
        <input type="text" placeholder="Confirm New Display Name" value={confirmNewDisplayName} onChange={(e) => setConfirmNewDisplayName(e.target.value)} />
        <button onClick={handleChangeDisplayNameSubmit}>Submit</button>
      </div>

      <div className="edit-section">
        <h3>Notifications:</h3>
        <label className="switch">
          <input type="checkbox" checked={notifications} onChange={toggleNotifications} />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}

export default EditUserInfo;
