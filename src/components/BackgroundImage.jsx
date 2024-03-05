import styled, { css } from "styled-components";

const BackgroundImage = styled.div`
  height: 20rem;
  width: 100%;

  ${(props) => {
    if (props.link) {
      return css`
        background-image: url(${props.link});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      `;
    } else {
      return css`
        background: linear-gradient(
          180deg,
          rgba(236, 233, 233, 1) 2%,
          rgba(207, 113, 53, 1) 100%
        );
      `;
    }
  }}

  padding: 10px;
  border-radius: 20px;
  display: flex;
  gap: 10rem;
`;

export default BackgroundImage;
