// apps/agent-server/src/mcp.ts
import { parseRepo } from './tools/repoParser';
import { writeDocs } from './tools/docWriter';
import { generateSummaryWithAI } from './aiClient';


export async function handleMCPRequest(payload: any) {
  // Route based on type
  if (payload.type === 'generateDocs') {
    const repo = await parseRepo(payload.repoUrl);

    const docs = [];
    for (const file of repo.files.slice(0, 10)) {
      const summary = await generateSummaryWithAI(`Summarize this file:\n${file.content}`);
      docs.push({ path: file.path, doc: summary });
    }

    const written = await writeDocs(docs);
    return { status: 'ok', written };
  }

  if (payload.type === 'chat') {
    const aiReply = await generateSummaryWithAI(`Chat mode: ${payload.text}`);
    return { status: 'ok', answer: aiReply };
  }

  throw new Error('Unknown MCP request type');
}
