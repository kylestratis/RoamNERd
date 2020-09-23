import React, { useState } from "react";
import styled from "styled-components";
import { useToasts } from "react-toast-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DropZoneTag = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.spacer}px;
  border: grey 2px dashed;
  width: auto;
  height: 100px;
  margin-bottom: ${({ theme }) => theme.spacer * 3}px;

  ${({ active, theme }) =>
    active &&
    `
    border-color: ${theme.color.secondary};
  `}
`;

const FileInputLabel = styled.label`
  border: 1px solid black;
  border-radius: ${(props) => props.theme.spacer}px;
  padding: ${(props) => props.theme.spacer}px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${(props) => props.theme.color.secondary};
  color: black;
  margin-right: ${(props) => props.theme.spacer}px;
`;

const FileUploadIcon = styled(FontAwesomeIcon)`
  margin-right: ${(props) => props.theme.spacer}px;
`;

const FileInput = styled.input`
  &[type="file"] {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;
  }
`;

function DropZone({ setText }: Props) {
  const { addToast } = useToasts();
  const [isDropZoneHovered, setIsDropZoneHovered] = useState(false);

  const handleFile = (file: File | null) => {
    if (file) {
      console.log(file.type);
      if (file.type === "text/plain" || file.type === "text/markdown") {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e?.target?.result) {
            const text = e.target.result as string;
            setText(text);
          }
        };
        reader.readAsText(file);
      } else {
        setIsDropZoneHovered(false);
        addToast("File must be text", {
          appearance: "error",
        });
      }
    }
  };

  const handleDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
    ev.preventDefault();
    console.log("handling drop");
    if (ev.dataTransfer.items) {
      if (ev.dataTransfer.items[0].kind === "file") {
        handleFile(ev.dataTransfer.items[0].getAsFile());
      }
    } else {
      handleFile(ev.dataTransfer.files[0]);
    }
  };

  return (
    <DropZoneTag
      active={isDropZoneHovered}
      onDragOver={(ev) => {
        ev.preventDefault();
        setIsDropZoneHovered(true);
      }}
      onDragLeave={() => setIsDropZoneHovered(false)}
      onDrop={handleDrop}
    >
      <FileInputLabel>
        <FileUploadIcon icon="upload" />
        Select a text file
        <FileInput
          type="file"
          onChange={(e) =>
            handleFile(e.target.files ? e.target.files[0] : null)
          }
        />
      </FileInputLabel>{" "}
      or drop one here
    </DropZoneTag>
  );
}

type Props = {
  setText: (i: string) => void;
};

export default DropZone;
