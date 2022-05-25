import { filter } from '../../types'
import style from './filter.module.scss'

interface s {
  filters: filter[]
  setFilters: any
  courseAmount: { name: string; amount: any }[]
}

const Filter: React.FC<s> = ({ filters, setFilters, courseAmount }) => {
  const isChecked = (type: string, value?: string | number) => {
    const match = filters.find(f =>
      f.type === type && value ? f.value === value : null
    )
    if (match) return true
    return false
  }

  return (
    <div className={style.wrapper}>
      {/* price */}
      <div className={style.filterWrapper}>
        <div className={style.filterTitle}>Price</div>
        <div className={style.flex} style={{ gap: '4px' }}>
          <input
            id="price_from"
            name="price_from"
            type="number"
            checked={isChecked('price_from')}
            className={style.priceInput}
            placeholder="Min"
            onChange={e =>
              setFilters({ type: 'price_from', value: e.target.value })
            }
          />
          <span> - </span>
          <input
            id="price_to"
            name="price_to"
            type="number"
            checked={isChecked('price_to')}
            className={style.priceInput}
            placeholder="Max"
            onChange={e =>
              setFilters({ type: 'price_to', value: e.target.value })
            }
          />
        </div>
      </div>
      {/* rating */}
      <div className={style.filterWrapper}>
        <div className={style.filterTitle}>Rating</div>
        <div className={style.filterProperties}>
          <div className={style.flex}>
            <input
              type="radio"
              name="rating"
              checked={isChecked('rating', -1)}
              className={style.marginRight}
              onChange={() => setFilters({ type: 'rating', value: -1 })}
            />
            <span>
              All{' '}
              <span className={style.lowOpacity}>
                ({courseAmount.find(c => c.name === 'rating_all')?.amount})
              </span>
            </span>
          </div>
          <div className={style.flex}>
            <input
              type="radio"
              name="rating"
              checked={isChecked('rating', 3)}
              className={style.marginRight}
              onChange={() => setFilters({ type: 'rating', value: 3 })}
            />
            <span>
              3+
              <span className={style.lowOpacity}>
                ({courseAmount.find(c => c.name === 'rating_3')?.amount})
              </span>
            </span>
          </div>
          <div className={style.flex}>
            <input
              type="radio"
              name="rating"
              checked={isChecked('rating', 3.5)}
              className={style.marginRight}
              onChange={() => setFilters({ type: 'rating', value: 3.5 })}
            />
            <span>
              3.5+
              <span className={style.lowOpacity}>
                ({courseAmount.find(c => c.name === 'rating_35')?.amount})
              </span>
            </span>
          </div>
          <div className={style.flex}>
            <input
              type="radio"
              name="rating"
              checked={isChecked('rating', 4)}
              className={style.marginRight}
              onChange={() => setFilters({ type: 'rating', value: 4 })}
            />
            <span>
              4+
              <span className={style.lowOpacity}>
                ({courseAmount.find(c => c.name === 'rating_4')?.amount})
              </span>
            </span>
          </div>
          <div className={style.flex}>
            <input
              type="radio"
              name="rating"
              checked={isChecked('rating', 4.5)}
              className={style.marginRight}
              onChange={e => setFilters({ type: 'rating', value: 4.5 })}
            />
            <span>
              4.5+
              <span className={style.lowOpacity}>
                ({courseAmount.find(c => c.name === 'rating_45')?.amount})
              </span>
            </span>
          </div>
        </div>
      </div>
      {/* duration */}
      <div className={style.filterWrapper}>
        {/* name of the filter */}
        <div className={style.filterTitle}>Duration</div>
        {/* filter properties */}
        <div className={style.filterProperties}>
          <div className={style.flex}>
            <input
              type="checkbox"
              checked={isChecked('duration', 'short')}
              onChange={e =>
                setFilters({ type: 'duration', value: 'short' }, e)
              }
            />
            Less than 6 hours
            <span className={style.lowOpacity}>
              ({courseAmount.find(c => c.name === 'duration_short')?.amount})
            </span>
          </div>
          <div className={style.flex}>
            <input
              type="checkbox"
              checked={isChecked('duration', 'medium')}
              onChange={e =>
                setFilters({ type: 'duration', value: 'medium' }, e)
              }
            />
            6-12h
            <span className={style.lowOpacity}>
              ({courseAmount.find(c => c.name === 'duration_medium')?.amount})
            </span>
          </div>
          <div className={style.flex}>
            <input
              type="checkbox"
              checked={isChecked('duration', 'long')}
              onChange={e => setFilters({ type: 'duration', value: 'long' }, e)}
            />
            More than 12 hours
            <span className={style.lowOpacity}>
              ({courseAmount.find(c => c.name === 'duration_long')?.amount})
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter
