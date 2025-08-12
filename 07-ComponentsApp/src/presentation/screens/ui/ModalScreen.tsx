/* eslint-disable react-native/no-inline-styles */
import { View, Modal, Platform } from 'react-native'
import { CustomView } from '../../components/ui/CustomView'
import { Title } from '../../components/ui/Title'
import { Button } from '../../components/ui/Button'
import { useContext, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext'


export const ModalScreen = () => {
  const { colors } = useContext(ThemeContext);
  const [isVisible, setisVisible] = useState(false);

  return (
    <CustomView margin>
      <Title text='Modal' safe />

      <Button
        text='Open Modal'
        onPress={() => setisVisible(true)}
      />

      <Modal visible={isVisible} animationType='slide'>
        <View style={{
          flex: 1,
          backgroundColor: colors.background
        }}>
          <View style={{ paddingHorizontal: 10 }}>
            <Title text='Modal Content' safe />
          </View>

          <View style={{ flex: 1 }} />

          <Button
            text='Close Modal'
            onPress={() => setisVisible(false)}
            style={{
              height: Platform.OS === 'ios' ? 60 : 40,
              borderRadius: 0
            }}
          />
        </View>
      </Modal>
    </CustomView>
  )
}
