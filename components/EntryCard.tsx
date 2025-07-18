import Link from "next/link"

type Entry = {
  id: string
  date: string
  content: string
  updatedAt?: string
}

export default function EntryCard({ entry }: { entry: Entry }) {
  return (
    <div className="border rounded p-4 bg-white shadow">
      <div className="flex flex-wrap gap-x-6 text-sm text-gray-500 mb-2">
        <p>🕒 作成日時: {new Date(entry.date).toLocaleString()}</p>
        {entry.updatedAt && (
          <p className="text-gray-400">✏️ 編集日時: {new Date(entry.updatedAt).toLocaleString()}</p>
        )}
      </div>
      <p className="mb-2">{entry.content}</p>
      <Link
        href={`/edit/${entry.id}`}
        className="text-blue-600 hover:underline text-sm"
      >
        編集する
      </Link>
    </div>
  )
}
