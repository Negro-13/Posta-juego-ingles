import React, { useState, useRef, useEffect } from "react";
import "../App.css";
import juntos from "../assets/juntos.png";
import player1 from "../assets/player1.png";
import player2 from "../assets/player2.png";
import music from "../assets/music.mp3";
import error from "../assets/error.mp3";
import bien from "../assets/bien.mp3";

export default function Game() {
    const size = 7; // Tablero de 7x7
    const sPositions = [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
        [1, 6],
        [2, 6], [2, 5], [2, 4], [2, 3], [2, 2], [2, 1], [2, 0],
        [3, 0],
        [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6],
        [5, 6],
        [6, 6], [6, 5], [6, 4], [6, 3], [6, 2], [6, 1], [6, 0]
    ];
    const specialPositions = [
        [1, 6],
        [3, 0],
        [5, 6]
    ];
    const isSpecialPosition = (index) => {
        const [row, col] = sPositions[index];
        return specialPositions.some(([r, c]) => r === row && c === col);
    };
    const [player1Index, setPlayer1Index] = useState(0);
    const [player2Index, setPlayer2Index] = useState(0);
    const [turn, setTurn] = useState(1);
    const [dice, setDice] = useState(null);
    const [miniGame, setMiniGame] = useState(false);
    const [finalMiniGame, setFinalMiniGame] = useState(false);
    const [currentMiniGame, setCurrentMiniGame] = useState(null);
    const [finalAnswers, setFinalAnswers] = useState([null, null, null]);
    const [lastMove, setLastMove] = useState(0); // 👈 guardamos el último avance
    const errorAudioRef = useRef(null);
    const bienAudioRef = useRef(null);

    const rollDice = () => {
        const roll = Math.floor(Math.random() * 6) + 1;
        setDice(roll);
        setLastMove(roll); // guardamos la tirada
        movePlayer(roll);
    };

    const playMiniGame = (won) => {
        if (won) {
            if (bienAudioRef.current) bienAudioRef.current.play();
            alert(`Player ${turn} won the mini-game!`);
        } else {
            if (errorAudioRef.current) errorAudioRef.current.play();
            alert(`Player ${turn} lost the mini-game! Turn goes to the other player.`);
            setTurn(turn === 1 ? 2 : 1);
        }
        setMiniGame(false);
    };

    // -------------------------
    // MINIJUEGOS NORMALES
    // -------------------------
    const pastContinuousGames = [
        <div>
            <p>While I ______ a novel, my brother ______ to music.</p>
            <button onClick={() => playMiniGame(false)}>read / listened</button>
            <button onClick={() => playMiniGame(true)}>was reading / was listening</button>
            <button onClick={() => playMiniGame(false)}>was read / was listen</button>
        </div>,
        <div>
            <p>She ______ dinner when suddenly the lights ______ out.</p>
            <button onClick={() => playMiniGame(false)}>cooked / was going</button>
            <button onClick={() => playMiniGame(false)}>cooks / goes</button>
            <button onClick={() => playMiniGame(true)}>was cooking / went</button>
        </div>,
        <div>
            <p>They ______ for the bus when it suddenly ______ to snow.</p>
            <button onClick={() => playMiniGame(true)}>were waiting / started</button>
            <button onClick={() => playMiniGame(false)}>waited / was starting</button>
            <button onClick={() => playMiniGame(false)}>waiting / start</button>
        </div>,
        <div>
            <p>He ______ his bike while his sister ______ the plants.</p>
            <button onClick={() => playMiniGame(false)}>fixed / watered</button>
            <button onClick={() => playMiniGame(true)}>was fixing / was watering</button>
            <button onClick={() => playMiniGame(false)}>fix / waters</button>
        </div>,
        <div>
            <p>While I ______ in the park, I ______ an old friend.</p>
            <button onClick={() => playMiniGame(true)}>was walking / met</button>
            <button onClick={() => playMiniGame(false)}>walked / was meeting</button>
            <button onClick={() => playMiniGame(false)}>walk / meets</button>
        </div>,
        <div>
            <p>She ______ while the teacher ______ the rule.</p>
            <button onClick={() => playMiniGame(false)}>didn’t listen / explained</button>
            <button onClick={() => playMiniGame(true)}>wasn’t listening / was explaining</button>
            <button onClick={() => playMiniGame(false)}>don’t listen / explains</button>
        </div>,
        <div>
            <p>The kids ______ outside when their father ______ them.</p>
            <button onClick={() => playMiniGame(false)}>played / was calling</button>
            <button onClick={() => playMiniGame(false)}>play / calls</button>
            <button onClick={() => playMiniGame(true)}>were playing / called</button>
        </div>,
        <div>
            <p>We ______ when the fire alarm suddenly ______.</p>
            <button onClick={() => playMiniGame(true)}>were studying / rang</button>
            <button onClick={() => playMiniGame(false)}>studied / was ringing</button>
            <button onClick={() => playMiniGame(false)}>study / rings</button>
        </div>,
        <div>
            <p>While he ______ to work, he ______ an accident.</p>
            <button onClick={() => playMiniGame(false)}>drove / was seeing</button>
            <button onClick={() => playMiniGame(true)}>was driving / saw</button>
            <button onClick={() => playMiniGame(false)}>drives / sees</button>
        </div>,
        <div>
            <p>They ______ on the phone when the connection ______.</p>
            <button onClick={() => playMiniGame(false)}>talked / was cutting</button>
            <button onClick={() => playMiniGame(false)}>talk / cuts</button>
            <button onClick={() => playMiniGame(true)}>were talking / cut</button>
        </div>,
        <div>
            <p>While my mom ______ the dishes, I ______ my homework.</p>
            <button onClick={() => playMiniGame(true)}>was washing / was doing</button>
            <button onClick={() => playMiniGame(false)}>washed / did</button>
            <button onClick={() => playMiniGame(false)}>washes / does</button>
        </div>,
        <div>
            <p>I ______ TV when the power ______ off.</p>
            <button onClick={() => playMiniGame(false)}>watched / was going</button>
            <button onClick={() => playMiniGame(true)}>was watching / went</button>
            <button onClick={() => playMiniGame(false)}>watch / goes</button>
        </div>,
        <div>
            <p>She ______ her nails when the phone ______.</p>
            <button onClick={() => playMiniGame(false)}>painted / was ringing</button>
            <button onClick={() => playMiniGame(false)}>paints / rings</button>
            <button onClick={() => playMiniGame(true)}>was painting / rang</button>
        </div>,
        <div>
            <p>While we ______ the mountain, it suddenly ______ to rain.</p>
            <button onClick={() => playMiniGame(true)}>were climbing / started</button>
            <button onClick={() => playMiniGame(false)}>climbed / was starting</button>
            <button onClick={() => playMiniGame(false)}>climb / starts</button>
        </div>,
        <div>
            <p>They ______ attention while the teacher ______.</p>
            <button onClick={() => playMiniGame(false)}>didn’t pay / explained</button>
            <button onClick={() => playMiniGame(true)}>weren’t paying / was explaining</button>
            <button onClick={() => playMiniGame(false)}>don’t pay / explains</button>
        </div>,
        <div>
            <p>He ______ at his phone when he ______ over a rock.</p>
            <button onClick={() => playMiniGame(false)}>looked / was tripping</button>
            <button onClick={() => playMiniGame(true)}>was looking / tripped</button>
            <button onClick={() => playMiniGame(false)}>looks / trips</button>
        </div>,
        <div>
            <p>While I ______ breakfast, my dog ______ some bread.</p>
            <button onClick={() => playMiniGame(false)}>prepared / was stealing</button>
            <button onClick={() => playMiniGame(false)}>prepares / steals</button>
            <button onClick={() => playMiniGame(true)}>was preparing / stole</button>
        </div>,
        <div>
            <p>She ______ home when she ______ a strange noise.</p>
            <button onClick={() => playMiniGame(true)}>was walking / heard</button>
            <button onClick={() => playMiniGame(false)}>walked / was hearing</button>
            <button onClick={() => playMiniGame(false)}>walks / hears</button>
        </div>,
        <div>
            <p>They ______ the project while the teacher ______ the homework.</p>
            <button onClick={() => playMiniGame(false)}>discussed / checked</button>
            <button onClick={() => playMiniGame(true)}>were discussing / was checking</button>
            <button onClick={() => playMiniGame(false)}>discuss / checks</button>
        </div>,
        <div>
            <p>I ______ when the earthquake ______.</p>
            <button onClick={() => playMiniGame(false)}>didn’t sleep / was happening</button>
            <button onClick={() => playMiniGame(false)}>don’t sleep / happens</button>
            <button onClick={() => playMiniGame(true)}>wasn’t sleeping / happened</button>
        </div>,

    ];

    const pastSimpleGames = [
        <div>
            <p>I ______ to the store yesterday.</p>
            <button onClick={() => playMiniGame(false)}>go</button>
            <button onClick={() => playMiniGame(true)}>went</button>
            <button onClick={() => playMiniGame(false)}>gone</button>
        </div>,
        <div>
            <p>She ______ a new dress last week.</p>
            <button onClick={() => playMiniGame(false)}>buys</button>
            <button onClick={() => playMiniGame(false)}>buyed</button>
            <button onClick={() => playMiniGame(true)}>bought</button>
        </div>,
        <div>
            <p>They ______ a great time at the party.</p>
            <button onClick={() => playMiniGame(true)}>had</button>
            <button onClick={() => playMiniGame(false)}>have</button>
            <button onClick={() => playMiniGame(false)}>haved</button>
        </div>,
        <div>
            <p>He ______ football with his friends yesterday.</p>
            <button onClick={() => playMiniGame(false)}>plays</button>
            <button onClick={() => playMiniGame(true)}>played</button>
            <button onClick={() => playMiniGame(false)}>play</button>
        </div>,
        <div>
            <p>We ______ a delicious cake.</p>
            <button onClick={() => playMiniGame(false)}>eat</button>
            <button onClick={() => playMiniGame(true)}>ate</button>
            <button onClick={() => playMiniGame(false)}>eated</button>
        </div>,
        <div>
            <p>I ______ my homework last night.</p>
            <button onClick={() => playMiniGame(true)}>did</button>
            <button onClick={() => playMiniGame(false)}>do</button>
            <button onClick={() => playMiniGame(false)}>done</button>
        </div>,
        <div>
            <p>She ______ a letter to her friend.</p>
            <button onClick={() => playMiniGame(false)}>write</button>
            <button onClick={() => playMiniGame(false)}>writed</button>
            <button onClick={() => playMiniGame(true)}>wrote</button>
        </div>,
        <div>
            <p>They ______ to the cinema on Friday.</p>
            <button onClick={() => playMiniGame(true)}>went</button>
            <button onClick={() => playMiniGame(false)}>go</button>
            <button onClick={() => playMiniGame(false)}>goed</button>
        </div>,
        <div>
            <p>He ______ a bike to school.</p>
            <button onClick={() => playMiniGame(false)}>ride</button>
            <button onClick={() => playMiniGame(true)}>rode</button>
            <button onClick={() => playMiniGame(false)}>rided</button>
        </div>,
        <div>
            <p>We ______ a movie last weekend.</p>
            <button onClick={() => playMiniGame(false)}>see</button>
            <button onClick={() => playMiniGame(false)}>seed</button>
            <button onClick={() => playMiniGame(true)}>saw</button>
        </div>,
        <div>
            <p>I ______ my grandparents yesterday.</p>
            <button onClick={() => playMiniGame(false)}>visit</button>
            <button onClick={() => playMiniGame(true)}>visited</button>
            <button onClick={() => playMiniGame(false)}>visitted</button>
        </div>,
        <div>
            <p>She ______ happy when she got the gift.</p>
            <button onClick={() => playMiniGame(true)}>was</button>
            <button onClick={() => playMiniGame(false)}>is</button>
            <button onClick={() => playMiniGame(false)}>were</button>
        </div>,
        <div>
            <p>They ______ late to the meeting.</p>
            <button onClick={() => playMiniGame(false)}>arrive</button>
            <button onClick={() => playMiniGame(true)}>arrived</button>
            <button onClick={() => playMiniGame(false)}>arrives</button>
        </div>,
        <div>
            <p>He ______ football yesterday.</p>
            <button onClick={() => playMiniGame(true)}>played</button>
            <button onClick={() => playMiniGame(false)}>plays</button>
            <button onClick={() => playMiniGame(false)}>play</button>
        </div>,
        <div>
            <p>We ______ a photo together.</p>
            <button onClick={() => playMiniGame(false)}>take</button>
            <button onClick={() => playMiniGame(true)}>took</button>
            <button onClick={() => playMiniGame(false)}>taked</button>
        </div>,
        <div>
            <p>I ______ a song.</p>
            <button onClick={() => playMiniGame(false)}>sing</button>
            <button onClick={() => playMiniGame(false)}>singed</button>
            <button onClick={() => playMiniGame(true)}>sang</button>
        </div>,
        <div>
            <p>She ______ her keys.</p>
            <button onClick={() => playMiniGame(true)}>lost</button>
            <button onClick={() => playMiniGame(false)}>lose</button>
            <button onClick={() => playMiniGame(false)}>loses</button>
        </div>,
        <div>
            <p>They ______ English in school.</p>
            <button onClick={() => playMiniGame(false)}>learn</button>
            <button onClick={() => playMiniGame(true)}>learned</button>
            <button onClick={() => playMiniGame(false)}>learnted</button>
        </div>,
        <div>
            <p>He ______ a letter yesterday.</p>
            <button onClick={() => playMiniGame(false)}>send</button>
            <button onClick={() => playMiniGame(true)}>sent</button>
            <button onClick={() => playMiniGame(false)}>sended</button>
        </div>,
        <div>
            <p>We ______ our friends at the park.</p>
            <button onClick={() => playMiniGame(false)}>meet</button>
            <button onClick={() => playMiniGame(false)}>meetet</button>
            <button onClick={() => playMiniGame(true)}>met</button>
        </div>

    ];

    const usedToGames = [
        <div>
            <p>I ______ football when I was a kid.</p>
            <button onClick={() => playMiniGame(true)}>used to play</button>
            <button onClick={() => playMiniGame(false)}>plays</button>
            <button onClick={() => playMiniGame(false)}>played</button>
        </div>,
        <div>
            <p>She ______ to the store every Saturday.</p>
            <button onClick={() => playMiniGame(false)}>go</button>
            <button onClick={() => playMiniGame(true)}>used to go</button>
            <button onClick={() => playMiniGame(false)}>went</button>
        </div>,
        <div>
            <p>They ______ cartoons after school.</p>
            <button onClick={() => playMiniGame(false)}>watch</button>
            <button onClick={() => playMiniGame(false)}>watched</button>
            <button onClick={() => playMiniGame(true)}>used to watch</button>
        </div>,
        <div>
            <p>We ______ in the park every weekend.</p>
            <button onClick={() => playMiniGame(true)}>used to walk</button>
            <button onClick={() => playMiniGame(false)}>walks</button>
            <button onClick={() => playMiniGame(false)}>walked</button>
        </div>,
        <div>
            <p>He ______ milk every morning when he was a child.</p>
            <button onClick={() => playMiniGame(false)}>drink</button>
            <button onClick={() => playMiniGame(true)}>used to drink</button>
            <button onClick={() => playMiniGame(false)}>drank</button>
        </div>,
        <div>
            <p>I ______ with my cousins at the beach.</p>
            <button onClick={() => playMiniGame(false)}>swim</button>
            <button onClick={() => playMiniGame(false)}>swam</button>
            <button onClick={() => playMiniGame(true)}>used to swim</button>
        </div>,
        <div>
            <p>They ______ songs together after school.</p>
            <button onClick={() => playMiniGame(true)}>used to sing</button>
            <button onClick={() => playMiniGame(false)}>sing</button>
            <button onClick={() => playMiniGame(false)}>sang</button>
        </div>,
        <div>
            <p>She ______ a lot of books when she was younger.</p>
            <button onClick={() => playMiniGame(false)}>reads</button>
            <button onClick={() => playMiniGame(true)}>used to read</button>
            <button onClick={() => playMiniGame(false)}>read</button>
        </div>,
        <div>
            <p>We ______ our grandparents every Sunday.</p>
            <button onClick={() => playMiniGame(false)}>visit</button>
            <button onClick={() => playMiniGame(false)}>visited</button>
            <button onClick={() => playMiniGame(true)}>used to visit</button>
        </div>,
        <div>
            <p>He ______ the guitar in a band.</p>
            <button onClick={() => playMiniGame(true)}>used to play</button>
            <button onClick={() => playMiniGame(false)}>plays</button>
            <button onClick={() => playMiniGame(false)}>played</button>
        </div>,
        <div>
            <p>I ______ to school by bike.</p>
            <button onClick={() => playMiniGame(false)}>ride</button>
            <button onClick={() => playMiniGame(true)}>used to ride</button>
            <button onClick={() => playMiniGame(false)}>rode</button>
        </div>,
        <div>
            <p>She ______ breakfast at 8 every day.</p>
            <button onClick={() => playMiniGame(false)}>eat</button>
            <button onClick={() => playMiniGame(false)}>ate</button>
            <button onClick={() => playMiniGame(true)}>used to eat</button>
        </div>,
        <div>
            <p>They ______ football every afternoon.</p>
            <button onClick={() => playMiniGame(true)}>used to play</button>
            <button onClick={() => playMiniGame(false)}>play</button>
            <button onClick={() => playMiniGame(false)}>played</button>
        </div>,
        <div>
            <p>We ______ in that house before moving.</p>
            <button onClick={() => playMiniGame(false)}>live</button>
            <button onClick={() => playMiniGame(true)}>used to live</button>
            <button onClick={() => playMiniGame(false)}>lived</button>
        </div>,
        <div>
            <p>He ______ very shy when he was little.</p>
            <button onClick={() => playMiniGame(false)}>is</button>
            <button onClick={() => playMiniGame(false)}>was</button>
            <button onClick={() => playMiniGame(true)}>used to be</button>
        </div>,
        <div>
            <p>I ______ too much coffee, but now I don’t.</p>
            <button onClick={() => playMiniGame(true)}>used to drink</button>
            <button onClick={() => playMiniGame(false)}>drinks</button>
            <button onClick={() => playMiniGame(false)}>drank</button>
        </div>,
        <div>
            <p>She ______ nervous before exams.</p>
            <button onClick={() => playMiniGame(false)}>is</button>
            <button onClick={() => playMiniGame(true)}>used to be</button>
            <button onClick={() => playMiniGame(false)}>was</button>
        </div>,
        <div>
            <p>They ______ a big dog in their garden.</p>
            <button onClick={() => playMiniGame(false)}>have</button>
            <button onClick={() => playMiniGame(false)}>had</button>
            <button onClick={() => playMiniGame(true)}>used to have</button>
        </div>,
        <div>
            <p>We ______ in Spain when I was a child.</p>
            <button onClick={() => playMiniGame(true)}>used to live</button>
            <button onClick={() => playMiniGame(false)}>lives</button>
            <button onClick={() => playMiniGame(false)}>lived</button>
        </div>,
        <div>
            <p>He ______ very friendly, but not anymore.</p>
            <button onClick={() => playMiniGame(false)}>was</button>
            <button onClick={() => playMiniGame(true)}>used to be</button>
            <button onClick={() => playMiniGame(false)}>is</button>
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
                ["read", "was reading"],
                ["lose", "lost"],
                ["used to", "use to"]
            ],
            correct: [1, 1, 0]
        },
        {
            sentence: "She ______ when she ______ a photo of what she ______.",
            answers: [
                ["was cooking", "cooked"],
                ["find", "found"],
                ["used to", "use to"]
            ],
            correct: [0, 1, 0]
        },
        {
            sentence: "They ______ and then ______ something they ______ play with.",
            answers: [
                ["were running", "ran"],
                ["discovered", "discover"],
                ["use to", "used to"]
            ],
            correct: [0, 0, 1]
        },
        {
            sentence: "While he ______, he suddenly ______ a toy he ______ have.",
            answers: [
                ["walked", "was walking"],
                ["see", "saw"],
                ["used to", "use to"]
            ],
            correct: [1, 1, 0]
        },
        {
            sentence: "I ______ when I ______ something I ______ collect.",
            answers: [
                ["was drawing", "drew"],
                ["find", "found"],
                ["used to", "use to"]
            ],
            correct: [0, 1, 0]
        },
        {
            sentence: "She ______ and then ______ an old book she ______ read.",
            answers: [
                ["cleaned", "was cleaning"],
                ["found", "find"],
                ["use to", "used to"]
            ],
            correct: [1, 0, 1]
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
                ["find", "found"],
                ["used to", "use to"]
            ],
            correct: [0, 1, 0]
        },
        {
            sentence: "They ______ when they ______ a toy they ______ play with.",
            answers: [
                ["were playing", "played"],
                ["find", "found"],
                ["use to", "used to"]
            ],
            correct: [0, 1, 1]
        },
        {
            sentence: "I ______ and then ______ a place I ______ visit.",
            answers: [
                ["was walking", "walked"],
                ["discovered", "discover"],
                ["use to", "used to"]
            ],
            correct: [0, 0, 1]
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
            if (bienAudioRef.current) bienAudioRef.current.play();
            alert(`Player ${turn} completed the final sentence correctly and won!`);
            resetGame();
        } else if (allAnswered && !allCorrect) {
            if (errorAudioRef.current) errorAudioRef.current.play();
            alert(`Player ${turn} made a mistake. Turn goes to the other player!`);
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
            if (isSpecialPosition(newIndex)) {
                setPlayer1Index(0);
                setTurn(2);
                setDice(null);
                setMiniGame(false);
                setFinalMiniGame(false);
                setCurrentMiniGame(null);
                setFinalAnswers([null, null, null]);
                // NO poner setLastMove(0) aquí
                alert("¡Caíste en una casilla especial! Vuelves al inicio y el turno pasa al siguiente jugador.");
                return;
            }
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
            if (isSpecialPosition(newIndex)) {
                setPlayer2Index(0);
                setTurn(1);
                setDice(null);
                setMiniGame(false);
                setFinalMiniGame(false);
                setCurrentMiniGame(null);
                setFinalAnswers([null, null, null]);
                // NO poner setLastMove(0) aquí
                alert("¡Caíste en una casilla especial! Vuelves al inicio y el turno pasa al siguiente jugador.");
                return;
            }
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


    const isRed = (row, col) => specialPositions.some(([r, c]) => r === row && c === col);
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
            <audio src={music} autoPlay loop />
            <audio src={error} ref={errorAudioRef} />
            <audio src={bien} ref={bienAudioRef} />
            <div className="board">
                {Array.from({ length: size }).map((_, row) => (
                    <div key={row} className="row">
                        {Array.from({ length: size }).map((_, col) => (
                            <div
                                key={col}
                                className={`tile ${isRed(row, col)
                                        ? "red"
                                        : isWhite(row, col)
                                            ? "white"
                                            : "black"
                                    }`}
                            >
                                {row === 0 && col === 0 && <div className="outside-label top">START</div>}
                                {row === 6 && col === 0 && <div className="outside-label bottom">END</div>}
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