import { Divider, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { PropsWithChildren } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { CustomIcon } from '../components/ui/CustomIcon';


interface Props extends PropsWithChildren {
  title: string;
  subTitle?: string;

  rightAction?: () => void;
  rightActionIcon?: string;
}

// Remove title cropping when too large
const TitleComponent = ( props: any, title: string ) => (
  <Text { ...props } style={ [ props.style, { maxWidth: '70%' } ] }>{ title }</Text>
);


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
        title={ ( props: any ) => TitleComponent( props, title ) }
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
