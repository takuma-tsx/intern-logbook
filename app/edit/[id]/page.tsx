'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

type Entry = {
  id: string
  date: string
  updatedAt?: string
  content: string
  tags?: string[]
}

export default function EditEntry() {
  const [content, setContent] = useState('')
  const [entry, setEntry] = useState<Entry | null>(null)
  const [tags, setTags] = useState('')
  const router = useRouter()
  const params = useParams()
  const entryId = params?.id as string

  useEffect(() => {
    const saved: Entry[] = JSON.parse(localStorage.getItem('entries') || '[]')
    const target = saved.find((e) => e.id === entryId)
    if (target) {
      setEntry(target)
      setContent(target.content)
      setTags((target.tags || []).join(', '))
    }
  }, [entryId])

  const handleSave = () => {
    if (!entry) return

    if (content.trim().length < 100) {
      alert('内容は100文字以上入力してください。')
      return
    }

    const updatedEntry: Entry = {
      ...entry,
      content,
      updatedAt: new Date().toISOString(),
      tags: tags.split(',').map((tag) => tag.trim()).filter((tag) => tag !== ''),
    }

    const saved: Entry[] = JSON.parse(localStorage.getItem('entries') || '[]')
    const updated = saved.map((e) => (e.id === entry.id ? updatedEntry : e))
    localStorage.setItem('entries', JSON.stringify(updated))
    router.push('/')
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">エントリを編集</h1>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
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
