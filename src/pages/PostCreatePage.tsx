// pages/PostCreatePage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../types/post";
import axios from "axios";

const API_BASE_URL = "http://ec2-15-168-189-102.ap-northeast-3.compute.amazonaws.com:8000"

interface PostCreatePageProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostCreatePage = ({ posts, setPosts }: PostCreatePageProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !content.trim()) {
      return alert("모든 항목을 입력해 주세요.");
    }
    try {
      // 1) 새 글 생성
      await axios.post<Post>(`${API_BASE_URL}/board`, {
        title: title,
        author: author,
        content: content,
      });
      navigate("/");
    } catch (error: any) {
      console.error("Error creating post:", error);
      alert(
        error.response?.data?.detail ||
        "글 등록 중 오류가 발생했습니다."
      );
    }

  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">글 등록</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border px-3 py-2 rounded"
          placeholder="제목"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className="border px-3 py-2 rounded"
          placeholder="작성자"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <textarea
          className="border px-3 py-2 rounded min-h-[120px]"
          placeholder="내용"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            onClick={() => navigate(-1)}
          >
            취소
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostCreatePage; 