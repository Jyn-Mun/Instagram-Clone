import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import UserImages from "./userImages";
import axios from "axios";
import Image from "react-graceful-image";
import { Container, Button } from "react-bootstrap";




const UserProfilePage = ({ users }) => {
  const { userId } = useParams()
  const [userImage, setUserImage] = useState([])

  useEffect(() => {

    axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${userId}`)
      .then(result => {
        console.log(result.data)
        setUserImage(result.data)
      })


  }, [])



  return (
    <>
      <Container>
        {users.map((user) => {

          if (user.id == userId) {
            const currentUser = user
            return (
              <div className="w-100" style={{ display: "flex", flexDirection: "row", marginTop: "3em" }}>
                <div className="rounded-circle" style={{ background: "linear-gradient(to right, red, orange,red, purple)", padding: "7px" }}>
                  <img className="rounded-circle" style={{ maxHeight: "6cm", maxWidth: "6cm", objectFit: "contain", border: "5px solid white" }} src={currentUser.profileImage} alt="" />
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ marginLeft: "3em", marginTop: "2em" }}>
                    <h1 style={{ fontWeight: "bold" }}>{currentUser.username}</h1>
                    <p>  {currentUser.username}'s ID: {userId} </p>
                    <Button className="FollowButton">Follow</Button>
                  </div>
                  <div style={{ marginTop: "1.5cm", marginLeft: "3cm" }}>
                    <div style={{ marginLeft: "0.5em" }}>
                      <h1>{userImage.length}</h1>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <h6>Posts</h6>
                    </div>
                  </div>
                  <div style={{ marginTop: "1.5cm", marginLeft: "2cm" }}>
                    <div style={{ marginLeft: "0.5em" }}>
                      <h1>{Math.floor(Math.random() * 1000)}</h1>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <h6>Followers</h6>
                    </div>
                  </div>
                  <div style={{ marginTop: "1.5cm", marginLeft: "2cm" }}>
                    <div style={{ marginLeft: "0.5em" }}>
                      <h1>{Math.floor(Math.random() * 1000)}</h1>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <h6>Following</h6>
                    </div>
                  </div>
                </div>
              </div>

            )
          }
        })}

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'start', flexDirection: "row", marginTop: "2cm", columnCount: "3", marginLeft: "1cm" }}>
          {userImage.map(images => {
            return (
              <div style={{ width: '300px', height: '300px', margin: "1em", backgroundColor: "white", display: "flex", justifyContent: "center", marginRight: "1cm" }}>
                <Image src={images} alt="userImage" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
              </div>
            )
          })}
        </div>

      </Container>
    </>
  )








  // {
  //   users.map(user => {
  //     const userId = user.id;

  //     return (
  //       <>
  //         <Container>
  //           <div className="w-100" style={{ display: "flex", flexDirection: "row", marginTop: "1em" }}>
  //             <img className="rounded-circle" style={{ maxHeight: "6cm", maxWidth: "6cm", objectFit: "contain", marginLeft: "3em" }} src={user.profileImage} alt="" />
  //             <div style={{ marginLeft: "3em", marginTop: "2em" }}>
  //               <h1>{user.username}'s Profile Page</h1>
  //               <p>  {user.username}'s ID: {userId} </p>
  //               <Button className="FollowButton">Follow</Button>
  //             </div>
  //           </div>

  //           <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: "2cm" }}>
  //             {userImage.map(images => {
  //               return (
  //                 <div style={{ width: '300px', height: '300px', margin: "1em", backgroundColor: "white", display: "flex", justifyContent: "center" }}>
  //                   <Image src={images} alt="userImage" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
  //                 </div>
  //               )
  //             })}
  //           </div>

  //         </Container>
  //       </>

  //     )
  //   })
  // }
}

export default UserProfilePage