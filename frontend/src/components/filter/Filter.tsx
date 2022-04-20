import style from './filter.module.scss'

const Filter = () => {
  const d = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input type="checkbox" />
      1-5h
    </div>
  )
  return (
    <div className={style.filterWrapper}>
      {/* name of the filter */}
      <div style={{ textAlign: 'center' }}>Duration</div>
      {/* filter properties */}
      <div className={style.filterProperties}>{[0, 1, 2, 3].map(q => d)}</div>
    </div>
  )
}

export default Filter
