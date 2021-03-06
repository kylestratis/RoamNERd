import React, { useMemo } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { useToasts } from "react-toast-notifications";
import ReactGA from "react-ga";
import Button from "./components/Button";
import { copyTextToClipboard } from "./utils/clipboard";
import { download } from "./utils/download";

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

const Disclaimer = styled.p`
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacer / 2}px;
  padding: 0;
  font-size: 12px;
  color: grey;

  border-bottom: 1px solid grey;
`;

const PLACEHOLDER_MD = `
**\\[\\[RoamNERd\\]\\]** uses \\[\\[named entity recognition\\]\\] to tag entities so you can seamlessly import text into \\[\\[Roam Research\\]\\].

- Usage:
  1. Enter or upload some text
  2. Hit "Process Text"
  3. Export using the buttons below
- Some ideas for using RoamNERd:
    - Researcher? 
        - Run your research through RoamNERd to start drawing references across different papers and text corpuses
    - Readwise (or similar) workflow? 
        - Run your highlights and notes through RoamNERd and enhance the depth of your graph
    - News junkie?
        - Run any articles you would import to Roam through RoamNERd first and get a set of automatic tags which you can add to your graph
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
      ReactGA.event({
        category: "TagText",
        action: "Copy Text",
      });
    } catch (e) {
      addToast("Failed to copy", {
        appearance: "error",
      });
      ReactGA.event({
        category: "TagText",
        action: "Copy Text Fail",
      });
    }
  };

  const downloadOutput = () => {
    download("roamNERd.md", text);
    ReactGA.event({
      category: "TagText",
      action: "Download File",
    });
  };

  return (
    <>
      {hasOutput && (
        <Disclaimer>
          Disclaimer: the output preview does not correctly reflect Roam's
          renderer, and will be buggy. The output is crafted to work correctly
          in Roam.
        </Disclaimer>
      )}
      <OutputZoneTag>
        <ReactMarkdown
          source={usePlaceholder ? PLACEHOLDER_MD : transformedMD}
        />
      </OutputZoneTag>
      <IOSectionActionBar>
        <Button
          onClick={downloadOutput}
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
