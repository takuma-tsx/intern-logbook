'use client'

import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeHighlight from "rehype-highlight"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Entry = {
  id: string
  date: string
  updatedAt?: string
  content: string
  tags?: string[]
}

export default function EntryCard({ entry }: { entry: Entry }) {
  const router = useRouter()
  const [showFull, setShowFull] = useState(false)

  const handleDelete = () => {
    const confirmDelete = confirm("本当に削除しますか？")
    if (!confirmDelete) return

    const saved: Entry[] = JSON.parse(localStorage.getItem('entries') || '[]')
    const updated = saved.filter((e) => e.id !== entry.id)
    localStorage.setItem('entries', JSON.stringify(updated))
    router.refresh()
  }

  const contentToDisplay = showFull
    ? entry.content
    : entry.content.length > 200
      ? entry.content.slice(0, 200) + '...'
      : entry.content

  return (
    <div className="border rounded p-4 bg-white shadow print-card">
      <div className="flex justify-end text-xs text-gray-500 space-x-4 mb-2">
        <span>🕒 作成: {new Date(entry.date).toLocaleString()}</span>
        {entry.updatedAt && (
          <span>✏️ 編集: {new Date(entry.updatedAt).toLocaleString()}</span>
        )}
      </div>

      <div className="prose prose-sm max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
        >
          {contentToDisplay}
        </ReactMarkdown>
      </div>

      {!showFull && entry.content.length > 200 && (
        <button
          onClick={() => setShowFull(true)}
          className="mt-2 text-xs text-blue-600 hover:underline print:hidden"
        >
          ...続きを読む
        </button>
      )}

      {entry.tags && entry.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <Link
              key={tag}
              href={`/?tag=${encodeURIComponent(tag)}`}
              className="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded hover:bg-gray-300"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-4 text-right space-x-4 print:hidden">
        <Link
          href={`/edit/${entry.id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          編集する
        </Link>
        <button
          onClick={handleDelete}
          className="text-sm text-red-500 hover:underline"
        >
          削除
        </button>
      </div>
    </div>
  )
}
