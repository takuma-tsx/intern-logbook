'use client'

import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { useRouter } from "next/navigation"

type Entry = {
  id: string
  date: string
  content: string
  updatedAt?: string
  tags?: string[]
}

type Props = {
  entry: Entry
}

export default function EntryCard({ entry }: Props) {
  const router = useRouter()

  const created = new Date(entry.date).toLocaleString('ja-JP', { hour12: false })
  const updated = entry.updatedAt
    ? new Date(entry.updatedAt).toLocaleString('ja-JP', { hour12: false })
    : null

  const handleDelete = () => {
    const confirmed = window.confirm('このエントリを削除してもよいですか？')
    if (!confirmed) return

    const saved = JSON.parse(localStorage.getItem('entries') || '[]') as Entry[]
    const updatedEntries = saved.filter((e) => e.id !== entry.id)
    localStorage.setItem('entries', JSON.stringify(updatedEntries))
    router.refresh()
  }

  return (
    <div className="border rounded p-4 bg-white shadow">
      <div className="flex justify-end gap-4 text-xs text-gray-500 mb-2">
        <span>🕒 作成: {created}</span>
        {updated && <span>✏️ 編集: {updated}</span>}
      </div>

      <div className="prose prose-sm line-clamp-5">
        <ReactMarkdown>
          {entry.content.length > 100
            ? entry.content.slice(0, 100) + '...'
            : entry.content}
        </ReactMarkdown>
      </div>

      {entry.tags && entry.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {entry.tags.map((tag, idx) => (
            <span key={idx} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex justify-end space-x-4 text-sm">
        <Link
          href={`/edit/${entry.id}`}
          className="text-blue-600 hover:underline"
        >
          編集
        </Link>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:underline"
        >
          削除
        </button>
      </div>
    </div>
  )
}
