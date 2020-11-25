import React from 'react'
import Button from '@/client/components/Button'
import { convert } from '@/client/utils/convert'
import useSWR from 'swr'

export default function App() {
  const [base, dest] = ['USD', 'CAD']
  const { data: rate, error } = useSWR([base, dest], convert)

  if (error) return <span>Error!</span>
  if (!rate) return <span>Loading!</span>

  return (
    <div>
      <div>
        {base} to {dest} = {rate}
      </div>
      <Button label="click me please" />
    </div>
  )
}
