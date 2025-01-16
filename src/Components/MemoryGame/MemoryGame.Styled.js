import styled from "styled-components";

export const MemoryGameStyled = styled.div`
  height: 100vh;
`;

export const GameBord = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  max-width: 100%;
  box-sizing: border-box;
`;

export const CardContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: auto;
  border: 2px #000 solid;
`;

export const Card = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  transform-style: preserve-3d;
  transition: all 0.5s ease;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

export const TheFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`;

export const TheBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
`;

export const GameHeader = styled.header`
  margin: 1rem 0;
  width: 100%;
`;

export const GameModal = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  width: 100%;
  height: 100vh;

  z-index: 9999;

  display: flex;
  justify-content: center;
  align-items: center;

  div {
    background-color: #161223;
    color: ${(props) => props.theme.color.white};
    height: 500px;
    width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

export const NumCardModal = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  width: 100%;
  height: 100vh;

  z-index: 9999;

  display: flex;
  justify-content: center;
  align-items: center;

  div {
    background-color: #161223;
    color: ${(props) => props.theme.color.white};
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
