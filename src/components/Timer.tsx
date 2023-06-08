import React, { useState, useRef, FC, useEffect } from "react";
import { Player } from "../logic/Player";
import { Colors } from "../logic/Colors";

interface TimerElems {
  currentPlayer: Player | null;
  restart: () => void;
}

const Timer: FC<TimerElems> = ({ currentPlayer, restart }) => {
  const [blackTimer, setBlackTimer] = useState(200);
  const [whiteTimer, setWhiteTimer] = useState(200);
  const timerId = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    setTimer();
  }, [currentPlayer]);

  function setTimer() {
    if (timerId.current) {
      clearInterval(timerId.current);
    }

    const callback =
      currentPlayer?.color === Colors.WHITE
        ? changeWhiteTimer
        : changeBlackTime;

    timerId.current = setInterval(callback, 1000);
  }

  function changeBlackTime() {
    setBlackTimer((prev) => prev - 1);
  }

  function changeWhiteTimer() {
    setWhiteTimer((prev) => prev - 1);
  }

  const handleRestart = () => {
    setWhiteTimer(200);
    setBlackTimer(200);
    restart();
  };

  return (
    <div className="timer">
      <div>
        <button onClick={handleRestart}>Почати нову гру</button>
      </div>
      <div className="timer-colors">
        <span className="black-timer">Чорні</span> - {blackTimer}
        <span className="white-timer">Білі</span> - {whiteTimer}
      </div>
    </div>
  );
};

export default Timer;
