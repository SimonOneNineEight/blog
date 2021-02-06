import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { newPost } from "../../WebApi";
import Markdown from "../../components/common/markdown";

const NewPostWrapper = styled.div``;
const NewPostBox = styled.form`
  display: flex;
`;
const BoxTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  padding-top: 28px;
`;

const NewPostDetail = styled.div`
  width: 50vw;
  height: 100%;
  min-height: 200vh;
  border: 0;
  background-color: #272727;
  color: #e0e0e0;
`;
const NewPostInputWrapper = styled.div`
  padding: 15px 0;
  height: 100%;
`;
const NewPostTitle = styled.input`
  width: 100%;
  color: #e0e0e0;
  background-color: #272727;
  box-sizing: border-box;
  font-size: 32px;
  height: 40px;
  padding: 0 10px;
`;
const NewPostContent = styled.textarea`
  width: 100%;
  min-height: 100vh;
  color: #e0e0e0;
  background-color: #272727;
  box-sizing: border-box;
  font-size: 18px;
  padding: 10px 10px 0;
`;
const NewPostSubmit = styled.input`
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
`;
const ErrorMessage = styled.div`
  color: #ff2d2d;
`;
const EmptyDiv = styled.div`
  height: 22px;
`;
const NewPostPreview = styled.div`
  width: 50vw;
`;
const PreviewHeader = styled.div`
  position: relative;
`;
const PreviewWrapper = styled.div`
  padding: 12px;
`;
const PreviewTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
`;
const NewPostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const { user } = useContext(AuthContext);
  if (!user) return history.push("/");
  const handleNewPostSubmit = (e) => {
    e.preventDefault();
    if (!title) return setErrorMessage("請輸入標題！");
    newPost(title, content).then((res) => {
      console.log(res);
      if (res === "success") return history.push("/");
    });
  };
  return (
    <NewPostWrapper>
      <NewPostBox onSubmit={handleNewPostSubmit}>
        <NewPostDetail>
          <BoxTitle>新增文章</BoxTitle>
          <NewPostInputWrapper>
            <NewPostTitle
              placeholder="請輸入文章標題"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <NewPostContent
              placeholder="請輸入文章內容"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </NewPostInputWrapper>
          {errorMessage ? (
            <ErrorMessage>{errorMessage}</ErrorMessage>
          ) : (
            <EmptyDiv />
          )}
        </NewPostDetail>
        <NewPostPreview>
          <PreviewHeader>
            <BoxTitle>文章預覽</BoxTitle>
            <NewPostSubmit type="submit" />
          </PreviewHeader>
          <PreviewWrapper>
            <PreviewTitle>{title}</PreviewTitle>
            <Markdown source={content}></Markdown>
          </PreviewWrapper>
        </NewPostPreview>
      </NewPostBox>
    </NewPostWrapper>
  );
};

export default NewPostPage;
