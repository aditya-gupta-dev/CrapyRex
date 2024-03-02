import { useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, ImageBackground, View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { styles } from "../styles/globalStyles";

function LoginScreen() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch(err) {
            alert("Login Failed");
        }
    };

    const signUp = async () => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
        } catch(err) {
            alert("Login Failed");
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
                
            <ImageBackground 
                source={{ uri: "https://raw.githubusercontent.com/hypernova-101/manager/main/bg.png" }}
                resizeMode="cover"
                style={{ flex: 1, justifyContent: "center" }}
            >
                <View style={ styles.center }>

                    <KeyboardAvoidingView>
                    
                        <Text style={styles.heading}>Login</Text>
                        <TextInput 
                            label="Email"
                            value={ email }
                            onChangeText={ (newText) => setEmail(newText) }
                            style={ styles.marginTopSmall }
                        />
                        <TextInput 
                            label="password"
                            value={ password }
                            onChangeText={ (newText) => setPassword(newText) }
                            secureTextEntry
                            style={ styles.marginTopSmall }
                        />
                        <Button onPress={ login } mode="contained" style={styles.marginTopSmall}>Login</Button>
                        <Button onPress={ signUp } mode="outlined" style={loginStyles.faintOpacityButton} >Create Account</Button>

                        <View
                            style={{
                                backgroundColor: "#ff0000",
                                margin: 10,
                                padding: 8,
                                borderRadius: 8                            
                            }}
                        >
                            <Text style={{
                                color: "#ffffff"
                            }}>The app is currently in alpha version. </Text>
                            <Text style={{
                                color: "#ffffff"
                            }}>By using this app you agree to our user & data policy.</Text>
                            <Text style={{
                                color: "#ffffff"
                            }}>This app offers you unlimited storage for free</Text>
                            <Text style={{
                                color: "#ffffff"
                            }}>but only verified users' data is kept secure,</Text>
                            <Text style={{
                                color: "#ffffff"
                            }}> else your stored files will be removed after 7-9 days</Text>
                        </View>
                    </KeyboardAvoidingView>
                
                </View>
        
            </ImageBackground>

        </SafeAreaView>
    );
}

const loginStyles = StyleSheet.create({
    faintOpacityButton: {
        marginTop: 14,
        backgroundColor: "black",
        opacity: 0.8
    }
});

export default LoginScreen;
