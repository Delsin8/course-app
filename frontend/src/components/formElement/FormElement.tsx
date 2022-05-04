import style from './formElement.module.scss'

interface formElement {
  name: string
  placeholder: string
  onChange: any
}

const FormElement: React.FC<formElement> = ({
  name,
  placeholder,
  onChange,
}) => {
  return (
    <div className={style.wrapper}>
      <input
        className={style.formElement}
        name={name}
        placeholder={placeholder}
        defaultValue=""
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}

export default FormElement
