import { useEffect, useState } from "react";
import { firestore } from "./firestore";

import Entries from "./components/Entries/Entries";
import Editor from "./components/Editor/Editor";

import { collectIdsAndDocs } from "./utilities";

import "./App.css";

function App() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        async function fetchEntries() {
            const snapshot = await firestore.collection("entries").get();
            const entries = snapshot.docs.map(collectIdsAndDocs);

            setEntries(entries);
        }
        fetchEntries();
    }, []);

    return (
        <div className="App">
            {entries && <Entries entries={entries} />}
            <Editor />
        </div>
    );
}

export default App;
