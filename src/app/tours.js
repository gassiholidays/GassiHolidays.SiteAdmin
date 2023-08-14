// third-party
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../app/store';

// project imports
import axios from 'axios';
// import { dispatch } from '../index';
import { BASE_API_URL } from '../gassiholidays/constants/settings';

// ----------------------------------------------------------------------

const initialState = {
    state: {
        success: true,
        message: null
    },
    tours: [],
    selectedTour: {
        availableImages: [],
        galleryImages: []
    }
};

const slice = createSlice({
    name: 'tours',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.state = action.payload;
            console.log('error');
            console.log(action.payload);
        },

        clearState(state) {
            state.state = { state: null, message: null };
        },

        // GET ALL TOURS
        getToursSuccess(state, action) {
            state.state = { success: true, message: null };
            state.tours = action.payload;
        },

        addTourSuccess(state, action) {
            state.state = { success: true, message: null };
            state.tours.push(action.payload);
        },

        editTourSuccess(state, action) {
            state.state = { success: true, message: null };
            var index = state.tours.findIndex((x) => x.id == action.payload.id);
            state.tours[index] = action.payload;
            console.log('success');
            console.log(action.payload.id);
        },

        getTourAvailableImagesSuccess(state, action) {
            state.state = { success: true, message: null };
            state.selectedTour.availableImages = action.payload;
        },

        getTourGalleryPhotos(state, action) {
            state.state = { success: true, message: null };
            state.selectedTour.galleryImages = action.payload;
        },

        editTourGalleryPhotos(state, action) {
            state.state = { success: true, message: null };
            state.selectedTour.galleryImages = action.payload;
        },

        updatePickListState(state, action) {
            state.state = { success: true, message: null };
            state.selectedTour.availableImages = action.payload.availableImages;
            state.selectedTour.galleryImages = action.payload.galleryImages;
        }

        // // UPDATE COLUMN ORDER
        // updateColumnOrderSuccess(state, action) {
        //     state.columnsOrder = action.payload.columnsOrder;
        // },

        // // DELETE COLUMN
        // deleteColumnSuccess(state, action) {
        //     state.columns = action.payload.columns;
        //     state.columnsOrder = action.payload.columnsOrder;
        // },

        // // ADD ITEM
        // addItemSuccess(state, action) {
        //     state.items = action.payload.items;
        //     state.columns = action.payload.columns;
        //     state.userStory = action.payload.userStory;
        // },

        // // EDIT ITEM
        // editItemSuccess(state, action) {
        //     state.items = action.payload.items;
        //     state.columns = action.payload.columns;
        //     state.userStory = action.payload.userStory;
        // },

        // // UPDATE COLUMN ITEM ORDER
        // updateColumnItemOrderSuccess(state, action) {
        //     state.columns = action.payload.columns;
        // },

        // // SELECT ITEM
        // selectItemSuccess(state, action) {
        //     state.selectedItem = action.payload.selectedItem;
        // },

        // // ADD ITEM COMMENT
        // addItemCommentSuccess(state, action) {
        //     state.items = action.payload.items;
        //     state.comments = action.payload.comments;
        // },

        // // DELETE ITEM
        // deleteItemSuccess(state, action) {
        //     state.items = action.payload.items;
        //     state.columns = action.payload.columns;
        //     state.userStory = action.payload.userStory;
        // },

        // // ADD STORY
        // addStorySuccess(state, action) {
        //     state.userStory = action.payload.userStory;
        //     state.userStoryOrder = action.payload.userStoryOrder;
        // },

        // // EDIT STORY
        // editStorySuccess(state, action) {
        //     state.userStory = action.payload.userStory;
        // },

        // // UPDATE STORY ORDER
        // updateStoryOrderSuccess(state, action) {
        //     state.userStoryOrder = action.payload.userStoryOrder;
        // },

        // // UPDATE STORY ITEM ORDER
        // updateStoryItemOrderSuccess(state, action) {
        //     state.userStory = action.payload.userStory;
        // },

        // // ADD STORY COMMENT
        // addStoryCommentSuccess(state, action) {
        //     state.userStory = action.payload.userStory;
        //     state.comments = action.payload.comments;
        // },

        // // DELETE STORY
        // deleteStorySuccess(state, action) {
        //     state.userStory = action.payload.userStory;
        //     state.userStoryOrder = action.payload.userStoryOrder;
        // },

        // // GET COLUMNS
        // getColumnsSuccess(state, action) {
        //     state.columns = action.payload;
        // },

        // // GET COLUMNS ORDER
        // getColumnsOrderSuccess(state, action) {
        //     state.columnsOrder = action.payload;
        // },

        // // GET COMMENTS
        // getCommentsSuccess(state, action) {
        //     state.comments = action.payload;
        // },

        // // GET PROFILES
        // getProfilesSuccess(state, action) {
        //     state.profiles = action.payload;
        // },

        // // GET ITEMS
        // getItemsSuccess(state, action) {
        //     state.items = action.payload;
        // },

        // // GET USER STORY
        // getUserStorySuccess(state, action) {
        //     state.userStory = action.payload;
        // },

        // // GET USER STORY ORDER
        // getUserStoryOrderSuccess(state, action) {
        //     state.userStoryOrder = action.payload;
        // }
    }
});

// Reducer
export default slice.reducer;

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// ----------------------------------------------------------------------

export function getTours() {
    return async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/tours`);
            dispatch(slice.actions.getToursSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError({ success: false, message: error }));
        }
    };
}

export function addTourEvent(value) {
    return async () => {
        try {
            const response = await axios({
                method: 'post',
                url: `${BASE_API_URL}/api/tours`,
                headers: {},
                data: value
            });
            dispatch(slice.actions.addTourSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError({ success: false, message: error }));
        }
    };
}

export function editTourEvent(value) {
    return async () => {
        try {
            dispatch(slice.actions.clearState());
            console.log(value);
            const response = await axios({
                method: 'put',
                url: `${BASE_API_URL}/api/tours`,
                headers: {},
                data: value
            });
            dispatch(slice.actions.editTourSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError({ success: false, message: 'error' }));
        }
    };
}

export function updateTourMainImage(value) {
    return async () => {
        try {
            dispatch(slice.actions.clearState());
            console.log('update tour main image');
            const response = await axios({
                method: 'put',
                url: `${BASE_API_URL}/api/tours/${value.tourId}/image`,
                headers: {},
                data: { url: value.imageUrl }
            });
            dispatch(slice.actions.editTourSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError({ success: false, message: 'error' }));
        }
    };
}

export function getTourAvailableImages(value) {
    return async () => {
        try {
            console.log(value);
            const response = await axios.get(`${BASE_API_URL}/api/tours/${value.tourId}/images/${value.imageType}`);
            dispatch(slice.actions.getTourAvailableImagesSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError({ success: false, message: error }));
        }
    };
}

export function getTourGalleryPhotos(tourId) {
    return async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/tours/${tourId}/gallery/images`);
            dispatch(slice.actions.getTourGalleryPhotos(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError({ success: false, message: error }));
        }
    };
}

export function updatePickList(pickListState) {
    dispatch(slice.actions.updatePickListState(pickListState));
}

export function updateTourGalleryPhotos(galleryPhotos) {
    return async () => {
        try {
            dispatch(slice.actions.editTourGalleryPhotos(galleryPhotos));
        } catch (error) {
            dispatch(slice.actions.hasError({ success: false, message: error }));
        }
    };
}

export function saveTourPhotosGallery(value) {
    return async () => {
        try {
            dispatch(slice.actions.clearState());
            console.log('update photo gallery images');
            const response = await axios({
                method: 'put',
                url: `${BASE_API_URL}/api/tours/${value.tourId}/gallery/images`,
                headers: {},
                data: value.galleryImages
            });
            // dispatch(slice.actions.editTourSuccess(response.data));
        } catch (error) {
            // dispatch(slice.actions.hasError({ success: false, message: 'error' }));
        }
    };
}

// export function getColumns() {
//     return async () => {
//         try {
//             const response = await axios.get('/api/kanban/columns');
//             dispatch(slice.actions.getColumnsSuccess(response.data.columns));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function getColumnsOrder() {
//     return async () => {
//         try {
//             const response = await axios.get('/api/kanban/columns-order');
//             dispatch(slice.actions.getColumnsOrderSuccess(response.data.columnsOrder));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function getComments() {
//     return async () => {
//         try {
//             const response = await axios.get('/api/kanban/comments');
//             dispatch(slice.actions.getCommentsSuccess(response.data.comments));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function getProfiles() {
//     return async () => {
//         try {
//             const response = await axios.get('/api/kanban/profiles');
//             dispatch(slice.actions.getProfilesSuccess(response.data.profiles));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function getItems() {
//     return async () => {
//         try {
//             const response = await axios.get('/api/kanban/items');
//             dispatch(slice.actions.getItemsSuccess(response.data.items));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function getUserStory() {
//     return async () => {
//         try {
//             const response = await axios.get('/api/kanban/userstory');
//             dispatch(slice.actions.getUserStorySuccess(response.data.userStory));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function getUserStoryOrder() {
//     return async () => {
//         try {
//             const response = await axios.get('/api/kanban/userstory-order');
//             dispatch(slice.actions.getUserStoryOrderSuccess(response.data.userStoryOrder));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function addColumn(column: KanbanColumn, columns: KanbanColumn[], columnsOrder: string[]) {
//     return async () => {
//         try {
//             const response = await axios.post('/api/kanban/add-column', { column, columns, columnsOrder });
//             dispatch(slice.actions.addColumnSuccess(response.data));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function editColumn(column: KanbanColumn, columns: KanbanColumn[]) {
//     return async () => {
//         try {
//             const response = await axios.post('/api/kanban/edit-column', { column, columns });
//             dispatch(slice.actions.editColumnSuccess(response.data));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function updateColumnOrder(columnsOrder: string[]) {
//     return async () => {
//         try {
//             const response = await axios.post('/api/kanban/update-column-order', { columnsOrder });
//             dispatch(slice.actions.updateColumnOrderSuccess(response.data));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function deleteColumn(columnId: string, columnsOrder: string[], columns: KanbanColumn[]) {
//     return async () => {
//         try {
//             const response = await axios.post('/api/kanban/delete-column', { columnId, columnsOrder, columns });
//             dispatch(slice.actions.deleteColumnSuccess(response.data));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function addItem(
//     columnId: string,
//     columns: KanbanColumn[],
//     item: KanbanItem,
//     items: KanbanItem[],
//     storyId: string,
//     userStory: KanbanUserStory[]
// ) {
//     return async () => {
//         try {
//             const response = await axios.post('/api/kanban/add-item', { columnId, columns, item, items, storyId, userStory });
//             dispatch(slice.actions.addItemSuccess(response.data));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function editItem(
//     columnId: string,
//     columns: KanbanColumn[],
//     item: KanbanItem,
//     items: KanbanItem[],
//     storyId: string,
//     userStory: KanbanUserStory[]
// ) {
//     return async () => {
//         try {
//             const response = await axios.post('/api/kanban/edit-item', { items, item, userStory, storyId, columns, columnId });
//             dispatch(slice.actions.editItemSuccess(response.data));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function updateColumnItemOrder(columns: KanbanColumn[]) {
//     return async () => {
//         try {
//             const response = await axios.post('/api/kanban/update-item-order', { columns });
//             dispatch(slice.actions.updateColumnItemOrderSuccess(response.data));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function selectItem(selectedItem: string | false) {
//     return async () => {
//         try {
//             const response = await axios.post('/api/kanban/select-item', { selectedItem });
//             dispatch(slice.actions.selectItemSuccess(response.data));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function addItemComment(itemId: string | false, comment: KanbanComment, items: KanbanItem[], comments: KanbanComment[]) {
//     return async () => {
//         try {
//             const response = await axios.post('/api/kanban/add-item-comment', { items, itemId, comment, comments });
//             dispatch(slice.actions.addItemCommentSuccess(response.data));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function deleteItem(itemId: string | false, items: KanbanItem[], columns: KanbanColumn[], userStory: KanbanUserStory[]) {
//     return async () => {
//         try {
//             const response = await axios.post('/api/kanban/delete-item', { columns, itemId, userStory, items });
//             dispatch(slice.actions.deleteItemSuccess(response.data));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function addStory(story: any, userStory: KanbanUserStory[], userStoryOrder: string[]) {
//     return async () => {
//         try {
//             const response = await axios.post('/api/kanban/add-story', { userStory, story, userStoryOrder });
//             dispatch(slice.actions.addStorySuccess(response.data));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function editStory(story: KanbanUserStory, userStory: KanbanUserStory[]) {
//     return async () => {
//         try {
//             const response = await axios.post('/api/kanban/edit-story', { userStory, story });
//             dispatch(slice.actions.editStorySuccess(response.data));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function updateStoryOrder(userStoryOrder: string[]) {
//     return async () => {
//         try {
//             const response = await axios.post('/api/kanban/update-story-order', { userStoryOrder });
//             dispatch(slice.actions.updateStoryOrderSuccess(response.data));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function updateStoryItemOrder(userStory: KanbanUserStory[]) {
//     return async () => {
//         try {
//             const response = await axios.post('/api/kanban/update-storyitem-order', { userStory });
//             dispatch(slice.actions.updateStoryItemOrderSuccess(response.data));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function addStoryComment(storyId: string, comment: KanbanComment, comments: KanbanComment[], userStory: KanbanUserStory[]) {
//     return async () => {
//         try {
//             const response = await axios.post('/api/kanban/add-story-comment', { userStory, storyId, comment, comments });
//             dispatch(slice.actions.addStoryCommentSuccess(response.data));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function deleteStory(storyId: string, userStory: KanbanUserStory[], userStoryOrder: string[]) {
//     return async () => {
//         try {
//             const response = await axios.post('/api/kanban/delete-story', { userStory, storyId, userStoryOrder });
//             dispatch(slice.actions.deleteStorySuccess(response.data));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error));
//         }
//     };
//}
