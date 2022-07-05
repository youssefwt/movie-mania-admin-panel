import { useContext, useState } from "react";
import "./newProduct.css";
import storage from "../../firebase";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import Swal from "sweetalert2";
import { CircularProgress } from "@material-ui/core";

export default function NewMovie() {
  const [movie, setMovie] = useState(null);
  const [img, setImage] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [imageProgress, setImageProgress] = useState(0);
  const [trailerProgress, setTrailerProgress] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);

  const { dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //get name snapshot.metadata.name
          const name = snapshot.ref.name;
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");

          if (name.includes("image")) {
            setImageProgress(progress);
          } else if (name.includes("trailer")) {
            setTrailerProgress(progress);
          } else if (name.includes("video")) {
            setVideoProgress(progress);
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (img && trailer && video) {
      upload([
        { file: img, label: "image" },
        { file: trailer, label: "trailer" },
        { file: video, label: "video" },
      ]);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please make sure you have uploaded all files",
      });
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (
      movie.title &&
      movie.description &&
      movie.image &&
      movie.trailer &&
      movie.video
    ) {
      createMovie(movie, dispatch);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please make sure you have filled all fields",
      });
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            name="image"
            onChange={(e) => {
              if (!e.target.files[0]) return;

              if (e.target.files[0].type.startsWith("image")) {
                setImage(e.target.files[0]);
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Please select an image file!",
                });
              }
            }}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="John Wick"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="description"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="number"
            placeholder="Year"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Genre"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="number"
            placeholder="Duration"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="number"
            placeholder="limit"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="file"
            name="trailer"
            accept="video/*"
            onChange={(e) => {
              if (!e.target.files[0]) return;
              if (e.target.files[0].type.startsWith("video")) {
                setTrailer(e.target.files[0]);
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Please select a video file!",
                });
              }
            }}
          />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={(e) => {
              if (!e.target.files[0]) return;
              if (e.target.files[0].type.startsWith("video")) {
                setVideo(e.target.files[0]);
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Please select a video file!",
                });
              }
            }}
          />
        </div>
        {uploaded === 3 ? (
          <button className="addProductButton" onClick={handleCreate}>
            Create
          </button>
        ) : (
          <>
            <button className="addProductButton" onClick={handleUpload}>
              Upload
            </button>
          </>
        )}
      </form>
      {imageProgress > 0 && trailerProgress > 0 && videoProgress > 0 && (
        <div
          style={{
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <CircularProgress
            variant="determinate"
            value={Math.round(
              (imageProgress + trailerProgress + videoProgress) / 3
            )}
          />
          <div>{`${Math.round(
            (imageProgress + trailerProgress + videoProgress) / 3
          )}%`}</div>
        </div>
      )}
    </div>
  );
}
