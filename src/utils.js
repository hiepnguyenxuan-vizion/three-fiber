import * as THREE from "three";
window.Vector3 = THREE.Vector3;

export const get2DScreenPosition = (coord, camera, width, height) => {
  if (!(coord && camera && width && height)) {
    return {
      visible: false,
      x: -1000,
      y: -1000,
    };
  }
  const hpLocation = new THREE.Vector3(coord.x, coord.y, coord.z);
  const vector = hpLocation.project(camera);
  return {
    visible: Math.abs(vector.z) <= 1,
    x: ((vector.x + 1) / 2) * width,
    y: (-(vector.y - 1) / 2) * height,
  };
};

export const distanceBetween2dCoordinates = (
  coord1 = { x: 0, y: 0 },
  coord2 = { x: 0, y: 0 }
) => {
  const xDiff = Math.abs(coord1.x - coord2.x),
    yDiff = Math.abs(coord1.y - coord2.y);
  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
};

export const getCamCoordFromOrientation = (x, y, z) => {
  let vector = new THREE.Vector3(x, y, z);
  vector.normalize();
  vector.multiplyScalar(-10);
  const camCoordinates = [vector.x, vector.y, vector.z];
  console.log(x, y, z, camCoordinates);
  return camCoordinates;
};
