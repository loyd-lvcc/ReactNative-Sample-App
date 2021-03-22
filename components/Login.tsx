import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
 
export default class Login extends React.Component {
    state = {
        email: '',
        password: '',
        error: false
    }
 
    login() {
        this.setState({ error: false });

        fetch('http://10.0.2.2:8000/api/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                this.setState({ error: true});
            } else {
                this.props.navigation.navigate('Home');
            }
        })
        .catch((error) => {
            console.log('error')
            console.error(error);
        });
    }
 
    render() {
        return (
            <View style={style.container}>
                {this.state.error ?
                    <View style={style.errorMessage}><Text style={style.errorTxt}>Invalid Credentials</Text></View>
                :null}

                <TextInput placeholder="Email" style={style.input} autoCompleteType="email" onChangeText={email => this.setState({email})}/>
                <TextInput placeholder="Password" style={style.input} secureTextEntry={true} onChangeText={password => this.setState({password})}/>
                <TouchableOpacity style={style.login} onPress={() => this.login()}>
                    <Text style={style.loginTxt}>Log In</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
 
const style = {
    container: {
        flex: 1,
    },
    errorMessage: {
        backgroundColor: '#f8d7da',
        width: '100%',
        padding: 10,
        textAlign: 'center'
    },
    errorTxt: {
        color: '#721c24',
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    input: {
        margin: 5,
        height: 40,
        width: '80%',
        paddingLeft: 20,
        paddingRight: 20,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 5
    },
    login: {
        backgroundColor: '#3796f2',
        padding: 10,
        width: '80%',
        borderRadius: 5,
        marginTop: 10,
    },
    loginTxt: {
        color: '#ffffff',
    },
    signUp: {
        position: 'absolute',
        bottom: 0,
        height: 60,
        width: '100%',
        borderColor: '#e0e0e0',
        borderTopWidth: 1,
        paddingTop: 10,
    },
    signUpTxt: {
        color: '#989898',
        textAlign: 'center'
    },
    singUpLink: {
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center'
    }
}