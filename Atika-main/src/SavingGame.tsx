import React, { useState, useEffect } from 'react';

interface SavingGoal {
  id: number;
  name: string;
  targetAmount: number;
  savedAmount: number;
}

const SavingGame: React.FC = () => {
  const [goals, setGoals] = useState<SavingGoal[]>(() => {
    const storedGoals = localStorage.getItem('savingGoals');
    return storedGoals ? JSON.parse(storedGoals) : [];
  });
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');
  const [contributionAmount, setContributionAmount] = useState('');
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('savingGoals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (newGoalName.trim() && parseFloat(newGoalAmount) > 0) {
      const newGoal: SavingGoal = {
        id: Date.now(),
        name: newGoalName.trim(),
        targetAmount: parseFloat(newGoalAmount),
        savedAmount: 0,
      };
      setGoals([...goals, newGoal]);
      setNewGoalName('');
      setNewGoalAmount('');
    }
  };

  const contributeToGoal = () => {
    if (selectedGoalId !== null && parseFloat(contributionAmount) > 0) {
      setGoals(
        goals.map(goal =>
          goal.id === selectedGoalId
            ? { ...goal, savedAmount: Math.min(goal.targetAmount, goal.savedAmount + parseFloat(contributionAmount)) }
            : goal
        )
      );
      setContributionAmount('');
      setSelectedGoalId(null);
    }
  };

  const calculateProgress = (goal: SavingGoal): number => {
    return (goal.savedAmount / goal.targetAmount) * 100;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Jeu d'Épargne</h2>
      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2">Ajouter un objectif</h3>
        <input
          type="text"
          value={newGoalName}
          onChange={(e) => setNewGoalName(e.target.value)}
          placeholder="Nom de l'objectif"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
        />
        <input
          type="number"
          value={newGoalAmount}
          onChange={(e) => setNewGoalAmount(e.target.value)}
          placeholder="Montant cible"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
        />
        <button onClick={addGoal} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Ajouter
        </button>
      </div>
      <div>
        <h3 className="text-md font-semibold mb-2">Contribuer à un objectif</h3>
        <select
          value={selectedGoalId || ''}
          onChange={(e) => setSelectedGoalId(parseInt(e.target.value))}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
        >
          <option value="">Sélectionner un objectif</option>
          {goals.map(goal => (
            <option key={goal.id} value={goal.id}>{goal.name}</option>
          ))}
        </select>
        <input
          type="number"
          value={contributionAmount}
          onChange={(e) => setContributionAmount(e.target.value)}
          placeholder="Montant à contribuer"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
        />
        <button onClick={contributeToGoal} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Contribuer
        </button>
      </div>
      <ul className="space-y-4 mt-4">
        {goals.map(goal => (
          <li key={goal.id} className="p-4 border border-gray-300 rounded-lg">
            <h4 className="font-semibold">{goal.name}</h4>
            <p>Cible: {goal.targetAmount}€</p>
            <p>Épargné: {goal.savedAmount}€</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${calculateProgress(goal)}%` }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavingGame;
