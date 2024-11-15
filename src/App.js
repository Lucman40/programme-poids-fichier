import React, { useState } from 'react';
import { Binary, HardDrive, Check, ChevronRight, HelpCircle, RefreshCw } from 'lucide-react';
import BitManipulation from './components/BitManipulation.js';
import ByteConverter from './components/ByteConverter.js';
import Introduction from './components/Introduction.js';
import FileExamples from './components/FileExamples.js';
import Quiz from './components/Quiz.js';
import ProgressBar from './components/ProgressBar.js';

const steps = [
  { id: 1, title: "Introduction aux bits" },
  { id: 2, title: "Manipulation des bits" },
  { id: 3, title: "Les octets" },
  { id: 4, title: "Exemples pratiques" },
  { id: 5, title: "Questionnaire" }
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showHelp, setShowHelp] = useState(false);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return React.createElement(Introduction, { onComplete: () => setCurrentStep(2) });
      case 2:
        return React.createElement(BitManipulation, { onComplete: () => setCurrentStep(3) });
      case 3:
        return React.createElement(ByteConverter, { onComplete: () => setCurrentStep(4) });
      case 4:
        return React.createElement(FileExamples, { onComplete: () => setCurrentStep(5) });
      case 5:
        return React.createElement(Quiz, { onComplete: () => setCurrentStep(1) });
      default:
        return React.createElement(Introduction, { onComplete: () => setCurrentStep(2) });
    }
  };

  return React.createElement(
    'div',
    { className: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" },
    React.createElement(
      'nav',
      { className: "bg-white shadow-lg border-b border-gray-200" },
      React.createElement(
        'div',
        { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
        React.createElement(
          'div',
          { className: "flex justify-between h-16 items-center" },
          React.createElement(
            'div',
            { className: "flex items-center" },
            React.createElement(HardDrive, { className: "h-8 w-8 text-yellow-500" }),
            React.createElement(
              'span',
              { className: "ml-2 text-xl font-bold text-gray-800" },
              "ByteWise"
            )
          ),
          React.createElement(
            'div',
            { className: "flex items-center space-x-4" },
            React.createElement(
              'button',
              {
                onClick: () => setShowHelp(!showHelp),
                className: "p-2 rounded-full hover:bg-gray-100 transition-colors"
              },
              React.createElement(HelpCircle, { className: "h-6 w-6 text-gray-600" })
            ),
            React.createElement(
              'button',
              {
                onClick: () => setCurrentStep(1),
                className: "p-2 rounded-full hover:bg-gray-100 transition-colors"
              },
              React.createElement(RefreshCw, { className: "h-6 w-6 text-gray-600" })
            )
          )
        )
      )
    ),
    React.createElement(
      'main',
      { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" },
      React.createElement(
        'div',
        { className: "mb-8" },
        React.createElement(ProgressBar, { steps: steps, currentStep: currentStep })
      ),
      showHelp && React.createElement(
        'div',
        { className: "mb-8 bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500" },
        React.createElement(
          'h3',
          { className: "text-lg font-semibold text-gray-800 mb-2" },
          "Aide"
        ),
        React.createElement(
          'p',
          { className: "text-gray-600" },
          "Cette application vous guide à travers les concepts fondamentaux du stockage numérique. Suivez chaque étape et complétez les exercices pour progresser. Vous pouvez toujours revenir en arrière ou recommencer si nécessaire."
        )
      ),
      React.createElement(
        'div',
        { className: "bg-white rounded-lg shadow-xl p-6 border border-gray-200" },
        renderCurrentStep()
      )
    )
  );
}

export default App;