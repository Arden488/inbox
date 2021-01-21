function Entries({ entries }) {
    return <div>
        <h1>All entries</h1>
        <ul>
            {entries.map(entry => <li key={ entry.id }><a href="">{ entry.content }</a></li>)}
        </ul>
    </div>
}

export default Entries;