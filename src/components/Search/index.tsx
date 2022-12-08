import React from 'react'
import s from './styles.module.css'

interface SearchPropsTypes {
  searchValue: string
  setSearchValue: (searchValue: string) => void
}

const Search = ({ searchValue, setSearchValue }: SearchPropsTypes) => {
  const onChangeSearchValue = (searchValue: string) => {
    setSearchValue(searchValue)
  }

  return (
    <div className={s.searchWrapper}>
      <input
        type={'text'}
        value={searchValue}
        placeholder={'Поиск...'}
        onChange={(e) => onChangeSearchValue(e.target.value)}
      />
    </div>
  )
}

export default Search
