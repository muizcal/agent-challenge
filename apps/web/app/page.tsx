"use client";

import { useState } from "react";
import nosanaLogo from "../assets/nosana-logo.png";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
  if (!input.trim()) return;
  setLoading(true);
  setOutput("");

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/generate`,  {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt: input }),
});

    const data = await res.json();

    const text = data.result || "⚠️ AI response unavailable.";
    let displayed = "";
    for (let i = 0; i < text.length; i++) {
      displayed += text[i];
      setOutput(displayed);
      await new Promise((r) => setTimeout(r, 15)); // typing speed
    }
  } catch {
    setOutput("❌ Connection to backend failed.");
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="background">
      <div className="glass-card">
        <img src="/assets/nosana-logo.png" alt="Nosana Logo" className="logo" />
        <h1 className="title"> DocuMind</h1>
        <p className="subtitle">Your AI-powered summarizer — Fast, Smart & Beautiful</p>

        <textarea
          className="textarea"
          placeholder="Paste your text or question here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="buttons">
          <button className="generate" onClick={handleGenerate} disabled={loading}>
            {loading ? "Generating..." : "✨ Generate Summary"}
          </button>
          <button className="clear" onClick={() => { setInput(""); setOutput(""); }}>
            Clear
          </button>
        </div>

        <div className="output">
          {output ? output : <span className="hint">Your AI-generated summary will appear here.</span>}
        </div>
      </div>

      <style jsx>{`
        /* Full-page background */
        .background {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #0f172a, #1e3a8a, #7e22ce, #be185d);
  background-size: 300% 300%;
  animation: gradientMove 12s ease infinite;
  font-family: 'Inter', system-ui, sans-serif;
  color: #f1f5f9;
  margin: 0;
  padding: 0;
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}


        /* Center card */
        .glass-card {
  width: 90%;
  max-width: 900px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  padding: 40px;
  box-shadow: 0 0 25px rgba(168, 85, 247, 0.4), 0 0 80px rgba(236, 72, 153, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: pulseGlow 5s infinite alternate;
}

@keyframes pulseGlow {
  from { box-shadow: 0 0 25px rgba(168, 85, 247, 0.4), 0 0 80px rgba(236, 72, 153, 0.15); }
  to { box-shadow: 0 0 40px rgba(236, 72, 153, 0.6), 0 0 100px rgba(168, 85, 247, 0.3); }
}
  .logo {
          width: 40px;
          height: 40px;
          margin-bottom: 10px;
        }


        .title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: #ffffff;
        }

        .subtitle {
          font-size: 1.1rem;
          color: #cbd5e1;
          margin-bottom: 2rem;
        }

        .textarea {
          width: 100%;
          min-height: 220px;
          border-radius: 12px;
          border: none;
          padding: 18px;
          font-size: 1rem;
          line-height: 1.6;
          resize: vertical;
          color: #e2e8f0;
          background: rgba(255, 255, 255, 0.08);
          outline: none;
          transition: all 0.3s ease;
        }

        .textarea:focus {
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.6);
        }

        .buttons {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }

        .generate {
  position: relative;
  background: linear-gradient(90deg, #a855f7, #ec4899);
  border: none;
  color: white;
  font-weight: 700;
  padding: 14px 28px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.4);
}

.generate::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, rgba(255,255,255,0.2), rgba(255,255,255,0));
  animation: shine 2.5s infinite;
}

@keyframes shine {
  0% { left: -100%; }
  50% { left: 100%; }
  100% { left: 100%; }
}

.generate:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(236, 72, 153, 0.7), 0 0 60px rgba(168, 85, 247, 0.4);
}


        .generate:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .clear {
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: transparent;
          color: #f1f5f9;
          padding: 14px 28px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .clear:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .output {
          margin-top: 25px;
          width: 100%;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 12px;
          padding: 20px;
          font-family: "Fira Code", monospace;
          text-align: left;
          min-height: 150px;
          color: #f8fafc;
          white-space: pre-wrap;
        }

        .hint {
          color: #94a3b8;
        }

        @media (max-width: 768px) {
  .glass-card {
    padding: 24px;
  }
  .title {
    font-size: 2rem;
  }
  .subtitle {
    font-size: 1rem;
  }
  .textarea {
    min-height: 160px;
    font-size: 0.95rem;
  }
}

      `}</style>
    </div>
  );
}