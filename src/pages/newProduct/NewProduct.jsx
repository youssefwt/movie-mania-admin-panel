import { useState } from "react";
import "./newProduct.css";

export default function NewProduct() {
  const [movie, setMovie] = useState({});
  const [image, setImage] = useState(null);
  const [trailer, setTrialer] = useState(null);
  const [video, setVideo] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  console.log(image);

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        {/* <div className="addProductItem">
          <label>Tilte image</label>
          <input type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label>thumbnail image</label>
          <input type="file" id="file" />
        </div> */}
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="movie name"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="desscription"
            name="desscription"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="year"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="genre"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="duration"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="limit"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>is series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">no</option>
            <option value="true">yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" name="trailer" />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input type="file" name="trailer" />
        </div>
        <button className="addProductButton">Create</button>
      </form>
    </div>
  );
}
