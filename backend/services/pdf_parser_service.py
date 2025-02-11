# /backend/services/pdf_parser_service.py
import PyPDF2
import re
from typing import Dict, List

class PDFParserService:
    def __init__(self):
        self.reinforcer_patterns = {
            'sensory': r'SENSORY:\s*(.*?)(?=\n|$)',
            'break_toys': r'SMALL BREAK TOYS:\s*(.*?)(?=\n|$)',
            'play_toys': r'PLAY TOYS:\s*(.*?)(?=\n|$)',
            'activities': r'ACTIVITIES:\s*(.*?)(?=\n|$)'
        }
        
        self.schedule_patterns = {
            'monday_thursday': r'Monday-Thursday\s*(.*?)(?=Friday|$)',
            'friday': r'Friday\s*(.*?)(?=\n\n|$)'
        }

    def parse_pdf(self, pdf_path: str) -> Dict:
        """Parse PDF and extract structured data"""
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ''
            for page in reader.pages:
                text += page.extract_text()

        return {
            'reinforcers': self._extract_reinforcers(text),
            'schedules': self._extract_schedules(text),
            'interventions': self._extract_interventions(text),
            'abc_data': self._extract_abc_data(text)
        }

    def _extract_reinforcers(self, text: str) -> Dict[str, List[str]]:
        reinforcers = {}
        for category, pattern in self.reinforcer_patterns.items():
            match = re.search(pattern, text, re.MULTILINE)
            if match:
                items = [item.strip() for item in match.group(1).split(',')]
                reinforcers[category] = items
        return reinforcers

    def _extract_schedules(self, text: str) -> Dict[str, List[Dict]]:
        schedules = {}
        for day_type, pattern in self.schedule_patterns.items():
            match = re.search(pattern, text, re.MULTILINE | re.DOTALL)
            if match:
                schedule_text = match.group(1)
                time_slots = re.findall(r'(\d{1,2}:\d{2})(?:\s*-\s*(\d{1,2}:\d{2})):\s*(.*?)(?=\n|$)',
                                      schedule_text)
                schedules[day_type] = [
                    {'start': start, 'end': end, 'activity': activity.strip()}
                    for start, end, activity in time_slots
                ]
        return schedules

    def _extract_interventions(self, text: str) -> List[str]:
        intervention_pattern = r'USUAL USE OF INTERVENTIONS.*?:(.*?)(?=\n\n|$)'
        match = re.search(intervention_pattern, text, re.MULTILINE | re.DOTALL)
        if match:
            interventions = [i.strip() for i in match.group(1).split(',')]
            return interventions
        return []

    def _extract_abc_data(self, text: str) -> List[Dict]:
        abc_pattern = r'Antecedent/Behavior/Consequences:(.*?)(?=\n\n|$)'
        matches = re.finditer(abc_pattern, text, re.MULTILINE | re.DOTALL)
        abc_data = []
        
        for match in matches:
            abc_text = match.group(1)
            parts = abc_text.split('/')
            if len(parts) == 3:
                abc_data.append({
                    'antecedent': parts[0].strip(),
                    'behavior': parts[1].strip(),
                    'consequence': parts[2].strip()
                })
        
        return abc_data
