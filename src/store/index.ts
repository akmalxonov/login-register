import {configureStore} from "@reduxjs/toolkit"

export const store = configureStore({
    reducer:{

    }
})

export type DispatchType = typeof store.dispatch;
export type RootStore = ReturnType<typeof store.getState>