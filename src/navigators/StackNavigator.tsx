import { View, Text } from 'react-native'
import React from 'react'
import PaymentScreen from '../screens/PaymentScreen'
import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import DetailsScreen from '../screens/ProductDetailsScreen'
import FavouriteScreen from '../screens/FavouriteScreen'
import OrderHistoryScreen from '../screens/OrderHistoryScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../screens/ROUTES'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './BottomTabNavigator'
import SplashScreen from '../screens/SplashScreen'
const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, }}>
                <Stack.Screen name={ROUTES.TAB}
                    component={BottomTabNavigator} />
                <Stack.Screen name={ROUTES.CART} component={CartScreen} options={{ animation: "slide_from_bottom" }} />
                <Stack.Screen name={ROUTES.HOME} component={HomeScreen} options={{ animation: "slide_from_bottom" }} />
                <Stack.Screen name={ROUTES.DETAILS} component={DetailsScreen} options={{ animation: "slide_from_bottom" }} />
                <Stack.Screen name={ROUTES.FAVOURITE} component={FavouriteScreen} options={{ animation: "slide_from_bottom" }} />
                <Stack.Screen name={ROUTES.ORDER} component={OrderHistoryScreen} options={{ animation: "slide_from_bottom" }} />
                <Stack.Screen name={ROUTES.PAYMENT} component={PaymentScreen} options={{ animation: "slide_from_bottom" }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator