"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ForestLake from "./ForestLake";
import Rain from "./Rain";
import { Press_Start_2P } from "next/font/google";
import { fetchTreeData } from "@/lib/fetchTreeData";

const font = Press_Start_2P({ weight: "400", subsets: ["latin"] });

interface Tree {
  xp: number;
  views: number;
  water: number;
  level: number;
  xpRequired?: number;
}

const TreeComponent: React.FC = () => {
  const [tree, setTree] = useState<Tree>({
    xp: 0,
    views: 0,
    water: 0,
    level: 0,
    xpRequired: 0,
  }); // Add viewCount property
  const [rain, setRain] = useState(false);
  const [rainIsLoading, setRainIsLoading] = useState(false);

  const fetchTree = async () => {
    const treeData = await fetchTreeData(); 
    if(treeData){
      setTree(treeData);
    }
  };

  const incrementViews = async () => {
    await axios.post("/api/tree/increment-views");
    await fetchTree();
  };

  const event = ({ action, category, label, value }: any) => {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  };
  const waterTree = async () => {
      event({
        action: 'give_water',
        category: 'my_island',
        label: 'Watered the tree',
        value: '1',
      });
    setRainIsLoading(true);
    await axios.post("/api/tree/water");
    await fetchTree();
    setRain(true);
    setRainIsLoading(false);
    setTimeout(() => {
      setRain(false);
    }, 3000);
  };

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [hideText, setHideText] = useState(false);

  const texts = [
    <p key={1}>
      Welcome! Help my virtual island flourish, your every visit and a simple
      act of giving water helps it grow into a vibrant oasis.<sup>1/4</sup>
    </p>,
    <p key={2}>
      Your support isn&apos;t just about visiting—it&apos;s about being part of
      the journey.<sup>2/4</sup>
    </p>,
    <p key={3}>
      Watch the island evolve as you contribute, and don&apos;t forget to share
      the experience with others!<sup>3/4</sup>
    </p>,
    <p key={4}>
      Be part of the journey—watch the island thrive as you explore.
      <sup>4/4</sup>
    </p>,
  ];

  useEffect(() => {
    incrementViews();
  }, []);

  const xpPercent = Math.floor((tree.xp / (tree.xpRequired ?? 1)) * 100);

  return (
    <div className="world-container">
      <Rain show={rain} />
      <div className="forest-info">
        <div className="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        Drag to move around
      </div>
      <div className={`forest-hud ${font.className}`}>
        <div className="status">
          <div className="poke-name">My Island :L{tree.level}</div>

          <div className="poke-bar">
            <h5>EXP:</h5>
            <div className="life-bar">
              <span className="xp">
                {tree.xp?.toFixed(0)} / {tree.xpRequired?.toFixed(0)}
              </span>
              <span
                style={{ width: `${xpPercent}%`, background: "#00aeff" }}
              ></span>
            </div>
          </div>
        </div>
        {!hideText ? (
          <>{texts[currentTextIndex]}</>
        ) : (
          <div className="pkmn pkmn__pikachu"></div>
        )}
        <div className="hud-buttons">
          <button className="hud-water" onClick={waterTree}>
            {rainIsLoading ? "Wait..." : rain ? "Thanks!" : "Give Water"}
          </button>
          <button
            className="hud-control"
            onClick={() => {
              hideText ? setHideText(false) : null;
              currentTextIndex < 3
                ? setCurrentTextIndex(currentTextIndex + 1)
                : setCurrentTextIndex(0);
            }}
          >
            A
          </button>
          <button
            className="hud-control"
            onClick={() => setHideText(!hideText)}
          >
            B
          </button>
        </div>
      </div>
      <ForestLake level={tree.level} />
    </div>
  );
};

export default TreeComponent;
