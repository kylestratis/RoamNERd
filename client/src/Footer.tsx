import React from "react";
import styled from "styled-components";

const FooterTag = styled.footer`
  height: 7vh;
  line-height: 7vh;
  padding: 0 ${(props) => props.theme.spacer * 3}px;
  background-color: ${(props) => props.theme.color.primary};
  color: white;

  a {
    color: ${(props) => props.theme.color.secondary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function Footer() {
  return (
    <FooterTag>
      Built with {"</>"} by{" "}
      <a
        href="https://twitter.com/igorlenterman"
        target="blank"
        rel="noreferrer"
      >
        @igorlenterman
      </a>
      ,{" "}
      <a href="https://twitter.com/bvajresh" target="blank" rel="noreferrer">
        @bvajresh
      </a>
      ,{" "}
      <a href="https://twitter.com/adamtowerz" target="blank" rel="noreferrer">
        @adamtowerz
      </a>
      , and{" "}
      <a href="https://twitter.com/hmprt_eth" target="blank" rel="noreferrer">
        @hmprt_eth
      </a>
    </FooterTag>
  );
}

export default Footer;
