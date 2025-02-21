import React, { useState, useEffect } from 'react';

const NumberGuessingGame: React.FC = () => {
  const [secretNumber, setSecretNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newSecretNumber = Math.floor(Math.random() * 100) + 1;
    setSecretNumber(newSecretNumber);
    setGuess('');
    setMessage('Devinez un nombre entre 1 et 100');
    setAttempts(0);
    setGameWon(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);
  };

  const checkGuess = () => {
    const parsedGuess = parseInt(guess);

    if (isNaN(parsedGuess)) {
      setMessage('Veuillez entrer un nombre valide.');
      return;
    }

    setAttempts(attempts + 1);

    if (parsedGuess === secretNumber) {
      setMessage(`Bravo ! Vous avez deviné le nombre ${secretNumber} en ${attempts + 1} tentatives.`);
      setGameWon(true);
    } else if (parsedGuess < secretNumber) {
      setMessage('Trop bas ! Essayez encore.');
    } else {
      setMessage('Trop haut ! Essayez encore.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Jeu de Devinez le Nombre</h2>
      <p>{message}</p>
      <div className="flex items-center gap-2 mt-4">
        <input
          type="number"
          value={guess}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={gameWon}
        />
        <button
          onClick={checkGuess}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          disabled={gameWon}
        >
          Deviner
        </button>
      </div>
      {gameWon && (
        <button
          onClick={startNewGame}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors mt-4"
        >
          Nouvelle partie
        </button>
      )}
    </div>
  );
};

export default NumberGuessingGame;
