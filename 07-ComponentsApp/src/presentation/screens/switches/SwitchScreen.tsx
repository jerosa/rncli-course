import { useState } from 'react';

import { CustomView } from '../../components/ui/CustomView'
import { Card } from '../../components/ui/Card';
import { CustomSwitch } from '../../components/ui/CustomSwitch';
import { Separator } from '../../components/ui/Separator';


export const SwitchScreen = () => {

  const [state, setState] = useState({
    isActive: true,
    isHungry: false,
    isHappy: true
  })

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <CustomView style={{ marginTop: 100, paddingHorizontal: 10 }}>
      <Card>

        <CustomSwitch
          isOn={state.isActive}
          onChange={value => setState({ ...state, isActive: value })}
          text='Active'
        />

        <Separator />

        <CustomSwitch
          isOn={state.isHungry}
          onChange={value => setState({ ...state, isHungry: value })}
          text='Hungry'
        />

        <Separator />

        <CustomSwitch
          isOn={state.isHappy}
          onChange={value => setState({ ...state, isHappy: value })}
          text='Happy'
        />

        {/* <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        /> */}
      </Card>
    </CustomView>
  )
}
