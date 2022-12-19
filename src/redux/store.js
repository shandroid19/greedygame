import { configureStore } from "@reduxjs/toolkit";
import tableReducer from './slices/tableslices'
export default configureStore({
    reducer:{
        table: tableReducer,
    },
})