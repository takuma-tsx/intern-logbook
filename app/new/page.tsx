'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

type Entry = {
  id: string
  date: string
  updatedAt?: string
  content: string
  tags?: string[]
}

export default function NewEntry() {
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const router = useRouter()

  const handleSave = () => {
    if (content.trim().length < 50) {
      alert('内容は100文字以上入力してください。')
      return
    }

    const newEntry: Entry = {
      id: uuidv4(),
      date: new Date().toISOString(),
      content,
      tags: tags.split(',').map((tag) => tag.trim()).filter((tag) => tag !== ''),
    }

    const saved: Entry[] = JSON.parse(localStorage.getItem('entries') || '[]')
    saved.unshift(newEntry)
    localStorage.setItem('entries', JSON.stringify(saved))
    router.push('/')
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">新しいエントリ</h1>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="気づきや学びを記入..."
        className="w-full h-40 p-2 border rounded mb-4"
      />
      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="タグ（カンマ区切り）"
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleSave}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        保存
      </button>
    </main>
  )
}
