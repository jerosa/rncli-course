import axios from "axios";
import { tesloApi } from "../../config/api/tesloApi";
import { User } from "../../domain/entities/user";
import type { AuthResponse } from "../../infra/interfaces/auth.responses";

const returnUser = async ( data: AuthResponse ) => {
  const user: User = {
    id: data.id,
    email: data.email,
    fullName: data.fullName,
    isActive: data.isActive,
    roles: data.roles
  };
  return {
    user: user,
    token: data.token
  };
};

export const authLogin = async ( email: string, password: string ): Promise<{ user: User; token: string; } | null> => {
  email = email.toLocaleLowerCase();

  try {
    const { data } = await tesloApi.post<AuthResponse>( '/auth/login', { email, password } );
    return returnUser( data );
  } catch ( error ) {
    console.error( 'Error logging in:', error );
    return null;
  }
};

export const authCheckStatus = async (): Promise<{ user: User; token: string; } | null> => {
  try {
    const { data } = await tesloApi.get<AuthResponse>( '/auth/check-status' );
    return returnUser( data );
  } catch ( error ) {
    if ( axios.isAxiosError( error ) ) {
      // don't report 401
      if ( error.response?.status !== 401 ) {
        console.error( 'Error checking auth status:', error.response?.data );
      }
    } else {
      console.error( 'Error checking auth status:', error );
    }
    return null;
  }
};


export const authSignUp = async ( fullName: string, email: string, password: string ): Promise<{ user: User; token: string; } | null> => {
  email = email.toLocaleLowerCase();
  try {
    const { data } = await tesloApi.post<AuthResponse>( '/auth/register', { fullName, email, password } );
    return returnUser( data );
  } catch ( error ) {
    console.error( 'Error signing up:', error );
    return null;
  }
};
