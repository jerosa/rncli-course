import { Text } from 'react-native'
import { globalStyles } from '../../../config/theme/global.theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';


interface Props {
  text: string;
  safe?: boolean;
  backgroundColor: string;
}

export const SubTitle = ({ text, safe = false, backgroundColor }: Props) => {

  const { colors } = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Text style={{
      ...globalStyles.subTitle,
      color: colors.text,
      marginTop: safe ? top : 0,
      marginBottom: 10,
      backgroundColor: backgroundColor
    }}>{text}</Text>
  )
}
