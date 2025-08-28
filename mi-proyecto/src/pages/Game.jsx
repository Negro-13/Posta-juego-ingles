import React, { useState } from "react";
import "../App.css";
import juntos from "../assets/juntos.png";
import player1 from "../assets/player1.png";
import player2 from "../assets/player2.png";

export default function Game() {
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
    const [lastMove, setLastMove] = useState(0); // 👈 guardamos el último avance

    const rollDice = () => {
        const roll = Math.floor(Math.random() * 6) + 1;
        setDice(roll);
        setLastMove(roll); // guardamos la tirada
        movePlayer(roll);
    };

    const playMiniGame = (won) => {
        if (won) {
            alert(`Player ${turn} won the mini-game!`);
        } else {
            alert(`Player ${turn} lost the mini-game and goes back ${lastMove} steps!`);
            if (turn === 1) {
                setPlayer1Index((prev) => Math.max(prev - lastMove, 0));
            } else {
                setPlayer2Index((prev) => Math.max(prev - lastMove, 0));
            }
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
            <button onClick={() => playMiniGame(false)}>watched</button>
            <button onClick={() => playMiniGame(true)}>was watching</button>
        </div>,
        <div>
            <p>While they ______ football, it started raining.</p>
            <button onClick={() => playMiniGame(true)}>were playing</button>
            <button onClick={() => playMiniGame(false)}>played</button>
        </div>,
        <div>
            <p>I ______ dinner when the phone rang.</p>
            <button onClick={() => playMiniGame(false)}>cooked</button>
            <button onClick={() => playMiniGame(true)}>was cooking</button>
        </div>,
        <div>
            <p>He ______ to music while studying.</p>
            <button onClick={() => playMiniGame(true)}>was listening</button>
            <button onClick={() => playMiniGame(false)}>listened</button>
        </div>,
        <div>
            <p>They ______ in the garden and ______ when it started to rain.</p>
            <button onClick={() => playMiniGame(false)}>played / chatted</button>
            <button onClick={() => playMiniGame(true)}>were playing / chatting</button>
        </div>,
        <div>
            <p>She ______ when I arrived.</p>
            <button onClick={() => playMiniGame(true)}>was sleeping</button>
            <button onClick={() => playMiniGame(false)}>slept</button>
        </div>,
        <div>
            <p>We ______ for the bus while it ______.</p>
            <button onClick={() => playMiniGame(false)}>waited / was raining</button>
            <button onClick={() => playMiniGame(true)}>were waiting / rained</button>
        </div>,
        <div>
            <p>He ______ in the park and ______ a bird.</p>
            <button onClick={() => playMiniGame(true)}>was running / saw</button>
            <button onClick={() => playMiniGame(false)}>ran / was seeing</button>
        </div>,
        <div>
            <p>I ______ when she ______.</p>
            <button onClick={() => playMiniGame(false)}>read / was arriving</button>
            <button onClick={() => playMiniGame(true)}>was reading / arrived</button>
        </div>,
        <div>
            <p>They ______ quietly while the teacher ______.</p>
            <button onClick={() => playMiniGame(true)}>were talking / was explaining</button>
            <button onClick={() => playMiniGame(false)}>talked / explained</button>
        </div>,
        <div>
            <p>We ______ to music while cooking.</p>
            <button onClick={() => playMiniGame(false)}>listened</button>
            <button onClick={() => playMiniGame(true)}>were listening</button>
        </div>,
        <div>
            <p>She ______ a book when I entered.</p>
            <button onClick={() => playMiniGame(true)}>was reading</button>
            <button onClick={() => playMiniGame(false)}>read</button>
        </div>,
        <div>
            <p>They ______ chess all afternoon.</p>
            <button onClick={() => playMiniGame(false)}>played</button>
            <button onClick={() => playMiniGame(true)}>were playing</button>
        </div>,
        <div>
            <p>I ______ when he knocked on the door.</p>
            <button onClick={() => playMiniGame(true)}>was studying</button>
            <button onClick={() => playMiniGame(false)}>studied</button>
        </div>,
        <div>
            <p>She ______ coffee when I called.</p>
            <button onClick={() => playMiniGame(false)}>made</button>
            <button onClick={() => playMiniGame(true)}>was making</button>
        </div>,
        <div>
            <p>We ______ in the park yesterday at 5.</p>
            <button onClick={() => playMiniGame(true)}>were walking</button>
            <button onClick={() => playMiniGame(false)}>walked</button>
        </div>,
        <div>
            <p>He ______ when the alarm rang.</p>
            <button onClick={() => playMiniGame(false)}>slept</button>
            <button onClick={() => playMiniGame(true)}>was sleeping</button>
        </div>,
        <div>
            <p>They ______ TV while eating.</p>
            <button onClick={() => playMiniGame(true)}>were watching</button>
            <button onClick={() => playMiniGame(false)}>watched</button>
        </div>,
        <div>
            <p>I ______ the guitar when you arrived.</p>
            <button onClick={() => playMiniGame(false)}>played</button>
            <button onClick={() => playMiniGame(true)}>was playing</button>
        </div>,
        <div>
            <p>We ______ to school when it started raining.</p>
            <button onClick={() => playMiniGame(true)}>were going</button>
            <button onClick={() => playMiniGame(false)}>went</button>
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
            <p>He ______ football with his friends yesterday.</p>
            <button onClick={() => playMiniGame(false)}>plays</button>
            <button onClick={() => playMiniGame(true)}>played</button>
        </div>,
        <div>
            <p>We ______ a delicious cake.</p>
            <button onClick={() => playMiniGame(true)}>ate</button>
            <button onClick={() => playMiniGame(false)}>eat</button>
        </div>,
        <div>
            <p>I ______ my homework last night.</p>
            <button onClick={() => playMiniGame(false)}>do</button>
            <button onClick={() => playMiniGame(true)}>did</button>
        </div>,
        <div>
            <p>She ______ a letter to her friend.</p>
            <button onClick={() => playMiniGame(true)}>wrote</button>
            <button onClick={() => playMiniGame(false)}>write</button>
        </div>,
        <div>
            <p>They ______ to the cinema on Friday.</p>
            <button onClick={() => playMiniGame(false)}>go</button>
            <button onClick={() => playMiniGame(true)}>went</button>
        </div>,
        <div>
            <p>He ______ a bike to school.</p>
            <button onClick={() => playMiniGame(true)}>rode</button>
            <button onClick={() => playMiniGame(false)}>ride</button>
        </div>,
        <div>
            <p>We ______ a movie last weekend.</p>
            <button onClick={() => playMiniGame(false)}>see</button>
            <button onClick={() => playMiniGame(true)}>saw</button>
        </div>,
        <div>
            <p>I ______ my grandparents yesterday.</p>
            <button onClick={() => playMiniGame(true)}>visited</button>
            <button onClick={() => playMiniGame(false)}>visit</button>
        </div>,
        <div>
            <p>She ______ happy when she got the gift.</p>
            <button onClick={() => playMiniGame(false)}>is</button>
            <button onClick={() => playMiniGame(true)}>was</button>
        </div>,
        <div>
            <p>They ______ late to the meeting.</p>
            <button onClick={() => playMiniGame(true)}>arrived</button>
            <button onClick={() => playMiniGame(false)}>arrive</button>
        </div>,
        <div>
            <p>He ______ football yesterday.</p>
            <button onClick={() => playMiniGame(false)}>play</button>
            <button onClick={() => playMiniGame(true)}>played</button>
        </div>,
        <div>
            <p>We ______ a photo together.</p>
            <button onClick={() => playMiniGame(true)}>took</button>
            <button onClick={() => playMiniGame(false)}>take</button>
        </div>,
        <div>
            <p>I ______ a song.</p>
            <button onClick={() => playMiniGame(false)}>sing</button>
            <button onClick={() => playMiniGame(true)}>sang</button>
        </div>,
        <div>
            <p>She ______ her keys.</p>
            <button onClick={() => playMiniGame(true)}>lost</button>
            <button onClick={() => playMiniGame(false)}>lose</button>
        </div>,
        <div>
            <p>They ______ English in school.</p>
            <button onClick={() => playMiniGame(false)}>learn</button>
            <button onClick={() => playMiniGame(true)}>learned</button>
        </div>,
        <div>
            <p>He ______ a letter yesterday.</p>
            <button onClick={() => playMiniGame(true)}>sent</button>
            <button onClick={() => playMiniGame(false)}>send</button>
        </div>,
        <div>
            <p>We ______ our friends at the park.</p>
            <button onClick={() => playMiniGame(false)}>meet</button>
            <button onClick={() => playMiniGame(true)}>met</button>
        </div>,
    ];

    const usedToGames = [
        <div>
            <p>I ______ play outside every day when I was a child.</p>
            <button onClick={() => playMiniGame(true)}>used to</button>
            <button onClick={() => playMiniGame(false)}>use to</button>
        </div>,
        <div>
            <p>She ______ eat a lot of sweets, but now she doesn’t.</p>
            <button onClick={() => playMiniGame(false)}>use to</button>
            <button onClick={() => playMiniGame(true)}>used to</button>
        </div>,
        <div>
            <p>They ______ live in London before moving here.</p>
            <button onClick={() => playMiniGame(true)}>used to</button>
            <button onClick={() => playMiniGame(false)}>use to</button>
        </div>,
        <div>
            <p>He didn’t ______ like vegetables.</p>
            <button onClick={() => playMiniGame(false)}>used to</button>
            <button onClick={() => playMiniGame(true)}>use to</button>
        </div>,
        <div>
            <p>We ______ go to the beach every summer.</p>
            <button onClick={() => playMiniGame(true)}>used to</button>
            <button onClick={() => playMiniGame(false)}>use to</button>
        </div>,
        <div>
            <p>Did you ______ play the guitar?</p>
            <button onClick={() => playMiniGame(false)}>used to</button>
            <button onClick={() => playMiniGame(true)}>use to</button>
        </div>,
        <div>
            <p>I ______ watch cartoons after school.</p>
            <button onClick={() => playMiniGame(true)}>used to</button>
            <button onClick={() => playMiniGame(false)}>use to</button>
        </div>,
        <div>
            <p>She didn’t ______ like spicy food.</p>
            <button onClick={() => playMiniGame(true)}>use to</button>
            <button onClick={() => playMiniGame(false)}>used to</button>
        </div>,
        <div>
            <p>They ______ travel a lot when they were young.</p>
            <button onClick={() => playMiniGame(false)}>use to</button>
            <button onClick={() => playMiniGame(true)}>used to</button>
        </div>,
        <div>
            <p>We ______ visit our grandparents every weekend.</p>
            <button onClick={() => playMiniGame(true)}>used to</button>
            <button onClick={() => playMiniGame(false)}>use to</button>
        </div>,
        <div>
            <p>He didn’t ______ play football.</p>
            <button onClick={() => playMiniGame(false)}>used to</button>
            <button onClick={() => playMiniGame(true)}>use to</button>
        </div>,
        <div>
            <p>I ______ have long hair when I was a kid.</p>
            <button onClick={() => playMiniGame(true)}>used to</button>
            <button onClick={() => playMiniGame(false)}>use to</button>
        </div>,
        <div>
            <p>Did she ______ sing in a choir?</p>
            <button onClick={() => playMiniGame(false)}>used to</button>
            <button onClick={() => playMiniGame(true)}>use to</button>
        </div>,
        <div>
            <p>They ______ play chess together.</p>
            <button onClick={() => playMiniGame(true)}>used to</button>
            <button onClick={() => playMiniGame(false)}>use to</button>
        </div>,
        <div>
            <p>We didn’t ______ have a TV.</p>
            <button onClick={() => playMiniGame(true)}>use to</button>
            <button onClick={() => playMiniGame(false)}>used to</button>
        </div>,
        <div>
            <p>I ______ drink milk before bed.</p>
            <button onClick={() => playMiniGame(false)}>use to</button>
            <button onClick={() => playMiniGame(true)}>used to</button>
        </div>,
        <div>
            <p>She didn’t ______ like coffee.</p>
            <button onClick={() => playMiniGame(true)}>use to</button>
            <button onClick={() => playMiniGame(false)}>used to</button>
        </div>,
        <div>
            <p>They ______ go camping in the mountains.</p>
            <button onClick={() => playMiniGame(true)}>used to</button>
            <button onClick={() => playMiniGame(false)}>use to</button>
        </div>,
        <div>
            <p>Did you ______ play with dolls?</p>
            <button onClick={() => playMiniGame(false)}>used to</button>
            <button onClick={() => playMiniGame(true)}>use to</button>
        </div>,
        <div>
            <p>We ______ walk to school every day.</p>
            <button onClick={() => playMiniGame(true)}>used to</button>
            <button onClick={() => playMiniGame(false)}>use to</button>
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

        const allAnswered = updated.every(ans => ans !== null);
        const allCorrect = updated.every((ans, i) => ans === currentMiniGame.correct[i]);

        if (allCorrect) {
            alert(`Player ${turn} completed the final sentence correctly and won!`);
            resetGame();
        } else if (allAnswered && !allCorrect) {
            alert(`Player ${turn} made a mistake. Turn goes to the other player and moves back!`);

            // Retrocede la cantidad de casillas que avanzó con el dado
            if (turn === 1) {
                setPlayer1Index(prev => Math.max(prev - lastMove, 0));
            } else {
                setPlayer2Index(prev => Math.max(prev - lastMove, 0));
            }

            setTurn(turn === 1 ? 2 : 1);
            setFinalMiniGame(false);
            setFinalAnswers([null, null, null]);
        }
    };



    // -------------------------
    // FUNCIONES DE MOVIMIENTO
    // -------------------------
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
        setLastMove(0);
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
