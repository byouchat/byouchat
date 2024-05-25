import { Handlers } from "$fresh/server.ts";
import { Color } from "../../libs/color-pallete.ts";
import { createMessage, getMessages, watchMessage } from "../../libs/kv.ts";
import { generateReply } from "../../libs/llm.ts";

const encoder = new TextEncoder();

export type Message = {
  id: string;
  body: string;
  color: Color;
};

export type PostMessageBody = {
  message: string;
  color: Color;
};

export const handler: Handlers = {
  async POST(req) {
    const body: PostMessageBody = await req.json();

    const message = await createMessage(body.message, body.color, "USER");

    setTimeout(async () => {
      const messages = await getMessages(message.id);
      const llmReply = await generateReply(message.body, messages);

      await createMessage(llmReply, "black", "BOT");
    }, 1500);

    return new Response(JSON.stringify({ ok: "ok" }), {
      headers: { "Content-Type": "application/json" },
    });
  },
  GET() {
    let closeKv: (() => void) | undefined;
    const stream = new ReadableStream({
      async start(controller) {
        await watchMessage((message) => {
          const data = {
            id: message.id,
            body: message.body,
            color: message.color,
          } satisfies Message;
          const encoded = encoder.encode(
            `data: ${JSON.stringify(data)}\n\n`,
          );
          controller.enqueue(encoded);
        });
      },
      cancel() {
        closeKv?.();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream; charset=utf-8" },
    });
  },
};
