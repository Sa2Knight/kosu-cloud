import dayjs, { Dayjs } from 'dayjs'

type Prop = {
  date: Dayjs
  fontSize?: string
  onClickPrev: () => void
  onClickNext: () => void
}

export const MonthSelector: React.FC<Prop> = props => {
  const fontSize = props.fontSize || '1em'

  return (
    <div className="month-selector">
      <div className="button">{'<<'}</div>
      <div className="year-month">{props.date.format('YYYY/MM')}</div>
      <div className="button">{'>>'}</div>

      <style jsx>{`
        .month-selector {
          display: flex;
          align-items: center;
          font-size: ${fontSize};
          .year-month {
            margin-left: 0.75em;
            margin-right: 0.75em;
          }
          .button {
            cursor: pointer;
            user-select: none;
          }
        }
      `}</style>
    </div>
  )
}

export default MonthSelector
