function Entries({ entries }) {
    return <div>
        <h2>All entries</h2>
        {entries.map(entry => {
            let date = 'Unknown date'
            const seconds = entry.datetime?.seconds
            if (seconds) date = new Date(seconds * 1000)

            return <a href="javascript:void(0)" className="entries__item" key={entry.id}>
                    {entry.title || "Untitled"}
                    <span className="entries__item-date">{date.toLocaleString()}</span>
                </a>
        })}
    </div>
}

export default Entries;