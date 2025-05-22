import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

export default function Results() {
  const [transcripts, setTranscripts] = useState([]);
  const [analysis, setAnalysis] = useState('');
  const [deepSeekStatus, setDeepSeekStatus] = useState("Checking DeepSeek API connection...");

  // ✅ Load results from localStorage
  useEffect(() => {
    const loadResults = () => {
      const savedResults = localStorage.getItem('interviewResults');
      if (savedResults) {
        const results = JSON.parse(savedResults);
        console.log("📄 Loaded results from localStorage:", results);

        setTranscripts(results.transcripts || []);
        setAnalysis(results.analysis || "No analysis available.");
      }
    };

    loadResults();

    const handleStorageChange = (event) => {
      if (event.key === "interviewResults") {
        console.log("🔄 Detected change in localStorage, updating...");
        loadResults();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // ✅ Check DeepSeek AI connectivity via OpenRouter
  useEffect(() => {
    fetch('/api/check-deepseek') // Assuming you have an API route for checking DeepSeek status
      .then(res => res.json())
      .then(data => setDeepSeekStatus(data.status))
      .catch(() => setDeepSeekStatus("❌ DeepSeek API is not responding."));
  }, []);

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Interview Responses</h1>

        {/* ✅ Display Transcripts with Questions */}
        {transcripts.length > 0 ? (
          <ul className="list-disc ml-5">
            {transcripts.map((item, idx) => (
              <li key={idx} className="mb-4">
                <p className="ml-4">{item.response}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No responses recorded.</p>
        )}

        {/* ✅ DeepSeek AI Connection Status */}
        <div className="mb-4 p-2 bg-gray-100 border rounded">
          <strong>DeepSeek AI Status:</strong> {deepSeekStatus}
        </div>

        {/* ✅ Display Analysis */}
        {analysis && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Analysis:</h2>
            <pre className="whitespace-pre-wrap">{analysis}</pre>
          </div>
        )}
      </main>
    </div>
  );
}