import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { height } = Dimensions.get('window');

export default function StoxlyLoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.root}>
            <StatusBar barStyle="light-content" backgroundColor="#388e3c" />

            <LinearGradient
                colors={[ '#388e3c', '#4caf50']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.gradient}
            >
                <View style={styles.headerRow}>
                    <Text style={styles.headerText}>Don't have an account?</Text>
                    <TouchableOpacity style={styles.getStartedButton}>
                        <Text style={styles.getStarted}>Get Started</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.logo}>Stoxly</Text>
                <Text style={styles.tagline}>Inventory Management Made Simple</Text>
            </LinearGradient>

            <View style={styles.card}>
                <Text style={styles.welcome}>Welcome Back</Text>
                <Text style={styles.enterDetails}>Enter your details below</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="#AAA"
                        value={username}
                        onChangeText={setUsername}
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#AAA"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                    />
                </View>
                <TouchableOpacity style={styles.signInBtn}>
                    <LinearGradient
                        colors={['#388e3c', '#4caf50']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.signInGradient}
                    >
                        <Text style={styles.signInText}>Sign In</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.forgotContainer}>
                    <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>

                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.or}>Or sign in with</Text>
                    <View style={styles.dividerLine} />
                </View>
                <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.socialBtn}>
                        <Image
                            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png' }}
                            style={styles.socialIcon}
                        />
                        <Text style={styles.socialText}>Google</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#388e3c'
    },
    gradient: {
        height: height * 0.4,
        paddingHorizontal: 24,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 60,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        top: 50,
        paddingHorizontal: 24,
    },
    headerText: {
        color: '#FFF',
        fontSize: 14,
        opacity: 0.9
    },
    getStartedButton: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    getStarted: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 14,
    },
    logo: {
        color: '#FFF',
        fontSize: 36,
        fontWeight: '700',
        marginBottom: 8,
        letterSpacing: 1,
    },
    tagline: {
        color: '#FFF',
        fontSize: 16,
        opacity: 0.9,
        fontWeight: '300',
    },
    card: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: height * 0.32,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 28,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: -5 },
        elevation: 15,
        alignItems: 'center',
    },
    welcome: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 8,
        color: '#1a1a1a',
        marginTop: 20,
    },
    enterDetails: {
        fontSize: 16,
        color: '#666',
        marginBottom: 32,
        fontWeight: '400',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
    },
    input: {
        width: '100%',
        height: 52,
        borderRadius: 12,
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#1a1a1a',
        borderWidth: 1,
        borderColor: '#E9ECEF',
    },
    signInBtn: {
        width: '100%',
        borderRadius: 12,
        marginTop: 8,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#388e3c',
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 8,
    },
    signInGradient: {
        paddingVertical: 16,
        alignItems: 'center',
        borderRadius: 12,
        width: '100%',
    },
    signInText: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 17,
        letterSpacing: 0.5,
    },
    forgotContainer: {
        paddingVertical: 8,
        marginBottom: 20,
    },
    forgot: {
        color: '#388e3c',
        fontSize: 15,
        fontWeight: '500',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 16,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E9ECEF',
    },
    or: {
        color: '#666',
        fontSize: 14,
        marginHorizontal: 16,
        fontWeight: '400',
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 16,
        gap: 12,
    },
    socialBtn: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        paddingVertical: 14,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
        borderWidth: 1,
        borderColor: '#E9ECEF',
    },
    socialIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
        resizeMode: 'contain'
    },
    socialText: {
        color: '#1a1a1a',
        fontWeight: '500',
        fontSize: 15,
    },
});