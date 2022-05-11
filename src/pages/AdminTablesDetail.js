import {useParams} from 'react-router-dom'
import { getFirestore, collection, updateDoc, arrayUnion, doc, onSnapshot, getDoc} from "firebase/firestore";
import React, {useEffect} from 'react'

export default function AdminTablesDetail() {
  const {tableNum} = useParams()
  
  const db = getFirestore();
  async function fetchTable(){
    const tableRef = doc(db, 'Tables', `table_${tableNum}`)
    const tableSnap = await getDoc(tableRef)
    if(tableSnap.exists()){
      console.log(tableSnap.data())
    }
  }
  useEffect(()=> {
    fetchTable()
  }, [])
  return (
    <div>AdminTablesDetail</div>
  )
}
