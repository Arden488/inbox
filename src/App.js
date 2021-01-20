import firestore from "./firestore";

import Entries from "./components/Entries/Entries";
import Editor from "./components/Editor/Editor";

import "./App.css";

function App() {
    return (
        <div className="App">
            <Entries />
            <Editor />
        </div>
    );
}

export default App;
