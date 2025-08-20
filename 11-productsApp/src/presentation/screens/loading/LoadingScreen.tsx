import { Layout, Spinner, Text } from '@ui-kitten/components';
import { globalStyles } from '../../../config/theme/global-theme';


export const LoadingScreen = () => {
  return (
    <Layout style={ globalStyles.container }>
      <Text category='h1'>Loading</Text>
      <Spinner status='primary' size='large' />
    </Layout>
  );
};
