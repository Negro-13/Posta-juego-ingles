import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/fondo.png"; // Pon tu imagen en src/assets/

export default function StartPage() {
  const navigate = useNavigate();

  const theory = [
    {
      title: "Past Simple",
      usage: "Used for actions completed at a specific time in the past.",
      content: `Affirmative: I walked to the park yesterday.
Negative: I did not walk to the park yesterday.
Question: Did you walk to the park yesterday?`,
    },
    {
      title: "Past Continuous",
      usage: "Used for actions that were ongoing at a specific moment in the past.",
      content: `Affirmative: I was walking to the park when it started to rain.
Negative: I was not walking to the park when it started to rain.
Question: Were you walking to the park when it started to rain?`,
    },
    {
      title: "Used To",
      usage: "Used for past habits or states that no longer happen.",
      content: `Affirmative: I used to play soccer every weekend.
Negative: I did not use to play soccer every weekend.
Question: Did you use to play soccer every weekend?`,
    },
  ];

  return (
    <div
      style={{
        textAlign: "center",
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "black",
        padding: "50px 20px",
      }}
    >
      <h1>Welcome to the English Game</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          margin: "50px 0",
          flexWrap: "wrap",
        }}
      >
        {theory.map((item, index) => (
          <div
            key={index}
            style={{
              width: "300px",
              padding: "20px",
              background: "rgba(255, 255, 255, 0.9)",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              borderRadius: "10px",
              textAlign: "left",
              whiteSpace: "pre-line",
            }}
          >
            <h2>{item.title}</h2>
            <p style={{ fontStyle: "italic", marginBottom: "10px" }}>{item.usage}</p>
            <p>{item.content}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/game")}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Start Game
      </button>
    </div>
  );
}
