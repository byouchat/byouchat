import { ComponentProps, FunctionalComponent } from "preact";

export const Input: FunctionalComponent<ComponentProps<"input">> = (props) => {
  return (
    <input
      {...props}
      class="p-2 rounded-md h-10 outline-none border-none text-black"
    />
  );
};
