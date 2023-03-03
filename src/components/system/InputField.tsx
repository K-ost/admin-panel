import { useRef } from "react"

interface IntInputField {
  label?: string
  placeholder: string
  value?: string
  error?: boolean
  type?: string
  handler: (value: string) => void
  clean?: boolean
}

const InputField: React.FC<IntInputField> = ({ clean, error, handler, label, placeholder, type, value }) => {
  const ref = useRef<HTMLInputElement>(null)
  const reftext = useRef<HTMLTextAreaElement>(null)

  if (clean) {
    ref.current!.value = ''
    reftext.current!.value = ''
  }

  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}

      {type !== 'area' &&
        <input
          type={type ? type : 'text'}
          className={error ? 'form-control error' : 'form-control'}
          placeholder={placeholder}
          onChange={e => handler(e.target.value)}
          defaultValue={value}
          ref={ref}
        />
      }
      
      {type === 'area' &&
        <textarea
          className={error ? 'form-control error' : 'form-control'}
          placeholder={placeholder}
          onChange={e => handler(e.target.value)}
          defaultValue={value}
          ref={reftext}
        ></textarea>
      }

      {error && <div className="invalid-message">This field should not be empty.</div>}
    </div>
  )
}

export default InputField