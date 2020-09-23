import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const BtnIcon = styled(FontAwesomeIcon)`
  margin-right: ${(props) => props.theme.spacer}px;
`;

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
  icon,
  className,
  loading = false,
  loadingContent,
}: Props) {
  const canInvoke = !disabled && !loading;
  return (
    <ButtonTag
      onClick={canInvoke ? onClick : () => {}}
      type={type}
      btnTheme={theme}
      disabled={disabled}
      className={className}
    >
      {!loading ? (
        <>
          {icon && <BtnIcon fixedWidth icon={icon} />} {children}
        </>
      ) : (
        <>
          <BtnIcon fixedWidth icon="spinner" spin />{" "}
          {loadingContent || children}
        </>
      )}
    </ButtonTag>
  );
}

type Props = {
  onClick?: (evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  theme?: "primary" | "secondary";
  children?: React.ReactNode;
  icon?: IconProp;
  className?: string;
  loading?: boolean;
  loadingContent?: React.ReactNode;
};

export default Button;
