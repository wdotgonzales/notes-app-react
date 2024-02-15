import generateUniqueId from "./generateUniqueId";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notesArr: checkIfLocalStorageExist(),
    currentActiveNote: { noteId: 0 }
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {

        addNewNote: (state, action) => {
            const { noteTitle, noteDescription } = action.payload;

            const currentDate = new Date();
            const day = String(currentDate.getDate()).padStart(2, '0');
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const year = currentDate.getFullYear();
            const hours = String(currentDate.getHours()).padStart(2, '0');
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
            const seconds = String(currentDate.getSeconds()).padStart(2, '0');

            const newNote = {
                noteId: generateUniqueId(),
                noteTitle: noteTitle,
                noteDescription: noteDescription,
                noteLastDateModified: `${month}/${day}/${year}`,
                noteLastTimeModified: `${hours}:${minutes}:${seconds}`
            };

            const newNotesArr = [...state.notesArr, newNote];
            localStorage.setItem('notesArr', JSON.stringify(newNotesArr));

            return {
                ...state,
                notesArr: checkIfLocalStorageExist(),
                currentActiveNote: { noteId: 0 }
            };
        },

        deleteNote: (state, action) => {
            const noteIdForDeletion = action.payload;
            const currentNotesArr = JSON.parse(localStorage.getItem('notesArr'));
            const newNotesArr = currentNotesArr.filter((note) => note.noteId !== noteIdForDeletion);

            localStorage.setItem('notesArr', JSON.stringify(newNotesArr));

            return {
                ...state,
                notesArr: checkIfLocalStorageExist(),
                currentActiveNote: { noteId: 0 }
            }
        },

        selectNote: (state, action) => {
            const selectedActiveNoteId = action.payload;
            const selectedActiveNote = [...state.notesArr].find((note) => note.noteId === selectedActiveNoteId);
            return {
                ...state,
                currentActiveNote: selectedActiveNote
            }
        },

        updateNoteTitleReducer: (state, action) => {
            const updatedNoteTitle = action.payload;
            const updatedNoteId = updatedNoteTitle.noteId;

            // Find the index of the note to be updated
            const noteIndex = state.notesArr.findIndex(note => note.noteId === updatedNoteId);

            if (noteIndex !== -1) {
                // Replace the old note with the updated note
                const updatedNotesArr = [
                    ...state.notesArr.slice(0, noteIndex),
                    updatedNoteTitle,
                    ...state.notesArr.slice(noteIndex + 1)
                ];

                // Update localStorage
                localStorage.setItem('notesArr', JSON.stringify(updatedNotesArr));

                // Set currentActiveNote to the updated note
                return {
                    ...state,
                    notesArr: updatedNotesArr,
                    currentActiveNote: updatedNoteTitle
                };
            }

            return state; // If noteId is not found, return the current state
        },

        updateNoteDescriptionReducer: (state, action) => {
            const updatedNoteTitle = action.payload;
            const updatedNoteId = updatedNoteTitle.noteId;

            // Find the index of the note to be updated
            const noteIndex = state.notesArr.findIndex(note => note.noteId === updatedNoteId);

            if (noteIndex !== -1) {
                // Replace the old note with the updated note
                const updatedNotesArr = [
                    ...state.notesArr.slice(0, noteIndex),
                    updatedNoteTitle,
                    ...state.notesArr.slice(noteIndex + 1)
                ];

                // Update localStorage
                localStorage.setItem('notesArr', JSON.stringify(updatedNotesArr));

                // Set currentActiveNote to the updated note
                return {
                    ...state,
                    notesArr: updatedNotesArr,
                    currentActiveNote: updatedNoteTitle
                };
            }

            return state; // If noteId is not found, return the current state
        }
    }
})

function checkIfLocalStorageExist() {
    if (localStorage.getItem('notesArr') === null) {
        localStorage.setItem('notesArr', '[]');
        return [];
    } else {
        return JSON.parse(localStorage.getItem('notesArr'));
    }
}

export const { addNewNote, deleteNote, selectNote, updateNoteTitleReducer, updateNoteDescriptionReducer } = notesSlice.actions;
export default notesSlice.reducer;