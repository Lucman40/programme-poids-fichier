import React, { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface QuizProps {
  onComplete: () => void;
}

interface Question {
  text: string;
  options: string[];
  correctAnswers: number[];
  explanation: string;
}

const questions: Question[] = [
  {
    text: "Est-il possible d'envoyer une série de photos d'un poids total de 42 Mo en pièce jointe d'un e-mail ?",
    options: [
      "Oui, c'est possible",
      "Non, la limite est de 25 Mo"
    ],
    correctAnswers: [1],
    explanation: "La limite standard pour les pièces jointes d'e-mail est de 25 Mo. Pour 42 Mo, il faudra utiliser une alternative."
  },
  {
    text: "Quelles alternatives avez-vous pour partager des fichiers volumineux ?",
    options: [
      "Services de stockage cloud (Google Drive, Dropbox)",
      "Sites de transfert temporaire (WeTransfer)",
      "Compression des fichiers (ZIP, RAR)",
      "Toutes les réponses ci-dessus"
    ],
    correctAnswers: [3],
    explanation: "Toutes ces solutions sont valables pour partager des fichiers volumineux. Le choix dépendra de vos besoins spécifiques."
  },
  {
    text: "Combien de Mo représente 1 Go ?",
    options: [
      "100 Mo",
      "1000 Mo",
      "1024 Mo",
      "1200 Mo"
    ],
    correctAnswers: [2],
    explanation: "1 Go = 1024 Mo (2^10 Mo). Cette valeur est basée sur le système binaire utilisé en informatique."
  },
  {
    text: "Quelle est la taille maximale recommandée pour une pièce jointe d'e-mail ?",
    options: [
      "10 Mo",
      "25 Mo",
      "50 Mo",
      "100 Mo"
    ],
    correctAnswers: [1],
    explanation: "La limite standard est généralement de 25 Mo pour les pièces jointes d'e-mail."
  },
  {
    text: "Quel support de stockage est le plus adapté pour une sauvegarde de 1 To ?",
    options: [
      "Une clé USB standard",
      "Un CD-ROM",
      "Un disque dur ou SSD de grande capacité",
      "Une carte SD"
    ],
    correctAnswers: [2],
    explanation: "Pour une sauvegarde de 1 To, un disque dur ou SSD de grande capacité est nécessaire."
  },
  {
    text: "Quelle est la meilleure pratique pour partager plusieurs fichiers volumineux ?",
    options: [
      "Les envoyer en plusieurs e-mails séparés",
      "Utiliser un service de partage de fichiers",
      "Les compresser au maximum",
      "Réduire leur qualité"
    ],
    correctAnswers: [1],
    explanation: "Utiliser un service de partage de fichiers (cloud, WeTransfer) est la solution la plus pratique et fiable."
  }
];

export default function Quiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (index: number) => {
    if (!hasSubmitted) {
      if (selectedAnswers.includes(index)) {
        setSelectedAnswers(selectedAnswers.filter(i => i !== index));
      } else {
        setSelectedAnswers([...selectedAnswers, index]);
      }
    }
  };

  const handleSubmit = () => {
    if (!hasSubmitted) {
      const correct = questions[currentQuestion].correctAnswers.every(
        answer => selectedAnswers.includes(answer)
      ) && selectedAnswers.length === questions[currentQuestion].correctAnswers.length;

      if (correct) {
        setScore(score + 1);
      }
      setHasSubmitted(true);
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswers([]);
      setHasSubmitted(false);
      setShowExplanation(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Questionnaire final</h2>
        <p className="text-gray-600">
          Question {currentQuestion + 1} sur {questions.length}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {questions[currentQuestion].text}
        </h3>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 rounded-lg text-left transition-colors ${
                selectedAnswers.includes(index)
                  ? hasSubmitted
                    ? questions[currentQuestion].correctAnswers.includes(index)
                      ? 'bg-green-100 border-green-500'
                      : 'bg-red-100 border-red-500'
                    : 'bg-yellow-100 border-yellow-500'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              } border`}
              disabled={hasSubmitted}
            >
              {option}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">
              <AlertCircle className="inline-block h-5 w-5 mr-2 text-yellow-500" />
              {questions[currentQuestion].explanation}
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          {!hasSubmitted ? (
            <button
              onClick={handleSubmit}
              className="w-full bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600 transition-colors"
              disabled={selectedAnswers.length === 0}
            >
              Valider
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center space-x-2"
            >
              <span>
                {currentQuestion < questions.length - 1 ? 'Question suivante' : 'Terminer le quiz'}
              </span>
              <Check className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="text-center text-gray-600">
        Score actuel : {score} / {questions.length}
      </div>
    </div>
  );
}