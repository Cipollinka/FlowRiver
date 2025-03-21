import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';

interface OneProps {
  name: (value: ((prevState: string) => string) | string) => void;
  description: (value: ((prevState: string) => string) | string) => void;
  nameValue?: string;
  descriptionValue?: string;
}

export const One = ({
  name,
  description,
  nameValue,
  descriptionValue,
}: OneProps) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{gap: 12}}>
        <Text style={styles.title_inputs}>Enter the name of flow</Text>
        <TextInput
          style={styles.nameInput}
          placeholder="For example, programming"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          onChangeText={name}
          value={nameValue}
        />
      </SafeAreaView>
      <SafeAreaView style={{gap: 12}}>
        <Text style={styles.title_inputs}>Description of your flow</Text>
        <TextInput
          style={styles.descriptionInputs}
          numberOfLines={7}
          onChangeText={description}
          placeholder="Describe the essence of your flow"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          multiline={true}
          value={descriptionValue}
        />
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '100%',
    height: '100%',
    gap: 24,
  },
  nameInput: {
    width: 342,
    height: 49,
    borderRadius: 16,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: 'rgba(22, 32, 48, 1)',
    borderColor: 'rgba(255, 255, 255, 1)',
  },
  descriptionInputs: {
    width: 342,
    height: 137,
    borderRadius: 16,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: 'rgba(22, 32, 48, 1)',
    borderColor: 'rgba(255, 255, 255, 1)',
    textAlignVertical: 'top',
  },
  title_inputs: {
    fontWeight: '500',
    fontSize: 20,
    color: 'rgba(255, 255, 255, 1)',
  },
});
