import { WordEntry, dictionary } from './dictionary'

export function lookupWord(word: string): WordEntry | undefined {
  const lower = word.toLowerCase()
  return dictionary.find(entry => entry.word.toLowerCase() === lower)
}

export function searchBySynonym(synonym: string): WordEntry[] {
  const lower = synonym.toLowerCase()
  return dictionary.filter(entry =>
    entry.synonyms.some(syn => syn.toLowerCase().includes(lower))
  )
}
