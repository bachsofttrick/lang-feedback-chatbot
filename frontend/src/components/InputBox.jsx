import { useState } from "react";

const LANGUAGES = [
  "English", "Spanish", "French", "German", "Italian",
  "Portuguese", "Japanese", "Chinese", "Korean",
];

export default function InputBox({ onSubmit, loading, examples }) {
  const [sentence, setSentence] = useState("");
  const [language, setLanguage] = useState("English");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sentence.trim()) onSubmit(sentence.trim(), language);
  };

  const loadExample = (example) => {
    setSentence(example.sentence);
    setLanguage(example.language);
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          className="w-full border border-gray-300 rounded-xl p-4 text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          rows={4}
          placeholder="Type a sentence you want feedback on..."
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          maxLength={1000}
        />
        <div className="flex gap-3 items-center">
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={loading || !sentence.trim()}
            className="ml-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      </form>

      {examples && examples.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide font-semibold">
            Try an example
          </p>
          <div className="flex flex-wrap gap-2">
            {examples.map((ex, i) => (
              <button
                key={i}
                onClick={() => loadExample(ex)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-full transition-colors text-left"
              >
                {ex.sentence.length > 50
                  ? ex.sentence.slice(0, 47) + "..."
                  : ex.sentence}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
