import { useSignal } from "@preact/signals";
import { CenterCircle } from "../islands/center-circle/CenterCircle.tsx";
import { MessageField } from "../islands/message/MessageField.tsx";

export default function Home() {
  return (
    <>
      <div class="w-lvw h-lvh flex justify-center items-center">
        <div>
          <CenterCircle />
        </div>
        <div>
          <MessageField />
        </div>
      </div>
      <div id="color-palette" />
    </>
  );
}
