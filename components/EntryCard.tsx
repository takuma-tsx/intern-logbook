type Entry = {
  id: string
  date: string
  content: string
}

export default function EntryCard({ entry }: { entry: Entry }) {
  return (
    <div
      key={entry.id}
      className="border rounded p-4 bg-white shadow text-black"
    >
      <p className="text-sm text-gray-500 mb-2">
        {new Date(entry.date).toLocaleString()}
      </p>
      <p className="whitespace-pre-wrap !text-black">{entry.content}</p>
    </div>
  )
}
