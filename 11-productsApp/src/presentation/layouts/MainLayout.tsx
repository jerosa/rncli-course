import { Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import { globalStyles } from '../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { CustomIcon } from '../components/ui/CustomIcon';


interface Props extends PropsWithChildren {
  title: string;
  subTitle?: string;

  rightAction?: () => void;
  rightActionIcon?: string;
}

export const MainLayout = ( {
  title,
  subTitle,
  rightAction,
  rightActionIcon,
  children
}: Props ) => {

  const { top } = useSafeAreaInsets();
  const { canGoBack, goBack } = useNavigation();

  const renderBackAction = () => (
    <TopNavigationAction
      icon={ <CustomIcon name="arrow-back-outline" /> }
      onPress={ goBack }
    />
  );

  const renderRightAction = () => {
    if ( rightAction === undefined || rightActionIcon === undefined )
      return ( <></> );

    return (
      <TopNavigationAction
        icon={ <CustomIcon name={ rightActionIcon } /> }
        onPress={ rightAction }
      />
    );
  };


  return (
    <Layout style={ { paddingTop: top } }>
      <TopNavigation
        title={ title }
        subtitle={ subTitle }
        alignment='center'
        accessoryLeft={ canGoBack() ? renderBackAction : undefined }
        accessoryRight={ renderRightAction }
      />
      <Divider />

      <Layout style={ { height: '100%' } }>
        { children }
      </Layout>
    </Layout>
  );
};
