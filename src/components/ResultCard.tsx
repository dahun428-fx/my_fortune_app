type Props = {
  result: string
}

export default function ResultCard({ result }: Props) {
  if (!result) return null

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow text-sm text-gray-700 whitespace-pre-wrap">
      🔮 <strong className="font-medium">운세 결과</strong>
      <p className="mt-2">{result}</p>
    </div>
  )
}
