import React, { useState } from "react";
import "./App.scss";
import styled from "styled-components";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Main = styled.main`
  max-width: 1000px;
  min-height: calc(84vh - ${(props) => props.theme.spacer * 6}px);
  margin: 0 auto;
  padding: ${(props) => props.theme.spacer * 3}px;
`;

const BtnIcon = styled(FontAwesomeIcon)`
  margin-right: ${(props) => props.theme.spacer}px;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

const IOSection = styled.div`
  flex-grow: 1;
  margin: 0 ${(props) => props.theme.spacer}px;
`;

const IOSectionActionBar = styled.div`
  margin-bottom: ${(props) => props.theme.spacer}px;
`;

const InputTextarea = styled.textarea`
  display: block;
  outline: none;
  height: 400px;
  width: 100%;
  resize: none;
  padding: ${(props) => props.theme.spacer * 2}px;
  box-sizing: border-box;
  border-radius: ${(props) => props.theme.spacer}px;
  border: 1px solid ${(props) => props.theme.color.primary};
  overflow-y: auto;
  font-size: 12px;
  font-family: serif;
  color: black;
`;

const OutputZone = styled.div`
  height: 400px;
  width: 100%;
  padding: ${(props) => props.theme.spacer * 2}px;
  box-sizing: border-box;
  border-radius: ${(props) => props.theme.spacer}px;
  border: 1px solid ${(props) => props.theme.color.primary};
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
          <IOSectionActionBar>
            <Button theme="secondary" type="submit">
              <BtnIcon icon="upload" />
              Upload Text
            </Button>{" "}
            or paste below
          </IOSectionActionBar>
          <InputTextarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            id="input"
            placeholder="Input..."
          />
        </IOSection>
        <Actions>
          <Button type="submit" disabled={!hasInput}>
            <BtnIcon icon="cogs" />
            Process Text
          </Button>
        </Actions>
        <IOSection>
          <IOSectionActionBar>
            <Button theme="secondary" type="submit" disabled={!hasOutput}>
              <BtnIcon icon="download" />
              Download as .md
            </Button>
            <Button theme="secondary" disabled={!hasOutput}>
              <BtnIcon icon="copy" />
              Copy Output
            </Button>
          </IOSectionActionBar>
          <OutputZone>Tagged output will go here</OutputZone>
        </IOSection>
      </Form>
    </Main>
  );
}

export default App;
