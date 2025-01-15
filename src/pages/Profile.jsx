import React, { useState, useEffect } from "react";
import styles from "../styles/pages/Profile.module.css";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";
import { fetchProfile } from "../services/auth";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProfileInfo = async () => {
      try {
        const data = await fetchProfile();
        setProfileData(data);
      } catch (err) {
        setError(
          err.message || "An error occurred while fetching the profile."
        );
      } finally {
        setLoading(false);
      }
    };

    getProfileInfo();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className={styles.profilePageWrapper}>
      <div className="container">
        {profileData ? (
          <div className={styles.profileDataContainer}>
            <h2>Hello, {profileData.firstName}!</h2>
            <img
              className={styles.profileImage}
              src={profileData.image}
              alt={`Profile of ${profileData.firstName}`}
            />
            <p>
              <strong>Name:</strong> {profileData.firstName}{" "}
              {profileData.lastName}
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
              <strong>Phone:</strong> {profileData.phone}
            </p>
            <p>
              <strong>Address:</strong> {profileData.address.address},{" "}
              {profileData.address.city}, {profileData.address.state},{" "}
              {profileData.address.postalCode}
            </p>
            <p>
              <strong>University:</strong> {profileData.university}
            </p>
            <p>
              <strong>Company:</strong> {profileData.company.name},{" "}
              {profileData.company.department}
            </p>
          </div>
        ) : (
          <p>No profile data found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
