import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { generateText } from './aiClient';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4001;

app.get('/', (_req: Request, res: Response) => {
  res.send('✅ DocuMind Agent Server is running');
});

app.post('/api/generate', async (req, res) => {
  console.log("✅ Received generate request:", req.body);
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ result: '⚠️ Missing prompt in request.' });
    }

    const output = await generateText(prompt);
    res.json({ result: output });
  } catch (err: any) {
    console.error('❌ Error during generation:', err.message);
    res.status(500).json({
      result: '⚠️ AI generation failed. Check your API key or model setup.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
