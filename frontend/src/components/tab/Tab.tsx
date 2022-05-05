import { useState } from 'react'
import { tab as ITab } from '../../types'
import style from './tab.module.scss'

interface tab {
  tabs: ITab[]
  inactive?: boolean
}

const Tab: React.FC<tab> = ({ tabs, inactive }) => {
  const [currentTab, setCurrentTab] = useState<ITab>(tabs[0])

  const setTab = (tab: ITab) => {
    setCurrentTab(tab)
  }

  const isActive = (tab: ITab) => {
    if (currentTab == tab) {
      return style.active
    }
    return ''
  }
  // console.log(currentTab)
  return (
    <div className={`${style.wrapper} ${inactive ? style.inactive : ''}`}>
      <ul className={style.list}>
        {tabs.map(t => (
          <li key={t.name} className={isActive(t)} onClick={() => setTab(t)}>
            {t.name}
          </li>
        ))}
      </ul>
      <div className={style.output}>{currentTab && currentTab.content}</div>
    </div>
  )
}

export default Tab
