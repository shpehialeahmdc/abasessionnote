// /frontend/src/components/BehaviorTracker.tsx
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDataStore } from '@/store/dataStore';

export const BehaviorTracker: React.FC = () => {
  const addBehaviorEntry = useDataStore((state) => state.addBehaviorEntry);
  
  const [currentBehavior, setCurrentBehavior] = React.useState({
    type: '',
    intensity: 1,
    duration: 0,
    antecedent: '',
    consequence: '',
    interventions: []
  });

  const handleSubmit = () => {
    addBehaviorEntry({
      ...currentBehavior,
      timestamp: new Date().toISOString()
    });
    setCurrentBehavior({
      type: '',
      intensity: 1,
      duration: 0,
      antecedent: '',
      consequence: '',
      interventions: []
    });
  };

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Behavior Tracker</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <select 
            className="border p-2 rounded"
            value={currentBehavior.type}
            onChange={(e) => setCurrentBehavior({
              ...currentBehavior,
              type: e.target.value
            })}
          >
            <option value="">Select Behavior</option>
            <option value="aggression">Aggression</option>
            <option value="elopement">Elopement</option>
            <option value="self-injury">Self-Injury</option>
            <option value="tantrum">Tantrum</option>
          </select>

          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Duration (minutes)"
            value={currentBehavior.duration}
            onChange={(e) => setCurrentBehavior({
              ...currentBehavior,
              duration: parseInt(e.target.value)
            })}
          />
        </div>

        <div className="space-y-2">
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Antecedent"
            value={currentBehavior.antecedent}
            onChange={(e) => setCurrentBehavior({
              ...currentBehavior,
              antecedent: e.target.value
            })}
          />
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Consequence"
            value={currentBehavior.consequence}
            onChange={(e) => setCurrentBehavior({
              ...currentBehavior,
              consequence: e.target.value
            })}
          />
        </div>

        <Button onClick={handleSubmit}>Record Behavior</Button>
      </div>
    </Card>
  );
};

// /frontend/src/components/ReinforcementSystem.tsx
import React from 'react';
import { Card } from "@/components/ui/card";
import { useDataStore } from '@/store/dataStore';

export const ReinforcementSystem: React.FC = () => {
  const reinforcers = useDataStore((state) => state.reinforcers);
  const updateReinforcer = useDataStore((state) => state.updateReinforcer);

  const handleEffectivenessUpdate = (id: string, effectiveness: number) => {
    updateReinforcer(id, { effectiveness });
  };

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Reinforcement System</h2>
      <div className="space-y-4">
        {reinforcers.map((reinforcer) => (
          <div key={reinforcer.id} className="flex items-center gap-4 p-2 border rounded">
            <span className="flex-1">{reinforcer.name}</span>
            <select
              className="border p-1 rounded"
              value={reinforcer.effectiveness}
              onChange={(e) => handleEffectivenessUpdate(
                reinforcer.id,
                parseInt(e.target.value)
              )}
            >
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
            </select>
          </div>
        ))}
      </div>
    </Card>
  );
};

// /frontend/src/components/SessionNoteGenerator.tsx
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDataStore } from '@/store/dataStore';

export const SessionNoteGenerator: React.FC = () => {
  const behaviorData = useDataStore((state) => state.behaviorData);
  const [generatedNote, setGeneratedNote] = React.useState('');

  const generateNote = () => {
    const todayData = behaviorData.filter(entry => {
      const entryDate = new Date(entry.timestamp).toDateString();
      const today = new Date().toDateString();
      return entryDate === today;
    });

    const note = `
Session Date: ${new Date().toLocaleDateString()}

Behavior Summary:
${todayData.map(entry => `
- ${entry.type} (Duration: ${entry.duration}min)
  Antecedent: ${entry.antecedent}
  Consequence: ${entry.consequence}
  Interventions: ${entry.interventions.join(', ')}
`).join('\n')}

Overall Progress:
Client demonstrated ${todayData.length} tracked behaviors today.
    `.trim();

    setGeneratedNote(note);
  };

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Session Note Generator</h2>
      <Button onClick={generateNote} className="mb-4">
        Generate Note
      </Button>
      {generatedNote && (
        <textarea
          className="w-full h-64 p-2 border rounded"
          value={generatedNote}
          readOnly
        />
      )}
    </Card>
  );
};
