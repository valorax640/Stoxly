import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Dimensions,
    Modal,
    Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { isNonEmptyString, isValidEmail, isValidPassword } from '../utils/validation';

const { height } = Dimensions.get('window');

export default function RegisterScreen({navigation}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(0);
    const [canResend, setCanResend] = useState(true);
    const timerRef = useRef(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (timer > 0) {
            timerRef.current = setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
        } else if (timer === 0 && !canResend) {
            setCanResend(true);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [timer, canResend]);

    const startTimer = () => {
        setTimer(30);
        setCanResend(false);
    };

    const clearError = (fieldName) => {
        if (errors[fieldName]) {
            setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[fieldName];
                return newErrors;
            });
        }
    };

    const handleNext = () => {
        if (!isNonEmptyString(name)) {
            setErrors((prevErrors) => ({ ...prevErrors, name: 'Please enter your name' }));
            return;
        }
        if (!isValidEmail(email)) {
            setErrors((prevErrors) => ({ ...prevErrors, email: 'Please enter a valid email address' }));
            return;
        }
        if (!isValidPassword(password)) {
            setErrors((prevErrors) => ({ ...prevErrors, password: 'Please enter a valid password' }));
            return;
        }
        if (password !== rePassword) {
            setErrors((prevErrors) => ({ ...prevErrors, rePassword: 'Passwords do not match' }));
            return;
        }

        setShowOTPModal(true);
        startTimer();
    };

    const handleVerifyOTP = () => {
        if (!otp.trim()) {
            setErrors((prevErrors) => ({ ...prevErrors, otp: 'Please enter the OTP' }));
            return;
        }
        if (otp.length !== 6) {
            setErrors((prevErrors) => ({ ...prevErrors, otp: 'OTP must be 6 digits' }));
            return;
        }

        Alert.alert('Success', 'OTP verified successfully!');
        setShowOTPModal(false);
        navigation.navigate('Login');
    };

    const closeOTPModal = () => {
        setShowOTPModal(false);
        setOtp('');
        setTimer(0);
        setCanResend(true);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    };

    const handleResendOTP = () => {
        if (canResend) {
            setOtp('');
            startTimer();
            Alert.alert('OTP Sent', 'A new OTP has been sent to your email');
        }
    };

    return (
        <View style={styles.root}>
            <StatusBar barStyle="light-content" backgroundColor="#388e3c" />

            <LinearGradient
                colors={['#388e3c', '#4caf50']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.gradient}
            >
                <View style={styles.headerRow}>
                    <Text style={styles.headerText}>Already have an account?</Text>
                    <TouchableOpacity style={styles.getStartedButton}>
                        <Text style={styles.getStarted}>Login</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.logo}>Stoxly</Text>
                <Text style={styles.tagline}>Inventory Management Made Simple</Text>
            </LinearGradient>

            <View style={styles.card}>
                <Text style={styles.welcome}>Get Started</Text>
                <Text style={styles.enterDetails}>Enter your details below</Text>

                <View style={{ width: '100%' }}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            placeholderTextColor="#AAA"
                            value={name}
                            onChangeText={(text) => {
                                setName(text);
                                clearError('name');
                            }}
                            keyboardType="default"
                            autoCapitalize="words"
                            autoCorrect={false}
                        />
                        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#AAA"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                clearError('email');
                            }}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#AAA"
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            clearError('password');
                            clearError('rePassword'); // Also clear rePassword error when password changes
                        }}
                        autoCapitalize="none"
                    />
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Re-Enter Password"
                        placeholderTextColor="#AAA"
                        secureTextEntry
                        value={rePassword}
                        onChangeText={(text) => {
                            setRePassword(text);
                            clearError('rePassword');
                        }}
                        autoCapitalize="none"
                    />
                    {errors.rePassword && <Text style={styles.errorText}>{errors.rePassword}</Text>}
                </View>

                <TouchableOpacity style={styles.signInBtn} onPress={handleNext}>
                    <LinearGradient
                        colors={['#388e3c', '#4caf50']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.signInGradient}
                    >
                        <Text style={styles.signInText}>Next</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            <Modal
                visible={showOTPModal}
                transparent={true}
                animationType="slide"
                onRequestClose={closeOTPModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Email Verification</Text>
                            <Text style={styles.modalSubtitle}>
                                We've sent a 6-digit OTP to{'\n'}
                                <Text style={styles.emailText}>{email}</Text>
                            </Text>

                            <View style={styles.otpContainer}>
                                <TextInput
                                    style={styles.otpInput}
                                    placeholder="Enter 6-digit OTP"
                                    placeholderTextColor="#AAA"
                                    value={otp}
                                    onChangeText={(text) => {
                                        setOtp(text);
                                        clearError('otp');
                                    }}
                                    keyboardType="numeric"
                                    maxLength={6}
                                    textAlign="center"
                                />
                                {errors.otp && <Text style={styles.errorText}>{errors.otp}</Text>}
                            </View>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={styles.verifyBtn} onPress={handleVerifyOTP}>
                                    <LinearGradient
                                        colors={['#388e3c', '#4caf50']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.verifyGradient}
                                    >
                                        <Text style={styles.verifyText}>Verify</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.cancelBtn} onPress={closeOTPModal}>
                                    <Text style={styles.cancelText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={styles.resendContainer}
                                onPress={handleResendOTP}
                                disabled={!canResend}
                            >
                                <Text style={styles.resendText}>
                                    Didn't receive OTP? {' '}
                                    <Text style={[
                                        styles.resendLink,
                                        !canResend && styles.resendDisabled
                                    ]}>
                                        {canResend ? 'Resend' : `Resend in ${timer}s`}
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 40,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: -5 },
        elevation: 20,
    },
    modalContent: {
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    modalSubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 22,
    },
    emailText: {
        fontWeight: '600',
        color: '#388e3c',
    },
    otpContainer: {
        width: '100%',
        marginBottom: 24,
    },
    otpInput: {
        width: '100%',
        height: 52,
        borderRadius: 12,
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 16,
        fontSize: 18,
        color: '#1a1a1a',
        borderWidth: 1,
        borderColor: '#E9ECEF',
        textAlign: 'center',
        letterSpacing: 4,
    },
    modalButtons: {
        width: '100%',
        gap: 12,
    },
    verifyBtn: {
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#388e3c',
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 8,
    },
    verifyGradient: {
        paddingVertical: 16,
        alignItems: 'center',
        borderRadius: 12,
        width: '100%',
    },
    verifyText: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 17,
        letterSpacing: 0.5,
    },
    cancelBtn: {
        width: '100%',
        paddingVertical: 16,
        alignItems: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E9ECEF',
        backgroundColor: '#FFF',
    },
    cancelText: {
        color: '#666',
        fontWeight: '500',
        fontSize: 16,
    },
    resendContainer: {
        marginTop: 20,
    },
    resendText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    resendLink: {
        color: '#388e3c',
        fontWeight: '600',
    },
    resendDisabled: {
        color: '#999',
        fontWeight: '400',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
});