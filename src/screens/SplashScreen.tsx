import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS } from '../theme/theme'
import LottieView from 'lottie-react-native';
import { Dimensions } from 'react-native';
import { ROUTES } from './ROUTES';
import Typewriter from '../components/TypeWritter';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    return (
        <>
            <StatusBar hidden />
            <View style={styles.ScreenContainer}>
                <LottieView
                    style={styles.LottieStyle}
                    source={require('../lottie/coffeecup.json')}
                    autoPlay
                    loop
                />
                <Typewriter text='Best Coffe In Town...' speed={50} />
            </View>
        </>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1, backgroundColor: COLORS.primaryBlackHex,
        justifyContent: "center"
    }
    ,
    LottieStyle: {
        height: Dimensions.get("window").height / 4,
    },
})