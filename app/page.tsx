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
  const [filterDate, setFilterDate] = useState('')

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('entries') || '[]')
    setEntries(saved)
  }, [])

  const visibleEntries = filterDate
    ? entries.filter((e) => e.date.startsWith(filterDate))
    : entries

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📘 Intern Logbook</h1>
      <p className="mb-4 text-gray-500 text-sm">
        気づきや学びを記録しよう。
      </p>

      <Link href="/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        + 新しいエントリを追加
      </Link>

      <div className="my-4">
        <input
          type="date"
          className="border rounded p-2"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        {filterDate && (
          <button
            onClick={() => setFilterDate('')}
            className="ml-2 text-blue-600 underline text-sm"
          >
            絞り込みをクリア
          </button>
        )}
      </div>

      <div className="mt-8 space-y-4">
        {visibleEntries.length === 0 ? (
          <p className="text-gray-400">表示できる記録がありません。</p>
        ) : (
          visibleEntries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))
        )}
      </div>
    </main>
  )
}
