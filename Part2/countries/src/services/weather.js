import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='

const api_key = import.meta.env.VITE_SOME_KEY

const getWeather = (capital) => {
  return axios.get(baseUrl+capital+'&APPID='+api_key+'&units=imperial')
}

export default { getWeather }


