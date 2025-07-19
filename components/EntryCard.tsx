'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"

type Entry = {
  id: string
  date: string
  editedAt?: string
  content: string
}

export default function EntryCard({ entry }: { entry: Entry }) {
  const router = useRouter()

  const handleDelete = () => {
    if (!confirm("本当に削除しますか？")) return
    const saved: Entry[] = JSON.parse(localStorage.getItem('entries') || '[]')
    const updated = saved.filter((e) => e.id !== entry.id)
    localStorage.setItem('entries', JSON.stringify(updated))
    router.refresh()
  }

  return (
    <div className="border rounded p-4 bg-white shadow">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>🕒 作成日時: {new Date(entry.date).toLocaleString()}</span>
        {entry.editedAt && (
          <span>✏️ 編集日時: {new Date(entry.editedAt).toLocaleString()}</span>
        )}
      </div>
      <p className="mb-2">{entry.content}</p>
      <div className="flex gap-4">
        <Link
          href={`/edit/${entry.id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          編集する
        </Link>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:underline text-sm"
        >
          削除する
        </button>
      </div>
    </div>
  )
}
