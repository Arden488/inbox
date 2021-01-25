import { firestore } from "../../firestore";

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

import { collectIdsAndDocs } from "../../utilities";

const editor = new EditorJS({
    holder: "editorjs",
    data: {
        blocks: [
            {
                type: "header",
                data: {
                    text: "Editor.js",
                    level: 2,
                },
            },
            {
                type: "paragraph",
                data: {
                    text:
                        "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.",
                },
            },
        ],
    },
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

function saveData() {
    editor.isReady.then(() => {
        editor.save().then(async (savedData) => {
            const docRef = await firestore.collection('entries').add({
                content: savedData.blocks
            })
            const doc = await docRef.get()

            const newPost = collectIdsAndDocs(doc)

            console.log(newPost)
        });
    });
}

function Editor() {
    return (
        <div>
            <div className="editor-js-wrapper" id="editorjs"></div>
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
