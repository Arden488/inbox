import { firestore } from "../../firestore";
import { useState, useEffect } from "react";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Delimiter from "@editorjs/delimiter";
import List from "@editorjs/list";
import AttachesTool from "@editorjs/attaches";
import LinkTool from "@editorjs/link";
// import ImageTool from "@editorjs/image";
import SimpleImage from "@editorjs/simple-image";
import Underline from "@editorjs/underline";
import Paragraph from "editorjs-paragraph-with-alignment";

let editor = null;

function Editor({ entry, onCreate }) {
    const [docTitle, setDocTitle] = useState("")

    console.log(onCreate)

    if (editor === null) {
        editor = new EditorJS({
            holder: "editorjs",
            placeholder: "Type something...",
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: true,
                },
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                },
                delimiter: Delimiter,
                list: {
                    class: List,
                    inlineToolbar: true,
                },
                // image: {
                //     class: ImageTool,
                //     config: {
                //         endpoints: {
                //             byFile: "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
                //             byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
                //         },
                //     },
                // },
                image: SimpleImage,
                linkTool: {
                    class: LinkTool,
                    config: {
                        endpoint: "http://localhost:8008/fetchUrl", // Your backend endpoint for url data fetching
                    },
                },
                attaches: {
                    class: AttachesTool,
                    config: {
                        endpoint: "http://localhost:8008/uploadFile",
                    },
                },
                underline: Underline,
            },
        });
    }

    useEffect(() => {
        editor.isReady.then(() => {
            // console.log(entry)
            if (entry !== null) {
                editor.blocks.render({ blocks: entry.content })
                setDocTitle(entry.title)
            }
        });
    }, [entry])

    const handleNewItem = () => {
        editor.blocks.clear()
        setDocTitle("")
    }

    
    function saveData() {
        editor.isReady.then(() => {
            editor.save().then(async (savedData) => {
                console.log('editor.save()')

                onCreate({
                    title: docTitle,
                    data: savedData
                })

                editor.blocks.clear();
                setDocTitle("");
            });
        });
    }

    return (
        <div>
            <button onClick={handleNewItem}>Add new item</button>
            <input type="text" name="doctitle" value={docTitle} onChange={e => setDocTitle(e.target.value)} placeholder="Enter the document's title" />
            <div className="editor-js-wrapper" id="editorjs" />
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
