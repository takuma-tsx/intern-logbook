'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import EntryCard from '../components/EntryCard'

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
    // 日付が新しい順に並び替え
    const sorted = saved.sort(
      (a: Entry, b: Entry) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    setEntries(sorted)
  }, [])

  const allTags = Array.from(
    new Set(entries.flatMap((entry) => entry.tags || []))
  )

  const filteredEntries = entries.filter((entry) => {
    const matchesTag =
      selectedTag === null || entry.tags?.includes(selectedTag)
    const matchesSearch =
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
    return matchesTag && matchesSearch
  })

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📘 Intern Logbook</h1>
      <p className="mb-4 text-gray-500 text-sm">気づきや学びを記録しよう。</p>

      <Link
        href="/new"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        + 新しいエントリを追加
      </Link>

      <input
        type="text"
        placeholder="キーワードで検索"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-4 w-full border px-3 py-2 rounded text-sm"
      />

      {allTags.length > 0 && (
        <div className="mt-4 mb-4 flex flex-wrap gap-2">
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
