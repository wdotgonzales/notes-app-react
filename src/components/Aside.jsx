import { useSelector, useDispatch } from "react-redux";
import {
    addNewNote,
    deleteNote,
    selectNote
} from '../redux/notesSlice'
const Aside = () => {
    const notesArr = useSelector((state) => state.notes.notesArr);
    const currentActiveNote = useSelector((state) => state.notes.currentActiveNote);
    const dispatch = useDispatch();

    return (
        <aside className="flex-2 w-[500px] border border-r-2 border-gray-300">
            <div className="m-[15px]">
                <div className="flex justify-between mb-4">
                    <h2 className="font-bold text-[28px]">Notes</h2>
                    <button
                        onClick={() => {
                            dispatch(addNewNote(
                                {
                                    noteTitle: 'Untitled Note',
                                    noteDescription: ""
                                }))
                        }}
                        className="text-blue-700"
                    >Add</button>
                </div>
            </div>

            {/* Notes container */}
            <div style={{ maxHeight: '650px', overflowY: 'auto' }}>

                {
                    notesArr.map((note) => {
                        const {
                            noteId,
                            noteTitle,
                            noteDescription,
                            noteLastDateModified,
                            noteLastTimeModified
                        } = note;

                        return (
                            <div onClick={() => {
                                dispatch(selectNote(noteId))
                            }}
                                data-id={noteId}
                                key={noteId} // p-[2px] hover:bg-gray-300
                                className={currentActiveNote.noteId === noteId ? 'p-[2px] bg-blue-500' : 'p-[2px] hover:bg-gray-300'}>
                                <div className="flex justify-between m-[15px]">
                                    <div>
                                        <h3 className={currentActiveNote.noteId === noteId ? 'text-[20px] text-white font-bold' : 'text-[20px] font-bold'}>{noteTitle}</h3>
                                        <p className={currentActiveNote.noteId === noteId && 'text-white'}>
                                            {noteDescription.length > 25 ? `${noteDescription.slice(0, 25)}...` : noteDescription}
                                        </p>
                                        <p className={currentActiveNote.noteId === noteId ? 'text-[12px] mt-1 text-white' : 'text-[12px] mt-1'}>Last Modified : {noteLastDateModified}, {noteLastTimeModified}</p>
                                    </div>
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(deleteNote(noteId))
                                    }} className="text-red-700">Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </aside>
    )
}

export default Aside;