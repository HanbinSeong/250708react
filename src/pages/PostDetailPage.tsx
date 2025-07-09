import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Post } from "../types/post";
import FormatDate from "../components/FormatDate";
import axios from "axios";

const API_BASE_URL = "http://ec2-15-168-189-102.ap-northeast-3.compute.amazonaws.com:8000/"

interface PostDetailPageProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostDetailPage = ({ posts, setPosts }: PostDetailPageProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postId = Number(id);
  const post = posts.find((p) => p.id === postId);

  // 수정 모드 상태
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(post?.title || "");
  const [editContent, setEditContent] = useState(post?.content || "");

  // 좋아요 버튼 상태
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (postId) {
      (async () => {
        try {
          const res = await axios.post(`${API_BASE_URL}/board/${postId}/views`);
          setPosts((prev) =>
            prev.map((p) => (p.id === postId ? res.data : p))
          );
        } catch (error) {
          console.error("Error views: ", error);
        }
      })();
    }
  }, [postId, setPosts]);

  useEffect(() => {
    setEditTitle(post?.title || "");
    setEditContent(post?.content || "");
  }, [post]);

  if (!post) {
    return <div className="text-center mt-10">게시글을 찾을 수 없습니다.</div>;
  }

  // 게시글 삭제
  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(`${API_BASE_URL}/board/${postId}`);
        navigate("/");
      } catch (error) {
        console.error("Error deleting post:", error);
        return;
      }
    }
  };

  // 게시글 수정 저장
  const handleSave = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/board/editpost/${postId}`, {
        title: editTitle,
        content: editContent,
      });
      // 수정 후 최신 게시글 목록을 다시 받아옴
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? res.data : p))
      );
      setIsEdit(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // 좋아요 토글
  const handleLike = async () => {
    try {
      // 토글될 liked 값을 서버에 전송
      const res = await axios.post(
        `${API_BASE_URL}/board/${postId}/like`,
        { is_liked: !liked }
      );
      // 응답으로 받은 최신 post 객체로 상태 갱신
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? res.data : p))
      );
      setLiked(!liked);
    } catch (error) {
      console.error("Error toggling like:", error);
      alert("좋아요 처리에 실패했습니다.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <button className="mb-4 text-blue-500" onClick={() => navigate(-1)}>&larr; 목록으로</button>
      <div className="border rounded p-6 bg-white shadow min-h-[300px] flex flex-col">
        {isEdit ? (
          <>
            <input
              className="w-full border px-2 py-1 mb-2 rounded"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <textarea
              className="w-full border px-2 py-1 mb-2 rounded min-h-[120px]"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className="flex gap-2 justify-end mt-auto">
              <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={handleSave}>저장</button>
              <button className="bg-gray-300 text-gray-800 px-4 py-1 rounded" onClick={() => setIsEdit(false)}>취소</button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <div className="text-gray-500 text-sm mb-4">
              작성자: {post.author} | 작성일: {FormatDate(post.date)} | 조회수: {post.views} | 좋아요: {post.like}
            </div>
            <div className="text-gray-700 whitespace-pre-line mb-4">{post.content}</div>
            <div className="flex justify-between items-end mt-auto">
              <div>
                <button className={`bg-blue-100 text-blue-700 px-4 py-1 rounded border border-blue-400 ${liked ? 'opacity-70' : ''}`} onClick={handleLike}>
                  {liked ? '좋아요 취소 👍' : '좋아요 👍'}
                </button>
              </div>
              <div className="flex gap-2">
                <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={() => setIsEdit(true)}>수정</button>
                <button className="bg-gray-300 text-gray-800 px-4 py-1 rounded" onClick={handleDelete}>삭제</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostDetailPage;