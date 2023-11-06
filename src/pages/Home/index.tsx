import React, { useEffect, useState } from 'react'
import styles from './home.module.sass'
import firestoreService from '../../services/Api/firestore.service'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import { ListDocs } from '../../components/DocumentsList'
import { Button } from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { t } from 'i18next'

export default function Home() {
  const user = useSelector((state: RootState) => state.authenticateUser.user)
  const [employeeDocuments, setEmployeeDocuments] =
    useState<QueryDocumentSnapshot[]>()
  const navigate = useNavigate()

  const handleFetchDocs = async () => {
    const response: QueryDocumentSnapshot<DocumentData, DocumentData>[] =
      await firestoreService.fetchDocsByUserID(user?.uid!)

    const documents = response.map(doc => {
      return doc
    })

    setEmployeeDocuments(documents)
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
      <text className={styles.title}>{t('SCREENS.HOME.TITLE')}</text>
      {employeeDocuments && (
        <ListDocs
          data={employeeDocuments}
          onPressPromote={() => handleFetchDocs()}
          onPressTerminateContract={() => handleFetchDocs()}
        />
      )}
      <Button
        className={styles.buttonAddEmployee}
        onClick={handleAddNewEmployee}
      >
        {t('SCREENS.HOME.BUTTONS.ADD_NEW')}
      </Button>
    </div>
  )
}
