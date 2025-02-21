import React, { useState } from 'react';

interface Challenge {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const SavingChallenge: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: 1, title: "Défi sans dépense", description: "Ne dépensez rien pendant une journée.", completed: false },
    { id: 2, title: "Cuisinez à la maison", description: "Préparez tous vos repas à la maison pendant une semaine.", completed: false },
    { id: 3, title: "Économisez l'énergie", description: "Réduisez votre consommation d'énergie de 10% ce mois-ci.", completed: false },
  ]);

  const toggleChallenge = (id: number) => {
    setChallenges(
      challenges.map(challenge =>
        challenge.id === id ? { ...challenge, completed: !challenge.completed } : challenge
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Challenge Économies</h2>
      <ul className="space-y-2">
        {challenges.map(challenge => (
          <li
            key={challenge.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <h3 className="font-semibold">{challenge.title}</h3>
              <p className="text-gray-600">{challenge.description}</p>
            </div>
            <input
              type="checkbox"
              checked={challenge.completed}
              onChange={() => toggleChallenge(challenge.id)}
              className="w-5 h-5 text-blue-600"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavingChallenge;
