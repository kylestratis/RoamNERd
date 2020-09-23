import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";

const ButtonTag = styled.button<{ btnTheme?: string }>`
  border: none;
  padding: ${(props) => props.theme.spacer / 2}px;
  font-size: 14px;
  cursor: pointer;

  &:not(:last-of-type) {
    margin-right: ${(props) => props.theme.spacer}px;
  }

  ${(props) => {
    if (props.disabled) {
      return `
          filter: grayscale(0.5);
          cursor: default;
          opacity: 0.8;
        `;
    } else {
      return `
        &:hover {
            filter: contrast(0.8);
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
            border: 1px solid black;
            border-radius: 50%;
        `;
      case "secondary":
        return `
            background-color: ${props.theme.color.primary};
            color: white;
            border: 1px solid black;
            border-radius: 50%;
        `;
      default:
        return `
            background-color: transparent;
            color: black;
      `;
    }
  }}
`;

function IconButton({
  onClick,
  type = "button",
  theme,
  disabled = false,
  icon,
  className,
  fixedWidth,
  size,
}: Props) {
  return (
    <ButtonTag
      className={className}
      onClick={!disabled ? onClick : () => {}}
      type={type}
      btnTheme={theme}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={icon} fixedWidth={fixedWidth} size={size} />
    </ButtonTag>
  );
}

type Props = {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  theme?: "primary" | "secondary";
  icon: IconProp;
  fixedWidth?: boolean;
  size: SizeProp;
};

export default IconButton;
