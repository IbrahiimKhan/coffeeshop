import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';
import {produce} from 'immer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStore = create(
  persist(
    set => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      CartPrice: [],
      FavouriteList: [],
      CartList: [],
      OrderHistoryList: [],
      bottomTabHeight: 0,
      addToCart: (cartItem: any) =>
        set(
          produce(state => {
            let found = false;
            // search if cartitem exist in cartlist
            for (const coffee of state.CartList) {
              if (coffee.id === cartItem.id) {
                // yes exist
                found = true;
                let size = false;
                // search for if item size is exist in prices
                for (const sizeWithPrice of coffee.prices) {
                  if (sizeWithPrice.size === cartItem.prices[0].size) {
                    // yes exist
                    size = true;
                    // then increment the quantity of the same item
                    sizeWithPrice.quantity++;
                    break;
                  }
                }
                // size not exist
                if (!size) {
                  // add the size in the price array
                  coffee.prices.push(cartItem.prices[0]);
                }
                // sort the coffee
                coffee.prices.sort((a: {size: string}, b: {size: string}) => {
                  const sizeA = parseFloat(a.size);
                  const sizeB = parseFloat(b.size);
                  return sizeB - sizeA;
                });
                // all tasks done, break the loop
                break;
              }
            }
            // simply add the item to cartlist if new
            if (!found) {
              state.CartList.push(cartItem);
            }
          }),
        ),
      calculateCartPrice: () =>
        set(
          produce(state => {
            let totalPrice = 0;
            for (const item of state.CartList) {
              let tempPrice = 0;
              for (const sizeWithPrice of item.prices) {
                tempPrice +=
                  parseFloat(sizeWithPrice.price) * sizeWithPrice.quantity;
              }
              item.ItemPrice = tempPrice.toFixed(2).toString();
              totalPrice += tempPrice;
            }
            state.CartPrice = totalPrice.toFixed(2).toString();
          }),
        ),
      addToFavouriteList: (type: string, id: string) =>
        set(
          produce(state => {
            if (type === 'Coffee') {
              for (const item of state.CoffeeList) {
                if (item.id === id) {
                  if (item.favourite === false) {
                    item.favourite = true;
                    state.FavouriteList.unshift(item);
                  } else {
                    item.favourite = false;
                  }
                  break;
                }
              }
            } else if (type === 'Bean') {
              for (const item of state.BeanList) {
                if (item.id === id) {
                  if (item.favourite === false) {
                    item.favourite = true;
                    state.FavouriteList.unshift(item);
                  } else item.favourite = false;
                  break;
                }
              }
            }
          }),
        ),
      removeFromFavouriteList: (type: string, id: string) =>
        set(
          produce(state => {
            if (type === 'Coffee') {
              for (const item of state.CoffeeList) {
                if (item.id === id) {
                  if (item.favourite === true) {
                    item.favourite = false;
                  } else {
                    item.favourite = true;
                  }
                  break;
                }
              }
            } else if (type === 'Bean') {
              for (const item of state.BeanList) {
                if (item.id === id) {
                  if (item.favourite === true) {
                    item.favourite = false;
                  } else item.favourite = true;
                  break;
                }
              }
            }
            let spliceIndex = -1;
            for (let i = 0; i < state.FavouriteList.length; i++) {
              if (state.FavouriteList[i].id === id) {
                spliceIndex = i;
                break;
              }
            }
            state.FavouriteList.splice(spliceIndex, 1);
          }),
        ),
      incrementCartQuantity: (id: string, size: string) =>
        set(
          produce(state => {
            for (const item of state.CartList) {
              if (item.id === id) {
                for (const sizeWithPrice of item.prices) {
                  if (sizeWithPrice.size === size) {
                    sizeWithPrice.quantity++;
                    break;
                  }
                }
              }
            }
          }),
        ),
      decrementCartQuantity: (id: string, size: string) =>
        set(
          produce(state => {
            for (const item of state.CartList) {
              if (item.id === id) {
                for (const sizeWithPrice of item.prices) {
                  if (sizeWithPrice.size === size) {
                    if (item.prices.length > 1) {
                      if (sizeWithPrice.quantity > 1) {
                        sizeWithPrice.quantity--;
                      } else {
                        const spliceIndex = item.prices.indexOf(sizeWithPrice);
                        item.prices.splice(spliceIndex, 1);
                      }
                    } else {
                      const spliceIndex = state.CartList.indexOf(item);
                      state.CartList.splice(spliceIndex, 1);
                    }
                  }
                  break;
                }
              }
            }
          }),
        ),
      addToOrderHistoryListFromCart: () =>
        set(
          produce(state => {
            let temp = state.CartList.reduce(
              (accumulator: number, currentValue: any) =>
                accumulator + parseFloat(currentValue.ItemPrice),
              0,
            );
            if (state.OrderHistoryList.length > 0) {
              state.OrderHistoryList.unshift({
                OrderDate:
                  new Date().toDateString() +
                  ' ' +
                  new Date().toLocaleTimeString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(2).toString(),
              });
            } else {
              state.OrderHistoryList.push({
                OrderDate:
                  new Date().toDateString() +
                  ' ' +
                  new Date().toLocaleTimeString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(2).toString(),
              });
            }
            state.CartList = [];
          }),
        ),
      setBottomTabHeight: (height: number) =>
        set(
          produce(state => {
            state.bottomTabHeight = height;
          }),
        ),
    }),
    {name: 'coffee-app', storage: createJSONStorage(() => AsyncStorage)},
  ),
);
