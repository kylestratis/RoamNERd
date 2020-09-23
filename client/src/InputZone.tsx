import React from "react";
import styled from "styled-components";
import DropZone from "./DropZone";

const InputTextarea = styled.textarea`
  display: block;
  outline: none;
  resize: none;
  border: none;
  box-sizing: border-box;
  font-size: 12px;
  font-family: serif;
  color: black;
  flex-grow: 1;
`;

function InputZone({ text, setText }: Props) {
  return (
    <>
      {!text.length && <DropZone setText={setText} />}
      <InputTextarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        id="input"
        placeholder="Or input text here..."
      />
    </>
  );
}

type Props = {
  text: string;
  setText: (i: string) => void;
};

export default InputZone;
