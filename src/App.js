import { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import './App.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Searchbar from './components/Searchbar'
import ImageGallery from './components/ImageGallery'
import axios from 'axios'
console.dir(axios)

// модалку приспособить

class App extends Component {
  state = {
    requestValue: '',
  }

  handleFormSubmit = (requestValue) => {
    this.setState({ requestValue })
  }

  render() {
    const { requestValue } = this.state
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery requestValue={requestValue} />
        <ToastContainer autoClose={2500} />
      </div>
    )
  }
}

export default App
