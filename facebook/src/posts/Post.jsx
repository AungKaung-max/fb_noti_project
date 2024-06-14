import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Button, ListGroup } from "react-bootstrap";

export default function Post() {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        document.title = "Facebook";
        const result = await axios.get("http://localhost:4000/api/posts");
        console.log(result.data);
        setPost(result.data);
      } catch (error) {
        console.log("No data Found!");
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/posts/${id}`);
      console.log("Deleted", id);
      setPost(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        {posts.map((data) => (
          <Card className="mt-3" key={data._id}>
            <Card.Header className="d-flex">
              <div className="">
                <img
                  src="https://media.istockphoto.com/id/538665020/photo/internet-meme-why-you-no-rage-face-3d-illustration.jpg?s=612x612&w=0&k=20&c=5D_g8Jy8kqg5Op2bb4RvcH8_6y0HGPqt29TKDrEqLyM="
                  className="rounded-circle me-2"
                  alt="User"
                  style={{ width: "50px", height: "50px" }}
                />
              </div>
              <div className="flex-grow-1">
                <h6 className="mb-0">Aung Kaung</h6>
                <p className="text-muted mb-0">2 hours ago</p>
              </div>

              <div className="close px-2 ">
                <Link to={`/update/${data._id}`} className="btn btn-success">
                  Update
                </Link>
              </div>

              <div className="close" onClick={() => handleDelete(data._id)}>
                <a className="btn btn-danger">Delete</a>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Title>{data.title}</Card.Title>
              <Card.Text>{data.content}</Card.Text>
              {data.image && data.image.contentType && data.image.data ? (
                <Card.Img
                  variant="top"
                  src={`data:${
                    data.image.contentType
                  };base64,${data.image.data.toString("base64")}`}
                  alt="Post Image"
                />
              ) : (
                <div>No image available</div>
              )}
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between align-items-center">
              <div>
                <Button variant="primary" className="me-2">
                  Like
                </Button>
                <Button variant="link">Comment</Button>
              </div>
              <Button variant="link">Share</Button>
            </Card.Footer>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Comments:</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                <img
                  src="https://via.placeholder.com/30"
                  className="rounded-circle me-2"
                  alt="User"
                  style={{ width: "30px", height: "30px" }}
                />
                <span>Comment 1 from Jane Doe</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <img
                  src="https://via.placeholder.com/30"
                  className="rounded-circle me-2"
                  alt="User"
                  style={{ width: "30px", height: "30px" }}
                />
                <span>Comment 2 from Mike Smith</span>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        ))}
      </div>
      {/* <div className="container mt-5">
        {posts.map((data) => (
          <div className="card mt-3" key={data._id}>
            <div className="card-header d-flex">
              <div className="flex-grow-1">Posts</div>

              <div className="close px-2">
                <Link to={`/update/${data._id}`} className="btn btn-success">
                  Update
                </Link>
              </div>

              <div className="close" onClick={() => handleDelete(data._id)}>
                <a className="btn btn-danger">Delete</a>
              </div>
            </div>
            <div className="card-body">
              <h5 className="card-title">{data.title}</h5>
              <p className="card-text">{data.content}</p>

              <img
                src={`data:${
                  data.image.contentType
                };base64,${data.image.data.toString("base64")}`}
                alt="Post Image"
              />
            </div>
          </div>
        ))}
      </div> */}
    </>
  );
}
