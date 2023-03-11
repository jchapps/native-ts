import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { PressableText } from "./styled/PressableText";
import { useForm, Controller } from "react-hook-form";

export type ExcerciseForm = {
  name: string;
  duration: string;
};

type WorkoutProps = {
  onSubmit: (form: ExcerciseForm) => void;
};

export default function WorkoutForm({ onSubmit }: WorkoutProps) {
  const { control } = useForm();

  return (
    <View style={style.container}>
      <Text>Form</Text>
      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="name"
          render={({ field: {onChange, value}}) =>
          <TextInput
          onChangeText={onChange}
          value={value}
          style={style.input}
          />

          }
        />
      </View>
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
    padding: 10
  },
});
