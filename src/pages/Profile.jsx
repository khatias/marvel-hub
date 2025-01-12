import React, { useState, useEffect } from "react";
import styles from "../styles/pages/Profile.module.css";
import Loader from '../components/Loader/Loader'
import Error from '../components/Error/Error'
const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProfileInfo = () => {
    const authToken = localStorage.getItem("authTokenMarvel");

    if (!authToken) {
      setError("No authentication token found.");
      setLoading(false);
      return;
    }

    try {
      fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.id) {
            setProfileData(data);
            setLoading(false);
          } else {
            setError("Failed to fetch profile data.");
            setLoading(false);
          }
        })
        .catch((err) => {
          setError("An error occurred while fetching data.");
          setLoading(false);
        });
    } catch (error) {
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <Error/>;
  }

  return (
    <div className={styles.profileContainer}>
      <h2>Hello, {profileData.firstName}!</h2>

      {profileData ? (
        <div>
          <img
            className={styles.profileImage}
            src={profileData.image}
            alt="Profile"
          />
          
          <p>
            <strong>Name:</strong> {profileData.firstName} {profileData.lastName}
          </p>
          <p>
            <strong>Email:</strong> {profileData.email}
          </p>
          <p>
            <strong>Username:</strong> {profileData.username}
          </p>
          <p>
            <strong>Age:</strong> {profileData.age}
          </p>
          <p>
            <strong>Gender:</strong> {profileData.gender}
          </p>
          <p>
            <strong>Blood Group:</strong> {profileData.bloodGroup}
          </p>
          <p>
            <strong>Phone:</strong> {profileData.phone}
          </p>
          <p>
            <strong>Address:</strong> {profileData.address.address}, {profileData.address.city}, {profileData.address.state}, {profileData.address.postalCode}
          </p>
          <p>
            <strong>University:</strong> {profileData.university}
          </p>
          <p>
            <strong>Company:</strong> {profileData.company.name}, {profileData.company.department}
          </p>
        </div>
      ) : (
        <p>No profile data found.</p>
      )}
    </div>
  );
};

export default Profile;
