"use client";
import React, { useEffect, useRef, useState } from 'react';
import addTooltip from './addTooltip';
import { Fuggles } from "next/font/google";

const fuggles = Fuggles({ weight: '400', subsets: ["latin"] });

const RandomTextChanger: React.FC = () => {
  const texts = ["Norberto Basas", "Nor Basas", "Norbz", "Pogi", "Cheesetouch"];
  const [currentText, setCurrentText] = useState(texts[0]);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * texts.length);
    setCurrentText(texts[randomIndex]);
  };

  useEffect(() => {
    if (h1Ref.current) {
      addTooltip(h1Ref.current, 'Click to change text');
    }
  }, []);

  return (
    <h1 className={`${fuggles.className} my-name`} ref={h1Ref} onClick={handleClick}>{currentText}</h1>
  );
};

export default RandomTextChanger;