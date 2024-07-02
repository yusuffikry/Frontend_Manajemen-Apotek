import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children, roles }) => {
  const isAuthenticated = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [redirect, setRedirect] = useState(false);

  // const currentPath = window.location.pathname;

  // if (!isAuthenticated && (currentPath.startsWith('/admin') || currentPath.startsWith('/user'))) {
  //   return <Navigate to="/login" replace />;
  // }

  // const currentPath = window.location.pathname;
  // console.log(isAuthenticated)

  // console.log(isAuthenticated)

  // console.log(user.role)
  // console.log(user.role == roles)
  // console.log(roles)


  if (!isAuthenticated) {
    // console.log("tes");
    return <Navigate to="/login" replace />;

  }

  if (roles && roles !== user.role) {
    // Jika pengguna tidak memiliki peran yang diperlukan
    // alert('Anda tidak memiliki akses ke halaman ini. Anda akan diarahkan ke halaman login.');
    return <Navigate to="/login" replace />
  }

  // useEffect(() => {
  //   if (!user) {
  //     setRedirect(true);
  //   } else if (roles && roles !== user.role) {
  //     alert('Anda tidak memiliki akses ke halaman ini. Anda akan diarahkan ke halaman login.');
  //     setRedirect(true);
  //   }
  // }, [redirect, user, roles]);

  // if (redirect) {
  //   return <Navigate to="/login" replace />;
  // }


  return children

};

export default ProtectedRoute;