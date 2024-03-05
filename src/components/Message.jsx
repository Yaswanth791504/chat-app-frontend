import styled, { css } from "styled-components";

const Message = styled.div`
  height: fit-content;
  max-width: 35rem;
  width: fit-content;
  padding: 20px 30px;
  border-radius: 90px;
  justify-self: left;

  ${(props) => {
    if (props.type === "from") {
      return css`
        border-bottom-left-radius: 0;
        background-color: var(--orange);
        text-align: left;
        color: white;
      `;
    }
  }};

  ${(props) => {
    if (props.type === "to") {
      return css`
        border-bottom-right-radius: 0;
        text-align: right;
        background-color: #eeeeee5c;
      `;
    }
  }}
`;

Message.defaultProps = {
  type: "to",
};

export default Message;
