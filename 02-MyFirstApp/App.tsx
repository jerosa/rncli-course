import { SafeAreaView } from "react-native";
import { PaperProvider } from "react-native-paper";
import {
  CounterM3Screen,
  BoxObjectModelScreen,
  DimensionScreen,
  PositionScreen,
  FlexScreen,
  FlexDirectionScreen,
  HomeworkScreen
} from "./src/presentation/screens";
import Ionicons from "@react-native-vector-icons/ionicons";

export const App = () => {
  return (
    <PaperProvider
      settings={{
        icon: (props) => <Ionicons {...props} />
      }}
    >
      {/* IMPORTANTE FLEX: 1 */}
      <SafeAreaView style={{ flex: 1 }}>
        {/* <HelloWorldScreen name='Jesus Espinosa' /> */}
        {/* <CounterScreen /> */}
        {/* <CounterM3Screen /> */}
        {/* <BoxObjectModelScreen /> */}
        {/* {<DimensionScreen />} */}
        {/* {<PositionScreen />} */}
        {/* {<FlexScreen />} */}
        {/* {<FlexDirectionScreen />} */}
        {<HomeworkScreen />}
      </SafeAreaView>
    </PaperProvider>
  )
}
