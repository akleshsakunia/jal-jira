import { Col, Button } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { useState } from "react";
import { FcAddImage, FcAddRow, FcLink } from "react-icons/fc";
import StyledButton from "../../components/StyledButton";

export default () => {
  const [size, setSize] = useState<SizeType>("middle");

  return (
    <Col>
      <StyledButton shape="round" icon={<FcAddImage />} size={size}>
        Attach
      </StyledButton>
      <StyledButton shape="round" icon={<FcAddRow />} size={size}>
        Create subtask
      </StyledButton>
      <StyledButton shape="round" icon={<FcLink />} size={size}>
        Link issue
      </StyledButton>
    </Col>
  );
};
