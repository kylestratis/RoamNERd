import React, { useState } from "react";
import "./App.scss";
import styled from "styled-components";
import Button from "./Button";
import InputZone from "./InputZone";

const Main = styled.main`
  max-width: 1000px;
  min-height: calc(84vh - ${(props) => props.theme.spacer * 6}px);
  margin: 0 auto;
  padding: ${(props) => props.theme.spacer * 3}px;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

const IOSection = styled.div`
  flex-grow: 1;
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  margin: 0 ${(props) => props.theme.spacer}px;
  padding: ${(props) => props.theme.spacer * 2}px;
  box-sizing: border-box;
  border-radius: ${(props) => props.theme.spacer}px;
  border: 1px solid ${(props) => props.theme.color.primary};
`;

const IOSectionActionBar = styled.div``;

const OutputZone = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  font-size: 12px;
  font-family: serif;
  color: black;
`;

const Actions = styled.div`
  align-self: center;
`;

function App() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // normally forms submit a POST request and refresh the page
  };
  const [inputText, setInputText] = useState("");
  const hasInput = inputText.length > 0;
  const [outputText, setOutputText] = useState("");
  const hasOutput = outputText.length > 0;

  return (
    <Main>
      <Form onSubmit={onSubmit}>
        <IOSection>
          <InputZone text={inputText} setText={setInputText} />
        </IOSection>
        <Actions>
          <Button icon="cogs" type="submit" disabled={!hasInput}>
            Process Text
          </Button>
        </Actions>
        <IOSection>
          <OutputZone>Tagged output will go here</OutputZone>
          <IOSectionActionBar>
            <Button
              icon="download"
              theme="secondary"
              type="submit"
              disabled={!hasOutput}
            >
              Download as .md
            </Button>
            <Button icon="copy" theme="secondary" disabled={!hasOutput}>
              Copy Output
            </Button>
          </IOSectionActionBar>
        </IOSection>
      </Form>
    </Main>
  );
}

export default App;
