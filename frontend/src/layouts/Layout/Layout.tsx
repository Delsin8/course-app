import style from './layout.module.scss'

interface layout {
  big?: boolean
  children?: React.ReactNode
}

const Layout: React.FC<layout> = ({ children, big }) => {
  return (
    <main className={`${style.layout} ${big ? style.big : ''}`}>
      {children}
    </main>
  )
}

export default Layout
