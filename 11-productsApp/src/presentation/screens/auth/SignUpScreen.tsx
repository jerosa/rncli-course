import { StackScreenProps } from '@react-navigation/stack';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';

import { CustomIcon } from '../../components/ui/CustomIcon';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { useState } from 'react';


interface Props extends StackScreenProps<RootStackParams, 'SignUpScreen'> { }

export const SignUpScreen = ( { navigation }: Props ) => {

  const { height } = useWindowDimensions();
  const { signUp } = useAuthStore();
  const [ form, setForm ] = useState( {
    name: '',
    email: '',
    password: '',
  } );
  const [ isPosting, setIsPosting ] = useState( false );

  const onSignUp = async () => {
    const { name, email, password } = form;
    if ( name.length === 0 || email.length === 0 || password.length === 0 ) {
      return;
    }
    setIsPosting( true );

    const result = await signUp( name, email, password );
    setIsPosting( false );
    if ( result ) {
      navigation.navigate( 'HomeScreen' );
    }
  };

  return (
    <Layout style={ styles.container }>
      <ScrollView style={ styles.scrollView }>

        <Layout style={ { paddingTop: height * 0.35 } }>
          <Text category='h1'>Sign up</Text>
          <Text category='p2'>Please create your account</Text>
        </Layout>

        <Layout style={ styles.inputContainer }>
          <Input
            placeholder='Full Name'
            value={ form.name }
            onChangeText={ ( name ) => setForm( { ...form, name } ) }
            style={ styles.input }
            accessoryLeft={ <CustomIcon name='person-outline' /> }
          />

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
            onPress={ onSignUp }
            accessoryRight={ <CustomIcon name='arrow-forward' white /> }
          >
            Sign up
          </Button>
        </Layout>

        {/* Log in */ }
        <Layout style={ styles.accountSpace } />

        <Layout style={ styles.accountRow }>
          <Text>Already have an account? </Text>
          <Text
            status='primary'
            category='s1'
            onPress={ () => { navigation.goBack(); } }
          >Log in</Text>
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
