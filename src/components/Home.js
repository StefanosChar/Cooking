import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// Example food images
const carouselImages = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
  'https://images.unsplash.com/photo-1550547660-d9450f859349',
  'https://images.unsplash.com/photo-1502741338009-cac2772e18bc'
];

const Home = ({ auth }) => (
  <div className="bg-light min-vh-100 d-flex flex-column">
    <NavBar auth={auth} />

    <main
      className="flex-grow-1 d-flex align-items-center justify-content-center position-relative"
      style={{ minHeight: 'calc(100vh - 56px)' }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          zIndex: 0,
          width: '100',
          height: '100',
          overflow: 'hidden'
        }}
      >
        <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      interval={4000}
      transitionTime={800}
      stopOnHover={false}
      swipeable={false}
      emulateTouch={false}
      dynamicHeight={false}
      width="100vw"
      className="h-100"
    >
      {carouselImages.map((img, idx) => (
        <div
          key={img}
          style={{
            width: "100vw",
            height: "100vh",
            maxHeight: "100vh",
            overflow: "hidden",
            position: "relative"
          }}
        >
          <img
            src={img}
            alt={`Food ${idx + 1}`}
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
              filter: "brightness(0.6) blur(1.5px)",
              position: "absolute",
              top: 0,
              left: 0
            }}
          />
        </div>
      ))}
    </Carousel>
      </div>
      <div
        className="text-center position-absolute top-50 start-50 translate-middle"
        style={{ zIndex: 2, width: "100vw", pointerEvents: "none" }}
      >
        <h1 className="display-4 fw-bold text-white text-shadow">Καλώς ήρθατε στο CookBook</h1>
        <p className="lead mb-4 text-white text-shadow">
          Ανακάλυψε, μοιράσου και απόλαυσε νόστιμες συνταγές από την κοινότητά μας.
        </p>
        <div style={{ pointerEvents: "auto" }}>
        </div>
      </div>
    </main>
    <style>{`
      .text-shadow {
        text-shadow: 0 2px 8px rgba(0,0,0,0.5);
      }
    `}</style>
  </div>
);

export default Home;
