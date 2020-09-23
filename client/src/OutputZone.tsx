import React, { useMemo } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { useToasts } from "react-toast-notifications";
import Button from "./components/Button";
import { copyTextToClipboard } from "./utils/clipboard";

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

const IOSectionActionBar = styled.div``;

const PLACEHOLDER_MD = `
**\\[\\[RoamNERd\\]\\]** uses \\[\\[named entity recognition\\]\\] to tag entities so you can seamlessly import text into \\[\\[Roam Research\\]\\].

Usage:

1. Enter or upload some text
2. Hit "Process Text"
3. Export using the buttons below
`;

function OutputZone({ text }: Props) {
  const { addToast } = useToasts();

  const transformedMD = useMemo(() => {
    var transformText = text.replace(/\[\[/gi, `\\[\\[`);
    return transformText.replace(/\]\]/gi, `\\]\\]`);
  }, [text]);

  const usePlaceholder = transformedMD.length === 0;
  const hasOutput = text.length > 0;

  const copyOutput = async () => {
    try {
      await copyTextToClipboard(text);
      addToast("Copied to clipboard", {
        appearance: "success",
      });
    } catch (e) {
      addToast("Failed to copy", {
        appearance: "error",
      });
    }
  };

  return (
    <>
      <OutputZoneTag>
        <ReactMarkdown
          source={usePlaceholder ? PLACEHOLDER_MD : transformedMD}
        />
      </OutputZoneTag>
      <IOSectionActionBar>
        <Button
          icon="download"
          theme="secondary"
          type="submit"
          disabled={!hasOutput}
        >
          Download as .md
        </Button>
        <Button
          onClick={copyOutput}
          icon="copy"
          theme="secondary"
          disabled={!hasOutput}
        >
          Copy Output
        </Button>
      </IOSectionActionBar>
    </>
  );
}

type Props = {
  text: string;
};

export default OutputZone;
