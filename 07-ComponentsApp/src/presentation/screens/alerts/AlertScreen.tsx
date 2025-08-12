/* eslint-disable react-native/no-inline-styles */
import { View, Alert } from 'react-native'
import { CustomView } from '../../components/ui/CustomView';
import { Title } from '../../components/ui/Title';
import { globalStyles } from '../../../config/theme/global.theme';
import { Button } from '../../components/ui/Button';
import { showPrompt } from '../../../config/adapters/prompt.adapter';
import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';



export const AlertScreen = () => {

  const { isDark } = useContext(ThemeContext);

  const createTwoButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'destructive',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
      {
        userInterfaceStyle: isDark ? 'dark' : 'light'
      }
    );

  const createThreeButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Ask me later',
        onPress: () => console.log('Ask me later pressed'),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'destructive',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
      {
        cancelable: true,
        onDismiss() {
          console.log('onDismiss');
        },
        userInterfaceStyle: isDark ? 'dark' : 'light',
      }
    );

  const onShowPrompt = () => {
    // NATIVE CODE
    // Alert.prompt(
    //   'Email?',
    //   'This is an incredible text',
    //   (value: string) => console.log({ value }),
    //   'secure-text',
    //   'Default text',
    // )

    // Library
    showPrompt({
      title: 'Lorem Ipsum',
      subtitle: 'This is an incredible text',
      buttons: [
        { text: 'OK', onPress: () => { } }
      ],
      placeholder: 'placeholder',
    })
  }

  return (
    <CustomView style={globalStyles.globalMargin}>
      <Title safe text='Alerts' />


      <Button
        text="Alert - 2 buttons"
        onPress={createTwoButtonAlert}
      />

      <View style={{ height: 10 }} />

      <Button
        text="Alert - 3 buttons"
        onPress={createThreeButtonAlert}
      />

      <View style={{ height: 10 }} />

      <Button
        text="Prompt - Input"
        onPress={onShowPrompt}
      />

      <View style={{ height: 10 }} />

    </CustomView>
  )
}
