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
  const [moveAfterMiniGame, setMoveAfterMiniGame] = useState(0);
  const [finalMiniGame, setFinalMiniGame] = useState(false);

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDice(roll);
    movePlayer(roll);
  }

  const playMiniGame = (won) => {
    if (finalMiniGame) {
      if (won) {
        alert(`Jugador ${turn} ganó el mini-juego final y es el ganador!`);
        resetGame();
      } else {
        alert(`Jugador ${turn} perdió el mini-juego final. Turno pasa al otro jugador.`);
        setTurn(turn === 1 ? 2 : 1);
        setFinalMiniGame(false);
      }
    } else {
      if (won) {
        alert(`Jugador ${turn} ganó el mini-juego y vuelve a tirar`);
      } else {
        alert(`Jugador ${turn} perdió el mini-juego`);
        setTurn(turn === 1 ? 2 : 1);
      }
      setMiniGame(false);
    }
  }

  const movePlayer = (steps) => {
    if (turn === 1) {
      const newIndex = Math.min(player1Index + steps, sPositions.length - 1);
      setPlayer1Index(newIndex);
      if (newIndex === sPositions.length - 1) {
        setFinalMiniGame(true);
      } else {
        setMiniGame(true);
        setMoveAfterMiniGame(steps);
      }
    } else {
      const newIndex = Math.min(player2Index + steps, sPositions.length - 1);
      setPlayer2Index(newIndex);
      if (newIndex === sPositions.length - 1) {
        setFinalMiniGame(true);
      } else {
        setMiniGame(true);
        setMoveAfterMiniGame(steps);
      }
    }
  }

  const resetGame = () => {
    setPlayer1Index(0);
    setPlayer2Index(0);
    setTurn(1);
    setDice(null);
    setMiniGame(false);
    setFinalMiniGame(false);
  }

  const isWhite = (row, col) => sPositions.some(([r, c]) => r === row && c === col);

  const renderPiece = (row, col) => {
    const p1Pos = sPositions[player1Index];
    const p2Pos = sPositions[player2Index];

    if (p1Pos[0] === row && p1Pos[1] === col &&
      p2Pos[0] === row && p2Pos[1] === col) {
      return <img src={juntos} alt="Juntos" className="piece" />;
    }
    if (p1Pos[0] === row && p1Pos[1] === col) {
      return <img src={player1} alt="Player 1" className="piece" />;
    }
    if (p2Pos[0] === row && p2Pos[1] === col) {
      return <img src={player2} alt="Player 2" className="piece" />;
    }
    return null;
  }

  // -------------------------
  // 4 MINIJUEGOS PREPARADOS
  // -------------------------
  const MiniJuego1 = (
  <div className="mini-game">
    <p>Choose the correct option (Past Perfect):</p>
    <p>By the time we arrived, she ______ the dinner.</p>
    <button onClick={() => playMiniGame(true)}>had prepared</button>
    <button onClick={() => playMiniGame(false)}>prepared</button>
  </div>
);

  const MiniJuego2 = (
    <div>
      <p>Mini-juego 2</p>
    </div>
  );

  const MiniJuego3 = (
    <div>
      <p>Mini-juego 3</p>
    </div>
  );

  const MiniJuego4 = (
    <div>
      <p>Mini-juego 4</p>
    </div>
  );

  const miniGameUI = (
  <>
    {MiniJuego1}
  </>
);

  return (
    <div className="container">
      <div className="board">
        {Array.from({ length: size }).map((_, row) => (
          <div key={row} className="row">
            {Array.from({ length: size }).map((_, col) => (
              <div key={col} className={`tile ${isWhite(row, col) ? "white" : "black"}`}>
                {row === 0 && col === 0 && <div className="outside-label top">INICIO</div>}
                {row === 4 && col === 4 && <div className="outside-label bottom">FIN</div>}
                {renderPiece(row, col)}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="interface">
        <h2>Interfaz</h2>
        <p>Turno: Jugador {turn}</p>
        <p>{dice !== null && `Dado: ${dice}`}</p>
        {!miniGame && !finalMiniGame && <button onClick={rollDice}>Tirar dado</button>}
        {(miniGame || finalMiniGame) && miniGameUI}
      </div>
    </div>
  );
}
