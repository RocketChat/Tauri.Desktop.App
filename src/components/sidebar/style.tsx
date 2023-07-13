import styled from "@emotion/styled";
import { css } from "@emotion/react"
import { withTooltip } from "./withToolTip";

type WrapperProps = {
  sideBarStyle: {
    background?: string;
    color?: string;
    border?: string;
  };
  isVisible: boolean;
};

export const Wrapper = styled.div`
  flex: 0 0 68px;
  align-self: stretch;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  user-select: none;
  -webkit-app-region: drag;

  transition: margin-inline-start 230ms ease-in-out,
    visibility 230ms ease-in-out;
  background-color: #2f343d;
  border: none;
`;


type ContentProps = {
  withWindowButtons: boolean;
};

export const Content = styled.div<ContentProps>`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  padding-top: 10px;
  align-items: center;

  ${({ withWindowButtons }) =>
    withWindowButtons &&
    css`
      padding-top: 28px;
    `}
`;

export const Button = styled.button`
  position: relative;
  height: 40px;
  border: none;
  padding: 0;
  margin-top: 14px;
  font-size: 2.5rem;
  line-height: 1.25;
  background: rgba(0, 0, 0, 0);
  color: inherit;
  font-family: inherit;
`;

type SidebarActionButtonProps = {
  isSelected?: boolean;
  tooltip: string;
};

export const SidebarActionButton = styled.span<SidebarActionButtonProps>`
  display: flex;
  justify-content: center;
  color: white;
  align-items: center;
  width: 40px;
  height: 40px;
  line-height: 30px;
  transition: opacity var(--transitions-duration);
  opacity: 0.6;
  color: inherit;
  background: rgba(0, 0, 0, 0);
  cursor: pointer;

  ${({ isSelected }) =>
    isSelected &&
    css`
      opacity: 1;
    `}

  &:hover {
    opacity: 1;
  }

  ${withTooltip}
`;

export const BottomButtons = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 16px;
`;
