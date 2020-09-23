import React, { useState } from "react";
import "./App.scss";
import styled from "styled-components";
import Button from "./Button";
import InputZone from "./InputZone";
import OutputZone from "./OutputZone";

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

const Actions = styled.div`
  align-self: center;
`;

const outputmd = `
- **Tags:**
    - __People__: 3  
        - [[Fergus Shiel]], [[Reynaldo Pacheco]], [[Sgt Chris Pacheco]]  
    - __Dates__: 1  
        - [[April 2014]]  
    - __Organisations__: 6  
        - [[Buzzfeed]], [[the International Consortium of Investigative Journalists]], [[Panorama]], [[the Panama Papers]], [[the US Financial Crimes Enforcement Network]], [[FinCEN]]  
    - __Geopolitical Entities__: 2  
        - [[Napa]], [[California]]  
- **Raw Text:**   
    - The SARs were leaked to the [[Buzzfeed]] website and shared with [[the International Consortium of Investigative Journalists]] (ICIJ).
    - [[Panorama]] led the research for the BBC as part of a global probe.
    - The ICIJ led the reporting of [[the Panama Papers]] and Paradise Papers leaks - secret files detailing the offshore activities of the wealthy and the famous.
    - [[Fergus Shiel]], from the consortium, said the FinCEN Files are an insight into what banks know about the vast flows of dirty money across the globe… [The] system that is meant to regulate the flows of tainted money is broken.
    - The leaked SARs had been submitted to [[the US Financial Crimes Enforcement Network]], or FinCEN between 2000 and 2017 and cover transactions worth about $2 trillion.
    - [[FinCEN]] said the leak could impact US national security, risk investigations, and threaten the safety of those who file the reports.
    - But last week it announced proposals to overhaul its anti-money laundering programmes.
    - The UK also unveiled plans to reform its register of company information to clamp down on fraud and money laundering.
    - The investment scam that HSBC was warned about was called WCM777.
    - It led to the death of investor [[Reynaldo Pacheco]], who was found under water on a wine estate in [[Napa]], [[California]], in [[April 2014]].
    - Police say he had been bludgeoned with rocks.
    - He signed up to the scheme and was expected to recruit other investors.
    - The promise was everyone would get rich.
    - A woman Mr Pacheco, 44, introduced lost about $3,000.
    - That led to the killing by men hired to kidnap him.
    - He literally was trying to… make people's lives better, and he himself was scammed, and conned, and he unfortunately paid for it with his life,said [[Sgt Chris Pacheco]] (no relation), one of the officers who investigated the killing.
    - Reynaldo, he said, was murdered for being a victim in a Ponzi scheme.
`;

function App() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // normally forms submit a POST request and refresh the page
  };
  const [inputText, setInputText] = useState("");
  const hasInput = inputText.length > 0;
  const [outputText, setOutputText] = useState(outputmd);
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
