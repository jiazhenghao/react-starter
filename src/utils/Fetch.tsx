import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'

interface FetchProps {
  url: string
}

type DataType = {
  greeting: string
}

const Fetch: React.FC<FetchProps> = ({ url }) => {
  const [data, setData] = useState<DataType | null>(null)
  let mounted = false

  const loadData = useCallback(async () => {
    if (mounted) {
      const response = await axios.get(url)
      setData(response.data)
    }
  }, [])

  useEffect(() => {
    mounted = true
    loadData()
  }, [url])

  return data ? <span data-testid="resolved">{data.greeting}</span> : <span data-testid="loading">Loading data...</span>
}

export default Fetch
