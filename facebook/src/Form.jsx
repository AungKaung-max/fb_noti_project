import axios from "axios";
import { useState} from "react";

// eslint-disable-next-line react/prop-types
export default function Form({addForm}) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [success,setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    (async () => {
      try {
        const result = await axios.post("http://localhost:4000/api/posts", {
          title,
          content
        });
        addForm(result.data);
        console.log(result.data);
        setSuccess(true);
      } catch (error) {
        console.log("No data Found!");
      }
    })();
    setTitle("");
    setContent("");
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
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
              id = "content"
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
           {success && <p className="text-success mt-3 fade-out">Post Added Successfully</p>}
      </div>
    </>
  );
}
