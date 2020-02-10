import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { Link, Route } from "react-router-dom";
import SignUp from "./SignUpHere"

function ModalTing() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)


  return (
    <>




      <Route path="/signUp">
        <SignUp />
      </Route>



    </>



  );
}

export default ModalTing;