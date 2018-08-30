import React from 'react'
import { filterOptions } from '../../constants'

const FilterOrderDropDown = props => {
  return filterOptions.map(v => {
    return <div key={v}>{v}</div>
  })
}

export default FilterOrderDropDown
