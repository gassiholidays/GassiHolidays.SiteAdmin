import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';

import toursReducer from '../app/tours';
import pricesReducer from '../app/prices';

const store = configureStore({
    reducer: {
        toursReducer,
        pricesReducer
    }
});

const { dispatch } = store;

const useDispatch = () => useAppDispatch();
const useSelector = useAppSelector;

export { store, dispatch, useSelector, useDispatch };
