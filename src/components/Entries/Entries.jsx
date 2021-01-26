function Entries({ entries }) {
    console.log(entries)
    return <div>
        <h1>All entries</h1>
        <ul>
            {entries.map(entry =>
                <li key={entry.id}>
                    <a href="">
                        {entry.title || "Untitled"}
                    </a>
                </li>
            )}
        </ul>
    </div>
}

export default Entries;