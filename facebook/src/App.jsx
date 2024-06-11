import Navbar from "./Navbar";
import Form from "./Form";
import Editform from "./Editform";
import { useEffect, useState } from "react";
import axios from "axios";



function App() {
  const [posts, setPost] = useState([]);
  const [editposts, setEditPost] = useState({});
  const [show, setShowForm] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        document.title = 'Facebook';
        const result = await axios.get("http://localhost:4000/api/posts");
        console.log(result.data);
        setPost(result.data);
      } catch (error) {
        console.log("No data Found!");
      }
    })();
  }, []);

  const handleForm = (post) => {
    setPost([...posts, post]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/posts/${id}`);
      console.log("Deleted", id);
      setPost(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const result  = await axios.get(`http://localhost:4000/api/posts/${id}`);
      setEditPost(result.data)
      setPost(posts.filter((post) => post._id === id))
      setShowForm(true);
    } catch (error) {
      console.log("Error", error);
    }
  }
  let jsx = null;
  if(show)
    {
      jsx = <Editform addForm={editposts}/>
    }
  else{
    jsx = <Form addForm={handleForm} />
  }
  return (
    <>
      
      <Navbar />
      {jsx}
      <div className="container mt-5">
        {posts.map((data) => (
          <div className="card mt-3" key={data._id}>
            <div className="card-header d-flex">
              <div className="flex-grow-1">
                Posts
              </div>
              <div className="close px-2" onClick={() => handleEdit(data._id)}>
                <a>Edit</a>
              </div>
              <div className="close" onClick={() => handleDelete(data._id)}>
                <a>&times;</a>
              </div>
            </div>
            <div className="card-body">
              <h5 className="card-title">{data.title}</h5>
              <p className="card-text">{data.content}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

// C Shift L
