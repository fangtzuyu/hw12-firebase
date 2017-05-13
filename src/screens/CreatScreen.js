import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator, AsyncStorage, Picker } from 'react-native';
import * as firebase from 'firebase';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { Facebook } from 'expo';

import Confirm from '../components/Confirm';

// Make a component
class CreatScreen extends Component {
  state = {
    email: null,
    password: null,
    phone: null,
    username: null,
    city: null,
    gender: 'male',
    error: ' ',
    loading: false,
    token: null,
    status: 'Not Login...'
  };


  onCreateUser = async () => {
    const { email, password } = this.state;
    try {
        
    const { email, phone, username, city, gender } = this.state;
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      
       console.log('帳戶建立成功');
       const { currentUser } = firebase.auth();
       let dbUserid = firebase.database().ref(`/users/${currentUser.uid}`);
       console.log('Uid');
     await dbUserid.set({ email, phone, username, city, gender });

      this.props.navigation.navigate('UserStack');
    } catch (err) {
      this.setState({
        email: '',
        password: '',
        error: err.message,
        loading: false
      });
    }
  }

renderButton() {
    if (this.state.saving) {
      return <ActivityIndicator size='large' />;
    }

    return (
      <Button
        style={{ marginTop: 10 }}
        title='Creat'
        onPress={this.onCreateUser}
      />
    );
  }
  

  render() {
    return (
      <ScrollView>
        <View style={styles.formStyle}>
          <FormLabel>Email</FormLabel>
          <FormInput
            placeholder='user@email.com'
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='email-address'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='password'
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          <FormLabel>Username</FormLabel>
        <FormInput
          autoCorrect={false}
          placeholder='John Doe'
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
        />
        <FormLabel>Phone</FormLabel>
        <FormInput
          autoCorrect={false}
          placeholder='555-555-5555'
          value={this.state.phone}
          onChangeText={phone => this.setState({ phone })}
        />
        <FormLabel>City</FormLabel>
        <FormInput
          autoCorrect={false}
          placeholder='Taipei city'
          value={this.state.city}
          onChangeText={city => this.setState({ city })}
        />
        <Picker
          selectedValue={this.state.gender}
          onValueChange={gender => this.setState({ gender })}
        >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
          {this.renderButton()}
        </View>

      </ScrollView>
    );
  }
}

const styles = {
  formStyle: {
    marginTop:50
  }
};

export default CreatScreen;