import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BoardListPage from "./pages/BoardListPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostCreatePage from "./pages/PostCreatePage";
import { Post } from "./types/post";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const API_BASE_URL = "http://ec2-15-168-189-102.ap-northeast-3.compute.amazonaws.com:8000"
  useEffect(() => {
    (async () => {
      console.log("Fetching data...");
      try {
        const [PostRes] = await Promise.all([
          axios.get<Post[]>(`${API_BASE_URL}board`),
        ]);
        setPosts(PostRes.data);
        console.log("Success");
      } catch {
        console.error("Error fetching data");
      }
    })();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BoardListPage posts={posts} setPosts={setPosts} />} />
        <Route path="/post/:id" element={<PostDetailPage posts={posts} setPosts={setPosts} />} />
        <Route path="/create" element={<PostCreatePage posts={posts} setPosts={setPosts} />} />
      </Routes>
    </Router>
  );
}

export default App;