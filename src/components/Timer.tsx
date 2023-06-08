import React, { useState, useRef, FC, useEffect } from "react";
import { Player } from "../logic/Player";
import { Colors } from "../logic/Colors";

interface TimerElems {
  currentPlayer: Player | null;
  restart: () => void;
}

const Timer: FC<TimerElems> = ({ currentPlayer, restart }) => {
  const [blackTimer, setBlackTimer] = useState(200);
  const [WhiteTimer, setWhiteTimer] = useState(200);
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

  return (
    <div className="timer">
      <div>
        <button onClick={restart}>Перезапустити гру</button>
      </div>
      <span>Чорні - {blackTimer}</span>
      <span>Білі - {WhiteTimer}</span>
    </div>
  );
};

export default Timer;
