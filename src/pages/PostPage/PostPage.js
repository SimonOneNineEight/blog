import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Markdown from "../../components/common/markdown";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getPost, selectPosts } from "../../redux/reducers/postReducer";

const PostWrapper = styled.div`
  padding: 24px 200px;
`;

const PostTitle = styled.div`
  font-size: 36px;
  font-weight: bold;
`;
const PostCreatedAt = styled.div`
  color: #9d9d9d;
  font-size: 12px;
  font-style: italic;
`;
const PostContent = styled(Markdown)`
  padding-top: 12px;
  color: #5b5b5b;
  font-size: 16px;
`;
export default function PostPage() {
  const dispatch = useDispatch();
  const post = useSelector(selectPosts);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);
  const date = new Date(post.createdAt);
  return (
    <PostWrapper>
      <PostTitle>{post.title}</PostTitle>
      <PostCreatedAt>{date.toLocaleDateString()}</PostCreatedAt>
      <PostContent source={post.body} />
    </PostWrapper>
  );
}
