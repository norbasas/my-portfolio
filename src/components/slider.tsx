"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Slide {
  title: string;
  description: string;
  image: string;
}

interface SliderProps {
    slides: Slide[];
    interval?: number; // Interval in milliseconds for autoplay
  }
  
  const Slider: React.FC<SliderProps> = ({ slides, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (slides.length > 1) {
      const autoplay = setInterval(nextSlide, interval);
      return () => clearInterval(autoplay); // Clear interval on component unmount
    }
  }, [currentIndex, interval, slides.length]);
  return (
    <div className="slider-container">
      <div className="slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
          >
            <Image width={760} height={315} src={slide.image} alt={slide.title} />
            <div className="slide-content">
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
      {slides.length > 1 && (
          <button className="next-slide" onClick={nextSlide}>
        See More{' '}
        <svg xmlns="http://www.w3.org/2000/svg" style={{pointerEvents: 'none'}} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
      )}

      <style jsx>{`
        .slider-container {
          position: relative;
          height: 100%;
          width: 100%;
          max-width: 800px;
          margin: auto;
          overflow: hidden;
        }
        .slider {
          display: flex;
          transition: transform 0.5s ease-in-out;
          transform: translateX(${currentIndex * -100}%);
          height: 100%;
        }
        .slide {
          min-width: 100%;
          transition: opacity 0.5s ease-in-out;
          opacity: 0;
          position: relative;
          display: flex;
        }
        .slide::after {
            content: '';
            display: block;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            position: absolute;
            background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
        }
        .slide.active {
          opacity: 1;
        }
        .slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .slide-content {
          position: absolute;
          bottom: 15px;
          left: 0px;
          padding: 12px;
          color: #fff;
          display: flex;
          justify-content: flex-end;
          width: 100%;
          z-index: 1;
        }
        .next-slide {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #ffffffc9;
          color: #000;
          border: none;
          padding: 6px 10px;
          cursor: pointer;
          display: flex;
          font-size: 11px;
          border-radius: 5px;
        }
        
      `}</style>
    </div>
  );
};

export default Slider;
