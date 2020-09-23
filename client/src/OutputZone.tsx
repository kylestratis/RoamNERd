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

const PLACEHOLDER_MD = `
**\\[\\[RoamNERd\\]\\]** uses \\[\\[machine learning\\]\\] to tag entities so you can seamlessly import text into \\[\\[Roam Research\\]\\].

Usage:

1. Enter or upload some text on the left
2. Hit "Process Text"
3. Export using the buttons below
`;

function OutputZone({ text }: Props) {
  const transformedMD = useMemo(() => {
    var transformText = text.replace(/\[\[/gi, `\\[\\[`);
    return transformText.replace(/\]\]/gi, `\\]\\]`);
  }, [text]);

  const usePlaceholder = transformedMD.length === 0;

  return (
    <OutputZoneTag>
      <ReactMarkdown source={usePlaceholder ? PLACEHOLDER_MD : transformedMD} />
    </OutputZoneTag>
  );
}

type Props = {
  text: string;
};

export default OutputZone;
