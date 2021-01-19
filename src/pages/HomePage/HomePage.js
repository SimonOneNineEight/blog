import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Markdown from "../../components/common/markdown";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPost,
  selectPosts,
  setIsLoading,
} from "../../redux/reducers/postReducer";

const HomePageWrapper = styled.div`
  width: 680px;
  padding: 20px 20px 20px 108px;
`;
const PostListWrapper = styled.div``;
const PostList = styled.div`
  min-height: 75vh;
`;
const Post = styled.div`
  width: 100%;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  & + & {
    padding-top: 24px;
  }
`;
const PostCreatedAt = styled.div`
  color: #9d9d9d;
  font-size: 12px;
  font-style: italic;
`;
const PostTitle = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: #000000;
  font-size: 32px;
  font-weight: bold;
  padding-bottom: 12px;
`;
const PostContent = styled(Markdown)`
  font-size: 14px;
  max-height: 100px;
  overflow: hidden;
`;
const ReadMore = styled(Link)`
  font-size: 14px;
  font-weight: bold;
  padding-top: 12px;
  cursor: pointer;
`;

export default function HomePage() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const defaultCurrentPage = 1;
  const pageSize = 5;
  const [postOnPage, setPostOnPage] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    dispatch(getAllPost());
    if (posts) {
      setPostOnPage(posts.slice(0, pageSize));
      setTotalPage(Math.ceil(posts.length / pageSize));
      setPagination(Array.from({ length: totalPage }).map((_, i) => i + 1));
      dispatch(setIsLoading(false));
    }
  }, [totalPage, dispatch, posts]);

  return (
    <HomePageWrapper>
      <Navbar />
      <PostListWrapper>
        <PostList>
          {postOnPage.map((post) => (
            <Post key={post.id}>
              <PostCreatedAt>
                {new Date(post.createdAt).toLocaleDateString()}
              </PostCreatedAt>
              <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
              <PostContent source={post.content} />
            </Post>
          ))}
        </PostList>
        <Pagination
          totalPage={totalPage}
          defaultCurrentPage={defaultCurrentPage}
          pagination={pagination}
          onChange={(currentPage) => {
            const newPostOnPage = posts.slice(
              (currentPage - 1) * 5,
              currentPage * 5
            );
            setPostOnPage(newPostOnPage);
          }}
        />
      </PostListWrapper>
    </HomePageWrapper>
  );
}
