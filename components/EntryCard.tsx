'use client'

import Link from "next/link"
import ReactMarkdown from "react-markdown"

type Entry = {
  id: string
  date: string
  content: string
  updatedAt?: string
}

export default function EntryCard({ entry }: { entry: Entry }) {
  return (
    <div className="border rounded p-4 bg-white shadow">
      <div className="text-sm text-gray-500 flex justify-end space-x-4 mb-2">
        <span>🕒 作成: {new Date(entry.date).toLocaleString()}</span>
        {entry.updatedAt && (
          <span>✏️ 編集: {new Date(entry.updatedAt).toLocaleString()}</span>
        )}
      </div>
    <div className="prose prose-sm">
    <ReactMarkdown>{entry.content}</ReactMarkdown>
    </div>
      <div className="mt-4 text-right">
        <Link
          href={`/edit/${entry.id}`}
          className="text-blue-600 text-sm hover:underline"
        >
          編集する
        </Link>
      </div>
    </div>
  )
}
