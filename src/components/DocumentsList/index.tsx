import React, { FC } from 'react'
import { Button } from '../ui/Button'
import styles from './documentsList.module.sass'
import { EmployeesRegistersDocumentsInterface } from '~/utils/types'
import { DocumentsListProps } from './types'
import { Link } from 'react-router-dom'
import firestoreService from '../../services/Api/firestore.service'
import { Promotion } from '../../utils/enums/promotion'
import { t } from 'i18next'

export const ListDocs: FC<DocumentsListProps> = ({
  data,
  onPressPromote,
  onPressTerminateContract
}) => {
  const handlePromoteEmployee = async (docID: string) => {
    try {
      await firestoreService
        .promoteEmployeeWithID(docID, Promotion.Manager)
        .then(() => {
          onPressPromote()
        })
    } catch (e) {
      e
    }
  }

  const handleTerminateContract = async (docID: string) => {
    try {
      await firestoreService.terminateContractWithID(docID).then(() => {
        onPressTerminateContract()
        console.log('then')
      })
    } catch (e) {
      e
    }
  }

  return (
    <div className={styles.container}>
      {data.map((e, i) => {
        const doc = e.data() as EmployeesRegistersDocumentsInterface

        return (
          <ul key={i} className={styles.list}>
            <div className={styles.employeeBox}>
              <text key={e.ref.id}>{doc.employee.name}</text>
              <div className={styles.lastNameBox}>
                <text key={e.ref.id}>{doc.employee.lastName}</text>
              </div>
            </div>
            <div className={styles.buttonBox}>
              {doc.promotion !== Promotion.Manager ? (
                <Button
                  className={styles.button}
                  onClick={() => handlePromoteEmployee(e.id)}
                >
                  {t('SCREENS.HOME.BUTTONS.PROMOTE')}
                </Button>
              ) : (
                <Button
                  disabled={true}
                  className={styles.button}
                  style={{ color: '#2b2c2c22' }}
                >
                  {t('SCREENS.HOME.BUTTONS.PROMOTED')}
                </Button>
              )}
              <Button
                className={styles.button}
                onClick={() => handleTerminateContract(e.id)}
              >
                {t('SCREENS.HOME.BUTTONS.END_CONTRACT')}
              </Button>

              <Link to="/dashboard/edit" state={{ documentID: e.id }}>
                <Button className={styles.button}>
                  {t('SCREENS.HOME.BUTTONS.EDIT')}
                </Button>
              </Link>
            </div>
          </ul>
        )
      })}
    </div>
  )
}
