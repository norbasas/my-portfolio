"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ForestLake from './ForestLake';
import Rain from './Rain';

interface Tree {
  xp: number;
  views: number;
  water: number;
  level: number;
  xpRequired?: number;
}

const TreeComponent: React.FC = () => {
  const [tree, setTree] = useState<Tree>({ xp: 0, views: 0, water: 0, level: 0, xpRequired: 0 }); // Add viewCount property
  const [rain, setRain] = useState(false);

  const fetchTree = async () => {
    const response = await axios.get('/api/tree');
    console.log(response.data, 'response.data-----------');
    setTree(response.data);
  };

  const incrementViews = async () => {
    await axios.post('/api/tree/increment-views');
    setTree(prevTree => ({
      ...prevTree,
      xp: prevTree.xp + 2, // 1 view = 2 XP
      views: prevTree.views + 1,
    }));
    fetchTree();
  };

  useEffect(() => {
    incrementViews();
  }, []);

  const waterTree = async () => {
    await axios.post('/api/tree/water');
    setTree(prevTree => ({
      ...prevTree,
      xp: prevTree.xp + 5, // 1 water = 5 XP
      water: prevTree.water + 1 // Increment waterCount
    }));
    fetchTree();
    setRain(true);
    setTimeout(() => {
      setRain(false);
    }, 3000);
  };


  return (
    <div className='world-container'>
        <Rain show={rain} />
        <div className='forest-info'>
        <p>XP: {tree.xp} / {tree.xpRequired} </p>
        <p>Water Received: {tree.water}</p>
        <p>Island Level: {tree.level}</p>
        <button onClick={waterTree}>Water the Tree</button>
        </div>
        <ForestLake level={tree.level}/>
    </div>
  );
};

export default TreeComponent;