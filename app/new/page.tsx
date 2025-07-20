'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

type Entry = {
  id: string
  date: string
  content: string
  updatedAt?: string
  tags?: string[]
}

export default function NewEntryPage() {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')

  const handleSave = () => {
    const saved: Entry[] = JSON.parse(localStorage.getItem('entries') || '[]')
    const now = new Date().toISOString()
    const id = uuidv4()

    const newEntry: Entry = {
      id,
      date: now,
      content,
      updatedAt: now,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ''),
    }

    localStorage.setItem('entries', JSON.stringify([newEntry, ...saved]))
    router.push('/')
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">📝 新規エントリ</h2>
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
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        保存して戻る
      </button>
    </main>
  )
}
