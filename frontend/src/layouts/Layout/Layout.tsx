import style from './layout.module.scss'

const Layout: React.FC = ({ children }) => {
  return <main className={style.layout}>{children}</main>
}

export default Layout
