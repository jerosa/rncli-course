import { useContext, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native'

import { globalStyles } from '../../../config/theme/global.theme'
import { Card } from '../../components/ui/Card'
import { CustomView } from '../../components/ui/CustomView'
import { Title } from '../../components/ui/Title'
import { ThemeContext } from '../../context/ThemeContext'


export const TextInputScreen = () => {

  const { colors } = useContext(ThemeContext);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
  });
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

      <ScrollView>

        <CustomView margin>
          <Title text='Text Inputs' safe />

          <Card>
            <TextInput
              style={[globalStyles.input, { color: colors.text }]}
              placeholderTextColor={colors.text}
              placeholder='Fullname'
              autoCapitalize={'words'}
              onChangeText={(value) => setForm({ ...form, name: value })}
            />

            <TextInput
              style={[globalStyles.input, { color: colors.text }]}
              placeholderTextColor={colors.text}
              placeholder='Email'
              autoCapitalize={'none'}
              keyboardType='email-address'
              onChangeText={(value) => setForm({ ...form, email: value })}
            />

            <TextInput
              style={[globalStyles.input, { color: colors.text }]}
              placeholderTextColor={colors.text}
              placeholder='Phone'
              keyboardType='phone-pad'
              onChangeText={(value) => setForm({ ...form, phone: value })}
            />
          </Card>

          <View style={{ height: 10 }} />

          <Card>
            <Text style={{ color: colors.text }}>{JSON.stringify(form, null, 2)}</Text>
          </Card>

          <View style={{ height: 20 }} />

        </CustomView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
