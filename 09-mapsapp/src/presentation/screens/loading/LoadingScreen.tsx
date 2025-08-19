import { View, ActivityIndicator } from 'react-native';
import { globalStyles } from '../../../config/theme/global.theme';


export const LoadingScreen = () => {
  return (
    <View style={ globalStyles.container }>
      <ActivityIndicator size={ 30 } color='black' />
    </View>
  );
};
