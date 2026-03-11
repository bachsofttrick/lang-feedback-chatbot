import { useState, useEffect } from "react";
import { analyzeSentence, fetchExamples } from "./api";
import InputBox from "./components/InputBox";
import FeedbackCard from "./components/FeedbackCard";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [examples, setExamples] = useState([]);
  const [lastSentence, setLastSentence] = useState("");

  useEffect(() => {
    fetchExamples()
      .then(setExamples)
      .catch(() => {});
  }, []);

  const handleSubmit = async (sentence, language) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setLastSentence(sentence);
    try {
      const data = await analyzeSentence(sentence, language);
      setResult(data);
    } catch (err) {
      const detail = err.response?.data?.detail;
      setError(detail ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center px-4 py-12">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          LangFeedback
        </h1>
        <p className="mt-2 text-gray-500 text-base">
          Get instant grammar, fluency, and tone feedback — like a real tutor.
        </p>
      </header>

      <InputBox
        onSubmit={handleSubmit}
        loading={loading}
        examples={examples}
      />

      {loading && (
        <p className="mt-6 text-gray-400 animate-pulse">Analyzing your sentence...</p>
      )}

      {error && (
        <div className="w-full max-w-2xl mt-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          {error}
        </div>
      )}

      {result && !loading && (
        <FeedbackCard data={result} original={lastSentence} />
      )}
    </div>
  );
}
