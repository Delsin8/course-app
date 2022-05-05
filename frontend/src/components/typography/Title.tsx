import style from './typography.module.scss'

interface TitleOptions {
  centered?: boolean
  noMarginBottom?: boolean
  noMarginTop?: boolean
  children?: React.ReactNode
}

const Title: React.FC<TitleOptions> = ({
  children,
  centered,
  noMarginBottom,
  noMarginTop,
}) => {
  const classes = `${centered ? style.centered : ''} ${
    noMarginBottom ? style.noMarginBottom : ''
  } ${noMarginTop ? style.noMarginTop : ''}`
  return <h2 className={classes}>{children}</h2>
}

export default Title
