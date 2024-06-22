import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

// eslint-disable-next-line react/prop-types
export default function Form() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const formData = new FormData();
  const Submit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    (async () => {
      try {
        const result = await axios.post(
          "https://fb-noti-project.onrender.com//api/posts",

          formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        console.log(result.data);
        setTimeout(() => {
          navigate("/");
        }, 800);
        setSuccess(true);
      } catch (error) {
        console.log("No data Found!");
      }
    })();
  };
  return (
    <>
      <div className="container">
        <form method="post" onSubmit={Submit} encType="multipart/form-data">
          <div className="form-group mt-4">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="content">Content</label>
            <textarea
              className="form-control mt-2"
              rows="3"
              value={content}
              id="content"
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
            ></textarea>
          </div>
          <div className="form-group mt-3">
            <input
              type="file"
              className="form-control"
              name="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
        {success && (
          <p className="text-success mt-3 fade-out">Post Added Successfully</p>
        )}
      </div>
    </>
  );
}
