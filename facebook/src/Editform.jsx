import { useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export default function Editform({ addForm }) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // eslint-disable-next-line react/prop-types
        setTitle(addForm.title);
        // eslint-disable-next-line react/prop-types
        setContent(addForm.content);
        console.log("EditForm", addForm);
      } catch (error) {
        console.log("No data Found!");
      }
    })();
  }, [addForm]);

  const handleSubmit = (event) => {
    event.preventDefault();
    (async () => {
      try {
        // eslint-disable-next-line react/prop-types
        const result = await axios.patch(
          // eslint-disable-next-line react/prop-types
          `http://localhost:4000/api/posts/${addForm._id}`,
          {
            title,
            content,
          }
        );
        addForm(result.data);
        console.log(result.data);
        setSuccess(true);
      } catch (error) {
        console.log("No data Found!");
      }
    })();
  };
  return (
    <>
      <div className="container">
        <form method="post" onSubmit={handleSubmit}>
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
