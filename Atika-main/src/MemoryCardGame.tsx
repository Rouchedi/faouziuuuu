import React, { useState, useEffect } from 'react';

interface Card {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryCardGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const images = [
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1482049016688-2d36e1b9a176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1467003909585-2f08fca60bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1473093295043-c891ad30ca70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1470339726616-e17e5427906a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1476224203421-9ac39f1912ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    ];

    const duplicatedImages = [...images, ...images];
    const initialCards = duplicatedImages
      .sort(() => Math.random() - 0.5)
      .map((imageUrl, index) => ({
        id: index,
        imageUrl,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(initialCards);
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setTimeout(() => {
        const [firstIndex, secondIndex] = flippedCards;
        if (cards[firstIndex].imageUrl === cards[secondIndex].imageUrl) {
          const newCards = [...cards];
          newCards[firstIndex].isMatched = true;
          newCards[secondIndex].isMatched = true;
          setCards(newCards);
          setFlippedCards([]);
        } else {
          const newCards = [...cards];
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }
        setMoves(prevMoves => prevMoves + 1);
      }, 1000);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setGameWon(true);
    }
  }, [cards]);

  const handleCardClick = (index: number) => {
    if (flippedCards.length < 2 && !cards[index].isFlipped && !cards[index].isMatched) {
      const newCards = [...cards];
      newCards[index].isFlipped = true;
      setCards(newCards);
      setFlippedCards([...flippedCards, index]);
    }
  };

  const resetGame = () => {
    const images = [
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1482049016688-2d36e1b9a176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1467003909585-2f08fca60bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1473093295043-c891ad30ca70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1470339726616-e17e5427906a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1476224203421-9ac39f1912ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    ];

    const duplicatedImages = [...images, ...images];
    const initialCards = duplicatedImages
      .sort(() => Math.random() - 0.5)
      .map((imageUrl, index) => ({
        id: index,
        imageUrl,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(initialCards);
    setFlippedCards([]);
    setMoves(0);
    setGameWon(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Jeu de Mémoire</h2>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`relative aspect-square rounded-lg ${card.isFlipped || card.isMatched ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="absolute inset-0 bg-gray-200 rounded-lg transition-transform duration-500 ease-in-out backface-hidden">
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-lg transition-transform duration-500 ease-in-out backface-hidden rotate-y-180">
              <img src={card.imageUrl} alt="Card" className="max-w-full max-h-full rounded-lg" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <p>Coups: {moves}</p>
        {gameWon && <p className="text-green-600">Vous avez gagné en {moves} coups !</p>}
        <button
          onClick={resetGame}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4"
        >
          Réinitialiser le jeu
        </button>
      </div>
    </div>
  );
};

export default MemoryCardGame;
