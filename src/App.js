import React from "react";
import "./styles.css";

export default function App() {
  const list = ["red", "green", "yellow", "blue", "orange"];
  const [stage, setStage] = React.useState(1);
  const [listColor, setListColor] = React.useState(list);
  const [activeColor, setActiveColor] = React.useState("");
  const [userListColor, setUserListColor] = React.useState([]);
  const [gameState, setGameState] = React.useState("start");
  const [theme, setTheme] = React.useState(() => {
    const rr = Math.round(Math.random() * 10);
    const r = Math.round((rr * (4 - 1)) / 10);
    return r;
  });
  const clickColor = (color) => {
    if (gameState !== "see & mem") {
      if (gameState === "you lose") {
        setUserListColor([]);
        setListColor([...listColor]);
      } else if (gameState === "you win") {
        setStage(stage + 1);
        setUserListColor([]);
        setListColor(randomList());
      } else {
        //window.navigator.vibrate([100]);
        setActiveColor(color);
        setTimeout(() => {
          setActiveColor("");
        }, 500);
        console.log(color);
        const ar = [...userListColor, color];
        setUserListColor(ar);
      }
    }
  };
  const randomList = () => {
    const itemPlus = Math.floor(stage / 5);
    const iteration = [1, 2, 3, 4, 5];
    for (let i = 0; i < itemPlus; i++) {
      iteration.push(1);
    }
    const rList = iteration.map((a, b, c) => {
      const rr = Math.round(Math.random() * 10);
      const r = Math.round((rr * (list.length - 1)) / 10);
      console.log(rr, r);
      return list[r];
    });
    return rList;
  };

  React.useEffect(() => {
    if (
      userListColor[userListColor.length - 1] !==
      listColor[userListColor.length - 1]
    ) {
      setGameState("you lose");
      //window.navigator.vibrate([500]);
    } else if (userListColor.length === listColor.length) {
      setGameState("you win");
     // window.navigator.vibrate([200, 100, 200]);
    }
  }, [userListColor, listColor]);

  React.useEffect(() => {
    console.log(listColor);
    setGameState("see & mem");
    listColor.forEach((color, i) => {
      setTimeout(() => {
        setActiveColor(color);
        setTimeout(() => {
          setActiveColor("");
        }, 500);
        if (listColor.length - 1 === i) {
          setGameState("your turn");
        }
      }, 1000 * i);
    });
  }, [listColor]);

  const Refresh = <div className="refresh">повторить</div>;
  const NextStage = <div className="nextStage">следующий</div>;
  /*
  const switchTheme = () => {
    if (theme === 4) {
      setTheme(0);
    } else {
      setTheme(theme + 1);
    }
  };
*/
  return (
    <div className="App">
      <div className={`game scheme${theme}`}>
        <div
          className={
            activeColor === "green" ? "section green active" : "section green"
          }
          onClick={() => clickColor("green")}
        ></div>
        <div
          className={
            activeColor === "yellow"
              ? "section yellow active"
              : "section yellow"
          }
          onClick={() => clickColor("yellow")}
        ></div>
        <div
          className={
            activeColor === "orange"
              ? "section orange active"
              : "section orange"
          }
          onClick={() => clickColor("orange")}
        ></div>
        <div
          className={
            activeColor === "blue" ? "section blue active" : "section blue"
          }
          onClick={() => clickColor("blue")}
        ></div>
        <div
          className={
            activeColor === "red" ? "section red active" : "section red"
          }
          onClick={() => clickColor("red")}
        >
          <div className="gameState">
            <div className="gameStateUser">
              {gameState === "you lose"
                ? "не верно"
                : gameState === "you win"
                ? "правильно"
                : `запоминай`}
            </div>
            <div className="stage">
              {gameState === "you lose"
                ? Refresh
                : gameState === "you win"
                ? NextStage
                : `этап ${stage}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} /*
<div onClick={switchTheme} className="switchTheme">
        switch theme
      </div>*/
