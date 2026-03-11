from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from feedback import get_feedback
from tone_detector import detect_tone

app = FastAPI(title="LangFeedback API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

SUPPORTED_LANGUAGES = [
    "English", "Spanish", "French", "German", "Italian",
    "Portuguese", "Japanese", "Chinese", "Korean",
]

EXAMPLE_SENTENCES = [
    {"sentence": "Yesterday I goed to the store and buyed some milk.", "language": "English"},
    {"sentence": "She don't know nothing about it.", "language": "English"},
    {"sentence": "I am very exciting about the new project.", "language": "English"},
    {"sentence": "Can you help me for find the train station?", "language": "English"},
]


class AnalyzeRequest(BaseModel):
    sentence: str
    language: str = "English"


@app.get("/")
def root():
    return {"status": "ok", "message": "LangFeedback API is running."}


@app.get("/languages")
def get_languages():
    return {"languages": SUPPORTED_LANGUAGES}


@app.get("/examples")
def get_examples():
    return {"examples": EXAMPLE_SENTENCES}


@app.post("/analyze")
async def analyze(req: AnalyzeRequest):
    sentence = req.sentence.strip()
    if not sentence:
        raise HTTPException(status_code=422, detail="Sentence cannot be empty.")
    if len(sentence) > 1000:
        raise HTTPException(status_code=422, detail="Sentence is too long (max 1000 characters).")
    if req.language not in SUPPORTED_LANGUAGES:
        raise HTTPException(
            status_code=422,
            detail=f"Unsupported language. Choose from: {', '.join(SUPPORTED_LANGUAGES)}",
        )

    feedback = get_feedback(sentence, req.language)
    tone_data = detect_tone(sentence)

    return {**feedback, **tone_data}
