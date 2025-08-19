import { View, Text, Pressable } from 'react-native';
import { globalStyles } from '../../../config/theme/global.theme';
import { usePermissionStore } from '../../store/permissions/usePermissionStore';
export const PermissionsScreen = () => {

  const { locationStatus, requestLocationPermission } = usePermissionStore();

  return (
    <View style={ globalStyles.container }>
      <Text>Enable location</Text>
      <Pressable
        style={ globalStyles.btnPrimary }
        onPress={ requestLocationPermission }
      >
        <Text style={ { color: 'white' } }>Enable</Text>
      </Pressable>

      <Text>Actual location: { locationStatus }</Text>
    </View>
  );
};
