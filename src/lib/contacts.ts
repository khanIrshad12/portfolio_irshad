import fs from "fs/promises";
import path from "path";
import type { ContactMessage } from "./types";

const DATA_PATH = path.join(process.cwd(), "data", "contacts.json");

async function ensureFile(): Promise<void> {
  try {
    await fs.access(DATA_PATH);
  } catch {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
    await fs.writeFile(DATA_PATH, "[]", "utf-8");
  }
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  const parsed = JSON.parse(raw) as ContactMessage[];
  return Array.isArray(parsed) ? parsed : [];
}

export async function saveContactMessages(
  messages: ContactMessage[],
): Promise<void> {
  await ensureFile();
  await fs.writeFile(DATA_PATH, JSON.stringify(messages, null, 2), "utf-8");
}

export async function addContactMessage(
  input: Omit<ContactMessage, "id" | "createdAt" | "read">,
): Promise<ContactMessage> {
  const messages = await getContactMessages();
  const message: ContactMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    read: false,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    message: input.message.trim(),
  };
  messages.unshift(message);
  await saveContactMessages(messages);
  return message;
}

export async function updateContactMessage(
  id: string,
  patch: Partial<Pick<ContactMessage, "read">>,
): Promise<ContactMessage | null> {
  const messages = await getContactMessages();
  const idx = messages.findIndex((m) => m.id === id);
  if (idx < 0) return null;
  messages[idx] = { ...messages[idx], ...patch };
  await saveContactMessages(messages);
  return messages[idx];
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  const messages = await getContactMessages();
  const next = messages.filter((m) => m.id !== id);
  if (next.length === messages.length) return false;
  await saveContactMessages(next);
  return true;
}

export async function getUnreadContactCount(): Promise<number> {
  const messages = await getContactMessages();
  return messages.filter((m) => !m.read).length;
}
