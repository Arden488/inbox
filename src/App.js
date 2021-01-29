import { useEffect, useState } from "react";
import { firestore, auth, signInWithGoogle, signOut } from "./firestore";

import Entries from "./components/Entries/Entries";
import Editor from "./components/Editor/Editor";

import { collectIdsAndDocs } from "./utilities";

import "./App.css";

function App() {
    const [entries, setEntries] = useState([]);
    // const [isEditing, setIsEditing] = useState(true);
    const [activeEntry, setActiveEntry] = useState(null);
    const [user, setUser] = useState(null);

    let unsubscribeFromFirestore = null;
    let unsubscribeFromAuth = null;

    useEffect(() => {
        async function fetchEntries() {
            unsubscribeFromFirestore = firestore
                .collection("entries")
                .onSnapshot((snapshot) => {
                    const entries = snapshot.docs.map(collectIdsAndDocs);
                    setEntries(entries);
                });

            unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
                setUser(user);
                console.log(user);
            });
        }
        fetchEntries();

        return () => {
            unsubscribeFromFirestore();
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
            <header>
                {user ? (
                    <div>
                        <figure
                            style={{
                                width: "100px",
                                height: "100px",
                                textAlign: "center",
                            }}
                        >
                            <img src={user.photoURL} alt={user.displayName} />
                            <figcaption>{user.displayName}</figcaption>
                        </figure>
                        <button onClick={signOut}>Sign out</button>
                    </div>
                ) : (
                    <button onClick={signInWithGoogle}>
                        Sign in with Google
                    </button>
                )}
            </header>
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
