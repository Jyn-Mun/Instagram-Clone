import React, { useState } from "react";
import { Button, ModalBody, FormFeedback, Input, Form } from 'reactstrap';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToggleButton } from "react-bootstrap";

toast.configure()

function SignUp({ toggle, setLoggedIn }) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [delay, setDelay] = useState(null);
  const [fullNameValid, setFullNameValid] = useState(true);



  const checkFullName = newFullName => {
    axios
      .get(
        `https://insta.nextacademy.com/api/v1/users/check_name?username=${newFullName}`
      )
      .then(response => {
        if (response.data.valid) {
          setFullNameValid(true);
        } else {
          setFullNameValid(false);
        }
      });
  };

  const handleFullNameInput = e => {
    clearTimeout(delay);
    const newFullName = e.target.value;
    setFullName(newFullName);


    const newDelay = setTimeout(() => {
      checkFullName(newFullName);
    });

    setDelay(newDelay);
  };

  const getInputProp = () => {
    if (!fullName.length) {
      return null;
    }

    if (fullName.length < 5) {
      return { invalid: true };
    }

    if (fullNameValid) {
      return { valid: true };
    } else {
      return { invalid: true };
    }
  };

  const getFormFeedback = () => {
    if (!fullName.length) {
      return null;
    }

    if (fullName.length < 5) {
      return <FormFeedback invalid>Must be at least 5 characters</FormFeedback>;
    }

    if (fullNameValid) {
      return <FormFeedback valid>Sweet! That name is available</FormFeedback>;
    } else {
      return <FormFeedback invalid>Sorry! Username is taken</FormFeedback>;
    }
  };

  const handleEmailInput = e => {
    clearTimeout(delay);
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  const getInputProp2 = () => {
    if (!email.length) {
      return null;
    }

    if (!email.includes("@") || !email.includes(".com")) {
      return { invalid: true };
    }
  };

  const getFormFeedback2 = () => {
    if (!email.length) {
      return null;
    }
    if (!email.includes("@") || !email.includes(".com")) {
      return <FormFeedback invalid>Must be at in the form of name@example.com</FormFeedback>;
    }
  };


  const handleConfirmPassInput = e => {
    clearTimeout(delay);
    const newConfirmPass = e.target.value;
    setConfirmPass(newConfirmPass);
  };

  const getInputPropConfirmPass = () => {
    if (!password.length) {
      return null;
    }

    if (password !== confirmPass) {
      return { invalid: true };
    }
  };

  const getFormFeedbackConfirmPass = () => {
    if (!password.length) {
      return null;
    }
    if (password !== confirmPass) {
      return <FormFeedback invalid>Passwords do not match</FormFeedback>;
    }
  };


  function handleSubmit(e) {
    e.preventDefault()
    if (fullName.length === 0) {
      toast("Fill up your full name")
    }
    else if (email === "") {
      toast("Fill up your email")
    }
    else if (password === "") {
      toast("Fill up your password")
    }
    else {
      console.log(`Your name is ${fullName}, email is ${email}, password is ${password}`)
      axios({
        method: 'POST',
        url: 'https://insta.nextacademy.com/api/v1/users/',
        data: {
          username: fullName,
          email: email,
          password: password
        }
      })
        .then(response => {
          console.log(response)
          toast.success("Sign up successful!")
          toggle()
          localStorage.setItem("jwt", response.data.auth_token)
          setLoggedIn(true)
        })
        .catch(error => {
          console.error(error.response)
          toast.error("Error")
        })

    }

  }

  return (
    <div>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <div class="form-group">
            <label for="contactFormInput1">Full name:</label>
            <Input
              type="text"
              placeholder="John Smith"
              value={fullName}
              onChange={handleFullNameInput}
              {...getInputProp()}
            />
            {getFormFeedback()}
          </div>
          <div class="form-group">
            {/* <label for="contactFormInput2">Email address:</label>
            <input type="email" class="form-control" id="contactFormInput2" placeholder="name@example.com"
              onChange={e => setEmail(e.target.value)} value={email} />
            <form onSubmit={handleSubmit}>
              <div class="form-group"> */}
            <label for="contactFormInput1">Email:</label>
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={handleEmailInput}
              {...getInputProp2()}
            />
            {getFormFeedback2()}
          </div>
          <div class="form-group">
            <label for="contactFormInput2">Password:</label>
            <Input
              type="password"
              class="form-control"
              placeholder="12345678"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="contactFormInput1">Confirm Password:</label>
            <Input
              type="password"
              placeholder="12345678"
              value={confirmPass}
              onChange={handleConfirmPassInput}
              {...getInputPropConfirmPass()}
            />
            {getFormFeedbackConfirmPass()}
          </div>


          <Button type="submit" >Submit</Button>

        </Form>
      </ModalBody >

    </div >
  )
}

export default SignUp;