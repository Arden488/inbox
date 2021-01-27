function Entries({ entries }) {
    return <div>
        <h2>All entries</h2>
        {entries.map(entry => {
            const date = new Date(entry.datetime * 1000)
            const hasDate = date && date != "Invalid Date"

            return <a href="javascript:void(0)" className="entries__item" key={entry.id}>
                    {entry.title || "Untitled"}
                    <span className="entries__item-date">{hasDate && date.toString()}</span>
                </a>
        })}
    </div>
}

export default Entries;