// /frontend/src/components/SessionNoteGenerator.tsx
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDataStore } from '@/store/dataStore';

interface SessionData {
  date: string;
  clientName: string;
  startTime: string;
  endTime: string;
  behaviors: string[];
  goals: {
    goal: string;
    progress: string;
  }[];
  notes: string;
}

export const SessionNoteGenerator: React.FC = () => {
  const [sessionData, setSessionData] = React.useState<SessionData>({
    date: new Date().toISOString().split('T')[0],
    clientName: 'Shua Levy',
    startTime: '',
    endTime: '',
    behaviors: [],
    goals: [],
    notes: ''
  });

  const [generatedNote, setGeneratedNote] = React.useState('');

  const generateNote = () => {
    const note = `
Date: ${new Date(sessionData.date).toLocaleDateString()}
Time: ${sessionData.startTime} - ${sessionData.endTime}
Client: ${sessionData.clientName}

BEHAVIOR SUMMARY:
${sessionData.behaviors.map(b => `- ${b}`).join('\n')}

GOALS ADDRESSED:
${sessionData.goals.map(g => `
Goal: ${g.goal}
Progress: ${g.progress}
`).join('\n')}

ADDITIONAL NOTES:
${sessionData.notes}

Session conducted by: _____________________
    `.trim();

    setGeneratedNote(note);
  };

  const handleGoalChange = (index: number, field: 'goal' | 'progress', value: string) => {
    const newGoals = [...sessionData.goals];
    newGoals[index] = { ...newGoals[index], [field]: value };
    setSessionData({ ...sessionData, goals: newGoals });
  };

  const addGoal = () => {
    setSessionData({
      ...sessionData,
      goals: [...sessionData.goals, { goal: '', progress: '' }]
    });
  };

  const addBehavior = (behavior: string) => {
    if (behavior.trim()) {
      setSessionData({
        ...sessionData,
        behaviors: [...sessionData.behaviors, behavior]
      });
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Session Note Generator</h2>
      
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            className="border p-2 rounded"
            value={sessionData.date}
            onChange={(e) => setSessionData({...sessionData, date: e.target.value})}
          />
          
          <div className="grid grid-cols-2 gap-2">
            <input
              type="time"
              className="border p-2 rounded"
              value={sessionData.startTime}
              onChange={(e) => setSessionData({...sessionData, startTime: e.target.value})}
              placeholder="Start Time"
            />
            <input
              type="time"
              className="border p-2 rounded"
              value={sessionData.endTime}
              onChange={(e) => setSessionData({...sessionData, endTime: e.target.value})}
              placeholder="End Time"
            />
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Behaviors Observed</h3>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              className="border p-2 rounded flex-1"
              placeholder="Add behavior"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addBehavior((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = '';
                }
              }}
            />
          </div>
          <div className="space-y-1">
            {sessionData.behaviors.map((behavior, index) => (
              <div key={index} className="flex items-center gap-2">
                <span>• {behavior}</span>
                <button
                  className="text-red-500 text-sm"
                  onClick={() => setSessionData({
                    ...sessionData,
                    behaviors: sessionData.behaviors.filter((_, i) => i !== index)
                  })}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Goals & Progress</h3>
          <div className="space-y-2">
            {sessionData.goals.map((goal, index) => (
              <div key={index} className="grid grid-cols-2 gap-2">
                <input
                  className="border p-2 rounded"
                  placeholder="Goal"
                  value={
