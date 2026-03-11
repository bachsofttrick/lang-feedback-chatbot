from transformers import pipeline

_classifier = None


def _get_classifier():
    global _classifier
    if _classifier is None:
        _classifier = pipeline(
            "text-classification",
            model="distilbert-base-uncased-finetuned-sst-2-english",
            top_k=None,
        )
    return _classifier


def detect_tone(text: str) -> dict:
    classifier = _get_classifier()
    results = classifier(text)[0]

    # results is a list of {"label": ..., "score": ...}
    # SST-2 labels: POSITIVE / NEGATIVE — we map these to tone descriptors
    label_map = {
        "POSITIVE": "confident",
        "NEGATIVE": "hesitant",
    }

    top = max(results, key=lambda x: x["score"])
    tone_label = label_map.get(top["label"], top["label"].lower())
    confidence = round(top["score"], 4)

    # Derive formality hint based on simple heuristics on top of sentiment
    formality = _estimate_formality(text)

    return {
        "tone": tone_label,
        "confidence": confidence,
        "formality": formality,
    }


def _estimate_formality(text: str) -> str:
    informal_markers = [
        "gonna", "wanna", "gotta", "kinda", "sorta", "ya", "yep", "nope",
        "lol", "omg", "btw", "tbh", "idk", "u ", " ur ", "cuz", "cos",
    ]
    text_lower = text.lower()
    informal_count = sum(1 for marker in informal_markers if marker in text_lower)
    return "informal" if informal_count > 0 else "formal"
