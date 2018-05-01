import {createStore} from 'redux';

const defaultState = {
    showTip: true,
    doNotShowAgain: localStorage.getItem('doNotShowAgain') === 'true',
    views: [[]]
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'CLOSE_TIP':
            return {...state, showTip: false};
        case 'HIDE_TIP':
            localStorage.setItem('doNotShowAgain', 'true');
            return {...state, doNotShowAgain: true};
        case 'ADD_DATA':
            const arrayToAdd = state.views.slice();
            arrayToAdd.splice(action.index, 0, []);
            return {...state, views: arrayToAdd};
        case 'EDIT_DATA':
            const arrayToEdit = state.views.slice();
            arrayToEdit.splice(action.index, 1, action.data);
            return {...state, views: arrayToEdit};
        case 'REMOVE_DATA':
            const arrayToRemove = state.views.slice();
            arrayToRemove.splice(action.index, 1);
            return {...state, views: arrayToRemove};
        default:
            return state;
    }
};

export const store = createStore(reducer);

export const closeTip = () => ({type: 'CLOSE_TIP'});
export const hideTip = () => ({type: 'HIDE_TIP'});

export const addData = (index) => ({type: 'ADD_DATA', index});
export const editData = (index, data) => ({type: 'EDIT_DATA', index, data});
export const removeData = (index) => ({type: 'REMOVE_DATA', index});

// store.subscribe(() =>
//     console.log(store.getState())
// )

