import Post from "./pages/posts/Post";
import Update from "./pages/posts/Updateform";
import Create from "./pages/posts/CreatePost";
import Header from "./pages/header/Header"
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      
      <BrowserRouter>
      <Header></Header>
        <Routes>
          <Route path="/" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update/:id" element={<Update />} />
          {/* <Route path="*" element={<Page />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
