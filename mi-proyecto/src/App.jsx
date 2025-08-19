import React, { useState } from "react";
import "./App.css";
import juntos from "./assets/juntos.png";
import player1 from "./assets/player1.png";
import player2 from "./assets/player2.png";

export default function App() {
  const size = 5;
  const sPositions = [
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 4],
    [2, 4], [2, 3], [2, 2], [2, 1], [2, 0],
    [3, 0],
    [4, 0], [4, 1], [4, 2], [4, 3], [4, 4]
  ];

  const [player1Index, setPlayer1Index] = useState(0);
  const [player2Index, setPlayer2Index] = useState(0);
  const [turn, setTurn] = useState(1);
  const [dice, setDice] = useState(null);
  const [miniGame, setMiniGame] = useState(false);
  const [finalMiniGame, setFinalMiniGame] = useState(false);
  const [currentMiniGame, setCurrentMiniGame] = useState(null);
  const [finalAnswers, setFinalAnswers] = useState([null, null, null]);

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDice(roll);
    movePlayer(roll);
  };

  const playMiniGame = (won) => {
    if (won) {
      alert(`Player ${turn} won the mini-game!`);
    } else {
      alert(`Player ${turn} lost the mini-game.`);
      setTurn(turn === 1 ? 2 : 1);
    }
    setMiniGame(false);
  };

  // -------------------------
  // MINIJUEGOS NORMALES
  // -------------------------
  const pastContinuousGames = [
    <div>
      <p>She ______ TV when I called her.</p>
      <button onClick={() => playMiniGame(true)}>was watching</button>
      <button onClick={() => playMiniGame(false)}>watched</button>
    </div>,
    <div>
      <p>While they ______ football, it started raining.</p>
      <button onClick={() => playMiniGame(true)}>were playing</button>
      <button onClick={() => playMiniGame(false)}>played</button>
    </div>,
    <div>
      <p>I ______ dinner when the phone rang.</p>
      <button onClick={() => playMiniGame(true)}>was cooking</button>
      <button onClick={() => playMiniGame(false)}>cooked</button>
    </div>,
    <div>
      <p>He ______ to music while studying.</p>
      <button onClick={() => playMiniGame(true)}>was listening</button>
      <button onClick={() => playMiniGame(false)}>listened</button>
    </div>,
    <div>
      <p>They ______ in the garden and ______ when it started to rain.</p>
      <button onClick={() => playMiniGame(true)}>were playing / chatting</button>
      <button onClick={() => playMiniGame(false)}>played / chatted</button>
    </div>,
    <div>
      <p>She ______ when I arrived.</p>
      <button onClick={() => playMiniGame(true)}>was sleeping</button>
      <button onClick={() => playMiniGame(false)}>slept</button>
    </div>,
    <div>
      <p>We ______ for the bus while it ______.</p>
      <button onClick={() => playMiniGame(true)}>were waiting / rained</button>
      <button onClick={() => playMiniGame(false)}>waited / was raining</button>
    </div>,
    <div>
      <p>He ______ in the park and ______ a bird.</p>
      <button onClick={() => playMiniGame(true)}>was running / saw</button>
      <button onClick={() => playMiniGame(false)}>ran / was seeing</button>
    </div>,
    <div>
      <p>I ______ when she ______.</p>
      <button onClick={() => playMiniGame(true)}>was reading / arrived</button>
      <button onClick={() => playMiniGame(false)}>read / was arriving</button>
    </div>,
    <div>
      <p>They ______ quietly while the teacher ______.</p>
      <button onClick={() => playMiniGame(true)}>were talking / was explaining</button>
      <button onClick={() => playMiniGame(false)}>talked / explained</button>
    </div>,
    <div>
      <p>She ______ her homework when her brother ______ her.</p>
      <button onClick={() => playMiniGame(true)}>was doing / interrupted</button>
      <button onClick={() => playMiniGame(false)}>did / was interrupting</button>
    </div>,
    <div>
      <p>I ______ a book and ______ tea at the same time.</p>
      <button onClick={() => playMiniGame(true)}>was reading / drinking</button>
      <button onClick={() => playMiniGame(false)}>read / drank</button>
    </div>,
    <div>
      <p>We ______ when the lights ______ off.</p>
      <button onClick={() => playMiniGame(true)}>were sleeping / went</button>
      <button onClick={() => playMiniGame(false)}>slept / went off</button>
    </div>,
    <div>
      <p>He ______ while she ______.</p>
      <button onClick={() => playMiniGame(true)}>was cooking / was setting the table</button>
      <button onClick={() => playMiniGame(false)}>cooked / set</button>
    </div>,
    <div>
      <p>They ______ when I ______.</p>
      <button onClick={() => playMiniGame(true)}>were walking / called</button>
      <button onClick={() => playMiniGame(false)}>walked / was calling</button>
    </div>,
    <div>
      <p>She ______ the dishes while he ______ the floor.</p>
      <button onClick={() => playMiniGame(true)}>was washing / was cleaning</button>
      <button onClick={() => playMiniGame(false)}>washed / cleaned</button>
    </div>,
    <div>
      <p>I ______ my room when it suddenly ______.</p>
      <button onClick={() => playMiniGame(true)}>was tidying / started raining</button>
      <button onClick={() => playMiniGame(false)}>tidied / was starting raining</button>
    </div>,
    <div>
      <p>He ______ for his exam while she ______ TV.</p>
      <button onClick={() => playMiniGame(true)}>was studying / was watching</button>
      <button onClick={() => playMiniGame(false)}>studied / watched</button>
    </div>,
    <div>
      <p>They ______ in the pool and ______ when it began to storm.</p>
      <button onClick={() => playMiniGame(true)}>were swimming / laughing</button>
      <button onClick={() => playMiniGame(false)}>swam / were laughing</button>
    </div>,
    <div>
      <p>She ______ while I ______ the table.</p>
      <button onClick={() => playMiniGame(true)}>was reading / was setting</button>
      <button onClick={() => playMiniGame(false)}>read / set</button>
    </div>,
  ];

  const pastSimpleGames = [
    <div>
      <p>I ______ to the store yesterday.</p>
      <button onClick={() => playMiniGame(true)}>went</button>
      <button onClick={() => playMiniGame(false)}>go</button>
    </div>,
    <div>
      <p>She ______ a new dress last week.</p>
      
      <button onClick={() => playMiniGame(false)}>buys</button>
      <button onClick={() => playMiniGame(true)}>bought</button>
    </div>,
    <div>
      <p>They ______ a great time at the party.</p>
      <button onClick={() => playMiniGame(true)}>had</button>
      <button onClick={() => playMiniGame(false)}>have</button>
    </div>,
    <div>
      <p>He ______ his homework two hours ago.</p>
      <button onClick={() => playMiniGame(false)}>finishes</button>
      <button onClick={() => playMiniGame(true)}>finished</button>
    </div>,
    <div>
      <p>We ______ dinner at 8 pm and then ______ TV.</p>
      <button onClick={() => playMiniGame(true)}>ate / watched</button>
      <button onClick={() => playMiniGame(false)}>eat / watch</button>
    </div>,
    <div>
      <p>She ______ the movie yesterday.</p>
      <button onClick={() => playMiniGame(false)}>see</button>
      <button onClick={() => playMiniGame(true)}>saw</button>
    </div>,
    <div>
      <p>I ______ a letter to my friend last night.</p>
      <button onClick={() => playMiniGame(true)}>wrote</button>
      <button onClick={() => playMiniGame(false)}>write</button>
    </div>,
    <div>
      <p>They ______ soccer in the park last Saturday.</p>
      <button onClick={() => playMiniGame(false)}>play</button>
      <button onClick={() => playMiniGame(true)}>played</button>
    </div>,
    <div>
      <p>He ______ the window and then ______ the lights off.</p>
      <button onClick={() => playMiniGame(true)}>opened / turned</button>
      <button onClick={() => playMiniGame(false)}>opens / turn</button>
    </div>,
    <div>
      <p>We ______ breakfast and ______ to school.</p>
      <button onClick={() => playMiniGame(false)}>eat / go</button>
      <button onClick={() => playMiniGame(true)}>ate / went</button>
    </div>,
    <div>
      <p>She ______ very happy when she ______ her results.</p>
      <button onClick={() => playMiniGame(true)}>was / saw</button>
      <button onClick={() => playMiniGame(false)}>is / sees</button>
    </div>,
    <div>
      <p>I ______ a long walk yesterday.</p>
      <button onClick={() => playMiniGame(false)}>take</button>
      <button onClick={() => playMiniGame(true)}>took</button>
    </div>,
    <div>
      <p>He ______ breakfast and then ______ to work.</p>
      <button onClick={() => playMiniGame(true)}>ate / went</button>
      <button onClick={() => playMiniGame(false)}>eats / goes</button>
    </div>,
    <div>
      <p>They ______ a new car last month.</p>
      <button onClick={() => playMiniGame(false)}>buy</button>
      <button onClick={() => playMiniGame(true)}>bought</button>
    </div>,
    <div>
      <p>She ______ a letter and then ______ it to her friend.</p>
      <button onClick={() => playMiniGame(true)}>wrote / sent</button>
      <button onClick={() => playMiniGame(false)}>writes / send</button>
    </div>,
    <div>
      <p>I ______ a book last weekend.</p>
      <button onClick={() => playMiniGame(false)}>reads</button>
      <button onClick={() => playMiniGame(true)}>read</button>
    </div>,
    <div>
      <p>We ______ a new restaurant and ______ dinner there.</p>
      <button onClick={() => playMiniGame(true)}>found / had</button>
      <button onClick={() => playMiniGame(false)}>find / have</button>
    </div>,
    <div>
      <p>He ______ a lot of questions and ______ the answers quickly.</p>
      <button onClick={() => playMiniGame(false)}>ask / write</button>
      <button onClick={() => playMiniGame(true)}>asked / wrote</button>
    </div>,
    <div>
      <p>She ______ a beautiful song yesterday.</p>
      <button onClick={() => playMiniGame(true)}>sang</button>
      <button onClick={() => playMiniGame(false)}>sing</button>
    </div>,
    <div>
      <p>They ______ home and ______ TV all evening.</p>
      <button onClick={() => playMiniGame(false)}>go / watch</button>
      <button onClick={() => playMiniGame(true)}>went / watched</button>
    </div>,
  ];


  const usedToGames = [
    <div>
      <p>I ______ play basketball when I was a kid.</p>
      <button onClick={() => playMiniGame(true)}>used to</button>
      <button onClick={() => playMiniGame(false)}>use to</button>
    </div>,
    <div>
      <p>She ______ eat chocolate every day.</p>
      <button onClick={() => playMiniGame(true)}>used to</button>
      <button onClick={() => playMiniGame(false)}>use</button>
    </div>,
    <div>
      <p>They ______ go to the park on Sundays.</p>
      <button onClick={() => playMiniGame(true)}>used to</button>
      <button onClick={() => playMiniGame(false)}>use to</button>
    </div>,
    <div>
      <p>He ______ have long hair when he was younger.</p>
      <button onClick={() => playMiniGame(true)}>used to</button>
      <button onClick={() => playMiniGame(false)}>uses to</button>
    </div>,
    <div>
      <p>We ______ visit our grandparents every summer and ______ many games together.</p>
      <button onClick={() => playMiniGame(true)}>used to / played</button>
      <button onClick={() => playMiniGame(false)}>use to / play</button>
    </div>,
    <div>
      <p>She ______ live in Paris before moving to London.</p>
      <button onClick={() => playMiniGame(true)}>used to</button>
      <button onClick={() => playMiniGame(false)}>use to</button>
    </div>,
    <div>
      <p>I ______ read a lot of comics when I was a child.</p>
      <button onClick={() => playMiniGame(true)}>used to</button>
      <button onClick={() => playMiniGame(false)}>use</button>
    </div>,
    <div>
      <p>They ______ go swimming in the summer.</p>
      <button onClick={() => playMiniGame(true)}>used to</button>
      <button onClick={() => playMiniGame(false)}>use to</button>
    </div>,
    <div>
      <p>He ______ smoke but he stopped last year.</p>
      <button onClick={() => playMiniGame(true)}>used to</button>
      <button onClick={() => playMiniGame(false)}>use</button>
    </div>,
    <div>
      <p>We ______ play outside after school and ______ hide-and-seek.</p>
      <button onClick={() => playMiniGame(true)}>used to / played</button>
      <button onClick={() => playMiniGame(false)}>use to / play</button>
    </div>,
    <div>
      <p>She ______ go to the library every Friday.</p>
      <button onClick={() => playMiniGame(true)}>used to</button>
      <button onClick={() => playMiniGame(false)}>use to</button>
    </div>,
    <div>
      <p>I ______ have a cat and a dog when I was younger.</p>
      <button onClick={() => playMiniGame(true)}>used to</button>
      <button onClick={() => playMiniGame(false)}>use</button>
    </div>,
    <div>
      <p>They ______ visit museums on holidays.</p>
      <button onClick={() => playMiniGame(true)}>used to</button>
      <button onClick={() => playMiniGame(false)}>use to</button>
    </div>,
    <div>
      <p>He ______ eat ice cream every day during summer.</p>
      <button onClick={() => playMiniGame(true)}>used to</button>
      <button onClick={() => playMiniGame(false)}>use</button>
    </div>,
    <div>
      <p>We ______ play chess in the evenings and ______ cards.</p>
      <button onClick={() => playMiniGame(true)}>used to / played</button>
      <button onClick={() => playMiniGame(false)}>use to / play</button>
    </div>,
    <div>
      <p>She ______ listen to pop music all the time.</p>
      <button onClick={() => playMiniGame(true)}>used to</button>
      <button onClick={() => playMiniGame(false)}>use</button>
    </div>,
    <div>
      <p>I ______ go to bed early and ______ up at 6 am.</p>
      <button onClick={() => playMiniGame(true)}>used to / wake</button>
      <button onClick={() => playMiniGame(false)}>use to / wakes</button>
    </div>,
    <div>
      <p>They ______ go hiking on weekends.</p>
      <button onClick={() => playMiniGame(true)}>used to</button>
      <button onClick={() => playMiniGame(false)}>use to</button>
    </div>,
    <div>
      <p>He ______ play video games every evening before dinner.</p>
      <button onClick={() => playMiniGame(true)}>used to</button>
      <button onClick={() => playMiniGame(false)}>use</button>
    </div>,
    <div>
      <p>We ______ ride our bikes and ______ explore the neighborhood.</p>
      <button onClick={() => playMiniGame(true)}>used to / would</button>
      <button onClick={() => playMiniGame(false)}>use to / will</button>
    </div>,
  ];


  const gameThemes = [pastContinuousGames, pastSimpleGames, usedToGames];

  const chooseRandomMiniGame = () => {
    const randomTheme = gameThemes[Math.floor(Math.random() * gameThemes.length)];
    const randomGame = randomTheme[Math.floor(Math.random() * randomTheme.length)];
    return randomGame;
  };

  // -------------------------
  // MINIJUEGO FINAL
  // -------------------------
  const finalMiniGames = [
    {
      sentence: "While I ______, I realized I ______ what I ______ as a kid.",
      answers: [
        ["was reading", "read"],
        ["lost", "lose"],
        ["used to", "use to"]
      ],
      correct: [0, 0, 0]
    },
    {
      sentence: "She ______ when she ______ a photo of what she ______.",
      answers: [
        ["was cooking", "cooked"],
        ["found", "find"],
        ["used to", "use to"]
      ],
      correct: [0, 0, 0]
    },
    {
      sentence: "They ______ and then ______ something they ______ play with.",
      answers: [
        ["were running", "ran"],
        ["discovered", "discover"],
        ["used to", "use to"]
      ],
      correct: [0, 0, 0]
    },
    {
      sentence: "While he ______, he suddenly ______ a toy he ______ have.",
      answers: [
        ["was walking", "walked"],
        ["saw", "see"],
        ["used to", "use to"]
      ],
      correct: [0, 0, 0]
    },
    {
      sentence: "I ______ when I ______ something I ______ collect.",
      answers: [
        ["was drawing", "drew"],
        ["found", "find"],
        ["used to", "use to"]
      ],
      correct: [0, 0, 0]
    },
    {
      sentence: "She ______ and then ______ an old book she ______ read.",
      answers: [
        ["was cleaning", "cleaned"],
        ["found", "find"],
        ["used to", "use to"]
      ],
      correct: [0, 0, 0]
    },
    {
      sentence: "We ______ outside when we ______ a game we ______ play.",
      answers: [
        ["were running", "ran"],
        ["discovered", "discover"],
        ["used to", "use to"]
      ],
      correct: [0, 0, 0]
    },
    {
      sentence: "He ______ while he ______ something he ______ love.",
      answers: [
        ["was listening", "listened"],
        ["found", "find"],
        ["used to", "use to"]
      ],
      correct: [0, 0, 0]
    },
    {
      sentence: "They ______ when they ______ a toy they ______ play with.",
      answers: [
        ["were playing", "played"],
        ["found", "find"],
        ["used to", "use to"]
      ],
      correct: [0, 0, 0]
    },
    {
      sentence: "I ______ and then ______ a place I ______ visit.",
      answers: [
        ["was walking", "walked"],
        ["discovered", "discover"],
        ["used to", "use to"]
      ],
      correct: [0, 0, 0]
    }
  ];

  const chooseRandomFinalMiniGame = () => {
    return finalMiniGames[Math.floor(Math.random() * finalMiniGames.length)];
  };

  const selectFinalAnswer = (valueIndex, blankIndex) => {
    const updated = [...finalAnswers];
    updated[blankIndex] = valueIndex;
    setFinalAnswers(updated);

    if (updated.every((ans, i) => ans === currentMiniGame.correct[i])) {
      alert(`Player ${turn} completed the final sentence correctly and won!`);
      resetGame();
    } else if (updated.every(ans => ans !== null)) {
      alert(`Player ${turn} made a mistake. Turn goes to the other player.`);
      setTurn(turn === 1 ? 2 : 1);
      setFinalMiniGame(false);
      setFinalAnswers([null, null, null]);
    }
  };


  const movePlayer = (steps) => {
    if (turn === 1) {
      const newIndex = Math.min(player1Index + steps, sPositions.length - 1);
      setPlayer1Index(newIndex);
      if (newIndex === sPositions.length - 1) {
        setCurrentMiniGame(chooseRandomFinalMiniGame());
        setFinalMiniGame(true);
      } else {
        setMiniGame(true);
        setCurrentMiniGame(chooseRandomMiniGame());
      }
    } else {
      const newIndex = Math.min(player2Index + steps, sPositions.length - 1);
      setPlayer2Index(newIndex);
      if (newIndex === sPositions.length - 1) {
        setCurrentMiniGame(chooseRandomFinalMiniGame());
        setFinalMiniGame(true);
      } else {
        setMiniGame(true);
        setCurrentMiniGame(chooseRandomMiniGame());
      }
    }
  };

  const resetGame = () => {
    setPlayer1Index(0);
    setPlayer2Index(0);
    setTurn(1);
    setDice(null);
    setMiniGame(false);
    setFinalMiniGame(false);
    setCurrentMiniGame(null);
    setFinalAnswers([null, null, null]);
  };

  const isWhite = (row, col) => sPositions.some(([r, c]) => r === row && c === col);

  const renderPiece = (row, col) => {
    const p1Pos = sPositions[player1Index];
    const p2Pos = sPositions[player2Index];

    if (p1Pos[0] === row && p1Pos[1] === col &&
      p2Pos[0] === row && p2Pos[1] === col) {
      return <img src={juntos} alt="Both players" className="piece" />;
    }
    if (p1Pos[0] === row && p1Pos[1] === col) {
      return <img src={player1} alt="Player 1" className="piece" />;
    }
    if (p2Pos[0] === row && p2Pos[1] === col) {
      return <img src={player2} alt="Player 2" className="piece" />;
    }
    return null;
  };

  const miniGameUI = finalMiniGame && currentMiniGame ? (
    <div className="mini-game">
      <p>Final Mini-Game: Complete the sentence!</p>
      {currentMiniGame.sentence.split("______").map((text, i) => (
        <span key={i}>
          {i > 0 && currentMiniGame.answers[i - 1].map((ans, j) => (
            <button
              key={j}
              onClick={() => selectFinalAnswer(j, i - 1)}
              style={{
                backgroundColor: finalAnswers[i - 1] === j ? "gray" : "black",
                margin: "0 5px"
              }}
            >
              {ans}
            </button>
          ))}
          {text}
        </span>
      ))}
    </div>
  ) : currentMiniGame ? (
    <div className="mini-game">{currentMiniGame}</div>
  ) : null;

  return (
    <div className="container">
      <div className="board">
        {Array.from({ length: size }).map((_, row) => (
          <div key={row} className="row">
            {Array.from({ length: size }).map((_, col) => (
              <div key={col} className={`tile ${isWhite(row, col) ? "white" : "black"}`}>
                {row === 0 && col === 0 && <div className="outside-label top">START</div>}
                {row === 4 && col === 4 && <div className="outside-label bottom">END</div>}
                {renderPiece(row, col)}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="interface">
        <h2>Interface</h2>
        <p>Turn: Player {turn}</p>
        <p>{dice !== null && `Dice: ${dice}`}</p>
        {!miniGame && !finalMiniGame && <button onClick={rollDice}>Roll Dice</button>}
        {(miniGame || finalMiniGame) && miniGameUI}
      </div>
    </div>
  );
}
