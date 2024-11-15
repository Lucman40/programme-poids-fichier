import React, { useState } from 'react';
import { FileText, Image, Music, Video, Film, Database, HardDrive, Check } from 'lucide-react';

interface FileExamplesProps {
  onComplete: () => void;
}

const fileExamples = [
  {
    name: 'Document texte',
    icon: FileText,
    size: 12500,
    description: 'Un document texte de 5 pages (~12 Ko)'
  },
  {
    name: 'Photo numérique',
    icon: Image,
    size: 3145728,
    description: 'Une photo haute résolution (~3 Mo)'
  },
  {
    name: 'Album musical',
    icon: Music,
    size: 104857600,
    description: 'Un album de 12 chansons en haute qualité (~100 Mo)'
  },
  {
    name: 'Film HD',
    icon: Video,
    size: 4294967296,
    description: 'Un film de 2h en HD (~4 Go)'
  },
  {
    name: 'Série complète',
    icon: Film,
    size: 42949672960,
    description: 'Une saison complète en 4K (~40 Go)'
  },
  {
    name: 'Jeu vidéo moderne',
    icon: Database,
    size: 107374182400,
    description: "Un jeu AAA avec graphismes haute qualité (~100 Go)"
  },
  {
    name: 'Backup système',
    icon: HardDrive,
    size: 1099511627776,
    description: "Sauvegarde complète d'un ordinateur (~1 To)"
  }
];

export default function FileExamples({ onComplete }: FileExamplesProps) {
  const [selectedFile, setSelectedFile] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const formatSize = (bytes: number): string => {
    const units = ['octets', 'Ko', 'Mo', 'Go', 'To'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  const handleFileClick = (index: number) => {
    setSelectedFile(index);
    setShowExplanation(true);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Exemples de Fichiers</h2>
        <p className="text-gray-600">Découvrez le poids de différents types de fichiers courants</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fileExamples.map((file, index) => {
          const Icon = file.icon;
          return (
            <button
              key={index}
              onClick={() => handleFileClick(index)}
              className={`p-4 rounded-lg transition-all transform hover:scale-105
                ${selectedFile === index 
                  ? 'bg-indigo-50 border-2 border-indigo-500' 
                  : 'bg-white border border-gray-200 hover:border-indigo-300'
                }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-8 w-8 text-indigo-600" />
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">{file.name}</h3>
                  <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {showExplanation && selectedFile !== null && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {fileExamples[selectedFile].name}
          </h3>
          <p className="text-gray-700 mb-4">{fileExamples[selectedFile].description}</p>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg">
                <p className="text-sm text-gray-600">Taille en octets :</p>
                <p className="font-mono text-indigo-600">
                  {fileExamples[selectedFile].size.toLocaleString()} octets
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-sm text-gray-600">Taille en bits :</p>
                <p className="font-mono text-indigo-600">
                  {(fileExamples[selectedFile].size * 8).toLocaleString()} bits
                </p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <p className="text-sm text-gray-600">Pour stocker ce fichier, il vous faudrait :</p>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                {fileExamples[selectedFile].size >= 1099511627776 && (
                  <li>Un disque dur ou SSD de grande capacité (1 To ou plus)</li>
                )}
                {fileExamples[selectedFile].size >= 107374182400 && fileExamples[selectedFile].size < 1099511627776 && (
                  <li>Un disque dur ou SSD de taille moyenne (100 Go ou plus)</li>
                )}
                {fileExamples[selectedFile].size >= 4294967296 && fileExamples[selectedFile].size < 107374182400 && (
                  <li>Un disque dur ou SSD</li>
                )}
                {fileExamples[selectedFile].size <= 104857600 && (
                  <li>Une clé USB standard</li>
                )}
              </ul>
              <p className="text-sm text-gray-600 mt-3">
                {fileExamples[selectedFile].size <= 26214400 ? (
                  <span className="text-green-600">✓ Peut être envoyé en pièce jointe d'e-mail (limite : 25 Mo)</span>
                ) : (
                  <span className="text-red-600">✗ Trop volumineux pour être envoyé en pièce jointe d'e-mail (limite : 25 Mo)</span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={onComplete}
        className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
      >
        <span>Terminer le cours</span>
        <Check className="h-5 w-5" />
      </button>
    </div>
  );
}