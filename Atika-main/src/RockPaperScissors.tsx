import React, { useState } from 'react';

type Choice = 'rock' | 'paper' | 'scissors' | null;

const RockPaperScissors: React.FC = () => {
  const [userChoice, setUserChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<string>('');

  const choices: Choice[] = ['rock', 'paper', 'scissors'];

  const handleUserChoice = (choice: Choice) => {
    const random = Math.floor(Math.random() * 3);
    const computerChoice: Choice = choices[random];

    setUserChoice(choice);
    setComputerChoice(computerChoice);
    determineResult(choice, computerChoice);
  };

  const determineResult = (userChoice: Choice, computerChoice: Choice) => {
    if (userChoice === computerChoice) {
      setResult("C'est une égalité !");
    } else if (
      (userChoice === 'rock' && computerChoice === 'scissors') ||
      (userChoice === 'paper' && computerChoice === 'rock') ||
      (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
      setResult('Vous avez gagné !');
    } else {
      setResult('Vous avez perdu !');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Pierre, Papier, Ciseaux</h2>
      <div className="flex justify-around mb-4">
        <button
          onClick={() => handleUserChoice('rock')}
          className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg"
        >
          Pierre
        </button>
        <button
          onClick={() => handleUserChoice('paper')}
          className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg"
        >
          Papier
        </button>
        <button
          onClick={() => handleUserChoice('scissors')}
          className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg"
        >
          Ciseaux
        </button>
      </div>
      {userChoice && computerChoice && (
        <div className="mt-4">
          <p>Vous avez choisi: {userChoice}</p>
          <p>L'ordinateur a choisi: {computerChoice}</p>
          <p className="font-semibold">{result}</p>
        </div>
      )}
    </div>
  );
};

export default RockPaperScissors;
