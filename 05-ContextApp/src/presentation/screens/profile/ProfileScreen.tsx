import { View, Text, Pressable } from "react-native"
import { globalStyles } from "../../../config/app-theme"
import { useProfileStore } from "../../store/profile-store"

export const ProfileScreen = () => {

  const name = useProfileStore(state => state.name);
  const email = useProfileStore(state => state.email);
  const changeProfile = useProfileStore(state => state.changeProfile);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>{name}</Text>
      <Text style={globalStyles.title}>{email}</Text>


      <Pressable
        style={globalStyles.primaryButton}
        onPress={() => useProfileStore.setState({ name: 'Changed name' })}>
        <Text>Change name</Text>
      </Pressable>

      <Pressable
        style={globalStyles.primaryButton}
        onPress={() => useProfileStore.setState({ email: 'change@email.com' })}>
        <Text>Change email</Text>
      </Pressable>

      <Pressable
        style={globalStyles.primaryButton}
        onPress={() => changeProfile('John Doe', 'john.doe@google.com')}>
        <Text>Reset default</Text>
      </Pressable>

    </View>
  )
}
