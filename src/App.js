import { useEffect, useState } from "react";
import { firestore } from "./firestore";

import Entries from "./components/Entries/Entries";
import Editor from "./components/Editor/Editor";

import { collectIdsAndDocs } from "./utilities";

import "./App.css";

function App() {
    const [entries, setEntries] = useState([]);
    // const [isEditing, setIsEditing] = useState(true);
    const [activeEntry, setActiveEntry] = useState(null);

    let unsubscribe = null;

    useEffect(() => {
        async function fetchEntries() {
            unsubscribe = firestore
                .collection("entries")
                .onSnapshot((snapshot) => {
                    const entries = snapshot.docs.map(collectIdsAndDocs);
                    setEntries(entries);
                });
            // const snapshot = await firestore.collection("entries").get();
            // const entries = snapshot.docs.map(collectIdsAndDocs);

            // setEntries(entries);
        }
        fetchEntries();

        return () => {
            unsubscribe();
        };
    }, []);

    async function handleRemove(id) {
        const allEntries = entries;

        firestore.doc(`entries/${id}`).delete();
    }

    async function handleOpen(id) {
        const doc = await firestore.doc(`entries/${id}`).get();

        // setIsEditing(true)
        setActiveEntry(doc.data());
    }

    function handleCreate(newItem) {
        console.log(newItem);
        firestore.collection("entries").add({
            title: newItem.title,
            datetime: new Date(),
            content: newItem.data.blocks,
        });
        setActiveEntry(null);
    }

    return (
        <div className="App">
            <main>
                <div>
                    {entries && (
                        <Entries
                            entries={entries}
                            onOpen={handleOpen}
                            onRemove={handleRemove}
                        />
                    )}
                </div>
                <div>
                    <Editor onCreate={handleCreate} entry={activeEntry} />
                </div>
            </main>
        </div>
    );
}

export default App;
