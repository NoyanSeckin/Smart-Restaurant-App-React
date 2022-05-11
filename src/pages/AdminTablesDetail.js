import {useParams} from 'react-router-dom'

import React, {useEffect} from 'react'

export default function AdminTablesDetail() {
  const {id} = useParams();
  useEffect(()=> {
    console.log(id)
  }, [])
  return (
    <div>AdminTablesDetail</div>
  )
}
