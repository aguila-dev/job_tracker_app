// src/api/jobsAPI.js
import axios from 'axios'

axios.defaults.withCredentials = true

const fetchJobs = async (
  companySlug: string,
  page: number = 1,
  searchQuery = '',
  token: string
) => {
  try {
    const { data } = await axios.get(
      `http://localhost:8000/v1/api/jobs/company/${companySlug}?page=${page}&search=${searchQuery}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    )

    if (!data) {
      throw new Error('Network response was not ok')
    }
    // await wait(1000);
    return data
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return error
    // throw error;
  }
}

export const fetchTodayJobs = async (
  page: number = 1,
  searchQuery = '',
  token: string,
  companyId?: number
) => {
  try {
    const params: any = { page, search: searchQuery }
    if (companyId) {
      params.companyId = companyId
    }
    const { data } = await axios.get(
      `http://localhost:8000/v1/api/jobs/todays-jobs`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        params,
      }
    )
    if (!data) {
      throw new Error('Network response was not ok')
    }

    return data
  } catch (error) {
    console.error('Error fetching today jobs:', error)
    return error
  }
}

export const fetchTodaysCompanies = async (token: string): Promise<any> => {
  try {
    const { data } = await axios.get(
      'http://localhost:8000/v1/api/jobs/todays-jobs/companies',
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    )
    if (!data) {
      throw new Error('Network response was not ok')
    }
    return data
  } catch (error) {
    console.error('Error fetching companies:', error)
    return error
  }
}

export default fetchJobs
