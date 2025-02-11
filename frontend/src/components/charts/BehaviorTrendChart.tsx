// /frontend/src/components/charts/BehaviorTrendChart.tsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface BehaviorDataPoint {
  date: string;
  frequency: number;
  duration?: number;
  intensity?: number;
}

interface BehaviorTrendChartProps {
  data: BehaviorDataPoint[];
  showDuration?: boolean;
  showIntensity?: boolean;
}

export const BehaviorTrendChart: React.FC<BehaviorTrendChartProps> = ({
  data,
  showDuration = false,
  showIntensity = false
}) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          angle={-45}
          textAnchor="end"
          height={70}
        />
        <YAxis yAxisId="frequency" />
        {showDuration && <YAxis yAxisId="duration" orientation="right" />}
        <Tooltip />
        <Legend />
        
        <Line
          yAxisId="frequency"
          type="monotone"
          dataKey="frequency"
          stroke="#8884d8"
          name="Frequency"
        />
        
        {showDuration && (
          <Line
            yAxisId="duration"
            type="monotone"
            dataKey="duration"
            stroke="#82ca9d"
            name="Duration (min)"
          />
        )}
        
        {showIntensity && (
          <Line
            yAxisId="frequency"
            type="monotone"
            dataKey="intensity"
            stroke="#ffc658"
            name="Intensity (1-5)"
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

// /frontend/src/components/charts/ReinforcerEffectivenessChart.tsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface ReinforcerData {
  name: string;
  effectiveness: number;
  frequency: number;
}

interface ReinforcerEffectivenessChartProps {
  data: ReinforcerData[];
}

export const ReinforcerEffectivenessChart: React.FC<
  ReinforcerEffectivenessChartProps
> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="name" 
          angle={-45}
          textAnchor="end"
          height={70}
        />
        <YAxis yAxisId="effectiveness" />
        <YAxis yAxisId="frequency" orientation="right" />
        <Tooltip />
        <Legend />
        
        <Bar
          yAxisId="effectiveness"
          dataKey="effectiveness"
          fill="#8884d8"
          name="Effectiveness Score"
        />
        
        <Bar
          yAxisId="frequency"
          dataKey="frequency"
          fill="#82ca9d"
          name="Usage Frequency"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

// /frontend/src/components/charts/InterventionSuccessChart.tsx
import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface InterventionData {
  intervention: string;
  successRate: number;
  frequency: number;
}

interface InterventionSuccessChartProps {
  data: InterventionData[];
}

export const InterventionSuccessChart: React.FC<
  InterventionSuccessChartProps
> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="intervention" />
        <PolarRadiusAxis />
        <Radar
          name="Success Rate"
          dataKey="successRate"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Radar
          name="Frequency"
          dataKey="frequency"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};
