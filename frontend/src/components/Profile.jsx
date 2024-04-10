// Profile.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync } from '../features/action/logout_action';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, loading, error } = useSelector((state) => state.loginUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logout performed");
    if (user && user.id) {
      console.log("user ID:", user.id);
      dispatch(logoutAsync(user.id));
      navigate('/login');
    } else {
      console.log("User ID not available");
    }
  };
  

  return (
    <div className="container">
      <div className="welcome-box">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : user ? (
          <>
            <h1>Profile</h1>
            <h2>Welcome {user.username} </h2>
            <h2>ID {user.id} </h2>
            <h2>Username: {user.username}</h2>
            <h2>Email: {user.email}</h2>
            <button onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <p>Please log in to view your profile.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
