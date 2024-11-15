import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface ByteConverterProps {
  onComplete: () => void;
}

type Unit = 'B' | 'KB' | 'MB' | 'GB' | 'TB';

const unitMultipliers: Record<Unit, number> = {
  'B': 1,
  'KB': 1024,
  'MB': 1024 * 1024,
  'GB': 1024 * 1024 * 1024,
  'TB': 1024 * 1024 * 1024 * 1024
};

export default function ByteConverter({ onComplete }: ByteConverterProps) {
  const [value, setValue] = useState<number>(0);
  const [unit, setUnit] = useState<Unit>('B');
  const [hasInteracted, setHasInteracted] = useState(false);

  const bytes = value * unitMultipliers[unit];

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(0, parseFloat(e.target.value) || 0);
    setValue(newValue);
    setHasInteracted(true);
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value as Unit;
    const oldBytes = bytes;
    setUnit(newUnit);
    setValue(oldBytes / unitMultipliers[newUnit]);
    setHasInteracted(true);
  };

  const getValueInUnit = (bytes: number, unit: Unit): string => {
    return (bytes / unitMultipliers[unit]).toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Conversion en Octets</h2>
        <p className="text-gray-600">Explorez la relation entre les différentes unités de mesure</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valeur :
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={value}
              onChange={handleValueChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="w-32">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unité :
            </label>
            <select
              value={unit}
              onChange={handleUnitChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="B">Octets</option>
              <option value="KB">Ko</option>
              <option value="MB">Mo</option>
              <option value="GB">Go</option>
              <option value="TB">To</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-1">En bits :</h3>
            <p className="text-lg font-mono text-indigo-600">{bytes * 8} bits</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-1">En octets :</h3>
            <p className="text-lg font-mono text-indigo-600">{getValueInUnit(bytes, 'B')} octets</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-1">En kilooctets :</h3>
            <p className="text-lg font-mono text-indigo-600">{getValueInUnit(bytes, 'KB')} Ko</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-1">En mégaoctets :</h3>
            <p className="text-lg font-mono text-indigo-600">{getValueInUnit(bytes, 'MB')} Mo</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-1">En gigaoctets :</h3>
            <p className="text-lg font-mono text-indigo-600">{getValueInUnit(bytes, 'GB')} Go</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-1">En téraoctets :</h3>
            <p className="text-lg font-mono text-indigo-600">{getValueInUnit(bytes, 'TB')} To</p>
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