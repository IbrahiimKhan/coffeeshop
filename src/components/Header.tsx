import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import GradientBgIcon from './GradientBgIcon'
import ProfilePicture from './ProfilePicture'

interface HeaderBar {
    title?: string,
}

const Header: FC<HeaderBar> = ({ title }) => {
    return (
        <View style={styles.headerContainer}>
            <GradientBgIcon name={'menu'} color={COLORS.primaryLightGreyHex} size={SPACING.space_16} />
            <Text style={styles.headerText}>{title}</Text>
            <ProfilePicture />
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerContainer: {
        padding: SPACING.space_30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    headerText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_20
    }
})