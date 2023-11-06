import { React, useState, useEffect } from "react";

import "../color-palette/color-palette.styles.css";

function ColorPalette() {
  const [palette, setPalette] = useState({});

  useEffect(() => {
    const generateData = async () => {
      await generateColorPalette();
    };
    generateData();
  }, []);

  const generateColorPalette = () => {
    for (let i = 0; i < 3; i++) {
      palette[i] = randomizeColors();
    }
  };

  const randomizeColors = () => {
    let RGB = [];

    for (let i = 0; i < 3; i++) {
      let colorNumber = Math.ceil(Math.random() * 255);
      RGB.push(colorNumber);
    }
    const str = RGB.join(",");
    return str;
  };

  return (
    <div>
      <div className="palette-container">
        <div
          className="color-box"
          style={{ backgroundColor: `rgba(${palette[0]})` }}
        ></div>
        <div
          className="color-box"
          style={{ backgroundColor: `rgba(${palette[1]})` }}
        ></div>
        <div
          className="color-box"
          style={{ backgroundColor: `rgba(${palette[2]})` }}
        ></div>
      </div>
    </div>
  );
}

export default ColorPalette;
