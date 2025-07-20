'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import EntryCard from "../components/EntryCard"

type Entry = {
  id: string
  date: string
  content: string
  updatedAt?: string
  tags?: string[]
}

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([])
  const searchParams = useSearchParams()
  const selectedTag = searchParams.get('tag')

  useEffect(() => {
    const saved: Entry[] = JSON.parse(localStorage.getItem('entries') || '[]')
    if (selectedTag) {
      setEntries(saved.filter(entry => entry.tags?.includes(selectedTag)))
    } else {
      setEntries(saved)
    }
  }, [selectedTag])

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📘 Intern Logbook</h1>
      <p className="mb-4 text-gray-500 text-sm">
        気づきや学びを記録しよう。
      </p>

      <Link href="/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        + 新しいエントリを追加
      </Link>

      {selectedTag && (
        <div className="mt-4 text-sm text-gray-600">
          フィルター中のタグ：<span className="font-semibold">#{selectedTag}</span>{' '}
          <Link href="/" className="ml-2 text-blue-600 hover:underline">すべて表示</Link>
        </div>
      )}

      <div className="mt-8 space-y-4">
        {entries.length === 0 ? (
          <p className="text-gray-400">該当する記録がありません。</p>
        ) : (
          entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))
        )}
      </div>
    </main>
  )
}
