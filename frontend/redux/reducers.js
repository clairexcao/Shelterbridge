import { combineReducers } from 'redux';

// Example reducer
const userReducer = (state = {}, action) => {
    switch (action.type) {
        // Add your cases here
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    user: userReducer,
    // Add other reducers here
});

export default rootReducer;
