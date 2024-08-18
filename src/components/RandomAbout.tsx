"use client";

import React, { useState, useEffect } from 'react';

const textOptions = [
  "Frontend developer and designer with a passion for creating responsive and visually stunning web applications using React, SCSS, and Tailwind. When I’m not coding, you can find me immersed in manga and manhwa, watching streams, or playing Dota and mobile games. Always eager to learn, I stay updated on the latest tech trends.",
  "As a frontend developer, I blend design and development to build engaging, user-friendly interfaces with tools like Figma, Adobe Suite, and React. In my downtime, I enjoy reading manga, catching up on manhwa, and watching streams. I’m also a Dota and mobile gaming enthusiast who loves staying informed about the latest in tech.",
  "Creative and technically skilled(?) frontend developer with expertise in React, SCSS, and Tailwind. My work is driven by a love for design and an obsession with detail. Outside of work, I’m a manga and manhwa reader, stream-watcher, and avid gamer, always exploring the latest in tech.",
  "Developer by day, designer by heart, I use my skills in React, Next.js, and TypeScript to craft exceptional web experiences. Beyond the screen, I’m into manga, manhwa, Dota, and mobile games. I’m also keen on reading up on the latest tech advancements to keep my skills sharp.",
  "Combining frontend development and design, I create beautiful, responsive applications with React, SCSS, and Tailwind. My passion for tech extends to my hobbies—whether it’s reading manga, watching streams, playing games, or diving into the latest tech articles."
];

const getRandomText = () => {
    const randomIndex = Math.floor(Math.random() * textOptions.length);
    return textOptions[randomIndex];
  };

const RandomAbout = () => {
    const [text, setText] = useState('');
    useEffect(() => {
        setText(getRandomText());
      }, []);

  return <p>{text}</p>;
};

export default RandomAbout;