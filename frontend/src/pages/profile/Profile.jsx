import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { FiEdit2 } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";
import {
  getProfilePicture,
  uploadProfilePicture,
  getUserDetails,
} from "../../apis/Api";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  // Fetch user profile data and profile image
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      if (!token) {
        toast.error("No token found. Redirecting to login...");
        navigate("/login");
        return;
      }

      // Fetch user details from backend
      const userDetails = await getUserDetails(token);
      setUserData(userDetails);

      // Fetch profile picture URL
      const profileImageUrl = await getProfilePicture(token);
      setProfileImage(profileImageUrl);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to fetch profile. Redirecting to login...");
      navigate("/login");
    }
  };

  // Handle profile picture upload
  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No token found. Redirecting to login...");
        navigate("/login");
        return;
      }

      const response = await uploadProfilePicture(formData, token);
      setProfileImage(response.profileImageUrl);
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error("Failed to upload profile picture.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  // Render password modal
  const renderPasswordModal = () => (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => setShowPasswordModal(false)}>
          &times;
        </span>
        <h2>Change Password</h2>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          type="submit"
          onClick={() =>
            toast.info("Change password feature pending implementation.")
          }
        >
          Submit
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="background">
        <img src="/profile_back.jpg" alt="Background" className="bg-image" />

        <div className="profile-container">
          <div className="profile-avatar">
            <img
              src={profileImage || "/default-avatar.jpg"} // Fallback to default avatar
              alt="Avatar"
              className="avatar-image"
            />
            <div
              className="edit-icon"
              onClick={() => fileInputRef.current.click()} // Trigger file input on click
            >
              <FiEdit2 size={20} />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef} // Hidden input for file upload
              onChange={handleProfilePictureUpload}
              style={{ display: "none" }} // Hide the file input
            />
          </div>
          <div className="profile-details">
            <h2>{userData.username || "Username not available"}</h2>
            <p>{userData.email || "Email not available"}</p>
            <h1>Your Subscription Plan: {userData.plan || "Free"}</h1>
            <p>Expires on: {userData.expiryDate || "N/A"}</p>
          </div>
          <button
            className="btn btn-warning"
            onClick={() => setShowPasswordModal(true)}
          >
            Change Password
          </button>

          <button
            className="btn btn-info mt-3"
            onClick={() => navigate("/history")} // Navigate to the history page
          >
            View History
          </button>

          {showPasswordModal && renderPasswordModal()}
        </div>
      </div>
    </>
  );
};

export default Profile;
