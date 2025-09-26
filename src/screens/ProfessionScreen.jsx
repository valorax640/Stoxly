import { StyleSheet, Text, TouchableOpacity, View, StatusBar, ScrollView } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'

const ProfessionScreen = () => {
    const [selectedProfession, setSelectedProfession] = useState('')

    const professions = [
        { id: 'field_partner', name: 'Field Partner' },
        { id: 'wholesaler_distributor', name: 'Wholesaler/Distributor' },
    ]

    const handleProfessionSelect = (professionId) => {
        setSelectedProfession(professionId)
    }

    const handleGetStarted = () => {
        if (!selectedProfession) {
            alert('Please select your profession')
            return
        }
        console.log('Selected profession:', selectedProfession)
        // Navigate to next screen 
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#2e7d32" />
            
            <LinearGradient
                colors={['#2e7d32', '#388e3c', '#4caf50']}
                style={styles.header}
            >
                <Text style={styles.title}>Find What Suits You</Text>
                <Text style={styles.subtitle}>
                    Help us customize Stoxly for your specific needs
                </Text>
            </LinearGradient>

            <View style={styles.scrollView}>
                <View style={styles.cardsContainer}>
                    {professions.map((profession) => (
                        <TouchableOpacity
                            key={profession.id}
                            style={[
                                styles.professionCard,
                                selectedProfession === profession.id && styles.selectedCard
                            ]}
                            onPress={() => handleProfessionSelect(profession.id)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.cardContent}>
                                <Text style={[
                                    styles.professionName,
                                    selectedProfession === profession.id && styles.selectedText
                                ]}>
                                    {profession.name}
                                </Text>
                            </View>
                            {selectedProfession === profession.id && (
                                <View style={styles.checkmark}>
                                    <Text style={styles.checkmarkText}>✓</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={[
                        styles.getStartedButton,
                        !selectedProfession && styles.disabledButton
                    ]}
                    onPress={handleGetStarted}
                    activeOpacity={0.8}
                    disabled={!selectedProfession}
                >
                    <LinearGradient
                        colors={selectedProfession ? ['#2e7d32', '#388e3c'] : ['#ccc', '#999']}
                        style={styles.buttonGradient}
                    >
                        <Text style={styles.buttonText}>Next</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProfessionScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        paddingTop: 60,
        paddingBottom: 30,
        paddingHorizontal: 24,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        opacity: 0.9,
        lineHeight: 22,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardsContainer: {
        paddingVertical: 20,
        paddingBottom: 100, 
        alignItems: 'center',
    },
    professionCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 2,
        borderColor: 'transparent',
        width: '80%',
    },
    selectedCard: {
        borderColor: '#388e3c',
        backgroundColor: '#f1f8e9',
        shadowColor: '#388e3c',
        shadowOpacity: 0.2,
    },
    cardContent: {
        flex: 1,
        alignItems: 'center',
    },
    professionName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        textAlign: 'center',
    },
    selectedText: {
        color: '#2e7d32',
    },
    professionDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    selectedDescText: {
        color: '#4caf50',
    },
    checkmark: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#388e3c',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 16,
    },
    checkmarkText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingBottom: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
    },
    getStartedButton: {
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#388e3c',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    disabledButton: {
        shadowOpacity: 0.1,
        elevation: 2,
    },
    buttonGradient: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
})