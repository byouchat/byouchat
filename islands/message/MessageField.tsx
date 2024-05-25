import { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { generatePosition, Message } from "./message.ts";
import { MessagePopup } from "./MessagePopup.tsx";

export const MessageField: FunctionalComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const source = new EventSource("/api/messages");
    source.addEventListener("message", (event) => {
      const data: Message = JSON.parse(event.data);
      const message = {
        id: data.id,
        body: data.body,
        position: generatePosition(),
      };
      setMessages((current) => [...current, message]);
    });

    return () => {
      source.close();
    };
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
