import React, { useState, useEffect } from 'react';
import axios from "axios";
import LoadingIndicator from './Spinner';
import SignUp from "./SignUpHere"
import Homepage from './Homepage'
import Navbar from './navbar'
import { Link, Route } from "react-router-dom"
import UserProfilePage from "./UserProfilePage"
import "./App.css"
import MyProfilePage from "./MyProfilePage"
import { Container } from "reactstrap"


function App() {

  const [isLoading, setIsLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("jwt") !== null)

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "Blake",
      profileImage:
        "http://next-curriculum-instagram.s3.amazonaws.com/idol2-blake.jpg"
    },
    {
      id: 2,
      username: "RyanG",
      profileImage:
        "http://next-curriculum-instagram.s3.amazonaws.com/idol1-ryan.jpg"
    },
    {
      id: 3,
      username: "BigFan",
      profileImage:
        "http://next-curriculum-instagram.s3.amazonaws.com/bigfan-9AE7468E-4C35-41D1-AA68-31939891B5E1.png"
    }
  ]);

  useEffect(() => {
    // performing a GET request
    axios.get("https://insta.nextacademy.com/api/v1/users")

      .then(result => {
        console.log(result.data)
        setUsers(result.data)
        setIsLoading(false)
      })
      .catch(error => {
        console.log('ERROR: ', error)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <LoadingIndicator />
  } else {
    return (
      <>
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Route exact path="/">
          <Homepage users={users} />
        </Route>
        <Route path="/user/:userId">
          <UserProfilePage users={users} />
        </Route>
        <Route exact path="/profile" >
          <MyProfilePage />
        </Route>
      </>
    );
  };


}

export default App;