import { useEffect, useState } from "react";
import { firestore } from "./firestore";

import Entries from "./components/Entries/Entries";
import Editor from "./components/Editor/Editor";

import "./App.css";

function App() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        async function fetchEntries() {
            const snapshot = await firestore.collection("entries").get();

            const entries = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });

            setEntries(entries);
        }
        fetchEntries();
    });

    return (
        <div className="App">
            <Entries entries={entries} />
            <Editor />
        </div>
    );
}

export default App;
