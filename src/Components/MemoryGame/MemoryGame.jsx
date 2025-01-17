import {
  MemoryGameStyled,
  Card,
  CardContainer,
  TheBack,
  TheFront,
  GameBord,
  GameHeader,
  GameModal,
  NumCardModal,
} from "./MemoryGame.Styled";

import { useEffect, useState } from "react";
import { data } from "../../Data/Cards/Cards";

import frontImage from "../../Assets/rust-campfire.jpg";

export const MemoryGame = () => {
  // bruger useState til at holde styr på om spillet er igang eller ej
  const [gameIsRuning, setGameIsRuning] = useState(false);
  // bruger useState til at holde styr på om kortet er flipped eller ej
  const [flipped, setFlipped] = useState([]);
  // bruger useState til at holde styr på kortene
  const [cards, setCards] = useState([]);
  // bruger useState til at holde styr på om kortene er et match
  const [matched, setMatched] = useState([]);
  // bruger useState til at holde styr på hvilke kort der er klikket på
  const [clickCards, setClickCards] = useState([]);
  // bruger useState til at holde styr på hvor mange gange man har klikket på kortene
  const [turns, setTurns] = useState(0);
  // bruger useState til at holde styr på om modalen er åben eller ej
  const [isModalOpen, setIsModalOpen] = useState(false);
  // bruger useState til at holde styr på om modalen er åben eller ej
  const [ModalNumCards, setModalNumCards] = useState(true);
  // bruger useState til at holde styr på hvor mange kort der skal være i spillet
  const [numCards, setNumCards] = useState(0);

  const StartGame = () => {
    const sliceData = data.slice(0, numCards);
    // kopiere arrayet
    const cards = sliceData.concat(sliceData);
    // sortere arrayet
    cards.sort(() => Math.random() - 0.5);
    // sætter cards arrayet
    setCards(cards);
    setModalNumCards(false);
    setIsModalOpen(false);
  };

  //#region Timer

  const [startTimer, setStartTimer] = useState(false);

  const [count, setCount] = useState(0);
  const [time, setTime] = useState("00:00:00");

  const initTime = new Date();

  const showTimer = (ms) => {
    const milliseconds = Math.floor((ms % 1000) / 10)
      .toString()
      .padStart(2, "0");
    const second = Math.floor((ms / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const minute = Math.floor((ms / 1000 / 60) % 60)
      .toString()
      .padStart(2, "0");
    setTime(minute + ":" + second + ":" + milliseconds);
  };

  const clearTime = () => {
    setTime("00:00:00");
    setCount(0);
  };

  useEffect(() => {
    if (!startTimer) {
      return;
    }
    const id = setInterval(() => {
      let left = count + (new Date() - initTime);
      setCount(left);
      showTimer(left);
      if (left <= 0) {
        setTime("00:00:00:00");
        clearInterval(id);
      }
    }, 1);
    return () => clearInterval(id);
  }, [startTimer]);

  useEffect(() => {
    if (gameIsRuning === true) {
      setStartTimer(true);
    }
  }, [gameIsRuning]);

  //#endregion

  // bruger concat til at kopiere arrayet og derefter bruger sort og math til at sortere det

  const handleClick = (index) => {
    setGameIsRuning(true);
    // bruger if statement til at tjekke clickCards arrayet og om der er klikket på 2 kort så man kun kan kilkke på 2 kort
    // burger !matched.includes(index) til at man ikke kan klikke på et kort der allerede er et match og dermed ikke kan klikke på det igen
    // bruger !flipped[index] til at man ikke kan klikke på et kort der allerede er flipped og dermed ikke kan klikke på det igen
    if (clickCards.length < 2 && !matched.includes(index) && !flipped[index]) {
      // setter card index til clickCards arrayet så der kun kan ver klikket på 2 kort
      setClickCards([...clickCards, index]);
      console.log(clickCards);
      console.log(...clickCards);

      // bruger setTurns til at tælle
      setTurns(turns + 1);
      // laver en new array med alle de flipped kort  ... er en spread operator som kopierer arrayet eller laver et nyt array
      const newFlipped = [...flipped];
      // flipper kortet på index
      // if newFlipped[index] is false, !newFlipped[index] will be true.
      // if newFlipped[index] is true, !newFlipped[index] will be false.
      newFlipped[index] = !newFlipped[index];
      setFlipped(newFlipped);

      // tjekker om der er klikket på 2 kort
      // bruger setClickCards til at reset clickCards arrayet om det er et match eller ej
      if (clickCards.length > 0) {
        // tjekker om det er et match
        // bruger cards arrayet og index til at tjekke om det er et match
        if (cards[clickCards[0]].id === cards[index].id) {
          // hvis det er et match så tilføjer vi kortene til matched arrayet
          setMatched([...matched, clickCards[0], index]);
          setClickCards([]);
        } else {
          // venter 1 sekund og flipper kortene tilbage
          setTimeout(() => {
            // bruger setFlipped til at flippe kortene tilbage
            setFlipped((prevFlipped) => {
              const newFlipped = [...prevFlipped];
              newFlipped[clickCards[0]] = false;
              newFlipped[index] = false;
              return newFlipped;
            });
            setClickCards([]);
            // 1000 ms = 1 sekund
          }, 1000);
        }
      }
    }
  };

  useEffect(() => {
    if (gameIsRuning === true) {
      if (matched.length === cards.length) {
        setStartTimer(false);
        setTimeout(() => {
          console.log("Matched length:", matched.length);
          console.log("Cards length:", cards.length);
          setGameIsRuning(false);
          setIsModalOpen(true);
        }, 500);
      }
    }
  }, [matched]);

  const resetGame = () => {
    setGameIsRuning(false);
    setFlipped([]);
    setMatched([]);
    setClickCards([]);
    setTurns(0);
    clearTime();
    setStartTimer(false);
    setIsModalOpen(false);
    setModalNumCards(true);
    setNumCards(0);
    setCards([]);
  };

  return (
    <MemoryGameStyled>
      {isModalOpen && (
        <GameModal>
          <div>
            <div>
              <h1>You Win</h1>
              <p>Time: {time}</p>
              <p>Moves: {turns}</p>
              <button onClick={resetGame}>ReStart</button>
            </div>
          </div>
        </GameModal>
      )}

      {ModalNumCards && (
        <NumCardModal>
          <div>
            <div>
              <h1>Start Game</h1>
              <p>Choose number of cards</p>
              <p>0-19</p>
              <input
                type="text"
                value={numCards}
                onChange={(e) => setNumCards(e.target.value)}
              />
              <button onClick={() => StartGame()}>Start</button>
            </div>
          </div>
        </NumCardModal>
      )}

      <GameHeader>
        <h1>Memory Game</h1>
        <p>Turns: {turns}</p>
        <p>Time: {time}</p>
      </GameHeader>

      <GameBord>
        {cards.map((card, index) => {
          const isFlipped = flipped[index];
          return (
            <CardContainer key={index} onClick={() => handleClick(index)}>
              <Card
                style={{
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
                }}
              >
                <TheFront>
                  <img src={frontImage} alt="#" />
                </TheFront>
                <TheBack>
                  <img src={card.image} alt="#" />
                </TheBack>
              </Card>
            </CardContainer>
          );
        })}
      </GameBord>
    </MemoryGameStyled>
  );
};
