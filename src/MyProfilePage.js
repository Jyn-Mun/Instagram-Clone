import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { Button, Container, ModalBody, FormFeedback, Input, Form } from 'reactstrap';
import UploadPage from "./UploadPage";
import { Modal } from "react-bootstrap";
import Image from "react-graceful-image";


function MyProfilePage() {
  const jwt = localStorage.getItem("jwt")
  const [myImages, setMyImages] = useState([])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://insta.nextacademy.com/api/v1/images/me",
      headers: { Authorization: `Bearer ${jwt}` }
    })
      .then(response => {
        console.log(response)
        console.log(response.data)
        const myImagesCopy = [...response.data]
        setMyImages(myImagesCopy)
      })
      .catch(error => {
        console.error(error.response)
      })
  }, [])
  console.log(myImages)

  return (
    <>
      <Container>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'start', flexDirection: "row", marginTop: "2cm", columnCount: "3", marginLeft: "1cm" }}>
          {myImages.map((image, index) => {
            return (
              <div style={{ width: '300px', height: '300px', margin: "1em", backgroundColor: "white", display: "flex", justifyContent: "center", marginRight: "1cm" }}>
                <Image key={index} src={image} alt="myImage" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
              </div>
            )
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "2cm" }}>
          <button className="logInBtn" onClick={handleShow}>
            Upload Image
      </button>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <UploadPage />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Container>

    </>

  )

}

export default MyProfilePage
