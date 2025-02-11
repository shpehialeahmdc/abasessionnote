import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

className="border p-2 rounded"
placeholder="Progress notes"
value={goal.progress}
onChange={(e) => handleGoalChange(index, 'progress', e.target.value)}
/>
</div>
))}
</div>
<Button 
onClick={addGoal}
className="mt-2"
>
Add Goal
</Button>
</div>

<div>
<h3 className="font-medium mb-2">Additional Notes</h3>
<textarea
className="w-full border p-2 rounded min-h-[100px]"
value={sessionData.notes}
onChange={(e) => setSessionData({...sessionData, notes: e.target.value})}
placeholder="Enter any additional observations, interventions used, or notes..."
/>
</div>

<Button 
onClick={generateNote}
className="w-full"
>
Generate Session Note
</Button>

{generatedNote && (
<div className="mt-4">
<h3 className="font-medium mb-2">Generated Note</h3>
<pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded border">
{generatedNote}
</pre>
<Button
onClick={() => {
navigator.clipboard.writeText(generatedNote);
}}
className="mt-2"
>
Copy to Clipboard
</Button>
</div>
)}
</div>
</Card>
);
};

// /frontend/src/App.tsx
import React from 'react';
import { BehaviorTracker } from './components/BehaviorTracker';
import { SessionNoteGenerator } from './components/SessionNoteGenerator';

export const App: React.FC = () => {
return (
<div className="container mx-auto p-4">
<h1 className="text-2xl font-bold mb-6">ABA Session Manager</h1>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<BehaviorTracker />
<SessionNoteGenerator />
</div>
</div>
);
};

export default App;
