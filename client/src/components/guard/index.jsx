import React from "react";
import { useSelector } from "react-redux";
import { selectIsUserConnected } from "../../slices/userSlice";
import { Navigate, Outlet } from "react-router-dom";


const Guard = () =>{
  const isConnected = useSelector(selectIsUserConnected)

  //recuperer l'utilisateur et verifier le token
  return isConnected ? <Outlet /> : <Navigate  to="/login" />;
};

export default Guard
