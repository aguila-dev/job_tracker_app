const fetchWorkdayLocations = async (
  company: string,
  token: string
): Promise<any> => {
  try {
    const response = await fetch(
      `http://localhost:8000/v1/api/locations/${company}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    console.log('response', response)
    return response.json()
  } catch (error) {
    console.error('Failed to fetch locations: ', error)
    throw error
  }
}

export default fetchWorkdayLocations
