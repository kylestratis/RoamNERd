import React, { useMemo } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

const OutputZoneTag = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  font-size: 12px;
  font-family: serif;
  color: black;

  ul {
    padding-left: 1em;

    &:first-child {
      margin-top: 0;
    }
  }
`;

function OutputZone({ text }: Props) {
  const transformedMD = useMemo(() => {
    var transformText = text.replace(/\[\[/gi, `\\[\\[`);
    return transformText.replace(/\]\]/gi, `\\]\\]`);
  }, [text]);
  console.log(transformedMD);
  return (
    <OutputZoneTag>
      <ReactMarkdown source={transformedMD} />
    </OutputZoneTag>
  );
}

type Props = {
  text: string;
};

export default OutputZone;
