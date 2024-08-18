"use client";
import { useState } from 'react';
import Image from 'next/image';

interface HoverImageProps {
  images: string[];
  alt: string;
  width: number;
  height: number;
}

const HoverImage: React.FC<HoverImageProps> = ({ images, alt, width, height }) => {
  const [currentImage, setCurrentImage] = useState(images[0]);

  const handleMouseEnter = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImage(images[randomIndex]);
  };

  return (
    <div onMouseEnter={handleMouseEnter} className='hover-images-container'>
      <Image src={currentImage} alt={alt} width={width} height={height} />
    </div>
  );
};

export default HoverImage;
