import React, { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Markdown from "../../components/common/Markdown";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../contexts";
import { getPost, selectPostOnPage } from "../../redux/reducers/postReducer";

const PostWrapper = styled.div`
  padding: 24px 200px;
`;

const PostTitle = styled.div`
  font-size: 36px;
  font-weight: bold;
  position: relative;
`;
const PostCreatedAt = styled.div`
  color: #9d9d9d;
  font-size: 12px;
  font-style: italic;
`;
const PostUpdateButton = styled(Link)`
  position: absolute;
  width: 60px;
  height: 28px;
  font-size: 18px;
  background-color: #0080ff;
  color: #e0e0e0;
  border: 1px solid #adadad;
  box-sizing: content-box;
  padding: 0;
  top: 10px;
  right: 12px;
  border-radius: 4px;
  text-decoration: none;
  text-align: center;
`;
const PostContent = styled(Markdown)`
  padding-top: 12px;
  color: #5b5b5b;
  font-size: 16px;
`;
export default function PostPage() {
  const dispatch = useDispatch();
  const post = useSelector(selectPostOnPage);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);
  return (
    <>
      {post && (
        <PostWrapper>
          <PostTitle>{post.title}</PostTitle>
          <PostCreatedAt>
            {new Date(post.createdAt).toLocaleDateString()}
          </PostCreatedAt>
          {user && (
            <PostUpdateButton to={`/update-post/${id}`}>編輯</PostUpdateButton>
          )}
          <PostContent source={post.content} />
        </PostWrapper>
      )}
    </>
  );
}
