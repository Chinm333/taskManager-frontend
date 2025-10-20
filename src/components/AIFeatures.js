import React, { useState } from "react";
import axios from "../api/axiosInstance";

export default function AIFeatures({ projectId, tasks = [] }) {
  const [summary, setSummary] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!projectId) {
      setSummary("No project selected. Unable to summarize.");
      return;
    }
    setLoading(true);
    setSummary("");
    try {
      const res = await axios.get(`/ai/summary/${projectId}`);
      const data = res.data.data;
      const summaryValue =
        typeof data === "string"
          ? data
          : (data?.summary || data || res.data.summary || "");
      setSummary(summaryValue);
    } catch (err) {
      console.error(err);
      setSummary("AI summarization failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleAsk = async () => {
    if (!projectId) return alert("No project selected. Unable to ask AI.");
    if (!question) return alert("Type a question");
    setLoading(true);
    setAnswer("");
    try {
      const payload = { projectId, question };
      const res = await axios.post("/ai/question", payload);
      setAnswer(res.data.data.answer || res.data.data || res.data.answer || "");
    } catch (err) {
      console.error(err);
      setAnswer("Failed to get answer from AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-lg p-6 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          AI Assistant
        </h3>
        <p className="text-sm text-gray-600">Get insights and ask questions</p>
      </div>

      {/* Summarize Section */}
      <div className="mb-6">
        <button
          onClick={handleSummarize}
          className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !projectId}
          title={!projectId ? "No project selected" : undefined}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Summarize Project
            </span>
          )}
        </button>
      </div>

      {/* Summary Display */}
      {summary && (
        <div className="mb-6 bg-white rounded-lg p-4 shadow-md">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Summary
          </h4>
          <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{summary}</div>
        </div>
      )}

      {/* Question Section */}
      <div className="flex-1 flex flex-col">
        <h4 className="font-semibold text-gray-800 mb-3">Ask a Question</h4>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What are my in-progress tasks?"
          className="w-full border-2 border-gray-200 rounded-lg p-3 mb-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
          rows="3"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.ctrlKey && !loading && projectId && question) {
              handleAsk();
            }
          }}
        />
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => { setQuestion(""); setAnswer(""); }}
            className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
          >
            Clear
          </button>
          <button
            onClick={handleAsk}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !projectId}
            title={!projectId ? "No project selected" : undefined}
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Ask AI
            </span>
          </button>
        </div>
        <p className="text-xs text-gray-500 mb-4">Tip: Press Ctrl+Enter to submit</p>

        {/* Answer Display */}
        {answer && (
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Answer
            </h4>
            <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{answer}</div>
          </div>
        )}
      </div>
    </div>
  );
}
