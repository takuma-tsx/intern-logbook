'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import EntryCard from "../components/EntryCard" // ← これを追加！

type Entry = {
  id: string
  date: string
  content: string
}

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('entries') || '[]')
    setEntries(saved)
  }, [])

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📘 Intern Logbook</h1>
      <p className="mb-4 text-gray-500 text-sm">
        気づきや学びを記録しよう。
      </p>

      <Link href="/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        + 新しいエントリを追加
      </Link>

      <div className="mt-8 space-y-4">
        {entries.length === 0 ? (
          <p className="text-gray-400">まだ記録がありません。</p>
        ) : (
          entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))
        )}
      </div>
    </main>
  )
}
