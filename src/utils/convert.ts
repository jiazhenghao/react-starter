// import axios from 'axios'

async function convertFetch(base: string, destination: string) {
  const result = await fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
  if (!result.ok) {
    throw new Error(`Request failed with status code ${result.status}`)
  }
  const data = await result.json()
  return data.rates[destination]
}

// export async function convertAxios(base: string, destination: string) {
//   const result = await axios.get(`https://api.exchangeratesapi.io/latest?base=${base}`)
//   return result.data.rates[destination]
// }

export { convertFetch as convert }
