import axios from 'axios'

const supabaseApi = axios.create({
  baseURL: import.meta.env.VITE_SUPABASE_URL + '/functions/v1',
})

export const useFetch = async (endpoint, params = {}) => {
  try {
    const response = await supabaseApi.get(`/${endpoint}`, {
      params,
    })
    return { data: response.data, error: null }
  } catch (e) {
    console.error(e)
    return { data: null, e }
  }
}
