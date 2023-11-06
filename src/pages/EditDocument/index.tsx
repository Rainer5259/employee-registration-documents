import styles from './editDocument.module.sass'
import { t } from 'i18next'
import FooterButtons from '../../components/FooterButtons'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import FirestoreService from '../../services/Api/firestore.service'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '~/redux/store'
import {
  Employees,
  EmployeesRegistersDocumentsInterface,
  InputType,
  StorageFileType
} from '~/utils/types'
import { formatInputValue } from '../../utils/functions/formater'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import FormFields from '../../components/FormFields'
import DocumentViewer from '../../components/PDFViewer/Document'
import { setRoundedAvatar } from '../../redux/slices/authenticateUser'

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
  const [currentHistory, setCurrentHistory] = useState<Employees[] | undefined>(
    []
  )
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.authenticateUser.user)
  const roundedAvatar = useSelector(
    (state: RootState) => state.authenticateUser.roundedAvatar
  )

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
      roundedAvatar: roundedAvatar ?? false,
      timestamp: {
        created: timestamp,
        updated: timestamp
      }
    }
    const newCurrentHistory = currentHistory

    newCurrentHistory && newCurrentHistory.unshift(oldData[0])

    const formData: EmployeesRegistersDocumentsInterface = {
      uid: user?.uid ?? '',
      employee,
      updatesHistory: newCurrentHistory ?? oldData
    }

    if (
      !name ||
      !lastName ||
      !office ||
      !sector ||
      !salary ||
      !issueDate ||
      !address ||
      !phoneNumber ||
      !birthDate ||
      !avatarURL ||
      !biography ||
      !gender
    ) {
      return toast(t('ERRORS.FILL_FIELDS'))
    }

    try {
      await FirestoreService.updateDocumentWithID(
        state.documentID,
        formData
      ).then(async () => {
        await FirestoreService.uploadFile(state.documentID, avatarFile!)
        setOldData([employee])
        dispatch(setRoundedAvatar(false))
        navigate('/home')
        toast(t('GENERICS.SUCCESS'))
      })
    } catch (e) {
      e
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
        const { employee, updatesHistory } =
          (await FirestoreService.fetchDocByDocID(
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
          setCurrentHistory(updatesHistory)
          const fetchAvatar = await FirestoreService.downloadFile(
            state.documentID
          )
          setAvatarURL(fetchAvatar)
          dispatch(setRoundedAvatar(employee.roundedAvatar!))
        }
      } catch (e) {
        console.log('catch, doc with ID not available', e)
      }
    }
    fetchDocWithDocID()
  }, [])

  return (
    <div className={styles.container}>
      <Header stepOne={1} stepTwo={2} />
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
            <text className={styles.formBoxTitle}>
              {t('SCREENS.DASHBOARD.TITLE.CONTACT_INFO')}
            </text>
            <FormFields
              roundedAvatar
              address={address}
              avatarURL={avatarURL}
              biography={biography}
              birthDate={birthDate}
              gender={gender}
              handleFile={handleFile}
              handleFormatInput={handleFormatInput}
              issueDate={issueDate}
              lastName={lastName}
              name={name}
              office={office}
              phoneNumber={phoneNumber}
              salary={salary}
              sector={sector}
              setAddress={setAddress}
              setAvatarURL={setAvatarURL}
              setBiography={setBiography}
              setBirthDate={setBirthDate}
              setGender={setGender}
              setIssueDate={setIssueDate}
              setLastName={setLastName}
              setName={setName}
              setOffice={setOffice}
              setPhoneNumber={setPhoneNumber}
              setSalary={setSalary}
              setSector={setSector}
            />
          </div>
          <FooterButtons
            onPressRight={handleUpdateDocument}
            text={t('SCREENS.DASHBOARD.BUTTON.SEND')}
          />
        </div>
        <div className={styles.boxTwo}>
          <DocumentViewer
            address={address}
            biography={biography}
            birthDate={birthDate}
            gender={gender}
            issueDate={issueDate}
            name={name}
            office={office}
            phoneNumber={phoneNumber}
            salary={salary}
            sector={sector}
          />
        </div>
      </div>
    </div>
  )
}
