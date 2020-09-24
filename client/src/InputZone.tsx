import React from "react";
import styled from "styled-components";
import DropZone from "./DropZone";
import numeral from "numeral";

const InputTextarea = styled.textarea`
  display: block;
  outline: none;
  resize: none;
  border: none;
  box-sizing: border-box;
  font-size: 12px;
  font-family: sans-serif;
  color: black;
  flex-grow: 1;
`;

const FrozenInput = styled.div`
  font-size: 12px;
  font-family: sans-serif;
  color: black;
  flex-grow: 1;
`;

const WordCount = styled.p`
  font-size: 12px;
  margin: ${({ theme }) => theme.spacer}px 0 0 0;
  color: grey;
`;

const WordCountDisclaimer = styled.p`
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacer}px;
  font-size: 12px;
  color: red;
`;

function InputZone({ text, setText, frozen, inputCapped, wordCount }: Props) {
  if (frozen) {
    return <FrozenInput>{text}</FrozenInput>;
  }
  const hasContent = Boolean(text.length);
  return (
    <>
      {inputCapped && (
        <WordCountDisclaimer>
          Exceeded 7.5k word limit, going past this is not supported by Roam's
          copy API and begins to slow down the import so it is not supported at
          this time.
        </WordCountDisclaimer>
      )}
      {!hasContent && <DropZone setText={setText} />}
      <InputTextarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        id="input"
        placeholder="Or input text here..."
      />
      {hasContent && (
        <WordCount>{numeral(wordCount).format("0,0")} words of 7,500</WordCount>
      )}
    </>
  );
}

type Props = {
  text: string;
  setText: (i: string) => void;
  frozen: boolean;
  inputCapped: boolean;
  wordCount: number;
};

export default InputZone;
