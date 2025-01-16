import styled from "styled-components";

import image from "../../Assets/bgCover.png";

export const MainStyled = styled.main`
  height: 100%;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  background-image: url(${image});
  background-size: cover;
  background-position: center;
`;
