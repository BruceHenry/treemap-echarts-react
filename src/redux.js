import {createStore} from 'redux';

const defaultState = {
    showTip: true,
    doNotShowAgain: localStorage.getItem('doNotShowAgain') === 'true',
    views: [[], [], []]
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'CLOSE_TIP':
            return {...state, showTip: false};
        case 'HIDE_TIP':
            localStorage.setItem('doNotShowAgain', 'true');
            return {...state, doNotShowAgain: true};
        case 'ADD_DATA':
            return {...state, views: [...state.views, []]};
        case 'EDIT_DATA':
            const arrayToedit = state.views;
            arrayToedit.splice(action.index, 1, action.data);
            return {...state, views: arrayToedit};
        case 'REMOVE_DATA':
            const arrayToRemove = state.views;
            arrayToRemove.splice(action.index, 1);
            return {...state, views: arrayToRemove};
        default:
            return state;
    }
};

export const store = createStore(reducer);

export const closeTip = () => ({type: 'CLOSE_TIP'});
export const hideTip = () => ({type: 'HIDE_TIP'});

export const addData = () => ({type: 'ADD_DATA'});
export const editData = (index, data) => ({type: 'EDIT_DATA', index, data});
export const removeData = (index) => ({type: 'REMOVE_DATA', index});

// store.subscribe(() =>
//     console.log(store.getState())
// )

