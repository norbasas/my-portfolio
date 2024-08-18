"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Tree {
  xp: number;
  views: number;
  water: number;
  level: number; // Add viewCount property
}

const TreeComponent: React.FC = () => {
  const [tree, setTree] = useState<Tree>({ xp: 0, views: 0, water: 0, level: 0 }); // Add viewCount property

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
  };


  return (
    <>
      <div>
        <p>XP: {tree.xp}</p>
        <p>Views: {tree.views}</p>
        <p>Water Count: {tree.water}</p>
        <p>Level: {tree.level}</p>
        <button onClick={waterTree}>Water the Tree</button>
      </div>
    </>
  );
};

export default TreeComponent;