import { Button } from "antd";
import styled from "styled-components";

const StyledButton = styled(Button)`
  margin: 0.5rem;
  font-weight: normal;
  :focus {
    color: palevioletred;
    border-color: palevioletred;
  }
  :hover {
    color: palevioletred;
    border-color: palevioletred;
  }
  &.ant-btn-clicked:after {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    bottom: -1px;
    right: -1px;
    border-radius: inherit;
    border: 0 solid palevioletred;
    opacity: 0.4;
    -webkit-animation: buttonEffect 0.4s;
    animation: buttonEffect 0.4s;
    display: block;
  }
`;

export default StyledButton;
