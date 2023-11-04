import React, { FC } from 'react'
import { Button } from '../ui/Button'
import styles from './documentsList.module.sass'
import { EmployeesRegistersDocumentsInterface } from '~/utils/types'
import { DocumentsListProps } from './types'
import { Link } from 'react-router-dom'

export const ListDocs: FC<DocumentsListProps> = ({
  data,
  onPressPromote,
  onPressTerminateContract
}) => {
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
              <Button className={styles.button}>Promote</Button>
              <Button className={styles.button} onClick={onPressPromote}>
                End contract
              </Button>
              <Link to="/dashboard/edit" state={{ documentID: e.id }}>
                <Button
                  className={styles.button}
                  onClick={onPressTerminateContract}
                >
                  Edit
                </Button>
              </Link>
            </div>
          </ul>
        )
      })}
    </div>
  )
}
