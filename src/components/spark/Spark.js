import { React, useEffect, useState } from "react";
import Axios from "axios";

import ColorPalette from "../color-palette/ColorPalette";

import "../spark/spark.styles.css";

function Spark() {
  const [imageData, setImageData] = useState({});
  const [checked, setChecked] = useState(false);
  const [word, setWord] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await generateNewSpark();
      await generateNewWord();
    };
    fetchData();
  }, []);

  //   const apiKeyHarv = process.env.Api_KeyHarv;
  //   const apiKeyRijks = process.env.Api_KeyRijks;

  const apiKeyHarv = `ad050672-0a38-4ca1-83d0-1be287f95db1`;
  const apiKeyRijks = `JMAXiERl`;
  //make these arrays that hold the data keyword and url
  const apis = {
    1: [
      `https://api.harvardartmuseums.org/image/?apikey=${apiKeyHarv}`,
      "records",
    ],
    2: [
      `https://www.rijksmuseum.nl/api/en/collection/?key=${apiKeyRijks}`,
      "artObjects",
    ],
    3: [`https://api.artic.edu/api/v1/artworks`, ""],
  };

  const getRandomImgData = (data) => {
    const randomIndex = Math.ceil(Math.random() * data.length);
    return data[randomIndex];
  };

  const getAicImgUrl = async (data) => {
    const AIC = await Axios.get(`https://api.artic.edu/api/v1/artworks`);
    const baseUrl = AIC.data.config.iiif_url;
    const imageID = data.image_id;
    const imgUrl = `${baseUrl}/${imageID}/full/843,/0/default.jpg`;
    return imgUrl;
  };

  const getImageData = async (data, museumId) => {
    let imageData = {
      title: "",
      artist: "",
      museum: "",
      date: "",
      url: "",
    };
    if (museumId === 1) {
      imageData.url = data?.baseimageurl;
      imageData.date = data.date;
      imageData.museum = "Harvard";
    } else if (museumId === 2) {
      imageData.title = data.title;
      imageData.artist = data.principalOrFirstMaker;
      imageData.museum = "Rijks Museum";
      imageData.url = data.webImage?.url;
    } else {
      const aicImageUrl = await getAicImgUrl(data);
      imageData.title = data.title;
      imageData.artist = data.artist_title;
      imageData.museum = "Art Institute of Chicago";
      imageData.date = data.date_display;
      imageData.url = aicImageUrl;
    }
    setImageData(imageData);
  };

  const generateNewSpark = async () => {
    const randomMuseumId = Math.ceil(Math.random() * Object.keys(apis).length);
    const response = await Axios.get(apis[randomMuseumId][0]);
    let artArray;
    if (randomMuseumId === 1) {
      artArray = response.data.records;
    } else if (randomMuseumId === 2) {
      artArray = response.data.artObjects;
    } else {
      artArray = response.data.data;
    }
    const imgData = await getRandomImgData(artArray);
    getImageData(imgData, randomMuseumId);
  };

  const generateNewWord = async () => {
    const response = await Axios.get(
      `https://random-word-api.herokuapp.com/word`
    );
    setWord(response.data);
  };

  const handleButton = async () => {
    await generateNewSpark();
    await generateNewWord();
  };

  return (
    <div className="spark-container">
      <div className="left-container">
        <img src={imageData.url} className="spark-img" />
        <ColorPalette />
      </div>

      <div className="right-container">
        <h1 className="muse-title">muse</h1>

        <div className="data-container">
          <div className="data-item-container">
            <p className="data-label">title</p>
            <h3>{imageData.title ? imageData.title : "Unknown"}</h3>
          </div>

          <div className="data-item-container">
            <p className="data-label">artist</p>
            <h3>{imageData.artist ? imageData.artist : "Unknown"}</h3>
          </div>
          <div className="data-item-container">
            <p className="data-label">date</p>
            <h3>{imageData.date ? imageData.date : "Unknown"}</h3>
          </div>

          <div className="data-item-container">
            <p className="data-label">thanks to:</p>
            <h3>{imageData.museum ? imageData.museum : "Unknown"}</h3>
          </div>
        </div>

        <span>{word}</span>
        <button onClick={handleButton} className="spark-button">
          New
        </button>
      </div>
    </div>
  );
}

export default Spark;
