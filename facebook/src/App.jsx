
import Post from "./posts/Post";
import Update from "./posts/Updateform";
import Create from "./posts/CreatePost";
import Page from "./Page";
import { BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Post />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update/:id" element={<Update/>} />
          <Route path="*" element={<Page/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
