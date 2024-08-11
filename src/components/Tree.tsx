"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TreeComponent = () => {
  const [tree, setTree] = useState({ height: 0, width: 0, growth: 0, views: 0 });

  const fetchTree = async () => {
    const response = await axios.get('/api/tree');
    setTree(response.data);
  };

  const incrementViews = async () => {
    await axios.post('/api/tree/increment-views');
    fetchTree();
  };

  useEffect(() => {
    incrementViews();
  }, []);

  const waterTree = async () => {
    await axios.post('/api/tree/water');
    fetchTree();
  };

  return (
    <div>
      <div>
        <p>Height: {tree.height} cm</p>
        <p>Width: {tree.width} cm</p>
        <p>Growth: {tree.growth} cm</p>
        <p>Views: {tree.views}</p>
        <button onClick={waterTree}>Water the Tree</button>
      </div>
    </div>
  );
};

export default TreeComponent;