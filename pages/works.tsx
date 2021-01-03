import React from 'react'
import dayjs from 'dayjs'
import MonthSelector from '../components/MonthSelector'

const Works = () => (
  <div>
    <MonthSelector date={dayjs()} fontSize="20px" onClickNext={() => {}} onClickPrev={() => {}} />
    <div>工数入力予定地</div>
  </div>
)

export default Works
