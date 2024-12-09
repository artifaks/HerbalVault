import React from 'react';
import type { DrugInteraction } from '../../types/herb';
import { AlertTriangle, AlertCircle } from 'lucide-react';

interface SafetyInfoProps {
  precautions: string[];
  interactions: DrugInteraction[];
  dosage: string;
}

export function SafetyInfo({ precautions, interactions, dosage }: SafetyInfoProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Safety Information</h2>
      
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
        <div className="mb-4 flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5 text-yellow-600" />
          <h3 className="text-lg font-semibold text-yellow-800">Precautions</h3>
        </div>
        <ul className="list-inside list-disc space-y-2 text-yellow-700">
          {precautions.map((precaution, index) => (
            <li key={index}>{precaution}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center">
          <AlertCircle className="mr-2 h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold">Recommended Dosage</h3>
        </div>
        <p className="text-gray-700">{dosage}</p>
      </div>

      {interactions.length > 0 && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <div className="mb-4 flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-red-600" />
            <h3 className="text-lg font-semibold text-red-800">Known Drug Interactions</h3>
          </div>
          <div className="space-y-4">
            {interactions.map((interaction, index) => (
              <div key={index} className="rounded-lg bg-white p-4">
                <h4 className="font-semibold text-gray-900">{interaction.drug}</h4>
                <p className="mt-1 text-sm text-gray-600">
                  Severity: <span className="capitalize">{interaction.severity}</span>
                </p>
                <p className="mt-2 text-gray-700">{interaction.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}