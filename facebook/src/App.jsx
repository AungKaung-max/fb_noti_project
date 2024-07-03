import Post from "./pages/posts/Post";
import Update from "./pages/posts/Updateform";
import Create from "./pages/posts/CreatePost";
import Login from "./pages/auth/login/Login";
import Page from "./pages/posts/Page";
import Register from "./pages/auth/register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Noti from "./pages/posts/noti"

function App() {
  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Post />} />
          {/* <Route path="/noti" element={<Noti />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="*" element={<Page />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
