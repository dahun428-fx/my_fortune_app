type Props = {
    onClick: () => void
    disabled: boolean
    loading: boolean
  }
  
  export default function FortuneButton({ onClick, disabled, loading }: Props) {
    return (
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-300">
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-full py-3 rounded-full bg-pink-200 text-gray-700 font-medium shadow-md hover:bg-pink-300 transition disabled:opacity-50"
        >
          {loading ? '점 보는 중...' : '운세 보기'}
        </button>
      </div>
    )
  }
  