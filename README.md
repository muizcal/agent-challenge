# 🧠 DocuMind AI Agent

**DocuMind AI Agent** is an intelligent, decentralized document and research assistant that summarizes, analyzes, and extracts insights from text — while also supporting contextual Q&A and advanced reasoning.  
Built using **Nosana**, **Docker**, and hybrid AI inference (**local + cloud models**).

---

## 🚀 Overview

DocuMind is not just a summarizer — it’s a **multi-function AI reasoning agent** designed to:

- 🧠 Interpret and summarize documents  
- 🔍 Extract structured insights and relationships  
- 💬 Engage in contextual Q&A  
- ⚙️ Run locally or on Nosana’s decentralized AI network  
- 🪶 Connect via an elegant frontend interface built with Next.js  

---

## 🧩 Key Capabilities

✅ Text summarization and analysis  
✅ Insight extraction and structured reporting  
✅ Contextual reasoning and response generation  
✅ Support for multiple AI backends (Ollama, OpenAI, Gemini)  
✅ Decentralized deployment on Nosana Network  
✅ Dockerized backend for reproducibility  

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js + Tailwind |
| **Backend** | Node.js (Express + TypeScript) |
| **AI Models** | Ollama (local), OpenAI, Gemini |
| **Deployment** | Docker + Nosana |
| **Infra** | PNPM monorepo setup |

---

## 🧱 Environment Setup

Create `.env.local` in `/apps/web` and `/apps/agent-server`:

```bash
# Local AI model
OLLAMA_API_URL=http://127.0.0.1:11434
MODEL_NAME_AT_ENDPOINT=phi3

# Optional API keys (not committed)
OPENAI_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key
GEMINI_MODEL=models/gemini-2.5-flash

# Frontend connects to backend (Nosana URL)
NEXT_PUBLIC_BACKEND_URL=https://4a539vppxvvzjpgmuz4nryhynrkuhn2r6bdcgsynwrox.node.k8s.prd.nos.ci
```

---

### 3️⃣ Run Backend

```bash
cd apps/agent-server
npm install
npm run dev
```

---

### 4️⃣ Run Frontend

```bash
cd apps/web
npm install
npm run dev
```

Visit your app at 👉 [http://localhost:3000](http://localhost:3000)

---

## 🧪 Test Prompt

Use this example to test:

> “Summarize the key insights from this paragraph as if preparing a report for a business analyst:  
> Artificial intelligence is transforming industries by automating repetitive tasks, improving decision-making with data-driven insights, and enhancing customer experiences through personalization.”

**Expected Output:**

**Key Insights on AI's Transformative Impact:**

1. **Operational Efficiency:** AI automates repetitive tasks, leading to streamlined processes and increased operational efficiency.  
2. **Enhanced Decision-Making:** It improves strategic and tactical decisions through data-driven insights.  
3. **Superior Customer Experience:** AI personalizes interactions and boosts customer satisfaction.  

---

## 🐳 Docker Build & Push

From the project root:

```bash
docker build -t your-dockerhub-username/documind-ai-agent:latest .
docker push your-dockerhub-username/documind-ai-agent:latest
```

---

## ☁️ Nosana Deployment

Deploy using your Nosana CLI:

```bash
nosana deploy --image your-dockerhub-username/documind-ai-agent:latest
```

Once deployed, note your Nosana node URL (e.g.):

```
https://4a539vppxvvzjpgmuz4nryhynrkuhn2r6bdcgsynwrox.node.k8s.prd.nos.ci
```

Then update `.env.local` in your frontend with:

```bash
NEXT_PUBLIC_BACKEND_URL=https://4a539vppxvvzjpgmuz4nryhynrkuhn2r6bdcgsynwrox.node.k8s.prd.nos.ci
```

Rebuild and redeploy your frontend (e.g., on Vercel).

---

### 🔗 Links

- **Nosana Deployment URL:** [https://dashboard.nosana.com/jobs/ASag6QQDer5cZRQU7Pv3Lgks1ZvMP2CvAJAQ9qxsKadw](https://dashboard.nosana.com/jobs/ASag6QQDer5cZRQU7Pv3Lgks1ZvMP2CvAJAQ9qxsKadw)  
- **Docker Hub Image:** [https://hub.docker.com/repository/docker/muizcal/documind-agent-server](https://hub.docker.com/repository/docker/muizcal/documind-agent-server)  
- **Forked Repo:** [https://github.com/muizcal/agent-challenge](https://github.com/muizcal/agent-challenge)  

---

## 🎥 Video Demo

🎬 **Demo Link:** [https://drive.google.com/file/d/1XOW4v7sBcOgexN84cLVFs68BAdSPFrSr/view?usp=sharing]

---

## 🐦 Social Media Post

**X Post:** [https://x.com/5eevaa19652/status/1983957129301274641](https://x.com/5eevaa19652/status/1983957129301274641)

---

## 👨‍💻 Author

**Abdulmuiz Shittu (Muizcal)**  
AI Developer | Nosana Agent Challenge Participant  
[@nosana_ai](https://x.com/nosana_ai)
