import React, { useState, useEffect } from "react";
import styled from "styled-components";
import db from "../../config";

const AboutMeWrapper = styled.div`
  margin-top: 64px;
`;
const AboutMeBox = styled.div`
  display: flex;
  width: 600px;
  height: 233px;
`;
const AboutMeContentWrapper = styled.div`
  width: 400px;
  padding: 16px 0;
  margin: 0 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;
const AboutMeTitle = styled.div`
  color: #5b5b5b;
  font-size: 28px;
  font-weight: bold;
  padding-bottom: 24px;
`;
const AboutMeContent = styled.div`
  color: #5b5b5b;
  font-size: 16px;
`;
const AboutMeAvatar = styled.div`
  width: 200px;
  height: 200px;
  background-color: black;
  padding: 16px;
`;
export default function AboutPage() {
  const [about, setAbout] = useState(null);
  useEffect(() => {
    db.ref("/about")
      .once("value")
      .then((snapShot) => snapShot.val())
      .then((value) => setAbout(value));
  });
  return (
    <AboutMeWrapper>
      {about && (
        <AboutMeBox>
          <AboutMeContentWrapper>
            <AboutMeTitle>{about.name}</AboutMeTitle>
            <AboutMeContent>{about.content}</AboutMeContent>
          </AboutMeContentWrapper>
          <AboutMeAvatar />
        </AboutMeBox>
      )}
    </AboutMeWrapper>
  );
}
