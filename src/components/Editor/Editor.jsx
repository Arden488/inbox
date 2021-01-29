import { firestore } from "../../firestore";
import { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor({ entry, onSave }) {
    const [docTitle, setDocTitle] = useState("")
    const [value, setValue] = useState('');

    useEffect(() => {
        console.log(entry)
        // editor.isReady.then(() => {
            if (entry !== null) {
                console.log(entry)
                // editor.blocks.render({ blocks: entry.content })
                setDocTitle(entry.title)
                setValue(entry.content)
            }
        // });
    }, [entry])

    const handleNewItem = () => {
        // editor.blocks.clear()
        // setDocTitle("")
    }

    
    function saveData() {
        onSave({
            id: entry.id,
            title: docTitle,
            data: value
        })
    }

    return (
        <div>
            <button onClick={handleNewItem}>Add new item</button>
            <input type="text" name="doctitle" value={docTitle} onChange={e => setDocTitle(e.target.value)} placeholder="Enter the document's title" />
            <ReactQuill value={value} onChange={setValue}/>
            <button
                className="ce-example__button"
                id="saveButton"
                onClick={saveData}
            >
                editor.save()
            </button>
        </div>
    );
}

export default Editor;
