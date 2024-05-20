import { FunctionalComponent } from "preact";
import { Input } from "./Input.tsx";
import { Button } from "./Button.tsx";
import { ComponentProps } from "preact";

export const CenterCircle: FunctionalComponent = () => {
  const onSubmit: ComponentProps<"form">["onSubmit"] = async (
    e,
  ) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const message = formData.get("message")?.toString();
    await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({
        message,
      }),
    });

    target?.reset();
  };

  return (
    <div
      class="w-96 h-96 rounded-full p-8 flex flex-col items-center gap-4"
      style={{
        "color": "var(--circle-text-color)",
        "backgroundColor": "var(--circle-bg-color)",
        "--circle-bg-color": "rgb(44, 44, 44)", // TODO: palette
        "--circle-text-color": "white",
      }}
    >
      <div>
        <div class="text-5xl font-bold py-3">- 秒 -</div>
        <div class="text-sm">3秒で消えるSNS</div>
      </div>
      <div class="text-sm">09時54分49秒</div>
      <form class="w-full flex flex-col gap-4 px-3" onSubmit={onSubmit}>
        <Input name="message" placeholder="ここにテキストを入力" />
        <div class="w-full flex justify-between items-center">
          <div>Color</div>
          <Button type="submit">送信</Button>
        </div>
      </form>
      <div class="flex flex-col-reverse flex-grow text-sm">
        <div>Twitter @BYOUCHAT</div>
      </div>
    </div>
  );
};
