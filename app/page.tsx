'use client'

import { useState } from 'react'
import { lookupWord, searchBySynonym } from '@/lib/lookup'

export default function Home() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    let found = lookupWord(query)
    if (!found) {
      const fuzzy = searchBySynonym(query)
      if (fuzzy.length > 0) {
        setResult({ type: 'fuzzy', words: fuzzy })
        setError('')
        return
      }
    }

    if (found) {
      setResult({ type: 'exact', word: found })
      setError('')
    } else {
      setResult(null)
      setError('没找到相关线索，试试其他词？')
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-2 text-center">Strong Inclination</h1>
      <p className="text-gray-400 text-center mb-8">Crossword Clue Lookup — 输入单词，查找填字游戏线索</p>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入单词，如 DRIVE..."
            className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            查找
          </button>
        </div>
      </form>

      {error && (
        <div className="text-center text-red-400 mb-8">{error}</div>
      )}

      {result?.type === 'exact' && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="mb-4">
            <span className="text-3xl font-bold text-blue-400">{result.word.word}</span>
            <span className="ml-3 text-gray-500">{result.word.pos}</span>
          </div>
          <p className="text-gray-300 mb-6">{result.word.definition}</p>

          <h3 className="text-lg font-semibold text-white mb-3">可用线索：</h3>
          <div className="space-y-2">
            {result.word.clues.map((clue: string, i: number) => (
              <div
                key={i}
                className="flex items-center justify-between bg-gray-700 px-4 py-2 rounded cursor-pointer hover:bg-gray-600 transition"
                onClick={() => copyToClipboard(clue)}
              >
                <span>{clue}</span>
                <button className="text-gray-400 hover:text-white">📋</button>
              </div>
            ))}
          </div>

          {result.word.synonyms.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-2">同义词：</h3>
              <div className="flex flex-wrap gap-2">
                {result.word.synonyms.map((syn: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-gray-600 text-gray-200 rounded-full text-sm">{syn}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {result?.type === 'fuzzy' && (
        <div>
          <p className="text-yellow-400 mb-4">没找到精确匹配，以下是相关结果：</p>
          <div className="space-y-4">
            {result.words.map((word: any, i: number) => (
              <div key={i} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                <div className="mb-2">
                  <span className="text-2xl font-bold text-blue-400">{word.word}</span>
                  <span className="ml-2 text-gray-500">{word.pos}</span>
                </div>
                <p className="text-gray-400 text-sm mb-2">{word.definition}</p>
                <div className="text-sm text-gray-300">线索: {word.clues[0]}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
