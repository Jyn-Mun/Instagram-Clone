import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';


function CarouselImages({ userId }) {
  const [images, setImages] = useState([])
  const Example = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }

    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    }

    useEffect(() => {
      axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${userId}`)

        .then(result => {
          setImages(result.data)
        })
        .catch(error => {
          console.log('ERROR: ', error)
        })
    }, []);

    const slides = images.map((image) => {
      return (
        <CarouselItem className="custom-tag" tag="div" key="userId" onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)}>
        </CarouselItem>
      )
    }
    )


    return (
      <div>
        <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}
        >
          <CarouselIndicators images={images} activeIndex={activeIndex} onClickHandler={goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
      </div>
    );


  }
}

export default CarouselImages;