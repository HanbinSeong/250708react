import { Post } from "../types/post";

export const dummyPosts: Post[] = [
  {
    id: 1,
    title: "첫 번째 게시글입니다.",
    author: "홍길동",
    date: "2024-06-01",
    views: 12,
    like: 10,
    content: "이 게시글은 게시판 예제의 첫 번째 글입니다.",
  },
  {
    id: 2,
    title: "두 번째 게시글입니다.",
    author: "김철수",
    date: "2024-06-02",
    views: 8,
    like: 1,
    content: "이 게시글은 게시판 예제의 두 번째 글입니다.",
  },
  {
    id: 3,
    title: "세 번째 게시글입니다.",
    author: "이영희",
    date: "2024-06-03",
    views: 5,
    like: 5,
    content: "이 게시글은 게시판 예제의 세 번째 글입니다.",
  },
];

// 게시글 id로 조회수 증가 함수
export function increasePostViews(id: number) {
  const post = dummyPosts.find((p) => p.id === id);
  if (post) {
    post.views += 1;
  }
} 