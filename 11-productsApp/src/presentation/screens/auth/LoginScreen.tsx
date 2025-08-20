import { StackScreenProps } from '@react-navigation/stack';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { Alert, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';

import { CustomIcon } from '../../components/ui/CustomIcon';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useState } from 'react';
import { useAuthStore } from '../../store/auth/useAuthStore';


interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> { }

export const LoginScreen = ( { navigation }: Props ) => {

  const { height } = useWindowDimensions();
  const { login } = useAuthStore();
  const [ form, setForm ] = useState( {
    email: '',
    password: '',
  } );
  const [ isPosting, setIsPosting ] = useState( false );

  const onLogin = async () => {
    const { email, password } = form;
    if ( email.length === 0 || password.length === 0 ) {
      // Handle empty fields
      return;
    }
    setIsPosting( true );

    const success = await login( email, password );
    setIsPosting( false );
    if ( success ) {
      navigation.navigate( 'HomeScreen' );
    }
    else {
      Alert.alert( 'Login failed', 'Please check your credentials and try again.' );
    }
  };

  return (
    <Layout style={ styles.container }>
      <ScrollView style={ styles.scrollView }>

        <Layout style={ { paddingTop: height * 0.35 } }>
          <Text category='h1'>Login</Text>
          <Text category='p2'>Please enter your credentials</Text>
        </Layout>

        <Layout style={ styles.inputContainer }>
          <Input
            placeholder='Email'
            keyboardType='email-address'
            autoCapitalize='none'
            value={ form.email }
            onChangeText={ ( email ) => setForm( { ...form, email } ) }
            style={ styles.input }
            accessoryLeft={ <CustomIcon name='email-outline' /> }
          />

          <Input
            placeholder='Password'
            secureTextEntry
            value={ form.password }
            onChangeText={ ( password ) => setForm( { ...form, password } ) }
            style={ styles.input }
            accessoryLeft={ <CustomIcon name='lock-outline' /> }
          />

        </Layout>

        {/* Space */ }
        <Layout style={ styles.space } />

        <Layout>
          <Button
            disabled={ isPosting }
            onPress={ onLogin }
            accessoryRight={ <CustomIcon name='arrow-forward' white /> }
          >
            Login
          </Button>
        </Layout>

        {/* Account creation */ }
        <Layout style={ styles.accountSpace } />

        <Layout style={ styles.accountRow }>
          <Text>Don't have an account? </Text>
          <Text
            status='primary'
            category='s1'
            onPress={ () => { navigation.navigate( 'SignUpScreen' ); } }
          >Sign up</Text>
        </Layout>
      </ScrollView>

    </Layout>
  );
};


const styles = StyleSheet.create( {
  container: { flex: 1 },
  scrollView: { marginHorizontal: 40 },
  inputContainer: { marginTop: 20 },
  input: { marginBottom: 10 },
  space: { height: 20 },
  accountSpace: { height: 50 },
  accountRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
  },
} );
