import { View, Text, ImageSourcePropType, FlatList, StyleSheet, useWindowDimensions, Image, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { globalStyles } from '../../../config/theme/global.theme';
import { Button } from './Button';
import { useContext, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../context/ThemeContext';
import { CustomView } from './CustomView';

interface Slide {
  title: string;
  desc: string;
  img: ImageSourcePropType;
}

const items: Slide[] = [
  {
    title: 'Titulo 1',
    desc: 'Ea et eu enim fugiat sunt reprehenderit sunt aute quis tempor ipsum cupidatat et.',
    img: require('../../assets/slide-1.png'),
  },
  {
    title: 'Titulo 2',
    desc: 'Anim est quis elit proident magna quis cupidatat curlpa labore Lorem ea. Exercitation mollit velit in aliquip tempor occaecat dolor minim amet dolor enim cillum excepteur. ',
    img: require('../../assets/slide-2.png'),
  },
  {
    title: 'Titulo 3',
    desc: 'Ex amet duis amet nulla. Aliquip ea Lorem ea culpa consequat proident. Nulla tempor esse ad tempor sit amet Lorem. Velit ea labore aute pariatur commodo duis veniam enim.',
    img: require('../../assets/slide-3.png'),
  },
];

export const SlidesScreen = () => {

  const { colors } = useContext(ThemeContext);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flastListRef = useRef<FlatList>(null);
  const navigation = useNavigation();
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const currentIndex = Math.floor(contentOffset.x) / layoutMeasurement.width;

    setCurrentSlideIndex(currentIndex > 0 ? currentIndex : 0);
  }

  const scrollToSide = (index: number) => {
    if (flastListRef.current) {
      flastListRef.current.scrollToIndex({
        index: index,
        animated: true
      });
    }
    if (index === items.length - 1) {
      setScrollEnabled(true)
    }
  }

  return (
    <CustomView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        ref={flastListRef}
        data={items}
        keyExtractor={(item) => item.title}

        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        decelerationRate='fast'

        scrollEnabled={scrollEnabled}
        onScroll={onScroll}
      />

      {
        currentSlideIndex === items.length - 1 ? (
          <Button
            text='Finish'
            onPress={() => navigation.goBack()}
            style={styles.button}
          />
        )
          :
          (
            <Button
              text='Next'
              onPress={() => scrollToSide(currentSlideIndex + 1)}
              style={styles.button}
            />
          )
      }
    </CustomView>
  )
}

interface SlideItemProps {
  item: Slide;
}

const SlideItem = ({ item }: SlideItemProps) => {

  const { colors } = useContext(ThemeContext);
  const { width } = useWindowDimensions();
  const { desc, img, title } = item;

  return (
    <View style={[styles.slideItem, { backgroundColor: colors.background, width: width }]}>
      <Image
        source={img}
        style={[styles.image, {
          width: width * 0.7,
          height: width * 0.7,
        }]}
      />

      <Text style={[
        globalStyles.title,
        { color: colors.primary }
      ]}>{title}</Text>

      <Text style={[styles.descText, {
        color: colors.text
      }]}>
        {desc}
      </Text>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideItem: {
    flex: 1,
    borderRadius: 5,
    padding: 40,
    justifyContent: 'center'
  },
  image: {
    resizeMode: 'center',
    alignSelf: 'center'
  },
  descText: {
    marginTop: 20
  },
  button: {
    position: 'absolute',
    bottom: 60,
    right: 30,
    width: 100
  }
})
