import { StatusBar, StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, FlatList, Dimensions, ToastAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import Header from '../components/Header'
import CustomIcon from '../components/CustomIcon'
import CoffeeCard from '../components/CoffeeCard'
import { ROUTES } from './ROUTES'
type SelectedCategory = {
    index: number,
    category: string
}
const extractCategories = (CoffeList: any) => {
    const categories: any = {}
    for (const coffe of CoffeList) {
        if (categories[coffe.name] === undefined) {
            categories[coffe.name] = 1
        }
        else categories[coffe.name]++
    }
    const extracted = Object.keys(categories)
    extracted.unshift("All")
    return extracted
}
const sortCoffByCategory = (clist: any, selected: string) => {
    if (selected === "All") {
        return clist
    }
    else {
        let sortedList = clist.filter((item: any) => item.name === selected)
        return sortedList
    }
}
const HomeScreen = ({ navigation }: any) => {
    const CoffeList = useStore((state: any) => state.CoffeeList) || []
    const BeanList = useStore((state: any) => state.BeanList) || []
    const [categories, setCategories] = useState(extractCategories(CoffeList))
    const [searchedText, setSearchedText] = useState<string>("")
    const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>({
        index: 0,
        category: categories[0]
    })
    const [sortedCoffe, setSortedCoffe] = useState(sortCoffByCategory(CoffeList, selectedCategory.category))
    const tabBarHeight = useBottomTabBarHeight()
    const ListRef: any = useRef<FlatList>();
    const resetSearchCoffee = () => {
        ListRef?.current?.scrollToOffset({
            animated: true,
            offset: 0,
        });
        setSelectedCategory({ index: 0, category: categories[0] });
        setSortedCoffe([...CoffeList]);
        setSearchedText('');
    };
    const searchCoffee = (search: string) => {
        if (search != '') {
            ListRef?.current?.scrollToOffset({
                animated: true,
                offset: 0,
            });
            setSelectedCategory({ index: 0, category: categories[0] });
            setSortedCoffe([
                ...CoffeList.filter((item: any) =>
                    item.name.toLowerCase().includes(search.toLowerCase()),
                ),
            ]);
        }
    };
    const addToCart = useStore((state: any) => state.addToCart);
    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
    const addToCarthandler = ({
        id,
        index,
        name,
        roasted,
        imagelink_square,
        special_ingredient,
        type,
        prices,
    }: any) => {
        ToastAndroid.show(`${name} added to cart`, ToastAndroid.SHORT);
        addToCart({
            id,
            index,
            name,
            roasted,
            imagelink_square,
            special_ingredient,
            type,
            prices
        });
        calculateCartPrice();
        navigation.navigate(ROUTES.CART);
    };

    const setBottomTabHeight = useStore((state: any) => state.setBottomTabHeight)

    useEffect(() => {
        setBottomTabHeight(tabBarHeight)
    }, [])

    return (
        <>
            <View style={styles.ScreenContainer}>
                <StatusBar backgroundColor={COLORS.primaryBlackHex} barStyle="light-content"></StatusBar>
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
                    {/* Header */}
                    <Header />
                    <Text style={styles.ScreenTitle}>Find the best {`\n`} Coffee for you</Text>
                    {/* searchbar */}
                    <View style={styles.InputContainer}>
                        <TouchableOpacity>
                            <CustomIcon name='search' size={FONTSIZE.size_18} color={searchedText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
                                style={styles.InputIcon}
                            />
                        </TouchableOpacity>
                        <TextInput placeholder='Find Your coffee...' value={searchedText}
                            onChangeText={(text) => {
                                setSearchedText(text)
                                searchCoffee(text);
                            }}
                            placeholderTextColor={COLORS.primaryLightGreyHex}
                            style={styles.TextInputContainer}
                        />
                        {searchedText.length > 0 ? (
                            <TouchableOpacity
                                onPress={() => {
                                    resetSearchCoffee();
                                }}>
                                <CustomIcon
                                    style={styles.InputIcon}
                                    name="close"
                                    size={FONTSIZE.size_16}
                                    color={COLORS.primaryLightGreyHex}
                                />
                            </TouchableOpacity>
                        ) : (
                            <></>
                        )}
                    </View>
                    {/* category scroller item */}
                    <ScrollView showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        horizontal
                        contentContainerStyle={styles.CategoryScrollViewStyle}
                    >
                        {categories.map((item: any, index: number) => (
                            <TouchableOpacity
                                onPress={() => {
                                    ListRef?.current?.scrollToOffset({
                                        animated: true,
                                        offset: 0,
                                    });
                                    setSelectedCategory({ index: index, category: categories[index] })
                                    setSortedCoffe([...sortCoffByCategory(CoffeList, categories[index])])
                                }
                                }
                                key={index.toString()} style={styles.CategoryItem}>
                                <Text style={styles.CategoryText}>{item}</Text>
                                {selectedCategory.index === index ? (<View
                                    style={styles.ActiveIndicator}
                                ></View>) : <></>}
                            </TouchableOpacity>
                        ))}

                    </ScrollView>
                    {/* Coffee Flatlist */}
                    <FlatList
                        ref={ListRef}
                        horizontal
                        ListEmptyComponent={
                            <View style={styles.EmptyListContainer}>
                                <Text style={styles.CategoryText}>No Coffee Available</Text>
                            </View>
                        }
                        showsHorizontalScrollIndicator={false}
                        data={sortedCoffe}
                        contentContainerStyle={styles.FlatListContainer}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity

                                    onPress={() => {
                                        navigation.push(ROUTES.DETAILS, { index: item.index, id: item.id, type: item.type })
                                    }}
                                >
                                    <CoffeeCard
                                        id={item.id}
                                        index={item.index}
                                        type={item.type}
                                        roasted={item.roasted}
                                        imagelink_square={item.imagelink_square}
                                        name={item.name}
                                        special_ingredient={item.special_ingredient}
                                        average_rating={item.average_rating}
                                        price={item.prices[2]}
                                        buttonPressHandler={(addToCarthandler)}
                                    />
                                </TouchableOpacity>
                            );
                        }}
                    />

                    {/* Bean flatlist */}


                    <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>

                    {/* Beans Flatlist */}

                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={BeanList}
                        contentContainerStyle={[
                            styles.FlatListContainer,
                            { marginBottom: tabBarHeight },
                        ]}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.push(ROUTES.DETAILS, { index: item.index, id: item.id, type: item.type })
                                    }}
                                >
                                    <CoffeeCard
                                        id={item.id}
                                        index={item.index}
                                        type={item.type}
                                        roasted={item.roasted}
                                        imagelink_square={item.imagelink_square}
                                        name={item.name}
                                        special_ingredient={item.special_ingredient}
                                        average_rating={item.average_rating}
                                        price={item.prices[2]}
                                        buttonPressHandler={addToCarthandler}
                                    />
                                </TouchableOpacity>
                            );
                        }}
                    />
                </ScrollView>
            </View >
        </>
    )
}
export default HomeScreen

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex
    },
    ScrollViewFlex: {
        flexGrow: 1
    },
    ScreenTitle: {
        fontSize: FONTSIZE.size_28,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
        paddingLeft: SPACING.space_30
    },
    InputContainer: {
        margin: SPACING.space_30,
        borderRadius: BORDERRADIUS.radius_20,
        flexDirection: "row",
        backgroundColor: COLORS.primaryDarkGreyHex,
        alignItems: "center"
    },
    InputIcon: {
        marginHorizontal: SPACING.space_20,

    },
    TextInputContainer: {
        height: SPACING.space_20 * 3,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
        flex: 1

    },
    CategoryScrollViewStyle: {
        paddingHorizontal: SPACING.space_20,
        marginBottom: SPACING.space_20,
    },
    CategoryItem: {
        paddingHorizontal: SPACING.space_15,
    },
    CategoryText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryLightGreyHex,
        marginBottom: SPACING.space_4,
    },
    ActiveIndicator: {
        height: SPACING.space_10,
        width: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_10,
        backgroundColor: COLORS.primaryOrangeHex,
    },
    FlatListContainer: {},
    EmptyListContainer: {
        width: Dimensions.get('window').width - SPACING.space_30 * 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.space_36 * 3.6,
    },
    CoffeeBeansTitle: {
        fontSize: FONTSIZE.size_18,
        marginLeft: SPACING.space_30,
        marginTop: SPACING.space_20,
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.secondaryLightGreyHex,
    },

})