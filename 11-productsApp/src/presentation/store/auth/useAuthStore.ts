import { create } from "zustand";
import { User } from "../../../domain/entities/user";
import { AuthStatus } from "../../../infra/interfaces/auth.status";
import { authCheckStatus, authLogin, authSignUp } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../../config/adapters/storage-adapter";


export interface AuthState {
  token?: string;
  user?: User;
  status: AuthStatus;

  login: ( email: string, password: string ) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
  signUp: ( name: string, email: string, password: string ) => Promise<boolean>;
}


export const useAuthStore = create<AuthState>()( ( set, get ) => ( {
  token: undefined,
  user: undefined,
  status: "checking",

  login: async ( email, password ) => {
    const res = await authLogin( email, password );
    if ( !res ) {
      set( { status: 'unauthenticated', token: undefined, user: undefined } );
      return false;
    }
    await StorageAdapter.setItem( 'token', res.token );

    set( { status: 'authenticated', token: res.token, user: res.user } );
    return true;
  },

  checkStatus: async () => {
    const res = await authCheckStatus();
    if ( !res ) {
      set( { status: 'unauthenticated', token: undefined, user: undefined } );
      return;
    }
    await StorageAdapter.setItem( 'token', res.token );

    set( { status: 'authenticated', token: res.token, user: res.user } );
  },

  logout: async () => {
    await StorageAdapter.removeItem( 'token' );
    set( { status: 'unauthenticated', token: undefined, user: undefined } );
  },


  signUp: async ( name, email, password ) => {
    const res = await authSignUp( name, email, password );
    if ( !res ) {
      set( { status: 'unauthenticated', token: undefined, user: undefined } );
      return false;
    }
    await StorageAdapter.setItem( 'token', res.token );

    set( { status: 'authenticated', token: res.token, user: res.user } );
    return true;
  },
} ) );
