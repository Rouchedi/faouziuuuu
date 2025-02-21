import React, { useState } from 'react';

interface Question {
  questionText: string;
  answerOptions: string[];
  correctAnswer: string;
}

const QuizGame: React.FC = () => {
  const questions: Question[] = [
    {
      questionText: "Quel est le meilleur moyen d'économiser de l'argent sur l'épicerie ?",
      answerOptions: [
        "Acheter des marques chères",
        "Planifier les repas à l'avance",
        "Faire les courses sans liste",
        "Ignorer les circulaires"
      ],
      correctAnswer: "Planifier les repas à l'avance",
    },
    {
      questionText: "Quelle est une bonne stratégie pour réduire les dépenses énergétiques à la maison ?",
      answerOptions: [
        "Laisser les lumières allumées en permanence",
        "Utiliser des appareils énergivores",
        "Isoler correctement la maison",
        "Ne pas éteindre les appareils en veille"
      ],
      correctAnswer: "Isoler correctement la maison",
    },
    {
      questionText: "Comment pouvez-vous économiser de l'argent sur les transports ?",
      answerOptions: [
        "Utiliser les transports en commun",
        "Prendre un taxi pour chaque déplacement",
        "Acheter une voiture de luxe",
        "Ne pas entretenir sa voiture"
      ],
      correctAnswer: "Utiliser les transports en commun",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (answer: string) => {
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Quiz sur l'Économie</h2>
      {showScore ? (
        <div className="text-center">
          <p className="text-xl font-semibold mb-4">
            Vous avez obtenu {score} sur {questions.length}
          </p>
          <button
            onClick={resetQuiz}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Rejouer
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <div className="text-gray-600">
              Question {currentQuestion + 1}/{questions.length}
            </div>
            <div className="text-xl font-semibold">
              {questions[currentQuestion].questionText}
            </div>
          </div>
          <div className="space-y-2">
            {questions[currentQuestion].answerOptions.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(answer)}
                className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {answer}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default QuizGame;
