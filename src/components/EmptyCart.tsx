import { StyleSheet, Text, View } from 'react-native';
import React, { FC, ReactElement } from 'react';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme';
import LottieView from 'lottie-react-native';
interface EmptyCartProps {
    title: string;
}
const EmptyCart: FC<EmptyCartProps> = ({ title }): ReactElement => {
    return (
        <>
            <View style={styles.EmptyCartContainer}>
                <LottieView
                    style={styles.LottieStyle}
                    source={require('../lottie/coffeecup.json')}
                    autoPlay
                    loop
                />
                <Text style={styles.LottieText}>{title}</Text>
            </View>
        </>
    );
};

export default EmptyCart;

const styles = StyleSheet.create({
    EmptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    LottieStyle: {
        height: 250,
    },
    LottieText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryOrangeHex,
        textAlign: 'center',
    },
});
