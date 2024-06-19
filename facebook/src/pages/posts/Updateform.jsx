import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// eslint-disable-next-line react/prop-types
export default function Editform() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const token = localStorage.getItem("token");
  const formData = new FormData();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`http://localhost:4000/api/posts/${id}`);
        console.log(result.data);
        setTitle(result.data.title);
        setContent(result.data.content);
        setImagePreview(
          `data:${result.data.image.contentType};base64,${result.data.image.data}`
        );
        setImage(result.data.image);
      } catch (error) {
        console.log("No data Found!");
      }
    })();
  }, [id, token]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    (async () => {
      try {
        // eslint-disable-next-line react/prop-types
        const result = await axios.put(
          `http://localhost:4000/api/posts/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(result.data);
        setTimeout(() => {
          navigate("/");
        }, 1300);
        setSuccess(true);
      } catch (error) {
        console.log("No data Found!");
      }
    })();
  };
  return (
    <>
      <div className="container">
        <form
          method="post"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form-group mt-4">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control mt-2"
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
            ></textarea>
          </div>

          <div className="form-group mt-3">
            <label htmlFor="image">Image</label>
            {imagePreview && (
              <div className="mb-3">
                <img
                  src={imagePreview}
                  alt="Selected"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
            <input
              type="file"
              className="form-control"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
        {success && (
          <p className="text-success mt-3 fade-out">Post Edit Successfully</p>
        )}
      </div>
    </>
  );
}
