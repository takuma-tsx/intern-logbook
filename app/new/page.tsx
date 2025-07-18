'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewEntryPage() {
  const [content, setContent] = useState('')
  const router = useRouter()

  const handleSubmit = () => {
    if (!content.trim()) return

    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content,
    }

    const existing = JSON.parse(localStorage.getItem('entries') || '[]')
    localStorage.setItem('entries', JSON.stringify([newEntry, ...existing]))
    router.push('/')
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">📝 新しいエントリ</h2>

      <textarea
        className="w-full border p-2 rounded min-h-[150px]"
        placeholder="今日の気づきや学びを記録しよう..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        保存して戻る
      </button>
    </main>
  )
}
