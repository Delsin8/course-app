import style from './formElement.module.scss'

interface formElement {
  name: string
  placeholder: string
}

const FormElement: React.FC<formElement> = ({ name, placeholder }) => {
  return (
    <div className={style.wrapper}>
      <input
        className={style.formElement}
        name={name}
        placeholder={placeholder}
      />
    </div>
  )
}

export default FormElement
