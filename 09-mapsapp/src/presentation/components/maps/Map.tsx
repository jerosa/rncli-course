import { Platform, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { Location } from '../../../infra/interfaces/location';
import { FAB } from '../ui/FAB';
import { useEffect, useRef, useState } from 'react';
import { useLocationStore } from '../../store/location/useLocationStore';


interface Props {
  showsUserLocation?: boolean;
  initialLocation: Location;
}


export const Map = ( { showsUserLocation, initialLocation }: Props ) => {

  const mapRef = useRef<MapView>( null );
  const cameraLocation = useRef<Location>( initialLocation );
  const [ isFollowingUser, setIsFollowingUser ] = useState( true );
  const [ isShowingPolyline, setIsShowingPolyline ] = useState( true );

  const {
    clearWatchLocation,
    getLocation,
    lastKnownLocation,
    userLocationsList,
    watchLocation,
  } = useLocationStore();

  const moveCameraToLocation = ( location: Location ) => {
    if ( mapRef.current ) {
      mapRef.current.animateCamera( {
        center: location,
      } );
    }
  };

  const moveToCurrentLocation = async () => {
    if ( lastKnownLocation ) {
      moveCameraToLocation( lastKnownLocation );
    }
    const location = await getLocation();
    if ( location ) {
      moveCameraToLocation( location );
    }
  };

  // Watch user location
  useEffect( () => {
    watchLocation();

    return () => {
      clearWatchLocation();
    };
  }, [] );

  // Follow user location
  useEffect( () => {
    if ( lastKnownLocation && isFollowingUser ) {
      moveCameraToLocation( lastKnownLocation );
    }
  }, [ lastKnownLocation, isFollowingUser ] );

  return (
    <>
      <MapView
        ref={ mapRef }
        showsUserLocation={ showsUserLocation }
        provider={ Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE }
        style={ styles.map }
        onTouchStart={ () => setIsFollowingUser( false ) }
        region={ {
          latitude: cameraLocation.current.latitude,
          longitude: cameraLocation.current.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        } }
      >

        {
          isShowingPolyline && <Polyline
            coordinates={ userLocationsList }
            strokeColor='black'
            strokeWidth={ 5 }
          />
        }

        {/* <Marker
          coordinate={ {

            latitude: 37.78825,
            longitude: -122.4324,
          } }
          title='Marker Title'
          description='Marker Description'
          image={ require( '../../../assets/marker.png' ) }
        /> */}
      </MapView >

      <FAB
        iconName={ isShowingPolyline ? 'eye-outline' : 'eye-off-outline' }
        onPress={ () => setIsShowingPolyline( !isShowingPolyline ) }
        style={ {
          bottom: 160,
          right: 20
        } }
      />


      <FAB
        iconName={ isFollowingUser ? 'walk-outline' : 'accessibility-outline' }
        onPress={ () => setIsFollowingUser( !isFollowingUser ) }
        style={ {
          bottom: 100,
          right: 20
        } }
      />

      <FAB
        iconName="compass-outline"
        onPress={ moveToCurrentLocation }
        style={ {
          bottom: 40,
          right: 20
        } }
      />
    </>
  );
};

const styles = StyleSheet.create( {
  map: {
    flex: 1,
  }
} );
