import { Pressable, Text, PressableProps } from "react-native/types";

export function PressableText(props: PressableProps & {text: string}) {
  return (
    <Pressable {...props}>
      <Text style={{ textDecorationLine: "underline" }}>{props.text}</Text>
    </Pressable>
  );
}
