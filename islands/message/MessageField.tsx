import { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { generatePosition, Message } from "./message.ts";
import { MessagePopup } from "./MessagePopup.tsx";

export const MessageField: FunctionalComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    // const host = window.location.host;
    // const wsUrl = `${protocol}//${host}/api/socket`;
    // const socket = new WebSocket(wsUrl);
    // socket.addEventListener("error", console.error);
    // socket.addEventListener("close", console.log);
    // socket.addEventListener("message", (event) => {
    //   console.log("[socket:message]", event);
    // });
    // new Promise((resolve) => socket.addEventListener("open", resolve)).then(
    //   () => {
    //     socket.send("Hello");
    //   },
    // );

    setMessages([{ id: "aa", body: "fooo", position: generatePosition() }]);
  }, []);

  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes bounce {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          1% {
            opacity: 1;
          }
          40% {
            transform: scale(1);
          }
          80% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        `,
        }}
      />
      {messages.map((m) => <MessagePopup message={m} key={m.id} />)}
    </div>
  );
};
