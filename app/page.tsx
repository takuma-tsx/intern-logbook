'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import EntryCard from "../components/EntryCard"

type Entry = {
  id: string
  date: string
  content: string
  updatedAt?: string
}

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    const saved: Entry[] = JSON.parse(localStorage.getItem('entries') || '[]')
    const sorted = saved.sort((a: Entry, b: Entry) => {
      const dateA = new Date(b.updatedAt || b.date).getTime()
      const dateB = new Date(a.updatedAt || a.date).getTime()
      return dateA - dateB
    })
    setEntries(sorted)
  }, [])

  const filteredEntries = entries.filter(entry =>
    entry.content.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📘 Intern Logbook</h1>
      <p className="mb-4 text-gray-500 text-sm">
        気づきや学びを記録しよう。
      </p>

      <Link href="/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded block w-fit mb-4">
        + 新しいエントリを追加
      </Link>

      <input
        type="text"
        placeholder="キーワードで検索"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-6"
      />

      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <p className="text-gray-400">該当する記録がありません。</p>
        ) : (
          filteredEntries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))
        )}
      </div>
    </main>
  )
}
