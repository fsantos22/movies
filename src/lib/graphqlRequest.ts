export async function graphqlRequest(query: { query: string }) {
  try {
    const url = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string
    const headers = {
      'Content-type': 'application/json',
      Authorization: process.env.NEXT_PUBLIC_WORDPRESS_AUTH_TOKEN as string,
    }
    const res = await fetch(url, {
      headers,
      method: 'POST',
      body: JSON.stringify(query),
    })

    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.statusText}`)
    }

    const resJson = await res.json()
    return resJson
  } catch (error) {
    console.error('Error in graphqlRequest:', error)
    return { data: null }
  }
}
