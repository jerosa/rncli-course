import { Platform } from "react-native";
import { check, openSettings, PERMISSIONS, request, PermissionStatus as RNPermissionStatus } from "react-native-permissions";
import type { PermissionsStatus } from "../../infra/interfaces/permissions";


const permissionsMapper: Record<RNPermissionStatus, PermissionsStatus> = {
  granted: 'granted',
  denied: 'denied',
  blocked: 'blocked',
  unavailable: 'unavailable',
  limited: 'limited',
};

export const RequestLocationPermission = async (): Promise<PermissionsStatus> => {

  let status: RNPermissionStatus = 'unavailable';

  if ( Platform.OS === 'ios' ) {
    status = await request( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );
  }
  else if ( Platform.OS === 'android' ) {
    status = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
  }
  else {
    throw new Error( 'Platform not supported' );
  }

  if ( status === 'blocked' ) {
    await openSettings();
    return await checkLocationPermission();
  }

  return permissionsMapper[ status ] ?? 'unavailable';
};


export const checkLocationPermission = async (): Promise<PermissionsStatus> => {
  let status: RNPermissionStatus = 'unavailable';

  if ( Platform.OS === 'ios' ) {
    status = await check( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );
  }
  else if ( Platform.OS === 'android' ) {
    status = await check( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
  }

  return permissionsMapper[ status ] ?? 'unavailable';
};
