import React from 'react';
import { useGLTF } from '@react-three/drei';

type ModelProps = {
  path: string;
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
};

const Model: React.FC<ModelProps> = ({
  path,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
}) => {
  const { scene } = useGLTF(path);
  return (
    <primitive
      object={scene}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  );
};

export default Model;
