
import prompt from 'react-native-prompt-android';

interface Options {
  title: string;
  subtitle?: string;
  buttons: PromptButton[],
  prompType?: 'plain-text' | 'secure-text',
  placeholder?: string,
  defaultValue?: string
}

interface PromptButton {
  text: string;
  onPress: () => void;
  style?: "cancel" | "default" | "destructive"
}

export const showPrompt = ({
  title,
  subtitle,
  buttons,
  prompType = 'plain-text',
  placeholder,
  defaultValue
}: Options) => {
  return (
    prompt(
      title,
      subtitle,
      buttons,
      {
        type: prompType,
        cancelable: false,
        defaultValue: defaultValue,
        placeholder: placeholder
      }
    )
  )
}
