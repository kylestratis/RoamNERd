import React from "react";
import styled from "styled-components";

const HeaderTag = styled.header`
  height: 9vh;
  padding: 0 ${(props) => props.theme.spacer * 3}px;
  background: ${(props) => props.theme.color.primary};
  border-bottom: 1px black;
  color: ${(props) => props.theme.color.secondary};
`;

const WordMark = styled.h1`
  padding-top: 1vh;
  font-size: 5vh;
  line-height: 5vh;
  font-family: monospace;
  margin: 0;
`;

const Description = styled.h2`
  font-weight: normal;
  text-align: left;
  font-size: 2vh;
  line-height: 2vh;
  padding-bottom: 1vh;
  margin: 0;
`;

function Header() {
  return (
    <HeaderTag>
      <WordMark>RoamNERd</WordMark>
      <Description>
        Automatically tag named entities in text for direct entry into Roam
        Research.
      </Description>
    </HeaderTag>
  );
}

export default Header;
