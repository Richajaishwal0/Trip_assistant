import { useEffect } from 'react'
import axios from 'axios';
import { useToken } from '../context/TokenProvider';
import Navigation from "../components/Navigation";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const Auth = () => {
  const naviagate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const path = queryParams.get('path') || 'login'; // Default to 'login
  const { isLoggedin } = useToken();

  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");
    if (!isLoggedin) {
      naviagate(`/${path}`);
    }

    axios.get('http://localhost:5000/api/users/verifyToken', {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    }).then((res) => {
      console.log("Token verification response");
      if (res.data.success) {
        naviagate("/places");
      } else {
        naviagate(`/${path}`);
      }
    }
    ).catch((err) => {
      console.error("Token verification error:", err);
      naviagate(`/${path}`);
    });

  }, [])

  return (
    <>
      <Navigation />
    </>
  )
}

export default Auth;
