/* eslint-disable react/no-unstable-nested-components */
import { SectionList, Text, useWindowDimensions } from 'react-native'
import { useContext } from 'react'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { houses } from '../../assets/characters'
import { Card } from '../../components/ui/Card'
import { CustomView } from '../../components/ui/CustomView'
import { Separator } from '../../components/ui/Separator'
import { SubTitle } from '../../components/ui/SubTitle'
import { Title } from '../../components/ui/Title'
import { ThemeContext } from '../../context/ThemeContext'


export const CustomSectionListScreen = () => {

  const { colors } = useContext(ThemeContext);
  const { height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  return (
    <CustomView margin>
      <Title text='Characters list' safe />

      <Card>
        <SectionList
          sections={houses}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <Text style={{ color: colors.text, marginVertical: 2 }}>{item}</Text>}

          renderSectionHeader={({ section }) => <SubTitle text={section.title} backgroundColor={colors.cardBackground} />}
          stickySectionHeadersEnabled

          SectionSeparatorComponent={Separator}
          ListHeaderComponent={() => <Title text="Characters" />}
          ListFooterComponent={() => <Title text={`Secciones: ${houses.length}`} />}

          showsVerticalScrollIndicator={false}
          style={{
            height: height - top - 120
          }}
        />
      </Card>
    </CustomView>
  )
}
