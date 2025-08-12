import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from '../../components/ui/Title';
import { MenuItem } from '../../components/ui/MenuItem';
import { Separator } from '../../components/ui/Separator';

export const HomeScreen = () => {
  return (
    <CustomView margin>
      <ScrollView>
        <Title text='Menu options' safe />

        {
          animationMenuItems.map((item, index) => (
            <MenuItem
              key={item.component} {...item}
              isFirst={index === 0}
              isLast={index === animationMenuItems.length - 1}
            />
          ))
        }

        <View style={styles.marginTop30} />

        {
          uiMenuItems.map((item, index) => (
            <MenuItem
              key={item.component} {...item}
              isFirst={index === 0}
              isLast={index === uiMenuItems.length - 1}
            />
          ))
        }
        <View style={styles.marginTop30} />

        {
          menuItems.map((item, index) => (
            <MenuItem
              key={item.component} {...item}
              isFirst={index === 0}
              isLast={index === menuItems.length - 1}
            />
          ))
        }

      </ScrollView>
    </CustomView>
  )
}

const animationMenuItems = [

  {
    name: 'Animation 101',
    icon: 'cube-outline',
    component: 'Animation101Screen',
  },
  {
    name: 'Animation 102',
    icon: 'albums-outline',
    component: 'Animation102Screen',
  },
]

import { StyleSheet } from 'react-native';
import { CustomView } from '../../components/ui/CustomView';

const styles = StyleSheet.create({
  marginTop30: {
    marginTop: 30,
  },
});


export const menuItems = [
  {
    name: 'Pull to refresh',
    icon: 'refresh-outline',
    component: 'PullToRefreshScreen',
  },
  {
    name: 'Section List',
    icon: 'list-outline',
    component: 'CustomSectionListScreen',
  },
  {
    name: 'Modal',
    icon: 'copy-outline',
    component: 'ModalScreen',
  },
  {
    name: 'InfiniteScroll',
    icon: 'download-outline',
    component: 'InfiniteScrollScreen',
  },
  {
    name: 'Slides',
    icon: 'flower-outline',
    component: 'SlidesScreen',
  },
  {
    name: 'Themes',
    icon: 'flask-outline',
    component: 'ChangeThemeScreen',
  },
];

const uiMenuItems = [
  {
    name: 'Switches',
    icon: 'toggle-outline',
    component: 'SwitchScreen',
  },
  {
    name: 'Alerts',
    icon: 'alert-circle-outline',
    component: 'AlertScreen',
  },
  {
    name: 'TextInputs',
    icon: 'document-text-outline',
    component: 'TextInputScreen',
  },
]
