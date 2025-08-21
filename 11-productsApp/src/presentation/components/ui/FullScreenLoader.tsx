import { Layout, Spinner } from '@ui-kitten/components';
import { globalStyles } from '../../../config/theme/global-theme';


export const FullScreenLoader = () => {
  return (
    <Layout style={ globalStyles.container }>
      <Spinner size='giant' />
    </Layout>
  );
};
