import React from "react";
import styled from "styled-components";

const ButtonTag = styled.button<{ btnTheme: string }>`
  border: 1px solid black;
  border-radius: ${(props) => props.theme.spacer}px;
  padding: ${(props) => props.theme.spacer}px;
  font-size: 14px;
  cursor: pointer;

  &:not(:last-of-type) {
    margin-right: ${(props) => props.theme.spacer}px;
  }

  ${(props) => {
    if (props.disabled) {
      return `
          filter: contrast(0.8) grayscale(0.2);
          cursor: default;
        `;
    } else {
      return `
        &:hover {
            filter: contrast(1.5);
        }
        `;
    }
  }}

  ${(props) => {
    switch (props.btnTheme) {
      case "primary":
        return `
            background-color: ${props.theme.color.secondary};
            color: black;
        `;
      case "secondary":
        return `
            background-color: ${props.theme.color.primary};
            color: white;
        `;
    }
  }}
`;

function Button({
  onClick,
  type = "button",
  theme = "primary",
  disabled = false,
  children,
}: Props) {
  return (
    <ButtonTag
      onClick={!disabled ? onClick : () => {}}
      type={type}
      btnTheme={theme}
      disabled={disabled}
    >
      {children}
    </ButtonTag>
  );
}

type Props = {
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  theme?: "primary" | "secondary";
  children?: React.ReactNode;
};

export default Button;
