import React, { FC } from 'react'
import { FormFieldsProps } from './types'
import InputWithExternalPlaceholder from '../ui/InputWithExternalPlaceholder'
import styles from './formFields.module.sass'
import { t } from 'i18next'
import ProfileImage from '../ProfileImage'

const FormFields: FC<FormFieldsProps> = ({
  address,
  avatarURL,
  biography,
  birthDate,
  gender,
  handleFormatInput,
  handleFile,
  issueDate,
  lastName,
  name,
  office,
  phoneNumber,
  salary,
  sector,
  setAddress,
  setBiography,
  setBirthDate,
  setGender,
  setIssueDate,
  setLastName,
  setName,
  setOffice,
  setPhoneNumber,
  setSalary,
  setSector
}) => {
  return (
    <form className={styles.form}>
      <div className={styles.divBoxOne}>
        <div className={styles.flexColumn}>
          <InputWithExternalPlaceholder
            placeholder=""
            value={name}
            onChange={e => setName(e.target.value)}
            externalPlaceholder={t(
              'SCREENS.DASHBOARD.EXTERNAL_PLACEHOLDER.NAME'
            )}
            maxLength={15}
          />
          <InputWithExternalPlaceholder
            placeholder=""
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            externalPlaceholder={t(
              'SCREENS.DASHBOARD.EXTERNAL_PLACEHOLDER.LAST_NAME'
            )}
            maxLength={25}
          />
        </div>

        <ProfileImage avatarURL={avatarURL} handleFile={handleFile} />
      </div>

      <div className={styles.uniqueInputBox}>
        <InputWithExternalPlaceholder
          placeholder=""
          value={biography}
          onChange={e => setBiography(e.target.value)}
          className=""
          externalPlaceholder={t(
            'SCREENS.DASHBOARD.EXTERNAL_PLACEHOLDER.BIOGRAPHY'
          )}
          maxLength={260}
        />
      </div>

      <div className={styles.uniqueInputBox}>
        <InputWithExternalPlaceholder
          placeholder=""
          value={address}
          onChange={e => setAddress(e.target.value)}
          className=""
          externalPlaceholder={t(
            'SCREENS.DASHBOARD.EXTERNAL_PLACEHOLDER.ADDRESS'
          )}
          maxLength={64}
        />
      </div>
      <div>
        <div className={styles.divBoxThree}>
          <InputWithExternalPlaceholder
            placeholder=""
            value={phoneNumber}
            onChange={e =>
              handleFormatInput(e.target.value, 'phoneNumber', setPhoneNumber)
            }
            className=""
            externalPlaceholder={t(
              'SCREENS.DASHBOARD.EXTERNAL_PLACEHOLDER.PHONE_NUMBER'
            )}
            maxLength={16}
          />
        </div>
        <div className={styles.divBoxThree}>
          <InputWithExternalPlaceholder
            placeholder=""
            value={birthDate}
            onChange={e =>
              handleFormatInput(e.target.value, 'date', setBirthDate)
            }
            className=""
            externalPlaceholder={t(
              'SCREENS.DASHBOARD.EXTERNAL_PLACEHOLDER.BIRTH_DATE'
            )}
            maxLength={8}
          />
        </div>
      </div>
      <div className={styles.divBoxThree}>
        <InputWithExternalPlaceholder
          placeholder=""
          value={gender}
          onChange={e => setGender(e.target.value)}
          className=""
          externalPlaceholder={t(
            'SCREENS.DASHBOARD.EXTERNAL_PLACEHOLDER.GENDER'
          )}
          maxLength={12}
        />
      </div>
      <div>
        <div className={styles.divBoxTwo}>
          <InputWithExternalPlaceholder
            placeholder=""
            value={office}
            onChange={e => setOffice(e.target.value)}
            className=""
            externalPlaceholder={t(
              'SCREENS.DASHBOARD.EXTERNAL_PLACEHOLDER.OFFICE'
            )}
            maxLength={25}
          />
          <InputWithExternalPlaceholder
            placeholder=""
            value={sector}
            onChange={e => setSector(e.target.value)}
            className=""
            externalPlaceholder={t(
              'SCREENS.DASHBOARD.EXTERNAL_PLACEHOLDER.SECTOR'
            )}
            maxLength={25}
          />
        </div>
        <div className={styles.divBoxTwo}>
          <InputWithExternalPlaceholder
            placeholder=""
            value={salary}
            onChange={e =>
              handleFormatInput(e.target.value, 'BRLcurrency', setSalary)
            }
            className=""
            externalPlaceholder={t(
              'SCREENS.DASHBOARD.EXTERNAL_PLACEHOLDER.SALARY'
            )}
            maxLength={16}
          />

          <InputWithExternalPlaceholder
            placeholder={t('SCREENS.DASHBOARD.PLACEHOLDER.ISSUE_DATE')}
            value={issueDate}
            onChange={e =>
              handleFormatInput(e.target.value, 'date', setIssueDate)
            }
            className=""
            externalPlaceholder={t(
              'SCREENS.DASHBOARD.EXTERNAL_PLACEHOLDER.ISSUE_DATE'
            )}
            maxLength={8}
          />
        </div>
      </div>
    </form>
  )
}
export default FormFields
