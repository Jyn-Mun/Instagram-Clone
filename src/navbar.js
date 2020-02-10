import React, { useState } from 'react';
import SignUp from "./SignUpHere"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Input,
  Form
} from 'reactstrap';
import { Link, Route } from "react-router-dom"

import { Modal, Button, ModalFooter } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import { toast } from 'react-toastify';
import axios from "axios";
import MyProfilePage from "./MyProfilePage"


const Example = ({ loggedIn, setLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modal, setModal] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [fullName, setFullName] = useState("")
  const [password, setPassword] = useState("");

  function handleSubmit(e) {

    e.preventDefault()
    console.log(`Your name is ${fullName}, password is ${password}`)
    axios({
      method: 'POST',
      url: 'https://insta.nextacademy.com/api/v1/login',
      data: {
        username: fullName,
        password: password
      }
    })
      .then(response => {
        console.log(response)
        toast.success("Welcome Back", { position: "top-center" })
        toggle()
        localStorage.setItem("jwt", response.data.auth_token)
        setLoggedIn(true)
      })
      .catch(error => {
        console.error(error.response)
        toast.error("Error")
      })


  }


  return (

    <div>
      <Navbar style={{ backgroundColor: "lavenderblush" }} light expand="md">
        <NavbarBrand className="Nextagram" href="https://www.instagram.com/jynmun/" style={{ color: "hotpink", fontWeight: "bold" }}>Nextagram</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className="Homepage" tag={Link} to="/" style={{ color: "deeppink" }}>Homepage</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="About" href="http://127.0.0.1:5500/indexBootstrapCSS.html" style={{ color: "deeppink" }}>About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="MyProfilePage" tag={Link} to="/profile" style={{ color: "deeppink" }}>Profile</NavLink>
            </NavItem>
            <UncontrolledDropdown className="Dropdown" nav inNavbar>
              <DropdownToggle nav caret style={{ color: "deeppink" }}>
                Options
              </DropdownToggle>
              <DropdownMenu right style={{ backgroundColor: "lavenderblush" }}>
                <DropdownItem style={{ color: "deeppink" }}>
                  Option 1
                </DropdownItem>
                <DropdownItem style={{ color: "deeppink" }}>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem style={{ color: "deeppink" }}>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText style={{ color: "deeppink" }}>Created by Jyn-Mun</NavbarText>
        </Collapse>

        {!loggedIn ? (<button className="logInBtn" style={{ marginLeft: "1em" }} onClick={handleShow}>
          LOGIN
      </button>) : (<button style={{ marginLeft: "1em", borderRadius: "10%", backgroundColor: "lavenderblush", color: "pink", border: "0" }} onClick={() => setLoggedIn(!loggedIn), localStorage.removeItem("jwt")} >Logged in</button>)}

      </Navbar >

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>


        {
          isLogin ? (
            <>
              <Modal.Body >
                <Form onSubmit={handleSubmit}>
                  <div class="form-group">
                    <label><b>Username</b></label>
                    <Input style={{ marginLeft: "1em" }} type="text" placeholder="Enter Username" onChange={e => setFullName(e.target.value)} value={fullName} />
                  </div>
                  <br></br>
                  <div class="form-group">
                    <label><b>Password</b></label>
                    <Input style={{ marginLeft: "1em" }} type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} value={password} />
                  </div>
                  <br />
                  <Button type="submit" style={{ borderRadius: "10%" }}>Submit</Button>
                </Form>
              </Modal.Body >

            </>) :
            (<SignUp loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

            )
        }

        <ModalFooter>
          {
            isLogin ? <p>New member? <Link onClick={() => setIsLogin(!isLogin)}>Sign Up</Link> </p> : <Button onClick={() => setIsLogin(!isLogin)}>Log In</Button>
          }
          <Button onClick={handleClose}> Close</Button>
        </ModalFooter>


      </Modal >
    </div >






  );
}

export default Example;