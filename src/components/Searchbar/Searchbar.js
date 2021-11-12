import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PropTypes from 'prop-types'

export default function Searchbar({ onSubmit }) {
  const [requestValue, setRequestValue] = useState('')

  const handleRequestChange = (evt) =>
    setRequestValue(evt.target.value.toLowerCase())

  const handleSubmit = (event) => {
    event.preventDefault()

    if (requestValue.trim() === '') {
      return toast.error('измените запрос')
    }
    setRequestValue('')
    onSubmit(requestValue)
  }

  return (
    <header className="Searchbar">
      <form onSubmit={handleSubmit} className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          name="requestValue"
          value={requestValue}
          onChange={handleRequestChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
}
