import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPosts } from "../../redux/reducers/postReducer";

const NavbarWrapper = styled.div`
  background-color: #eceff1;
  width: 300px;
  position: fixed;
  left: 0;
  top: 72px;
  bottom: 0;
  padding: 36px 12px 0;
`;
const NavbarTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 12px;
`;
const NavList = styled.div``;
const Nav = styled(Link)`
  font-size: 14px;
  color: #6c6c6c;
  cursor: pointer;
  text-decoration: none;
  display: block;
  & + & {
    padding-top: 18px;
  }
`;
const Navbar = () => {
  const posts = useSelector(selectPosts);
  return (
    <NavbarWrapper>
      <NavbarTitle>文章列表</NavbarTitle>
      <NavList>
        {posts &&
          posts.map((post, index) => (
            <Nav key={index} to={`/posts/${post.id}`}>
              {post.title}
            </Nav>
          ))}
      </NavList>
    </NavbarWrapper>
  );
};

export default Navbar;
