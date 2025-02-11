// /frontend/src/store/dataStore.ts
import create from 'zustand';

interface DataState {
  behaviorData: any[];
  reinforcers: any[];
  interventions: any[];
  setBehaviorData: (data: any[]) => void;
  setReinforcers: (data: any[]) => void;
  setInterventions: (data: any[]) => void;
  addBehaviorEntry: (entry: any) => void;
  updateReinforcer: (id: string, data: any) => void;
  updateIntervention: (id: string, data: any) => void;
}

export const useDataStore = create<DataState>((set) => ({
  behaviorData: [],
  reinforcers: [],
  interventions: [],
  
  setBehaviorData: (data) => set({ behaviorData: data }),
  setReinforcers: (data) => set({ reinforcers: data }),
  setInterventions: (data) => set({ interventions: data }),
  
  addBehaviorEntry: (entry) => set((state) => ({
    behaviorData: [...state.behaviorData, entry]
  })),
  
  updateReinforcer: (id, data) => set((state) => ({
    reinforcers: state.reinforcers.map(r => 
      r.id === id ? { ...r, ...data } : r
    )
  })),
  
  updateIntervention: (id, data) => set((state) => ({
    interventions: state.interventions.map(i => 
      i.id === id ? { ...i, ...data } : i
    )
  }))
}));

// /frontend/src/components/charts/BehaviorTrendChart.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useDataStore } from '@/store/dataStore';

export const BehaviorTrendChart: React.FC = () => {
  const behaviorData = useDataStore((state) => state.behaviorData);

  return (
    <LineChart width={600} height={300} data={behaviorData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="frequency" stroke="#8884d8" />
      <Line type="monotone" dataKey="intensity" stroke="#82ca9d" />
    </LineChart>
  );
};

// /frontend/src/components/SessionScheduler.tsx
import React from 'react';
import { Card } from "@/components/ui/card";
import { useDataStore } from '@/store/dataStore';

interface TimeSlot {
  time: string;
  activity: string;
  duration: number;
}

export const SessionScheduler: React.FC = () => {
  const [schedule, setSchedule] = React.useState<TimeSlot[]>([
    { time: "8:15", activity: "Drop Off", duration: 10 },
    { time: "8:30", activity: "Morning ABA SESS", duration: 45 },
    { time: "9:15", activity: "Breakfast", duration: 15 },
    { time: "9:30", activity: "Bathroom time", duration: 30 }
  ]);

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Daily Schedule</h2>
      <div className="space-y-2">
        {schedule.map((slot, index) => (
          <div key={index} className="flex items-center gap-4 p-2 border rounded">
            <span className="w-20">{slot.time}</span>
            <span className="flex-1">{slot.activity}</span>
            <span>{slot.duration} min</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

// /frontend/src/components/DataAnalysis.tsx
import React from 'react';
import { Card } from "@/components/ui/card";
import { useDataStore } from '@/store/dataStore';

export const DataAnalysis: React.FC = () => {
  const behaviorData = useDataStore((state) => state.behaviorData);
  const reinforcers = useDataStore((state) => state.reinforcers);

  const calculateEffectiveness = () => {
    // Analysis logic here
    return {
      totalSessions: behaviorData.length,
      successRate: 75,
      topReinforcer: "Token system",
      averageDuration: 45
    };
  };

  const stats = calculateEffectiveness();

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Session Analysis</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded">
          <div className="text-sm text-gray-600">Total Sessions</div>
          <div className="text-2xl font-bold">{stats.totalSessions}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded">
          <div className="text-sm text-gray-600">Success Rate</div>
          <div className="text-2xl font-bold">{stats.successRate}%</div>
        </div>
        <div className="p-3 bg-gray-50 rounded">
          <div className="text-sm text-gray-600">Top Reinforcer</div>
          <div className="text-2xl font-bold">{stats.topReinforcer}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded">
          <div className="text-sm text-gray-600">Avg Duration</div>
          <div className="text-2xl font-bold">{stats.averageDuration}min</div>
        </div>
      </div>
    </Card>
  );
};
