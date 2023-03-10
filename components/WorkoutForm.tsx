import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

type Props = {};

export default function WorkoutForm({}: Props) {
  const [form, setForm] = useState({
    name: "",
    duration: "",
  });

  const onChange = (name: string) => (text: string) => { // function calling function


    setForm({
      ...form,
      [name]: text //will replace name or duration
    })
  }


  return (
    <View style={style.container}>
      <Text>Form</Text>
      <View>
        <TextInput onChangeText={onChange("name")} style={style.input} value={form.name} />
        <TextInput onChangeText={onChange('duration')}  style={style.input} value={form.duration} />
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
    padding: 10,
  },
});
