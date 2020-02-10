import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import UserImages from "./userImages";
import CarouselImages from "./carousel"
import { Link } from "react-router-dom"



function Homepage({ users }) {
  return (


    < div >

      <ul>
        {users.map(user => {
          const userId = user.id;
          return (
            <>
              <Container>
                <Row>
                  <Col md={12} style={{ border: "3px black solid", marginTop: "1cm", width: "28cm", backgroundColor: "pink" }}>
                    <Row>
                      <Col md={4} style={{ fontSize: "2cm", color: "white", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "0.3cm" }}>
                        <Link to={`/user/${userId}`}>
                          {user.id}.{user.username}</Link>
                        <img style={{ borderRadius: "100%", border: "2px solid white", maxWidth: "300px", margin: "10px", marginBottom: "1cm" }} src={user.profileImage} alt="" />
                      </Col>
                      <Col md={8} className="d-flex flex-row flex-wrap">
                        <UserImages userId={userId} />
                        {/* <CarouselImages userId={userId} /> */}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </>
          )
        })}
      </ul>
    </div >
  )
}

export default Homepage;