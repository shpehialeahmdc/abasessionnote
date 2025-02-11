// /frontend/src/components/forms/ReinforcementScheduleForm.tsx
import React, { useState } from 'react';
import { 
  Select,
  Input,
  Button,
  Card,
  Table
} from "@/components/ui";

interface ReinforcerItem {
  id: string;
  type: string;
  name: string;
  level: number;
  schedule: string;
  criteria: string;
}

export const ReinforcementScheduleForm: React.FC = () => {
  const [reinforcers, setReinforcers] = useState<ReinforcerItem[]>([]);
  const [scheduleType, setScheduleType] = useState('token');
  const [tokenCriteria, setTokenCriteria] = useState({
    level1: 3,
    level2: 5,
    level3: 8
  });

  const addReinforcer = () => {
    setReinforcers([...reinforcers, {
      id: Date.now().toString(),
      type: '',
      name: '',
      level: 1,
      schedule: 'continuous',
      criteria: ''
    }]);
  };

  const updateReinforcer = (id: string, field: keyof ReinforcerItem, value: any) => {
    setReinforcers(reinforcers.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeReinforcer = (id: string) => {
    setReinforcers(reinforcers.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Token System Configuration</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Level 1 Tokens Required
              </label>
              <Input
                type="number"
                value={tokenCriteria.level1}
                onChange={(e) => setTokenCriteria({
                  ...tokenCriteria,
                  level1: parseInt(e.target.value)
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Level 2 Tokens Required
              </label>
              <Input
                type="number"
                value={tokenCriteria.level2}
                onChange={(e) => setTokenCriteria({
                  ...tokenCriteria,
                  level2: parseInt(e.target.value)
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Level 3 Tokens Required
              </label>
              <Input
                type="number"
                value={tokenCriteria.level3}
                onChange={(e) => setTokenCriteria({
                  ...tokenCriteria,
                  level3: parseInt(e.target.value)
                })}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Reinforcers</h3>
            <Button onClick={addReinforcer}>Add Reinforcer</Button>
          </div>

          <Table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Level</th>
                <th>Schedule</th>
                <th>Criteria</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reinforcers.map(reinforcer => (
                <tr key={reinforcer.id}>
                  <td>
                    <Select
                      value={reinforcer.type}
                      onChange={(value) => updateReinforcer(reinforcer.id, 'type', value)}
                      options={[
                        'Sensory',
                        'Small Break Toys',
                        'Play Toys',
                        'Activities',
                        'Social'
                      ]}
                    />
                  </td>
                  <td>
                    <Input
                      value={reinforcer.name}
                      onChange={(e) => updateReinforcer(reinforcer.id, 'name', e.target.value)}
                    />
                  </td>
                  <td>
                    <Select
                      value={reinforcer.level.toString()}
                      onChange={(value) => updateReinforcer(reinforcer.id, 'level', parseInt(value))}
                      options={['1', '2', '3']}
                    />
                  </td>
                  <td>
                    <Select
                      value={reinforcer.schedule}
                      onChange={(value) => updateReinforcer(reinforcer.id, 'schedule', value)}
                      options={[
                        'Continuous',
                        'Fixed Ratio',
                        'Variable Ratio',
                        'Fixed Interval',
                        'Variable Interval'
                      ]}
                    />
                  </td>
                  <td>
                    <Input
                      value={reinforcer.criteria}
                      onChange={(e) => updateReinforcer(reinforcer.id, 'criteria', e.target.value)}
                      placeholder="e.g., FR3, VI5"
                    />
                  </td>
                  <td>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeReinforcer(reinforcer.id)}
                    >
                      <MinusCircle className="h-5 w-5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </div>
  );
};
