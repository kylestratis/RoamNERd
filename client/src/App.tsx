import React, { useState } from "react";
import "./App.scss";
import styled from "styled-components";
import { useToasts } from "react-toast-notifications";
import Button from "./components/Button";
import InputZone from "./InputZone";
import OutputZone from "./OutputZone";

const API_URL = "https://roamnerd-be.herokuapp.com";
const TAG_TEXT_ENDPOINT = "tagText";

const Main = styled.main`
  max-width: 1200px;
  flex-grow: 1;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacer * 3}px;

  @media ${({ theme }) => theme.devices.mobile} {
    padding: ${(props) => props.theme.spacer}px;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  height: 100%;

  @media ${({ theme }) => theme.devices.mobile} {
    flex-direction: column;
  }
`;

const IOSection = styled.div`
  flex-grow: 1;
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  margin: 0 ${(props) => props.theme.spacer}px;
  padding: ${(props) => props.theme.spacer * 2}px;
  box-sizing: border-box;
  border-radius: ${(props) => props.theme.spacer}px;
  border: 1px solid ${(props) => props.theme.color.primary};

  @media ${({ theme }) => theme.devices.mobile} {
    width: auto;
    margin: 0;
    height: 300px;
  }
`;

const IOSectionActionBar = styled.div``;

const Actions = styled.div`
  align-self: center;

  @media ${({ theme }) => theme.devices.mobile} {
    padding: ${(props) => props.theme.spacer}px;
  }
`;

function App() {
  const { addToast } = useToasts();
  const [inputText, setInputText] = useState("");
  const hasInput = inputText.length > 0;
  const [outputText, setOutputText] = useState("");
  const hasOutput = outputText.length > 0;
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // normally forms submit a POST request and refresh the page
    setIsProcessing(true);
    try {
      const res = await fetch(`${API_URL}/${TAG_TEXT_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
        }),
        mode: "no-cors",
      });
      const json = await res.json();
      console.log(json);
    } catch (e) {
      console.log(e);
      addToast("A server error occured, sorry about that", {
        appearance: "error",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Main>
      <Form onSubmit={onSubmit}>
        <IOSection>
          <InputZone
            text={inputText}
            setText={setInputText}
            frozen={isProcessing}
          />
        </IOSection>
        <Actions>
          <Button
            icon="cogs"
            type="submit"
            disabled={!hasInput}
            loading={isProcessing}
            loadingContent="Processing..."
          >
            Process Text
          </Button>
        </Actions>
        <IOSection>
          <OutputZone text={outputText} />
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
