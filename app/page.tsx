'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import EntryCard from '../components/EntryCard'
import { saveAs } from 'file-saver'

type Entry = {
  id: string
  date: string
  content: string
  updatedAt?: string
  tags?: string[]
}

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('entries') || '[]')
    const sorted = saved.sort(
      (a: Entry, b: Entry) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    setEntries(sorted)
  }, [])

  const allTags = Array.from(
    new Set(entries.flatMap((entry) => entry.tags || []))
  )

  const filteredEntries = entries.filter((entry) => {
    const matchesTag = selectedTag === null || entry.tags?.includes(selectedTag)
    const matchesSearch =
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesTag && matchesSearch
  })

  const exportCSV = () => {
    const csvHeader = 'ID,作成日,編集日,内容,タグ\n'
    const csvBody = entries
      .map((entry) =>
        [
          entry.id,
          entry.date,
          entry.updatedAt || '',
          `"${entry.content.replace(/"/g, '""')}"`,
          (entry.tags || []).join('|'),
        ].join(',')
      )
      .join('\n')
    const blob = new Blob([csvHeader + csvBody], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'intern-logbook.csv')
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📘 Intern Logbook</h1>
      <p className="mb-4 text-gray-500 text-sm">気づきや学びを記録しよう。</p>

      {/* 非表示: 編集・エクスポートボタン */}
      <div className="flex gap-2 flex-wrap mb-4 print:hidden">
        <Link
          href="/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + 新しいエントリを追加
        </Link>
        <button
          onClick={exportCSV}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          📤 CSVエクスポート
        </button>
      </div>

      {/* 非表示: 検索フィールド */}
      <input
        type="text"
        placeholder="キーワードで検索"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border px-3 py-2 rounded text-sm mb-4 print:hidden"
      />

      {/* 非表示: タグフィルタ */}
      {allTags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2 print:hidden">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 rounded border ${
              selectedTag === null
                ? 'bg-blue-600 text-white'
                : 'text-blue-600 border-blue-600'
            }`}
          >
            すべて表示
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded border ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-600 border-blue-600'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <p className="text-gray-400">該当するエントリはありません。</p>
        ) : (
          filteredEntries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))
        )}
      </div>
    </main>
  )
}
