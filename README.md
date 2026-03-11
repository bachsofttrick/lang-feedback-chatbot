# Language Feedback Chatbot

An AI-powered language feedback tool that gives instant grammar correction, fluency scoring, and tone analysis.

---

## What It Does

Type a sentence in the language you're learning and get back:

- **Grammar correction**: fixes errors and explains why
- **Fluency score**: rates how natural the sentence sounds (1–10)
- **Alternative phrasing**: a more natural way to say it
- **Tone detection**: is it confident, hesitant, formal, or informal?
- **Tutor tip**: one actionable suggestion to improve

---

## Tech Stack

| Layer | Tool |
|---|---|
| LLM | Anthropic `claude-haiku-4-5` |
| Tone detection | Hugging Face `distilbert-base-uncased-finetuned-sst-2-english` |
| Backend | FastAPI (Python) |
| Frontend | Svelte + TailwindCSS (Vite) |
| HTTP client | axios |

---

## Project Structure

```
lang-feedback-chatbot/
│
├── backend/
│   ├── main.py              # FastAPI app: /analyze, /languages, /examples + static file serving
│   ├── feedback.py          # Anthropic API call + JSON parsing
│   ├── tone_detector.py     # Hugging Face sentiment/tone pipeline
│   ├── prompts.py           # LLM prompt templates
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── main.js
│       ├── App.svelte
│       ├── api.js
│       ├── index.css
│       └── components/
│           ├── InputBox.svelte     # Sentence input, language selector, examples
│           ├── FeedbackCard.svelte # Displays all feedback sections
│           └── ScoreBar.svelte     # Visual score bar (green/yellow/red)
│
├── install.sh               # Installs Python + Node dependencies
├── run.sh                   # Builds frontend, starts backend
└── README.md
```

---

## Setup

### Prerequisites

- Python 3.10+
- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

### Install

```bash
./install.sh
```

### Run

```bash
ANTHROPIC_API_KEY=your_key_here ./run.sh
```

`run.sh` builds the React frontend and starts the FastAPI server. Everything is served from a single origin at `http://localhost:8000`.

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/analyze` | Analyze a sentence |
| `GET` | `/languages` | List supported languages |
| `GET` | `/examples` | Get example sentences |

### Example request

```bash
curl -X POST http://localhost:8000/analyze \
  -H "Content-Type: application/json" \
  -d '{"sentence": "Yesterday I goed to the store.", "language": "English"}'
```

### Example response

```json
{
  "grammar_correction": "Yesterday I went to the store.",
  "grammar_explanation": "'Goed' is not a word. The past tense of 'go' is 'went'.",
  "fluency_score": 4,
  "fluency_reasoning": "The sentence structure is clear but the verb error makes it sound unnatural.",
  "alternative_phrasing": "I went to the store yesterday.",
  "tip": "Irregular verbs like 'go → went' don't follow the regular -ed pattern. Keep a list of common ones.",
  "tone": "confident",
  "confidence": 0.9821,
  "formality": "informal"
}
```

---

## Supported Languages

English, Spanish, French, German, Italian, Portuguese, Japanese, Chinese, Korean
