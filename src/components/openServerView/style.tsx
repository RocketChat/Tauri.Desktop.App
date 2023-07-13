import styled from "@emotion/styled";
import { css } from "@emotion/react"


type WrapperProps = {
  isVisible: boolean;
};

export const Wrapper = styled.section<WrapperProps>`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #2f343d;

  ${({ isVisible }) =>
    css`
      display: ${isVisible ? 'flex' : 'none'};
    `};
`;


export const StyledWebView = styled('webview', {
  shouldForwardProp: (propName) =>
    propName === 'partition' ||
    propName === 'allowpopups' ||
    propName === 'webpreferences' || 
    propName === 'src',
})`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;


