import ScoreBar from "./ScoreBar";

const TONE_EMOJI = {
  confident: "💪",
  hesitant: "🤔",
};

const FORMALITY_EMOJI = {
  formal: "👔",
  informal: "👋",
};

function Section({ title, children }) {
  return (
    <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
      <h3 className="text-xs uppercase tracking-wide font-semibold text-gray-400 mb-1">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function FeedbackCard({ data, original }) {
  const {
    grammar_correction,
    grammar_explanation,
    fluency_score,
    fluency_reasoning,
    alternative_phrasing,
    tip,
    tone,
    confidence,
    formality,
  } = data;

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 mt-6 flex flex-col gap-4">
      <h2 className="text-lg font-bold text-gray-800">Feedback</h2>

      {/* Before / After */}
      <Section title="Grammar">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 bg-red-50 border border-red-100 rounded-lg p-3 text-sm text-red-700">
            <span className="block text-xs font-semibold text-red-400 mb-1">Original</span>
            {original}
          </div>
          <div className="flex-1 bg-green-50 border border-green-100 rounded-lg p-3 text-sm text-green-700">
            <span className="block text-xs font-semibold text-green-400 mb-1">Corrected</span>
            {grammar_correction}
          </div>
        </div>
        {grammar_explanation && (
          <p className="text-sm text-gray-600 mt-2">{grammar_explanation}</p>
        )}
      </Section>

      {/* Fluency score */}
      <Section title="Fluency Score">
        <ScoreBar score={fluency_score} label="Naturalness" />
        {fluency_reasoning && (
          <p className="text-sm text-gray-600 mt-2">{fluency_reasoning}</p>
        )}
      </Section>

      {/* Alternative phrasing */}
      {alternative_phrasing && (
        <Section title="More Natural Phrasing">
          <p className="text-sm bg-blue-50 border border-blue-100 rounded-lg p-3 text-blue-700">
            "{alternative_phrasing}"
          </p>
        </Section>
      )}

      {/* Tone */}
      <Section title="Tone & Style">
        <div className="flex flex-wrap gap-3">
          <span className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700">
            {TONE_EMOJI[tone] ?? "💬"} {tone}
          </span>
          <span className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700">
            {FORMALITY_EMOJI[formality] ?? "📝"} {formality}
          </span>
          {confidence !== undefined && (
            <div className="w-full mt-2">
              <ScoreBar
                score={Math.round(confidence * 10)}
                label="Tone confidence"
              />
            </div>
          )}
        </div>
      </Section>

      {/* Tip */}
      {tip && (
        <Section title="Tutor Tip">
          <p className="text-sm text-gray-700 bg-yellow-50 border border-yellow-100 rounded-lg p-3">
            {tip}
          </p>
        </Section>
      )}
    </div>
  );
}
