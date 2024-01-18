import { ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import ImageWithInfo from '../components/ImageWithInfo'
import PaymentBox from './PaymentBox'
import { ROUTES } from './ROUTES'
import { Header } from 'react-native/Libraries/NewAppScreen'

const DetailsScreen = ({ navigation, route }: any) => {

  const data = useStore((state: any) => route.params.type === "Coffee" ? state.CoffeeList : state.BeanList)[route.params.index]
  const [fullDesc, setFullDesc] = useState<boolean>(false);
  const [price, setPrice] = useState(data.prices[0]);
  const addToFavoriteList = useStore((state: any) => state.addToFavouriteList);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const deleteFromFavoriteList = useStore(
    (state: any) => state.removeFromFavouriteList,
  );
  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };
  const BackHandler = () => {
    navigation.pop();
  };
  const addToCarthandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,
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
      prices: [{ ...price, quantity: 1 }],
    });
    calculateCartPrice();
    navigation.navigate(ROUTES.CART);
  };
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true}></StatusBar>

      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
        <ImageWithInfo

          EnableBackHandler={true}
          imagelink_portrait={data.imagelink_portrait}
          type={data.type}
          id={data.id}
          favourite={data.favourite}
          name={data.name}
          special_ingredient={data.special_ingredient}
          ingredients={data.ingredients}
          average_rating={data.average_rating}
          ratings_count={data.ratings_count}
          roasted={data.roasted}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
        />

        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text style={styles.DescriptionText}>
                {data.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text numberOfLines={3} style={styles.DescriptionText}>
                {data.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.InfoTitle}>Size</Text>
          <View style={styles.SizeOuterContainer}>
            {data.prices.map((data: any) => (
              <TouchableOpacity
                key={data.size}
                onPress={() => {
                  setPrice(data);
                }}
                style={[
                  styles.SizeBox,
                  {
                    borderColor:
                      data.size == price.size
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryDarkGreyHex,
                  },
                ]}>
                <Text
                  style={[
                    styles.SizeText,
                    {
                      fontSize:
                        data.type == 'Bean'
                          ? FONTSIZE.size_14
                          : FONTSIZE.size_16,
                      color:
                        data.size == price.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.secondaryLightGreyHex,
                    },
                  ]}>
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentBox price={price} buttonPressHandler={() => {
          addToCarthandler({
            id: data.id,
            index: data.index,
            name: data.name,
            roasted: data.roasted,
            imagelink_square: data.imagelink_square,
            special_ingredient: data.special_ingredient,
            type: data.type,
            price: price,
          });
        }} buttonTitle={'Add to Cart'} />
      </ScrollView>
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: "space-between"
  }, FooterInfoArea: {
    padding: SPACING.space_20,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
})