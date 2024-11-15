import React, { useState } from 'react';
import { Check, Info } from 'lucide-react';

export default function BitManipulation({ onComplete }) {
  const [bits, setBits] = useState(Array(8).fill(false));
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const toggleBit = (index) => {
    const newBits = [...bits];
    newBits[index] = !newBits[index];
    setBits(newBits);
    setHasInteracted(true);
  };

  const bitsToDecimal = (bits) => {
    return bits.reduce((acc, bit, index) => {
      return acc + (bit ? Math.pow(2, 7 - index) : 0);
    }, 0);
  };

  const getCharacterDescription = (decimal) => {
    if (decimal === 0) return "NUL (caractère nul)";
    if (decimal === 9) return "TAB (tabulation)";
    if (decimal === 10) return "LF (retour à la ligne)";
    if (decimal === 13) return "CR (retour chariot)";
    if (decimal === 27) return "ESC (échap)";
    if (decimal === 32) return "ESPACE";
    if (decimal < 32) return "Caractère de contrôle";
    if (decimal <= 126) return String.fromCharCode(decimal);
    return "Caractère non-ASCII";
  };

  const decimalValue = bitsToDecimal(bits);
  const character = getCharacterDescription(decimalValue);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Manipulation des Bits</h2>
        <p className="text-gray-600">
          Découvrez les caractères cachés derrière chaque combinaison de bits
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="ml-2 text-indigo-600 hover:text-indigo-700"
          >
            <Info className="inline-block h-5 w-5" />
          </button>
        </p>
      </div>

      {showInfo && (
        <div className="bg-indigo-50 p-4 rounded-lg text-sm text-gray-700">
          <p>Chaque caractère est représenté par 8 bits (1 octet) en ASCII.</p>
          <p>Activez ou désactivez les bits pour découvrir les différents caractères.</p>
          <p>Les caractères spéciaux comme Espace, Tab, ou Entrée ont aussi leur représentation !</p>
        </div>
      )}

      <div className="flex justify-center space-x-2">
        {bits.map((bit, index) => (
          <button
            key={index}
            onClick={() => toggleBit(index)}
            className={`w-12 h-12 rounded-lg font-mono text-xl font-bold transition-all transform hover:scale-110
              ${bit 
                ? 'bg-indigo-600 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {bit ? '1' : '0'}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Caractère correspondant :</h3>
          <div className="bg-gray-50 p-6 rounded-lg inline-block min-w-[200px]">
            <p className="text-3xl font-mono text-indigo-600 mb-2">
              {character.length === 1 ? character : ''}
            </p>
            <p className="text-sm text-gray-600">
              {character.length > 1 ? character : 'Caractère visible'}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => hasInteracted && onComplete()}
        className={`w-full py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2
          ${hasInteracted 
            ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        disabled={!hasInteracted}
      >
        <span>Continuer</span>
        {hasInteracted && <Check className="h-5 w-5" />}
      </button>
    </div>
  );
}