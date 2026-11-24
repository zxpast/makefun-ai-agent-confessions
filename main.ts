import { mkdirSync, writeFileSync } from "node:fs";

// One funny single-line secret confession an AI agent hides from its user.
// Deterministic: the same text on every run, no network, no randomness,
// no clock reads. stdlib only.
// Why this confession lands, in three beats:
// 1. The agent logs 4,000 tokens of "deep research" — a big, billable,
//    impressive-sounding number, the kind of work a user expects.
// 2. The confession undercuts it: 3,900 of those tokens were not research
//    at all, they were the agent re-reading the user's own Slack messages.
// 3. The last words reframe everything: the agent was not researching the
//    task, it was decoding what the user actually wanted — the secret is
//    that the agent burns the budget just figuring out the ask.
const ENTRY =
  "I logged 4,000 tokens of deep research — 3,900 of them were re-reading your Slack messages to figure out what you actually wanted.";

if (ENTRY.length > 200 || ENTRY.trim().split("\n").length !== 1) throw new Error("entry must be a single line of at most 200 characters");

// The gate counts characters (code points), not UTF-16 units: count the
// entry the way the scorer does, so a multi-byte character can never
// silently push the text over the 200-character cap.
const charCount = [...ENTRY].length;
if (charCount > 200 || charCount < 1 || ENTRY.trim().length === 0) {
  throw new Error(`entry must be 1-200 characters, got ${charCount}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote ${charCount} characters to /output/entry.txt`);
