import { useEffect } from "react";
import { Post } from "../types/post";
import { Link } from "react-router-dom";
import FormatDate from "../components/FormatDate";
import axios from "axios";

const API_BASE_URL = "http://ec2-15-168-189-102.ap-northeast-3.compute.amazonaws.com:8000/"

interface PostListPageProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const BoardListPage = ({ posts, setPosts }: PostListPageProps) => {
  useEffect(() => {
    // 페이지가 마운트될 때마다 실행
    const fetchPosts = async () => {
      try {
        const res = await axios.get<Post[]>(
          `${API_BASE_URL}/board`
        );
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [setPosts]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-center flex-1">게시판</h1>
        <Link
          to="/create"
          className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
        >
          글쓰기
        </Link>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">번호</th>
            <th className="border px-4 py-2">제목</th>
            <th className="border px-4 py-2">작성자</th>
            <th className="border px-2 py-2">작성일</th>
            <th className="border px-4 py-2">조회수</th>
            <th className="border px-4 py-2">좋아요</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-center">{post.id}</td>
              <td className="border px-4 py-2">
                <Link to={`/post/${post.id}`} className="text-blue-600 hover:underline">{post.title}</Link>
              </td>
              <td className="border px-4 py-2 text-center">{post.author}</td>
              <td className="border px-4 py-2 text-center">{FormatDate(post.date)}</td>
              <td className="border px-4 py-2 text-center">{post.views}</td>
              <td className="border px-4 py-2 text-center">{post.like}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoardListPage; 