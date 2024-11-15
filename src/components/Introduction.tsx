import React, { useState, useEffect } from 'react';
import { Binary, Check, ChevronRight } from 'lucide-react';

interface IntroductionProps {
  onComplete: () => void;
}

interface Question {
  text: string;
  answer: string;
  hint?: string;
}

const baseQuestions: Question[] = [
  {
    text: "Quelle est la valeur d'un bit quand il est allumé ?",
    answer: "1"
  },
  {
    text: "Quelle est la valeur d'un bit quand il est éteint ?",
    answer: "0"
  },
  {
    text: "Combien de valeurs différentes peut prendre un bit ?",
    answer: "2",
    hint: "Pensez aux états possibles : allumé ou éteint"
  }
];

export default function Introduction({ onComplete }: IntroductionProps) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const shuffledQuestions = [...baseQuestions]
      .sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase() === questions[currentQuestion]?.answer) {
      if (currentQuestion < questions.length - 1) {
        setIsCorrect(true);
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1);
          setAnswer('');
          setIsCorrect(false);
          setShowHint(false);
        }, 1000);
      } else {
        setIsCorrect(true);
        setTimeout(onComplete, 1500);
      }
    } else {
      setShowHint(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Binary className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Le bit : l'unité fondamentale</h1>
        <p className="text-lg text-gray-600">Découvrons ensemble la plus petite unité d'information en informatique</p>
      </div>

      <div className="prose max-w-none">
        <div className="bg-gradient-to-r from-gray-50 to-yellow-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Qu'est-ce qu'un bit ?</h2>
          <p className="text-gray-700">
            Un bit (binary digit) est la plus petite unité d'information en informatique.
            Il ne peut prendre que deux valeurs possibles :
          </p>
          <div className="flex justify-center space-x-8 my-4">
            <div className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow-sm">
              <span className="text-2xl font-mono font-bold text-yellow-600">0</span>
              <span className="text-gray-600">(éteint)</span>
            </div>
            <div className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow-sm">
              <span className="text-2xl font-mono font-bold text-yellow-600">1</span>
              <span className="text-gray-600">(allumé)</span>
            </div>
          </div>
        </div>

        {!showQuiz ? (
          <button
            onClick={() => setShowQuiz(true)}
            className="w-full bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Je comprends, passons au quiz !</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Question {currentQuestion + 1} sur {questions.length}</h3>
            <p className="text-gray-700 mb-4">{questions[currentQuestion]?.text}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Entrez votre réponse..."
              />
              {showHint && questions[currentQuestion]?.hint && (
                <p className="text-sm text-yellow-600">{questions[currentQuestion].hint}</p>
              )}
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Valider
              </button>
            </form>
            {isCorrect && (
              <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg flex items-center">
                <Check className="h-5 w-5 mr-2" />
                {currentQuestion < questions.length - 1 ? 'Excellent ! Question suivante...' : 'Excellent ! Passons à la suite...'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}