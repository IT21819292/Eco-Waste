import React, { useEffect, useState } from "react";

import Admin from "../Admin/Admin";
import Home from "../RequestManage/Home"
import UserApi from "../Api/UserApi";

export default function UserAuth  () {
  const [userData, setUserData] = useState('');
  const [admin, setAdmin] = useState(false);
  const token = window.localStorage.getItem("token");
  

  useEffect(() => {
    fetchUser(token);
  }, [token]);

  const fetchUser = async (token) => {
    if (token) {
      try{
        const res = await UserApi.fetchUserData(token);
        let data = res.data;
        console.log(data);
        localStorage.setItem("userId", data._id);
        localStorage.setItem("userName", data.userName);
        console.log(data._id);
        if (data.isAdmin === true) { // Assuming isAdmin is a boolean
          setAdmin(true);
        }
        setUserData(res.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        alert("Token expired login again");
        localStorage.clear();
        window.location.href = "/";
      }
    }
  };
  
  return admin ? <Admin /> : <Home userData={userData} />;
}