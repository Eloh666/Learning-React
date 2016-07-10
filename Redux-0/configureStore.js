import React from 'react';
import {loadState, saveState} from './localStorage';
import throttle from 'lodash/throttle';

export const configureStore = (App) => {
    const persistedState = loadState();
    const store = Redux.createStore(
        App,
        persistedState
    );
    store.subscribe(
        throttle(
            () => saveState({todos: store.getState().todos}),
            1000
        )
    );
    return store;
};