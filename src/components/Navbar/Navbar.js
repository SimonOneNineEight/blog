import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPosts } from "../../redux/reducers/postReducer";

const NavbarWrapper = styled.div`
  width: 200px;
  position: fixed;
  left: 0;
  top: 72px;
  bottom: 0;
`;
const NavList = styled.div`
  padding: 36px 12px 0;
`;
const Nav = styled(Link)`
  font-size: 14px;
  color: #6c6c6c;
  cursor: pointer;
  text-decoration: none;
`;
const Navbar = () => {
  const posts = useSelector(selectPosts);
  return (
    <NavbarWrapper>
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
