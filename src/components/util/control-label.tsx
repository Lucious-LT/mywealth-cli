import React from "react";
import styled from "styled-components";

export const Label = styled.label<{ isFloating?: boolean }>`
  left: 0px;
  pointer-events: none;
  position: absolute;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
  z-index: 1;

  top: ${(props) => (props.isFloating ? `-7px` : `0%`)};
  left: ${(props) => (props.isFloating ? `0px` : `0%`)};
  font-size: ${(props) => (props.isFloating ? `11px` : `0.85rem`)};
  // color: ${(props) => (props.isFloating ? `#2563EB` : `rgb(120,144,156)`)};
`;

export default function Data() {
  return (<></>);
}