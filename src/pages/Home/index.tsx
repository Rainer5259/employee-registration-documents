import React, { useEffect, useState } from 'react'
import styles from './home.module.sass'
import firestoreService from '../../services/Api/firestore.service'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import { ListDocs } from '../../components/DocumentsList'
import { Button } from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'

export default function Home() {
  const user = useSelector((state: RootState) => state.authenticateUser.user)
  const [employeeDocuments, setEmployeeDocuments] =
    useState<QueryDocumentSnapshot[]>()
  const navigate = useNavigate()

  const handleFetchDocs = async () => {
    if (!employeeDocuments) {
      const response: QueryDocumentSnapshot<DocumentData, DocumentData>[] =
        await firestoreService.fetchDocsByUserID(user?.uid!)

      const documents = response.map(doc => {
        return doc
      })

      setEmployeeDocuments(documents)
    }
  }

  const handleAddNewEmployee = async () => {
    navigate('/dashboard')
    return
  }

  useEffect(() => {
    handleFetchDocs()
  }, [])

  return (
    <div className={styles.container}>
      <Header />
      <text className={styles.title}>Employees List</text>
      {employeeDocuments && (
        <ListDocs
          data={employeeDocuments}
          onPressPromote={() => console.log('promote')}
          onPressTerminateContract={() => console.log('terminate')}
        />
      )}
      <Button
        className={styles.buttonAddEmployee}
        onClick={handleAddNewEmployee}
      >
        Add new
      </Button>
    </div>
  )
}
