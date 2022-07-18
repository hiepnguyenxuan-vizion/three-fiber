import img1 from "../../images/px.jpg";
import img2 from "../../images/nx.jpg";
import img3 from "../../images/py.jpg";
import img4 from "../../images/ny.jpg";
import img5 from "../../images/pz.jpg";
import img6 from "../../images/nz.jpg";

import img7 from "../../images/px_1.jpg";
import img8 from "../../images/nx_1.jpg";
import img9 from "../../images/py_1.jpg";
import img10 from "../../images/ny_1.jpg";
import img11 from "../../images/pz_1.jpg";
import img12 from "../../images/nz_1.jpg";

const fakeData = [
  {
    id: 1,
    name: "box1",
    images: [img1, img2, img3, img4, img5, img6],
    hotspots: [
      {
        boxID: 1,
        hotspot: [0, -49, 0],
      },
      {
        boxID: 2,
        hotspot: [-45, -49, -35],
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
        hotspot: [-45, -49, 45],
      },
      {
        boxID: 3,
        hotspot: [45, -49, -45],
      },
    ],
  },
  {
    id: 3,
    name: "box3",
    images: [img5, img5, img5, img5, img5, img5],
    hotspots: [
      {
        boxID: 2,
        hotspot: [0, -49, -45],
      },
      {
        boxID: 1,
        hotspot: [45, -49, 45],
      },
    ],
  },
];

export default fakeData;
