/* eslint-disable react-native/no-inline-styles */
import { View, FlatList, ActivityIndicator } from 'react-native'
import { useContext, useState } from 'react';
import { FadeInImage } from './FadeInImage';
import { ThemeContext } from '../../context/ThemeContext';
import { ThemeColors } from '../../../config/theme/global.theme';


export const InfiniteScrollScreen = () => {

  const { colors } = useContext(ThemeContext);
  const [numbers, setnumbers] = useState([0, 1, 2, 3, 4, 5]);

  const loadMore = () => {
    const newArray = Array.from({ length: 5 }, (_, i) => numbers.length + i);

    setTimeout(() => {
      setnumbers([...numbers, ...newArray])
    }, 3000);
  }

  return (
    <View style={{ backgroundColor: 'black' }}>
      <FlatList
        data={numbers}
        onEndReached={loadMore}
        onEndReachedThreshold={0.6}
        keyExtractor={(item) => item.toString()}

        renderItem={({ item }) => <ListItem number={item} />}

        ListFooterComponent={() => ListFooter(colors)}
      />
    </View>
  )
}


interface ListItemProps {
  number: number;
}

const ListFooter = (colors: ThemeColors) => (
  <View style={{ height: 150, justifyContent: 'center' }}>
    <ActivityIndicator size={40} color={colors.primary} />
  </View>
);

const ListItem = ({ number }: ListItemProps) => {

  return (
    // <Image
    //   source={{ uri: `https://picsum.photos/id/${number}/500/400` }}
    //   style={{
    //     height: 400,
    //     width: '100%'
    //   }}
    // />
    <FadeInImage
      uri={`https://picsum.photos/id/${number}/500/400`}
      style={{
        height: 400,
        width: '100%'
      }}
    />
  )
}
