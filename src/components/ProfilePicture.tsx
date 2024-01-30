import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SPACING } from '../theme/theme'

const ProfilePicture = () => {
    return (
        <View style={styles.ImageContainer}>
            <Image style={styles.Image} source={require("../assets/app_images/avatar.webp")} />
        </View>
    )
}

export default ProfilePicture

const styles = StyleSheet.create({
    ImageContainer: {
        height: SPACING.space_36,
        width: SPACING.space_36,
        borderColor: COLORS.secondaryGreyHex,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: SPACING.space_12
    },
    Image: {
        height: SPACING.space_36,
        width: SPACING.space_36,
    }
})