import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { PressableText } from "./styled/PressableText";

export type ExcerciseForm = {
  name: string;
  duration: string;
};

type WorkoutProps = {
  onSubmit: (form: ExcerciseForm) => void
}

export default function WorkoutForm({ onSubmit }: WorkoutProps) {
  const [form, setForm] = useState({
    name: "",
    duration: "",
  });

  const onChange = (name: string) => (text: string) => {
    // function calling function

    setForm({
      ...form,
      [name]: text, //will replace name or duration
    });
  };

  return (
    <View style={style.container}>
      <Text>Form</Text>
      <View>
        <TextInput
          onChangeText={onChange("name")}
          style={style.input}
          value={form.name}
        />
        <TextInput
          onChangeText={onChange("duration")}
          style={style.input}
          value={form.duration}
        />
      </View>
      <PressableText text="Submit" onPress={() => onSubmit(form)} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
