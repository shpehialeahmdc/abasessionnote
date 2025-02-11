// /frontend/src/components/forms/ABCForm.tsx
import React, { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { 
  Select,
  Input,
  Button,
  TextArea
} from "@/components/ui";

interface ABCEntry {
  id: string;
  antecedent: string;
  behavior: string;
  consequence: string;
  interventions: string[];
  reinforcers: string[];
}

export const ABCForm: React.FC = () => {
  const [entries, setEntries] = useState<ABCEntry[]>([{
    id: '1',
    antecedent: '',
    behavior: '',
    consequence: '',
    interventions: [],
    reinforcers: []
  }]);

  const addEntry = () => {
    setEntries([...entries, {
      id: Date.now().toString(),
      antecedent: '',
      behavior: '',
      consequence: '',
      interventions: [],
      reinforcers: []
    }]);
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const updateEntry = (id: string, field: keyof ABCEntry, value: any) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  return (
    <div className="space-y-6">
      {entries.map((entry, index) => (
        <div key={entry.id} className="p-4 border rounded-lg bg-white shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">ABC Entry #{index + 1}</h3>
            {entries.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeEntry(entry.id)}
              >
                <MinusCircle className="h-5 w-5" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Antecedent
                </label>
                <TextArea
                  value={entry.antecedent}
                  onChange={(e) => updateEntry(entry.id, 'antecedent', e.target.value)}
                  className="h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Behavior
                </label>
                <TextArea
                  value={entry.behavior}
                  onChange={(e) => updateEntry(entry.id, 'behavior', e.target.value)}
                  className="h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Consequence
                </label>
                <TextArea
                  value={entry.consequence}
                  onChange={(e) => updateEntry(entry.id, 'consequence', e.target.value)}
                  className="h-24"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Interventions Used
                </label>
                <Select
                  multiple
                  value={entry.interventions}
                  onChange={(values) => updateEntry(entry.id, 'interventions', values)}
                  options={[
                    'FCT',
                    'NET',
                    'DTT',
                    'Incidental teaching',
                    'High-P instructional sequence',
                    'Shaping',
                    'Chaining',
                    'Prompt-fading procedures',
                    'Positive reinforcement',
                    'Premack Principle',
                    'Multiple exemplar training',
                    'Timer',
                    'Token economy',
                    'Visual schedules',
                    'PRT'
                  ]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Reinforcers Used
                </label>
                <Select
                  multiple
                  value={entry.reinforcers}
                  onChange={(values) => updateEntry(entry.id, 'reinforcers', values)}
                  options={[
                    'Social reinforcement',
                    'Token economy',
                    'Sensory reinforcement',
                    'Activity reinforcement',
                    'Tangible reinforcement'
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="outline"
        className="w-full"
        onClick={addEntry}
      >
        <PlusCircle className="h-5 w-5 mr-2" />
        Add Another ABC Entry
      </Button>
    </div>
  );
};
