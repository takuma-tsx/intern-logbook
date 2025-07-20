'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

type Entry = {
  id: string
  date: string
  content: string
  updatedAt?: string
  tags?: string[]
}

export default function EditEntryPage() {
  const { id } = useParams()
  const router = useRouter()

  const [entry, setEntry] = useState<Entry | null>(null)
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')

  useEffect(() => {
    const saved: Entry[] = JSON.parse(localStorage.getItem('entries') || '[]')
    const found = saved.find((e) => e.id === id)
    if (found) {
      setEntry(found)
      setContent(found.content)
      setTags(found.tags?.join(', ') || '')
    }
  }, [id])

  const handleSave = () => {
    if (!entry) return
    const updatedEntry: Entry = {
      ...entry,
      content,
      updatedAt: new Date().toISOString(),
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ''),
    }

    const saved: Entry[] = JSON.parse(localStorage.getItem('entries') || '[]')
    const updated = saved.map((e) => (e.id === entry.id ? updatedEntry : e))
    localStorage.setItem('entries', JSON.stringify(updated))
    router.push('/')
  }

  if (!entry) return <p className="p-4">読み込み中...</p>

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">✏️ エントリを編集</h2>
      <textarea
        className="w-full border p-2 rounded min-h-[150px]"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        placeholder="カンマ区切りでタグ入力（例: React,学び）"
        className="w-full border p-2 rounded mt-4"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button
        onClick={handleSave}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        保存して戻る
      </button>
    </main>
  )
}
