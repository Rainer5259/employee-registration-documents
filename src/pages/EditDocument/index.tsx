import styles from './editDocument.module.sass'
import { t } from 'i18next'
import InputWithExternalPlaceholder from '../../components/ui/InputWithExternalPlaceholder'
import FooterButtons from '../../components/FooterButtons'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Page, Text, View, Document } from '@react-pdf/renderer'
import FirestoreService from '../../services/Api/firestore.service'
import { PDFStyle } from './previewPDFStyle'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store'
import {
  Employees,
  EmployeesRegistersDocumentsInterface,
  InputType,
  StorageFileType
} from '~/utils/types'
import Cookies from 'js-cookie'
import { Section } from '../../components/PDFViewer/Section'
import { formatInputValue } from '../../utils/functions/formater'
import { useLocation } from 'react-router-dom'
import Header from '../../components/Header'

export default function EditDocument() {
  const { state } = useLocation()

  const [name, setName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [birthDate, setBirthDate] = useState<string>('')
  const [avatarURL, setAvatarURL] = useState<string>('')
  const [avatarFile, setAvatarFile] = useState<StorageFileType>(null)
  const [biography, setBiography] = useState<string>('')
  const [office, setOffice] = useState<string>('')
  const [issueDate, setIssueDate] = useState<string>('')
  const [sector, setSector] = useState<string>('')
  const [salary, setSalary] = useState<string>('')
  const [oldData, setOldData] = useState<Employees[]>([])

  const user = useSelector((state: RootState) => state.authenticateUser.user)

  const handleUpdateDocument = async (event: FormEvent) => {
    event.preventDefault()
    const timestamp = new Date()

    const employee = {
      name,
      lastName,
      office,
      sector,
      salary,
      issueDate,
      address,
      phoneNumber,
      birthDate,
      avatarURL,
      biography,
      gender,
      timestamp: {
        created: oldData[0]?.timestamp.created,
        updated: timestamp
      }
    }
    const formData: EmployeesRegistersDocumentsInterface = {
      uid: user?.uid ?? '',
      employee,
      updatesHistory: oldData
    }

    const formDataArray = Object.values(formData).every(value => !!value)

    console.log('formData', formData)
    if (!formDataArray) {
      return toast(t('ERRORS.FILL_FIELDS'))
    }

    try {
      await FirestoreService.updateDocumentWithID(state.documentID, formData)
      await FirestoreService.uploadFile(state.documentID, avatarFile!)
    } catch (e) {
      console.log('catch', e)
    }
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return
    }

    const file = e.target.files[0]

    if (!file) {
      return
    }

    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      const reader = new FileReader()
      reader.onload = function (event) {
        const result = event.target?.result

        if (result) {
          const arrayBuffer = result as ArrayBuffer
          const uint8Array = new Uint8Array(arrayBuffer)
          setAvatarFile(uint8Array)
          setAvatarURL(URL.createObjectURL(file))
        }
      }

      reader.onerror = function (event) {
        console.error('Erro ao ler o arquivo:', event.target?.error)
      }

      reader.readAsArrayBuffer(file)
    }
  }

  const handleFormatInput = (
    onChangeText: string,
    type: InputType,
    callback: (formatedValue: string) => void
  ) => {
    const formatedValue = formatInputValue(onChangeText, type)
    console.log(formatedValue)

    return callback(formatedValue)
  }

  useEffect(() => {
    const fetchDocWithDocID = async () => {
      try {
        const { employee } = (await FirestoreService.fetchDocByDocID(
          state.documentID
        )) as EmployeesRegistersDocumentsInterface

        if (employee) {
          setAddress(employee.address)
          setBiography(employee.biography)
          setBirthDate(employee.birthDate)
          setGender(employee.gender)
          setIssueDate(employee.issueDate)
          setLastName(employee.lastName)
          setName(employee.name)
          setOffice(employee.office)
          setPhoneNumber(employee.phoneNumber)
          setSalary(employee.salary)
          setSector(employee.sector)

          setOldData([employee])
          const fetchAvatar = await FirestoreService.downloadFile(
            state.documentID
          )
          setAvatarURL(fetchAvatar)
        }
      } catch (e) {
        console.log('catch, doc with ID not available', e)
      }
    }
    fetchDocWithDocID()
  }, [])

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div className={styles.boxOne}>
          <div className={styles.headerTitle}>
            <text className={styles.title}>
              {t('SCREENS.DASHBOARD.TITLE.TELL_US_ABOUT_YOURSELF')}
            </text>
            <text className={styles.subtitle}>
              {t('SCREENS.DASHBOARD.SUBTITLE.HOW_CONTACT_YOU')}
            </text>
          </div>
          <div className={styles.formBox}>
            <text>{t('SCREENS.DASHBOARD.TITLE.CONTACT_INFO')}</text>
            <form className={styles.form}>
              <div>
                <div className={styles.divBoxOne}>
                  <InputWithExternalPlaceholder
                    placeholder=""
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className=""
                    externalPlaceholder={t(
                      'SCREENS.DASHBOARD.EXTERNAL_PLACEHOLDER.NAME'
                    )}
                    maxLength={15}
                  />
                  <InputWithExternalPlaceholder
                    placeholder=""
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    className=""
                    externalPlaceholder={t(
                      'SCREENS.DASHBOARD.EXTERNAL_PLACEHOLDER.LAST_NAME'
                    )}
                    maxLength={25}
                  />
                </div>
                <div className={styles.profileImage}>
                  {!avatarURL ? (
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handleFile}
                      className={styles.avatarBox}
                    />
                  ) : (
                    <img
                      className={styles.avatarBox}
                      src={avatarURL}
                      alt="productPhoto"
                      width={250}
                      height={250}
                    />
                  )}
                  <div className={styles.options}>
                    <text>Adicionar Foto</text>
                    <text>Button foto redonda?</text>
                    <text>User: {user?.uid}</text>
                  </div>
                </div>
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
                      handleFormatInput(
                        e.target.value,
                        'phoneNumber',
                        setPhoneNumber
                      )
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
                      handleFormatInput(
                        e.target.value,
                        'BRLcurrency',
                        setSalary
                      )
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
          </div>
          <FooterButtons
            onPressLeft={() => {
              Cookies.remove('authFirebaseToken')
              location.reload()
            }}
            onPressRight={handleUpdateDocument}
          />
        </div>
        <div className={styles.boxTwo}>
          <Document style={PDFStyle.document}>
            <Page size="A4" style={PDFStyle.page}>
              <View style={PDFStyle.container}>
                <Section
                  title={name}
                  firstChildren={<Text style={PDFStyle.text}>{biography}</Text>}
                />
                <Section
                  title={t(
                    'SCREENS.DASHBOARD.PDF_VIEWER.TITLE.CONTACT_DETAILS'
                  )}
                  firstChildren={<Text style={PDFStyle.text}>{birthDate}</Text>}
                  secondChildren={
                    <View style={PDFStyle.content}>
                      <Text>{address}</Text>
                      <Text style={PDFStyle.text}>{phoneNumber}</Text>
                      <Text style={PDFStyle.text}>{gender}</Text>
                    </View>
                  }
                />

                <Section
                  title={t('SCREENS.DASHBOARD.PDF_VIEWER.TITLE.EXPERIENCE')}
                  firstChildren={<Text style={PDFStyle.text}>{issueDate}</Text>}
                  secondChildren={
                    <View style={PDFStyle.content}>
                      <Text>
                        {office} <Text style={PDFStyle.text}>{sector}</Text>
                      </Text>
                      <Text style={PDFStyle.text}>{salary}</Text>
                    </View>
                  }
                />
              </View>
            </Page>
          </Document>
        </div>
      </div>
    </div>
  )
}
