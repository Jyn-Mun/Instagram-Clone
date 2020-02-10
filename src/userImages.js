import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from "react-graceful-image";




function UserImages({ userId }) {
  const [images, setImages] = useState([])


  useEffect(() => {
    axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${userId}`)

      .then(result => {
        setImages(result.data)
      })
      .catch(error => {
        console.log('ERROR: ', error)
      })
  }, []);


  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {images.map(images => {
        return (
          <Image src={images} alt="user images" style={{ height: "200px", margin: "10px", border: "2px white solid" }} />
        )
      })}
    </div>
  )
}


export default UserImages;