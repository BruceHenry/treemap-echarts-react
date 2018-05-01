import React from 'react'
import {Provider} from 'react-redux'
import Views from './Views'
import Tip from './Tip'
import {store} from "../redux";

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <Views/>
                <Tip/>
            </div>
        </Provider>
    );
};
export default App;