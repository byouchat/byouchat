// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_messages from "./routes/api/messages.ts";
import * as $index from "./routes/index.tsx";
import * as $center_circle_Button from "./islands/center-circle/Button.tsx";
import * as $center_circle_CenterCircle from "./islands/center-circle/CenterCircle.tsx";
import * as $center_circle_CurrentTimeText from "./islands/center-circle/CurrentTimeText.tsx";
import * as $center_circle_Input from "./islands/center-circle/Input.tsx";
import * as $color_palette_ColorPalette from "./islands/color-palette/ColorPalette.tsx";
import * as $message_MessageField from "./islands/message/MessageField.tsx";
import * as $message_MessagePopup from "./islands/message/MessagePopup.tsx";
import * as $message_message from "./islands/message/message.ts";
import * as $message_transition_StyleTransition from "./islands/message/transition/StyleTransition.tsx";
import * as $message_transition_Transition from "./islands/message/transition/Transition.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/messages.ts": $api_messages,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/center-circle/Button.tsx": $center_circle_Button,
    "./islands/center-circle/CenterCircle.tsx": $center_circle_CenterCircle,
    "./islands/center-circle/CurrentTimeText.tsx":
      $center_circle_CurrentTimeText,
    "./islands/center-circle/Input.tsx": $center_circle_Input,
    "./islands/color-palette/ColorPalette.tsx": $color_palette_ColorPalette,
    "./islands/message/MessageField.tsx": $message_MessageField,
    "./islands/message/MessagePopup.tsx": $message_MessagePopup,
    "./islands/message/message.ts": $message_message,
    "./islands/message/transition/StyleTransition.tsx":
      $message_transition_StyleTransition,
    "./islands/message/transition/Transition.tsx":
      $message_transition_Transition,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
