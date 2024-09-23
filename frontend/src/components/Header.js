import React from "react"
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.token = '';
    localStorage.username ='';
    navigate('/')
  }

     return (
       <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
         <div className="container">
           <a className="navbar-brand" href="/">Hexlet Chat</a>
           {localStorage.username && <button type="button" className="btn btn-primary" onClick={() => logOut()}>Выйти</button>}
           </div>
           </nav>
     )
   }

   export default Header

   