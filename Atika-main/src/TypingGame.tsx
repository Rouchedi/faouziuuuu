import React, { useState, useEffect, useRef } from 'react';

const TypingGame: React.FC = () => {
  const [word, setWord] = useState('Red');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [bestTime, setBestTime] = useState(localStorage.getItem('bestTime') || 'N/A');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let intervalId: number;

    if (isRunning) {
      setStartTime(Date.now() - elapsedTime);
      intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, startTime, elapsedTime]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const startGame = () => {
    setIsRunning(true);
    setUserInput('');
    setElapsedTime(0);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const stopGame = () => {
    setIsRunning(false);
    if (userInput === word) {
      const timeInSeconds = (elapsedTime / 1000).toFixed(2);
      if (bestTime === 'N/A' || parseFloat(timeInSeconds) < parseFloat(bestTime)) {
        localStorage.setItem('bestTime', timeInSeconds);
        setBestTime(timeInSeconds);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Jeu de Dactylographie</h2>
      <p>Tapez le mot suivant le plus vite possible:</p>
      <p className="text-2xl font-bold text-blue-700">{word}</p>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        onFocus={() => !isRunning && startGame()}
        onBlur={stopGame}
        ref={inputRef}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mb-4"
      />
      <div className="flex justify-between">
        <p>Temps: {(elapsedTime / 1000).toFixed(2)} s</p>
        <p>Record: {bestTime} s</p>
      </div>
      {!isRunning && (
        <button
          onClick={startGame}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4"
        >
          Commencer
        </button>
      )}
      {userInput === word && isRunning && (
        <div className="mt-4 text-green-600 font-bold">
          Bravo!
        </div>
      )}
    </div>
  );
};

export default TypingGame;
