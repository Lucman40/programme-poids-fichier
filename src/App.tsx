import React, { useState } from 'react';
import { Binary, HardDrive, Check, ChevronRight, HelpCircle, RefreshCw } from 'lucide-react';
import BitManipulation from './components/BitManipulation';
import ByteConverter from './components/ByteConverter';
import Introduction from './components/Introduction';
import FileExamples from './components/FileExamples';
import Quiz from './components/Quiz';
import ProgressBar from './components/ProgressBar';

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
        return <Introduction onComplete={() => setCurrentStep(2)} />;
      case 2:
        return <BitManipulation onComplete={() => setCurrentStep(3)} />;
      case 3:
        return <ByteConverter onComplete={() => setCurrentStep(4)} />;
      case 4:
        return <FileExamples onComplete={() => setCurrentStep(5)} />;
      case 5:
        return <Quiz onComplete={() => setCurrentStep(1)} />;
      default:
        return <Introduction onComplete={() => setCurrentStep(2)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <HardDrive className="h-8 w-8 text-yellow-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">ByteWise</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <HelpCircle className="h-6 w-6 text-gray-600" />
              </button>
              <button
                onClick={() => setCurrentStep(1)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <RefreshCw className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <ProgressBar steps={steps} currentStep={currentStep} />
        </div>

        {showHelp && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Aide</h3>
            <p className="text-gray-600">
              Cette application vous guide à travers les concepts fondamentaux du stockage numérique.
              Suivez chaque étape et complétez les exercices pour progresser.
              Vous pouvez toujours revenir en arrière ou recommencer si nécessaire.
            </p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
          {renderCurrentStep()}
        </div>
      </main>
    </div>
  );
}

export default App;