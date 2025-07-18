import Link from "next/link"

type Entry = {
  id: string
  date: string
  content: string
}

export default function EntryCard({ entry }: { entry: Entry }) {
  return (
    <div className="text-gray-900 border rounded p-4 bg-white shadow">
      <p className="text-sm text-gray-500 mb-2">
        {new Date(entry.date).toLocaleString()}
      </p>
      <p className="whitespace-pre-wrap mb-2">{entry.content}</p>
      <Link
        href={`/edit/${entry.id}`}
        className="text-blue-600 text-sm underline"
      >
        編集する
      </Link>
    </div>
  )
}
