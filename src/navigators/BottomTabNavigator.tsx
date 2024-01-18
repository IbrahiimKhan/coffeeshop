import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import { ROUTES } from '../screens/ROUTES'
import FavouriteScreen from '../screens/FavouriteScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../theme/theme';
import { BlurView } from '@react-native-community/blur';
import CustomIcon from '../components/CustomIcon';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';

const BottomTabNavigator = () => {

    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBarStyle,
            tabBarBackground: () => (<BlurView overlayColor='' blurAmount={15} style={styles.blurView}>

            </BlurView>)

        }} >
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ focused, color, size }) => <CustomIcon name='home' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} /> }} />
            <Tab.Screen name={ROUTES.CART} component={CartScreen} options={{ tabBarIcon: ({ focused, color, size }) => <CustomIcon name='cart' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} /> }} />
            <Tab.Screen name={ROUTES.FAVOURITE} component={FavouriteScreen} options={{ tabBarIcon: ({ focused, color, size }) => <CustomIcon name='like' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} /> }} />
            <Tab.Screen name={ROUTES.ORDER} component={OrderHistoryScreen} options={{ tabBarIcon: ({ focused, color, size }) => <CustomIcon name='bell' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} /> }} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 80,
        position: "absolute",
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopColor: "transparent",
        borderWidth: 0,
        elevation: 0
    },
    blurView: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
    }
})