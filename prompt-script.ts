import openai, { OpenAI } from "openai";
import * as fs from "fs";
import consola from "consola";

function createOpenAiClient() {
  const openAiApiKey = process.env.OPEN_AI_API_KEY;
  if (openAiApiKey === undefined) {
    throw new Error("OPEN_AI_API_KEY is missing from .env");
  }
  return new OpenAI({
    apiKey: openAiApiKey,
  });
}

function loadPrompt() {
  let promptBuffer: Buffer;
  promptBuffer = fs.readFileSync("./prompt.txt");
  return promptBuffer.toString();
}

async function getChatCompletion(client: OpenAI, prompt: string) {
  const messages: openai.Chat.ChatCompletionMessageParam[] = [
    {
      role: "user",
      content: prompt,
    },
  ];
  const response = await client.chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
  });
  return response.choices[0]?.message.content;
}

function doesPromptContainForbiddenWord(prompt: string) {
  const forbiddenPattern = /tic.+tac.+toe/;
  return forbiddenPattern.test(prompt.toLowerCase());
}

function writeIndexHtml(content: string) {
  if (!fs.existsSync("./public")) {
    fs.mkdirSync("./public");
  }
  fs.writeFileSync("./public/index.html", content);
}

async function run() {
  const client = createOpenAiClient();
  const prompt = loadPrompt();
  const hasForbiddenWord = doesPromptContainForbiddenWord(prompt);
  if(hasForbiddenWord) {
    throw new Error("Prompt is not allowed to contain any combination of word 'tic-tac-toe'.")
  }
  consola.info("Loading");
  const chatResponse = await getChatCompletion(client, prompt);
  if (!chatResponse) {
    throw new Error("Chat completion failed, got no message back.");
  }
  writeIndexHtml(chatResponse);
}

if (process.argv[2] === "exec") {
  try {
    await run();
  } catch(e) {
    consola.error(e);
    process.exit(1);
  }
  consola.success("Result written to index.html");
  process.exit(0);
}
