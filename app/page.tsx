import Link from "next/link"

export default function Home() {
  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📘 Intern Logbook</h1>
      <p className="mb-4 text-gray-500 text-sm">
        インターンや開発での「気づき・学び・反省」を記録しよう。
      </p>

      <Link href="/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        + 新しいエントリを追加
      </Link>

      <div className="mt-8">
        {/* EntryCardをここに追加予定 */}
        <p className="text-gray-400">まだ記録がありません。</p>
      </div>
    </main>
  )
}
