import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // Set this in your .env
});

export async function fetchRepoFile(owner, repo, path) {
  try {
    const res = await octokit.repos.getContent({ owner, repo, path });
    if (res.data && res.data.content) {
      const content = Buffer.from(res.data.content, "base64").toString("utf-8");
      return { path, content };
    }
    return { path, content: "Empty or binary file." };
  } catch (err) {
    console.error("GitHub fetch failed:", err);
    return { path, content: "Error fetching file." };
  }
}