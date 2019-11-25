import React, { createContext, useReducer, useContext } from "react";
import {
  SET_CURRENT_PRODUCT,
  REMOVE_PRODUCT,
  UPDATE_PRODUCTS,
  ADD_PRODUCT,
  ADD_TO_CART,
  ADD_ALL_TO_CART,
  UPDATE_CART,
  REMOVE_FROM_CART,
  LOADING
} from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  console.log("state, action", state, action)
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
        loading: false
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: action.product,
        loading: false
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: action.product,
        loading: false
      };
    case ADD_ALL_TO_CART:
      return {
        ...state,
        cart: [...action.cart],
        loading:false

      }


    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    currentProduct: {
      _id: 0,
      title: "",
      body: "",
      author: ""
    },
    cart: [],
    loading: false
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
