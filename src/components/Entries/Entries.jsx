function Entries({ entries, onOpen, onRemove }) {
    return <div>
        <h2>All entries</h2>
        {entries.map(entry => {
            let date = 'Unknown date'
            const seconds = entry.datetime?.seconds
            if (seconds) date = new Date(seconds * 1000)

            return (
                <div key={entry.id} className="entries__item">
                    <button className="entries__item-link">
                        {entry.title || "Untitled"}
                        <span className="entries__item-date">{date.toLocaleString()}</span>
                    </button>
                    <button onClick={() => onOpen(entry.id)}>Open</button>
                    <button onClick={() => onRemove(entry.id)}>Remove</button>
                </div>
            )
        })}
    </div>
}

export default Entries;