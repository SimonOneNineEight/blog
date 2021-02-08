import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../Header";
import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/HomePage";
import AboutPage from "../../pages/AboutPage";
import PostPage from "../../pages/PostPage";
import NewPostPage from "../../pages/NewPostPage";
import RegisterPage from "../../pages/RegisterPage";
import UpdatePostPage from "../../pages/UpdatePostPage";
import { AuthContext } from "../../contexts";
import { getMe } from "../../WebApi";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../redux/reducers/postReducer";

const PageWrapper = styled.div`
  margin: 0;
  padding: 72px 0 0;
`;
const BodyWrapper = styled.div`
  margin: 0;
  padding: 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoadingPage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #7b7b7b;
  color: white;
  font-size: 32px;
  text-align: center;
`;
function App() {
  const isLoading = useSelector(selectIsLoading);
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(getMe());
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <PageWrapper>
        <Router>
          <Header />
          <BodyWrapper>
            {isLoading && <LoadingPage>Loading...</LoadingPage>}
            <Switch>
              <Route path="/about">
                <AboutPage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/register">
                <RegisterPage />
              </Route>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/posts/:id">
                <PostPage />
              </Route>
              <Route path="/new-post">
                <NewPostPage />
              </Route>
              <Route path="/update-post/:id">
                <UpdatePostPage />
              </Route>
            </Switch>
          </BodyWrapper>
        </Router>
      </PageWrapper>
    </AuthContext.Provider>
  );
}

export default App;
