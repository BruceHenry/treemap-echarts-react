import {createStore} from 'redux';

const defaultState = {
    showTip: true,
    doNotShowAgain: localStorage.getItem('doNotShowAgain') === 'true',
    views: [[]]
};

function swap(array, index_1, index_2) {
    let temp = array[index_1];
    array[index_1] = array[index_2];
    array[index_2] = temp;
}

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
        case 'MOVE_DATA':
            const arrayToSwap = state.views.slice();
            if (action.direction === 'Left') {
                if (action.index === 0)
                    return state;
                swap(arrayToSwap, action.index, action.index - 1);
            } else if (action.direction === 'Right') {
                if (action.index === arrayToSwap.length - 1)
                    return state;
                swap(arrayToSwap, action.index, action.index + 1);
            }
            return {...state, views: arrayToSwap};
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
export const moveData = (index, direction) => ({type: 'MOVE_DATA', index, direction});
export const removeData = (index) => ({type: 'REMOVE_DATA', index});

// store.subscribe(() =>
//     console.log(store.getState())
// )

