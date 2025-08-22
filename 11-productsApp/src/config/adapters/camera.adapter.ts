import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


export class CameraAdapter {

  static async takePicture(): Promise<string[]> {
    const res = await launchCamera( {
      mediaType: 'photo',
      quality: 0.7,
      cameraType: 'back',
    } );

    if ( res.assets && res.assets[ 0 ].uri ) {
      return [ res.assets[ 0 ].uri ];
    }
    return [];
  }

  static async getPictureFromLibrary(): Promise<string[]> {
    const res = await launchImageLibrary( {
      mediaType: 'photo',
      quality: 0.7,
      selectionLimit: 5,
    } );

    if ( res.assets && res.assets.length > 0 ) {
      return res.assets.map( asset => asset.uri! );
    }
    return [];
  }
}
