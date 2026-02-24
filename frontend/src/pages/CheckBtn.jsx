import React, { useContext, useEffect, useState } from 'react'
import api from '../context/baseURL';
import { AuthContext } from '../context/AuthContext';

export default function CheckBtn() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);


  function getAuthHeader() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) return {};

    const role = user?.role;
    const authType = role === "admin" ? "admin" : "Bearer";

    return {
      Authorization: `${authType} ${token}`,
    };
  }

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
    try {
      const res = await api.get("/api/v1/user/attendance/me", {
        headers: getAuthHeader(),
      });

      console.log("STATUS:", res.data.isCheckedIn);
      setIsCheckedIn(res.data.isCheckedIn);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const handleCheckIn = async () => {
    try {
      const response = await api.post(
        "/api/v1/user/attendance/checkIn",
        {},
        { headers: getAuthHeader() }
      );

      console.log(response.data);
      await getStatus();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const handleCheckOut = async () => {
    try {
      const response = await api.post(
        "/api/v1/user/attendance/logout",
        {},
        { headers: getAuthHeader() }
      );

      console.log(response.data);
      await getStatus();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  return (
    <button
      onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
      className={`btn mb-3 ${
        isCheckedIn ? "btn-danger" : "btn-success"
      }`}
    >
      {isCheckedIn ? "Check Out" : "Check In"}
    </button>
  );
}