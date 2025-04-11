type Props = {
    selected: string
    onSelect: (value: string) => void
  }
  
  const OPTIONS = ['연애운', '금전운', '건강운', '직장운', '오늘의 한 줄 운세']
  
  export default function FortuneOptions({ selected, onSelect }: Props) {
    return (
      <div className="w-full space-y-2">
        <p className="text-sm text-gray-600">궁금한 운세를 선택하세요</p>
        <div className="w-full flex flex-col gap-2">
          {OPTIONS.map((option) => (
            <label
              key={option}
              className={`flex items-center space-x-2 px-4 py-3 w-full rounded-xl border cursor-pointer transition
                ${
                  selected === option
                    ? 'bg-pink-100 border-pink-400'
                    : 'bg-white border-gray-200'
                }`}
            >
              <input
                type="radio"
                name="fortune"
                value={option}
                checked={selected === option}
                onChange={() => onSelect(option)}
                className="accent-pink-500"
              />
              <span className="text-gray-800">{option}</span>
            </label>
          ))}
        </div>
      </div>
    )
  }
  