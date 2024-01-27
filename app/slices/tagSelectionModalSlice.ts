import { createSlice } from '@reduxjs/toolkit'

export interface TagListForCurrentCitation {
    tags: string[]
}

export const tagSelectionModalSlice = createSlice({
    name: 'tagSelectionModal',
    initialState: {
        tags: []
    },
    reducers: {
        setTagsForCurrentCitation: (state, action) => {
            state.tags = action.payload
        }
    }
    // TODO: Need HYDRATE for SSR - https://blog.logrocket.com/use-redux-next-js/
});

export const { setTagsForCurrentCitation } = tagSelectionModalSlice.actions
export const selectTagsForCurrentCitation  = (state: TagListForCurrentCitation) => state.tags;

export default tagSelectionModalSlice.reducer