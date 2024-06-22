import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Button, ListGroup, Badge } from "react-bootstrap";

// Create PostContext
const PostContext = createContext();

// PostProvider component
// eslint-disable-next-line react/prop-types
const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        document.title = "Facebook";
        const result = await axios.get("https://fb-noti-project.onrender.com/api/posts");
        setPosts(result.data);
      } catch (error) {
        console.log("No data Found!");
      }
    };

    fetchPosts();
  }, [posts]);

  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        document.title = "Facebook";
        const result = await axios.get("https://fb-noti-project.onrender.com/api/posts");
        setPosts(result.data);
      } catch (error) {
        console.log("No data Found!");
      }
    };

    fetchPosts();
  }, [userId]);


  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://fb-noti-project.onrender.com/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleLike = async (postId) => {
    const post = posts.find((p) => p._id === postId);
    if (!post) return;

    if (post.likers.includes(userId)) {
      try {
        await axios.put(
          `https://fb-noti-project.onrender.com/api/posts/${postId}/dislike`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p._id === postId
              ? { ...p, likers: p.likers.filter((id) => id !== userId) }
              : p
          )
        );
      } catch (error) {
        console.error("Error disliking post:", error.response?.data || error.message);
      }
    } else {
      try {
        await axios.put(
          `https://fb-noti-project.onrender.com/api/posts/${postId}/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p._id === postId ? { ...p, likers: [...p.likers, userId] } : p
          )
        );
      } catch (error) {
        console.error("Error liking post:", error.response?.data || error.message);
      }
    }
  };

  return (
    <PostContext.Provider value={{ posts, handleDelete, handleLike }}>
      {children}
    </PostContext.Provider>
  );
};
const Post = () => {
  const { posts, handleDelete, handleLike } = useContext(PostContext);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user");

  return (
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
            <div className="close px-2">
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
              <Button
                variant="link"
                className={`me-2 like-button ${
                  token && data.likers.includes(userId) ? "text-primary" : ""
                }`}
                onClick={() => handleLike(data._id)}
              >
                <i className="fa fa-thumbs-up"></i>
                {token && data.likers.includes(userId) ? "Liked" : "Like"}
                {data.likers && data.likers.length > 0 && (
                  <Badge bg="primary" className="ms-2">
                    {data.likers.length}
                  </Badge>
                )}
              </Button>
              <Button variant="link" className="comment-button">
                <i className="fa fa-comment"></i>
                Comment
              </Button>
            </div>
            <Button variant="link" className="share-button">
              Share
            </Button>
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
  );
};

export default function App() {
  return (
    <PostProvider>
      <Post />
    </PostProvider>
  );
}
