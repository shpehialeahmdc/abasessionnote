// /frontend/src/components/Dashboard.tsx
import React from 'react';
import { Card } from "@/components/ui";
import { BehaviorTrendChart } from './charts/BehaviorTrendChart';
import { ReinforcerEffectivenessChart } from './charts/ReinforcerEffectivenessChart';
import { InterventionSuccessChart } from './charts/InterventionSuccessChart';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">
              Behavior Trends
            </h3>
            <BehaviorTrendChart 
              data={[]} // Will be populated from API
              showDuration
              showIntensity
            />
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">
              Reinforcer Effectiveness
            </h3>
            <ReinforcerEffectivenessChart 
              data={[]} // Will be populated from API
            />
          </div>
        </Card>

        <Card className="md:col-span-2">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">
              Intervention Success Rates
            </h3>
            <InterventionSuccessChart 
              data={[]} // Will be populated from API
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
