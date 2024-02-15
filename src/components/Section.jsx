import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateNoteTitleReducer, updateNoteDescriptionReducer } from "../redux/notesSlice";
import Markdown from "react-markdown";

const Section = () => {
    const dispatch = useDispatch();
    const notesArr = useSelector((state) => state.notes.notesArr);
    const currentActiveNote = useSelector((state) => state.notes.currentActiveNote);

    const [currentActiveNoteInformation, setCurrentActiveNoteInformation] = useState();

    useEffect(() => {
        setCurrentActiveNoteInformation(currentActiveNote)
    }, [currentActiveNote])

    const updateNoteTitle = (e) => {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');

        const updatedNoteTitle = {
            ...currentActiveNoteInformation,
            noteTitle: e.target.value,
            noteLastDateModified: `${month}/${day}/${year}`,
            noteLastTimeModified: `${hours}:${minutes}:${seconds}`
        };

        setCurrentActiveNoteInformation(updatedNoteTitle);
        dispatch(updateNoteTitleReducer(updatedNoteTitle));
    }

    const updateNoteDescription = (e) => {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');

        const updatedNoteDescription = {
            ...currentActiveNoteInformation,
            noteDescription: e.target.value,
            noteLastDateModified: `${month}/${day}/${year}`,
            noteLastTimeModified: `${hours}:${minutes}:${seconds}`
        };

        setCurrentActiveNoteInformation(updatedNoteDescription);
        dispatch(updateNoteDescriptionReducer(updatedNoteDescription));
    }

    return (
        <section className="flex-1">
            {
                notesArr.length > 0
                    ?
                    currentActiveNote.noteId === 0
                        ?
                        <div className="flex items-center justify-center h-screen">
                            <h2 className="text-[27px] text-gray-500">Choose a Note</h2>
                        </div>
                        :
                        <div className="flex flex-col h-screen">
                            <div className="p-[15px]">
                                <input
                                    value={currentActiveNoteInformation.noteTitle}
                                    onChange={updateNoteTitle}
                                    type="text" placeholder="Title" id="default-input"
                                    className="mb-3 text-[30px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />

                                <textarea
                                    value={currentActiveNoteInformation.noteDescription}
                                    onChange={updateNoteDescription}
                                    id="message"
                                    rows="15"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your notes here...">
                                </textarea>
                            </div>

                            <div className="flex-1 bg-gray-200">
                                <div className="p-[17px]" style={{ maxHeight: '320px', overflowY: 'auto' }}>
                                    <Markdown className="mb-2 font-bold text-[28px]">{`# ${currentActiveNoteInformation.noteTitle}`}</Markdown>
                                    <Markdown>{currentActiveNoteInformation.noteDescription}</Markdown>
                                </div>
                            </div>

                        </div>
                    :
                    <div className="flex items-center justify-center h-screen">
                        <h2 className="text-[27px] text-gray-500">No Available Note</h2>
                    </div>
            }
        </section>
    )
}

export default Section;
