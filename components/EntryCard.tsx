import ReactMarkdown from "react-markdown"
import Link from "next/link"

type Entry = {
  id: string
  date: string
  updatedAt?: string
  content: string
}

export default function EntryCard({ entry }: { entry: Entry }) {
  const created = new Date(entry.date).toLocaleString()
  const updated = entry.updatedAt ? new Date(entry.updatedAt).toLocaleString() : null

  // 本文100文字制限（改行・Markdownタグは無視）
  const plainText = entry.content.replace(/[#>*_`~\-]/g, "").replace(/\n/g, "")
  const summary = plainText.length > 100 ? plainText.slice(0, 100) + "..." : plainText

  return (
    <div className="border rounded p-4 bg-white shadow">
      <div className="flex justify-end text-sm text-gray-400 mb-2 gap-4">
        <span>🕒 作成: {created}</span>
        {updated && <span>✏️ 編集: {updated}</span>}
      </div>
      <div className="prose prose-sm text-gray-800">{summary}</div>
      <div className="mt-4 text-right">
        <Link
          href={`/edit/${entry.id}`}
          className="text-blue-500 hover:underline text-sm"
        >
          編集する
        </Link>
      </div>
    </div>
  )
}
