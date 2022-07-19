import img1 from "../../images/box1/px_1.jpg";
import img2 from "../../images/box1/nx_1.jpg";
import img3 from "../../images/box1/py_1.jpg";
import img4 from "../../images/box1/ny_1.jpg";
import img5 from "../../images/box1/pz_1.jpg";
import img6 from "../../images/box1/nz_1.jpg";

import img7 from "../../images/box2/px_2.jpg";
import img8 from "../../images/box2/nx_2.jpg";
import img9 from "../../images/box2/py_2.jpg";
import img10 from "../../images/box2/ny_2.jpg";
import img11 from "../../images/box2/pz_2.jpg";
import img12 from "../../images/box2/nz_2.jpg";

import img13 from "../../images/box3/px_3.jpg";
import img14 from "../../images/box3/nx_3.jpg";
import img15 from "../../images/box3/py_3.jpg";
import img16 from "../../images/box3/ny_3.jpg";
import img17 from "../../images/box3/pz_3.jpg";
import img18 from "../../images/box3/nz_3.jpg";

const fakeData = [
  {
    id: 1,
    name: "box1",
    images: [img1, img2, img3, img4, img5, img6],
    hotspots: [
      {
        boxID: 1,
        hotspot: [0, -49, 0],
        rotation: [-Math.PI / 2, 0, 0],
        scale: 1,
      },
      {
        boxID: 2,
        hotspot: [450, -200, 422],
        rotation: [-Math.PI / 2, 0, 0],
        scale: 5,
      },
    ],
  },
  {
    id: 2,
    name: "box2",
    images: [img7, img8, img9, img10, img11, img12],
    hotspots: [
      {
        boxID: 1,
        hotspot: [-450, -193, -196],
        rotation: [-Math.PI / 2, 0, 0],
        scale: 6,
      },
      {
        boxID: 3,
        hotspot: [450, -190, 28],
        rotation: [-Math.PI / 2, 0, 0],
        scale: 6,
      },
    ],
  },
  {
    id: 3,
    name: "box3",
    images: [img13, img14, img15, img16, img17, img18],
    hotspots: [
      {
        boxID: 2,
        hotspot: [-450, -162, -170],
        rotation: [-Math.PI / 2, 0, 0],
        scale: 5,
      },
      {
        boxID: 1,
        hotspot: [450, -162, -263],
        rotation: [-Math.PI / 2, 0, 0],
        scale: 5,
      },
    ],
  },
];

export default fakeData;
