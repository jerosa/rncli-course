import Geolocation from '@react-native-community/geolocation';
import { Location } from '../../infra/interfaces/location';

export const getCurrentLocation = async (): Promise<Location> => {
  return new Promise( ( resolve, reject ) => {
    Geolocation.getCurrentPosition( ( position ) =>
      resolve( {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      } ),
      ( error ) => reject( error ),
      {
        enableHighAccuracy: true,
      }
    );
  } );
};


export const watchCurrentLocation = (
  locationCallback: ( location: Location ) => void,
): number => {
  return Geolocation.watchPosition( ( position ) => (
    locationCallback( {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    } )
  ), ( error ) => {
    throw new Error( `Can't get watch position: ${ error.message }` );
  }, {
    enableHighAccuracy: true,
  }
  );
};


export const clearWatchLocation = ( watchId: number ) => {
  Geolocation.clearWatch( watchId );
};
