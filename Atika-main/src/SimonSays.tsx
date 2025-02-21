import React, { useState, useEffect, useRef } from 'react';

    const SimonSays: React.FC = () => {
      const [sequence, setSequence] = useState<number[]>([]);
      const [userSequence, setUserSequence] = useState<number[]>([]);
      const [score, setScore] = useState(0);
      const [isGameRunning, setIsGameRunning] = useState(false);
      const [isUserTurn, setIsUserTurn] = useState(false);
      const [isLit, setIsLit] = useState<number | null>(null);
      const [isGameOver, setIsGameOver] = useState(false);

      const colors = ['green', 'red', 'yellow', 'blue'];
      const audioRefs = useRef<HTMLAudioElement[]>([
        new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
        new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
        new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
        new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
      ]);

      useEffect(() => {
        if (isGameRunning && !isUserTurn) {
          generateSequence();
        }
      }, [isGameRunning, isUserTurn]);

      useEffect(() => {
        if (sequence.length > 0 && !isUserTurn) {
          playSequence();
        }
      }, [sequence, isUserTurn]);

      const startGame = () => {
        setSequence([]);
        setUserSequence([]);
        setScore(0);
        setIsGameRunning(true);
        setIsUserTurn(false);
        setIsGameOver(false);
      };

      const generateSequence = () => {
        setTimeout(() => {
          const nextColor = Math.floor(Math.random() * 4);
          setSequence(prevSequence => [...prevSequence, nextColor]);
        }, 500);
      };

      const playSequence = async () => {
        setIsUserTurn(false);
        for (const color of sequence) {
          await new Promise(resolve => {
            setIsLit(color);
            audioRefs.current[color].play();
            setTimeout(() => {
              setIsLit(null);
              setTimeout(() => resolve(null), 300);
            }, 500);
          });
        }
        setIsUserTurn(true);
        setUserSequence([]);
      };

      const handleColorClick = (color: number) => {
        if (!isUserTurn || isGameOver) return;

        const newUserSequence = [...userSequence, color];
        setUserSequence(newUserSequence);
        audioRefs.current[color].play();

        const correct = newUserSequence.every((val, index) => val === sequence[index]);

        if (!correct) {
          setIsGameOver(true);
          setIsGameRunning(false);
          alert(`Game Over! Score: ${score}`);
          return;
        }

        if (newUserSequence.length === sequence.length) {
          setScore(prevScore => prevScore + 1);
          setIsUserTurn(false);
          generateSequence();
        }
      };

      return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Simon Says</h2>
          <div className="flex justify-center">
            {colors.map((color, index) => (
              <button
                key={index}
                className={`w-32 h-32 rounded-full m-2 ${color} ${isLit === index ? 'lit' : ''}`}
                onClick={() => handleColorClick(index)}
                disabled={!isUserTurn || isGameOver}
                style={{
                  backgroundColor: color,
                  opacity: isLit === index ? 1 : 0.7,
                  transition: 'opacity 0.3s',
                }}
              />
            ))}
          </div>
          <div className="text-center mt-4">
            <p>Score: {score}</p>
            {!isGameRunning ? (
              <button
                onClick={startGame}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Commencer
              </button>
            ) : isGameOver ? (
              <button
                onClick={startGame}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Rejouer
              </button>
            ) : (
              <p>{isUserTurn ? 'Votre tour' : 'Simon réfléchit...'}</p>
            )}
          </div>
        </div>
      );
    };

    export default SimonSays;
