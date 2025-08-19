import { StyleSheet, View } from 'react-native';
import { Map } from '../../components/maps/Map';
import { useEffect } from 'react';
import { useLocationStore } from '../../store/location/useLocationStore';
import { LoadingScreen } from '../loading/LoadingScreen';


export const MapsScreen = () => {

  const { lastKnownLocation, getLocation } = useLocationStore();

  useEffect( () => {
    if ( lastKnownLocation === null ) {
      getLocation();
    }
  }, [] );

  if ( lastKnownLocation === null ) {
    return ( <LoadingScreen /> );
  }

  return (
    <View style={ styles.container }>
      <Map showsUserLocation initialLocation={ lastKnownLocation } />
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    ...StyleSheet.absoluteFillObject,
  }
} );
