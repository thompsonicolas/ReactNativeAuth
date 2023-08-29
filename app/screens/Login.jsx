import { ActivityIndicator, Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const auth = FIREBASE_AUTH;

  const signIn = async () => {
   
    setLoading(true)
    try {
      const response = await signInWithEmailAndPassword(auth,email, password)
      console.log(response)
     
    } catch (error) {
      console.log(error)
      alert("Sing in failed : " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async () => {
    
    setLoading(true)
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      console.log(response)
      alert("Check your emails")
    } catch (error) {
      console.log(error)
      alert("Sign in failed " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='padding'>

        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize='none'
          onChange={(text) => setEmail(text)}
          
        ></TextInput>

        <TextInput
          style={styles.input}
          
          placeholder='Password'
          
          autoCapitalize='none'
          onChange={(text) => setPassword(text)}
        ></TextInput>

        {
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : <>
            <View >
              <Button title="Login" onPress={() => signIn()} />
              <Button title="Create account" onPress={() => signUp()} />
            </View>
          </>
        }
      </KeyboardAvoidingView>
    </View>
  )
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
  },
  
})