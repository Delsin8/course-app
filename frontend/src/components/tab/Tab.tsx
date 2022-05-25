import { useState } from 'react'
import { tab } from '../../types'
import style from './tab.module.scss'

interface Itab {
  tabs: tab[]
  inactive?: boolean
  type?: 'default' | 'list'
}

const Tab: React.FC<Itab> = ({ tabs, inactive, type }) => {
  const [currentTab, setCurrentTab] = useState<tab>(tabs[0])

  const setTab = (tab: tab) => {
    setCurrentTab(tab)
  }

  const isActive = (tab: tab) => {
    if (currentTab == tab) {
      if (type === 'list') return style.listActive
      return style.active
    }
    return ''
  }

  return (
    <div className={`${style.wrapper} ${inactive ? style.inactive : ''}`}>
      <ul className={style.list}>
        {tabs.map(t => (
          <li
            key={t.name}
            className={`${type === 'list' ? style.listTab : style.tab}
            ${isActive(t)}`}
            onClick={() => setTab(t)}
          >
            {t.icon}
            {t.name}
          </li>
        ))}
      </ul>
      <div className={style.output}>{currentTab && currentTab.content}</div>
    </div>
  )
}

export default Tab
