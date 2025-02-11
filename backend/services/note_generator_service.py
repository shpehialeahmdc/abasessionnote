# /backend/services/note_generator_service.py
from datetime import datetime
from typing import List, Dict, Optional

class SessionNoteGenerator:
    def __init__(self):
        self.interventions_list = [
            "FCT", "NET", "DTT", "Incidental teaching", 
            "High-P instructional sequence", "Shaping", "Chaining",
            "Prompt-fading procedures", "Positive reinforcement",
            "Premack Principle", "Multiple exemplar training",
            "Timer", "Token economy", "Visual schedules", "PRT"
        ]

    def generate_note(self,
                     session_data: Dict,
                     abc_data: List[Dict],
                     reinforcement_data: Dict,
                     client_info: Dict) -> str:
        """Generate comprehensive session note"""
        
        # Environment and participants section
        environment = session_data.get('environment', ['school'])
        participants = session_data.get('participants', [])
        env_text = f"Session was conducted in {', '.join(environment)} "
        env_text += f"with {', '.join(participants)}. "

        # Emotional state and medical concerns
        emotional_state = session_data.get('emotional_state', '')
        medical_concerns = session_data.get('medical_concerns', 
            'No medical or safety concerns arose during the session')
        
        # Interventions used
        interventions_used = set()
        for abc in abc_data:
            interventions_used.update(abc.get('interventions', []))
        
        intervention_text = "The following interventions were implemented: "
        intervention_text += ", ".join(sorted(interventions_used))

        # ABC Data compilation
        abc_text = self._compile_abc_data(abc_data)

        # Reinforcement details
        reinforcement_text = self._compile_reinforcement_data(reinforcement_data)

        # Combine all sections
        note = (
            f"{env_text}\n\n"
            f"Client appeared {emotional_state}. {medical_concerns}.\n\n"
            f"{intervention_text}\n\n"
            f"{abc_text}\n\n"
            f"Data was collected by the RBT. "
            f"{reinforcement_text} "
            f"Will continue to work on BSP goals and objectives."
        )

        return note

    def _compile_abc_data(self, abc_data: List[Dict]) -> str:
        if not abc_data:
            return "No significant behavioral incidents were recorded."

        abc_texts = []
        for abc in abc_data:
            text = (
                f"When {abc['antecedent']}, "
                f"the client {abc['behavior']}, "
                f"resulting in {abc['consequence']}. "
                f"Interventions implemented: {', '.join(abc['interventions'])}."
            )
            abc_texts.append(text)

        return " ".join(abc_texts)

    def _compile_reinforcement_data(self, reinforcement_data: Dict) -> str:
        reinforcers = reinforcement_data.get('reinforcers', [])
        if not reinforcers:
            return "Standard reinforcement procedures were followed."

        text = "Reinforcement was provided in the form of "
        reinforcer_texts = []
        
        for r_type, items in reinforcers.items():
            if items:
                reinforcer_texts.append(f"{r_type} ({', '.join(items)})")

        return text + ", ".join(reinforcer_texts) + "."
