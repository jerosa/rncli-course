import { API_URL_ANDROID, API_URL_IOS, API_URL as PRO_URL, STAGE } from '@env';
import axios from 'axios';
import { Platform } from 'react-native';
import { StorageAdapter } from '../adapters/storage-adapter';

export const API_URL = ( STAGE === 'production'
  ? PRO_URL
  : ( Platform.OS === 'android' ? API_URL_ANDROID : API_URL_IOS )
);

const tesloApi = axios.create( {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
} );

// Interceptors
tesloApi.interceptors.request.use(
  async ( config ) => {
    const token = await StorageAdapter.getItem( 'token' );
    config.headers.Authorization = token ? `Bearer ${ token }` : '';
    return config;
  }
);


export { tesloApi };
