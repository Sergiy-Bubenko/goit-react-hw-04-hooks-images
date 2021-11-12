import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import './App.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Searchbar from './components/Searchbar'
import ImageGallery from './components/ImageGallery'

export default function App() {
  const [requestValue, setRequestValue] = useState('')

  const handleFormSubmit = (requestValueOfSearchbar) => {
    setRequestValue(requestValueOfSearchbar)
  }

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery requestValue={requestValue} />
      <ToastContainer autoClose={2500} />
    </div>
  )
}
