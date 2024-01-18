import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS, SPACING } from '../theme/theme'
import CustomIcon from './CustomIcon'
interface GradientBgProps {
    name: string,
    color: string,
    size: number
}
const GradientBgIcon: FC<GradientBgProps> = ({ name, color, size }) => {
    return (
        <View style={styles.Container}>
            <LinearGradient colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.linerGradient}
            >
                <CustomIcon name={name}
                    color={color}
                    size={size}
                />
            </LinearGradient>
        </View>
    )
}

export default GradientBgIcon

const styles = StyleSheet.create({
    Container: {
        borderWidth: 2,
        borderColor: COLORS.secondaryDarkGreyHex,
        borderRadius: SPACING.space_12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.secondaryDarkGreyHex,
        overflow: "hidden"
    },
    linerGradient: {
        width: SPACING.space_36,
        height: SPACING.space_36,
        alignItems: "center",
        justifyContent: "center"
    }
})