import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { globalStyles } from '../../../config/theme/global-theme';
import { RootStackParams } from '../../navigation/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { useAuthStore } from '../../store/auth/useAuthStore';


interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> { }


export const HomeScreen = ( { navigation }: Props ) => {

  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Layout style={ globalStyles.container }>
      <Text>HomeScreen</Text>

      <Button
        accessoryLeft={ <Icon name='log-out-outline' /> }
        onPress={ handleLogout }
      >
        Log out
      </Button>
    </Layout>
  );
};
