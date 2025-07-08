import { Post } from "../types/post";
import { Link } from "react-router-dom";

const PostTable = ({ posts }: { posts: Post[] }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2">번호</th>
          <th className="border px-4 py-2">제목</th>
          <th className="border px-4 py-2">작성자</th>
          <th className="border px-4 py-2">작성일</th>
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
            <td className="border px-4 py-2 text-center">{post.date}</td>
            <td className="border px-4 py-2 text-center">{post.views}</td>
            <td className="border px-4 py-2 text-center">{post.like}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PostTable; 