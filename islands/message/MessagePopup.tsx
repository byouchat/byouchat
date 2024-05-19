import { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Message } from "./message.ts";
import StyleTransition from "./transition/StyleTransition.tsx";

type Props = {
  message: Message;
};

export const MessagePopup: FunctionalComponent<Props> = ({ message }) => {
  const [isShown, setShown] = useState(true);

  useEffect(() => {
    const job = setTimeout(() => {
      setShown(false);
    }, 3000);

    return () => {
      clearTimeout(job);
    };
  }, []);

  return (
    <StyleTransition
      alwaysMounted
      in={isShown}
      duration={390}
      styles={{
        appearActive: {
          animation: "bounce 0.4s",
        },
        appearDone: {
          opacity: 1,
        },
        exit: {
          opacity: 1,
        },
        exitActive: {
          animation: "bounce 0.4s reverse",
        },
        exitDone: {
          opacity: 0,
        },
      }}
      appear
    >
      <div
        class="text-white bg-black p-8 absolute"
        style={{
          "left": `${message.position[0]}px`,
          "top": `${message.position[1]}px`,
        }}
      >
        {message.body}
      </div>
    </StyleTransition>
  );
};
