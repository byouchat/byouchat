import { ulid } from "@std/ulid";
import { Color } from "./color-pallete.ts";

export type StoredMessage = {
  id: string;
  body: string;
  color: Color;
  kind: MessageKind;
};

export type MessageKind = "USER" | "BOT";

export async function createMessage(
  body: string,
  color: Color,
  kind: MessageKind,
): Promise<StoredMessage> {
  const message = {
    id: ulid(),
    body,
    color,
    kind,
  } satisfies StoredMessage;

  const kv = await Deno.openKv();
  await kv.atomic()
    .set(["latestMessage"], message, { expireIn: 5 * 1000 })
    .set(["messages", message.id], message, { expireIn: 30 * 1000 })
    .commit();

  return message;
}

export async function getMessages(
  endsId: string,
): Promise<StoredMessage[]> {
  const kv = await Deno.openKv();
  const iter = await kv.list({
    prefix: ["messages"],
    end: ["messages", endsId],
  });

  const entries = await Array.fromAsync(iter);
  return entries.map((e) => (e.value as StoredMessage));
}

export async function watchMessage(handler: (message: StoredMessage) => void) {
  const kv = await Deno.openKv();

  for await (const [message] of kv.watch([["latestMessage"]])) {
    if (message.value) {
      handler(message.value as StoredMessage);
    }
  }

  return () => {
    kv.close();
  };
}
