import style from './typography.module.scss'

interface TitleOptions {
  centered?: boolean
  noMarginBottom?: boolean
  noMarginTop?: boolean
  big?: boolean
  children?: React.ReactNode
}

const Title: React.FC<TitleOptions> = ({
  children,
  centered,
  noMarginBottom,
  noMarginTop,
  big,
}) => {
  const classes = `${centered ? style.centered : ''} ${
    noMarginBottom ? style.noMarginBottom : ''
  } ${noMarginTop ? style.noMarginTop : ''}
  ${big ? style.big : ''}`
  return <h2 className={classes}>{children}</h2>
}

export default Title
