import { create } from "zustand";
import { PermissionsStatus } from "../../../infra/interfaces/permissions";
import { checkLocationPermission, RequestLocationPermission } from "../../../actions/permissions/location";



interface PermissionState {
  locationStatus: PermissionsStatus;

  requestLocationPermission: () => Promise<PermissionsStatus>;
  checkLocationPermission: () => Promise<PermissionsStatus>;
}

export const usePermissionStore = create<PermissionState>()( set => ( {
  locationStatus: 'undetermined',

  requestLocationPermission: async () => {
    const status = await RequestLocationPermission();
    set( { locationStatus: status } );
    return status;
  },
  checkLocationPermission: async () => {
    const status = await checkLocationPermission();
    set( { locationStatus: status } );
    return status;
  }
} ) );
