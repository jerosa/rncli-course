import { create } from "zustand";
import { Location } from "../../../infra/interfaces/location";
import { clearWatchLocation, getCurrentLocation, watchCurrentLocation } from "../../../actions/location/location";


interface LocationState {
  lastKnownLocation: Location | null;
  userLocationsList: Location[];
  watchId: number | null;

  getLocation: () => Promise<Location | null>;
  watchLocation: () => void;
  clearWatchLocation: () => void;
}

export const useLocationStore = create<LocationState>()( ( set, get ) => ( {
  lastKnownLocation: null,
  userLocationsList: [],
  watchId: null,

  getLocation: async () => {
    const location = await getCurrentLocation();
    set( { lastKnownLocation: location } );
    return location;
  },

  watchLocation: async () => {
    const watchId = get().watchId;
    if ( watchId ) {
      get().clearWatchLocation();
    }

    const id = watchCurrentLocation( ( location ) => {
      set( {
        lastKnownLocation: location,
        userLocationsList: [ ...get().userLocationsList, location ]
      } );
    } );

    set( { watchId: id } );
  },

  clearWatchLocation: () => {
    const watchId = get().watchId;
    if ( watchId ) {
      clearWatchLocation( watchId );
      set( { watchId: null } );
    }
  }
} ) );
