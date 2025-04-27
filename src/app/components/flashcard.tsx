"use client";
import { useState } from "react";
import styles from "./Flashcard.module.css";
const initialCards = [
  {
    front: "What is calisthenics?",
    back: "Calisthenics is a form of exercise using bodyweight movements to build strength and flexibility.",
  },
  {
    front: "What are the pros of calisthenics?",
    back: "Calisthenics is cost-effective, can be done anywhere, and focuses on athleticism and body control.",
  },
];
function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}
export default function FlashcardQuiz() {
  const [cards, setCards] = useState(() => shuffleArray(initialCards));
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const reset = () => {
    setCards(shuffleArray(initialCards));
    setCurrent(0);
    setFlipped(false);
  };

  const next = () => {
    setCurrent((prev) => Math.min(prev + 1, cards.length - 1));
    setFlipped(false);
  };

  const prev = () => {
    setCurrent((prev) => Math.max(prev - 1, 0));
    setFlipped(false);
  };

  const currentCard = cards[current];

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">
        Bodyweight vs. Barbells: Which Training Method is Best for You?
      </h1>

      <div
        className={styles.cardContainer}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className={`${styles.card} ${flipped ? styles.flipped : ""}`}>
          <div className={styles.cardInner}>
            <div className={styles.cardFace}>
              {currentCard.front}
              <p className="text-sm text-gray-500 mt-2">🔁 Press to flip</p>
            </div>
            <div className={`${styles.cardFace} ${styles.cardBack}`}>
              {currentCard.back}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={prev}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          disabled={current === 0}
        >
          ← Previous
        </button>
        <p className="text-sm text-gray-500">
          Card {current + 1} of {cards.length}
        </p>
        <button
          onClick={next}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          disabled={current === cards.length - 1}
        >
          Next →
        </button>
      </div>

      <div className="flex gap-4 justify-center mt-4 text-sm text-gray-500">
        <button onClick={reset} className="hover:underline">
          Shuffle
        </button>
      </div>
    </div>
  );
}
