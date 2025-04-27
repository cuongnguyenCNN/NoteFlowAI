"use client";

import { useState } from "react";

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}
type QuizQuestion = {
  question: string;
  options: string[];
  correct: number;
};
type QuizProps = {
  initialQuestions: QuizQuestion[];
};
export default function Quiz({ initialQuestions }: QuizProps) {
  const [questions, setQuestions] = useState(() =>
    shuffleArray(initialQuestions)
  );
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (index: number) => {
    if (!answered) {
      setSelected(index);
      setAnswered(true);
    }
  };

  const nextQuestion = () => {
    setCurrent((prev) => prev + 1);
    setSelected(null);
    setAnswered(false);
  };

  const resetQuiz = () => {
    setQuestions(shuffleArray(initialQuestions));
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
  };

  const currentQuestion = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-semibold">
          Bodyweight vs. Barbells: Which Training Method is Best for You?
        </h1>
        <div className="flex gap-2 text-sm">
          <button onClick={resetQuiz} className="text-gray-500 hover:underline">
            Reset
          </button>
          <button onClick={resetQuiz} className="text-gray-500 hover:underline">
            Shuffle questions
          </button>
        </div>
      </div>

      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-purple-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <p className="text-lg font-medium mb-2">Question {current + 1}</p>
        <p className="mb-4">{currentQuestion.question}</p>
        <div className="space-y-2">
          {currentQuestion.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full text-left p-2 rounded border ${
                answered
                  ? i === currentQuestion.correct
                    ? "border-green-500 bg-green-50"
                    : i === selected
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200"
                  : "border-gray-200 hover:bg-gray-100"
              }`}
              disabled={answered}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Question {current + 1} of {questions.length}
        </p>
        {answered && current < questions.length - 1 && (
          <button
            onClick={nextQuestion}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
