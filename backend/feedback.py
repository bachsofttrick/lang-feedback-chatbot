import json
import os
import anthropic
from prompts import FEEDBACK_PROMPT

_client = None


def _get_client() -> anthropic.Anthropic:
    global _client
    if _client is None:
        _client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
    return _client


def get_feedback(sentence: str, language: str = "English") -> dict:
    client = _get_client()
    prompt = FEEDBACK_PROMPT.format(user_input=sentence, language=language)

    message = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}],
    )

    raw = message.content[0].text.strip()

    # Strip markdown code fences if the model wraps the JSON
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
        raw = raw.strip()

    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        # Fallback: return raw text so the frontend still gets something
        return {
            "grammar_correction": "Unable to parse response.",
            "grammar_explanation": raw,
            "fluency_score": 0,
            "fluency_reasoning": "",
            "alternative_phrasing": "",
            "tip": "",
        }
