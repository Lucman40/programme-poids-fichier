import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="relative">
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
        <div
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500 transition-all duration-500"
        />
      </div>
      <div className="flex justify-between">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center ${
              step.id <= currentStep ? 'text-yellow-600' : 'text-gray-400'
            }`}
          >
            <div className="relative">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all
                  ${
                    step.id < currentStep
                      ? 'bg-yellow-500 text-white'
                      : step.id === currentStep
                      ? 'bg-white border-2 border-yellow-500 text-yellow-600'
                      : 'bg-white border-2 border-gray-300 text-gray-300'
                  }`}
              >
                {step.id < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.id
                )}
              </div>
            </div>
            <span
              className={`ml-2 text-sm font-medium ${
                step.id <= currentStep ? 'text-gray-800' : 'text-gray-400'
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}