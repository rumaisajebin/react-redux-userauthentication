import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfileAsync } from "../features/auth/userSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const userId = user.id;

  const [editedUser, setEditedUser] = useState({
    username: user.username,
    email: user.email,
    selectedImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleImageChange = (e) => {
    setEditedUser({ ...editedUser, selectedImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", editedUser.username);
    formData.append("email", editedUser.email);
    if (editedUser.selectedImage) {
      formData.append("profile_pic", editedUser.selectedImage);
    }
    console.log(formData, "formData--->");
    try {
      await dispatch(updateProfileAsync(userId, formData));
      navigate("/profile");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={editedUser.username}
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          type="email"
          name="email"
          placeholder="email"
          value={editedUser.email}
          onChange={handleChange}
        />
        <br />
        <br />
        <img
          src={`http://127.0.0.1:8000/${user.profile}`}
          style={{ height: "70px", width: "auto" }}
        />
        <br />
        <br />
        <input
          type="file"
          accept="image/*"
          name="profile_pic"
          onChange={handleImageChange}
        />
        <br />
        <br />
        {editedUser.selectedImage && (
          <img
            src={URL.createObjectURL(editedUser.selectedImage)}
            style={{ height: "50px", width: "auto" }}
            alt="update image"
          />
        )}
        <br />
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
