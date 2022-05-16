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
        <div style={{ textAlign: 'center', paddingBottom: '4px' }}>Price</div>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
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
        <div style={{ textAlign: 'center', paddingBottom: '4px' }}>Rating</div>
        <div className={style.filterProperties}>
          <div className={style.flex}>
            <input
              type="radio"
              name="rating"
              checked={isChecked('rating', -1)}
              style={{ margin: '0 4px 0 0' }}
              onChange={() => setFilters({ type: 'rating', value: -1 })}
            />
            <span>
              All{' '}
              <span style={{ opacity: '0.4' }}>
                ({courseAmount.find(c => c.name === 'rating_all')?.amount})
              </span>
            </span>
          </div>
          <div className={style.flex}>
            <input
              type="radio"
              name="rating"
              checked={isChecked('rating', 3)}
              style={{ margin: '0 4px 0 0' }}
              onChange={() => setFilters({ type: 'rating', value: 3 })}
            />
            <span>
              3+
              <span style={{ opacity: '0.4' }}>
                ({courseAmount.find(c => c.name === 'rating_3')?.amount})
              </span>
            </span>
          </div>
          <div className={style.flex}>
            <input
              type="radio"
              name="rating"
              checked={isChecked('rating', 3.5)}
              style={{ margin: '0 4px 0 0' }}
              onChange={() => setFilters({ type: 'rating', value: 3.5 })}
            />
            <span>
              3.5+
              <span style={{ opacity: '0.4' }}>
                ({courseAmount.find(c => c.name === 'rating_35')?.amount})
              </span>
            </span>
          </div>
          <div className={style.flex}>
            <input
              type="radio"
              name="rating"
              checked={isChecked('rating', 4)}
              style={{ margin: '0 4px 0 0' }}
              onChange={() => setFilters({ type: 'rating', value: 4 })}
            />
            <span>
              4+
              <span style={{ opacity: '0.4' }}>
                ({courseAmount.find(c => c.name === 'rating_4')?.amount})
              </span>
            </span>
          </div>
          <div className={style.flex}>
            <input
              type="radio"
              name="rating"
              checked={isChecked('rating', 4.5)}
              style={{ margin: '0 4px 0 0' }}
              onChange={e => setFilters({ type: 'rating', value: 4.5 })}
            />
            <span>
              4.5+
              <span style={{ opacity: '0.4' }}>
                ({courseAmount.find(c => c.name === 'rating_45')?.amount})
              </span>
            </span>
          </div>
        </div>
      </div>
      {/* duration */}
      <div className={style.filterWrapper}>
        {/* name of the filter */}
        <div style={{ textAlign: 'center', paddingBottom: '4px' }}>
          Duration
        </div>
        {/* filter properties */}
        <div className={style.filterProperties}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={isChecked('duration', 'short')}
              onChange={e =>
                setFilters({ type: 'duration', value: 'short' }, e)
              }
            />
            Less than 6 hours
            <span style={{ opacity: '0.4' }}>
              ({courseAmount.find(c => c.name === 'duration_short')?.amount})
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={isChecked('duration', 'medium')}
              onChange={e =>
                setFilters({ type: 'duration', value: 'medium' }, e)
              }
            />
            6-12h
            <span style={{ opacity: '0.4' }}>
              ({courseAmount.find(c => c.name === 'duration_medium')?.amount})
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={isChecked('duration', 'long')}
              onChange={e => setFilters({ type: 'duration', value: 'long' }, e)}
            />
            More than 12 hours
            <span style={{ opacity: '0.4' }}>
              ({courseAmount.find(c => c.name === 'duration_long')?.amount})
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter
