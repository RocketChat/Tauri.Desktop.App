
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { FC } from 'react';

export const GlobalStyles: FC = () => (
  <Global
    styles={css`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      :focus {
        outline: 0 !important;
        outline-style: none;
        outline-color: transparent;
      }

      body {
        -webkit-font-smoothing: antialiased;
        margin: 0;
        padding: 0;
        font-family: system-ui;
        font-size: 0.875rem;
        line-height: 1rem;
        background-color: #2f343d; 
      }
    `}
  />
);

export const WindowDragBar = styled.div`
  position: fixed;
  background-color: #2f343d;
  width: 100vw;
  height: 22px;
  data-tauri-drag-region
`;

export const Wrapper = styled.div`
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  cursor: default;
  user-select: none;
  background-color: rgb(24, 26, 30);
  display: flex;
  flex-flow: row nowrap;
`;

export const ViewsWrapper = styled.div`
  position: relative;
  flex: 1 1 auto;
  align-self: stretch;
  max-width: 100%;
`;
