import styles from './dashboard.module.sass'
import { t } from 'i18next'
import FooterButtons from '../../components/FooterButtons'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import FirestoreService from '../../services/Api/firestore.service'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '~/redux/store'
import { EmployeesRegistersDocumentsInterface, InputType } from '~/utils/types'
import { formatInputValue } from '../../utils/functions/formater'
import DocumentViewer from '../../components/PDFViewer/Document'
import FormFields from '../../components/FormFields'
import { useNavigate } from 'react-router-dom'
import { setRoundedAvatar } from '../../redux/slices/authenticateUser'

export default function Dashboard() {
  const [name, setName] = useState<string>('John')
  const [lastName, setLastName] = useState<string>('Doe')
  const [gender, setGender] = useState<string>('Male')
  const [address, setAddress] = useState<string>(
    'Suzy Queue 4455 Landing Lange, APT 4 Louisville, KY 40018-1234'
  )
  const [phoneNumber, setPhoneNumber] = useState<string>('75998622304')
  const [birthDate, setBirthDate] = useState<string>('15012001')
  const [avatarURL, setAvatarURL] = useState<string>('')
  const [avatarFile, setAvatarFile] = useState<any>(null)
  const [biography, setBiography] = useState<string>(
    'Sou um entusiasta de tecnologia, apaixonado por resolver problemas e desenvolver soluções inovadoras. Adoro aprender novas tecnologias e explorar novas maneiras de aprimorar o desenvolvimento. Nos tempos livres, gosto de ler, escrever, e praticar esportes ao ar livre.'
  )
  const [office, setOffice] = useState<string>('Developer')
  const [issueDate, setIssueDate] = useState<string>('15012023')
  const [sector, setSector] = useState<string>('Engineering')
  const [salary, setSalary] = useState<string>('5000')

  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.authenticateUser.user)
  const dispatch = useDispatch()
  const roundedAvatar = useSelector(
    (state: RootState) => state.authenticateUser.roundedAvatar
  )
  console.log(roundedAvatar)
  const handleSendDocument = async (event: FormEvent) => {
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
      roundedAvatar: roundedAvatar,
      timestamp: {
        created: timestamp,
        updated: timestamp
      }
    }

    const formData: EmployeesRegistersDocumentsInterface = {
      uid: user?.uid ?? '',
      employee,
      promotion: null
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
      if (user?.email || user?.uid) {
        await FirestoreService.sendDocument(formData).then(async response => {
          await FirestoreService.uploadFile(response.id, avatarFile!)
          navigate('/home')
          dispatch(setRoundedAvatar(false))
          toast(t('GENERICS.SUCCESS'))
        })
        return
      }
    } catch (e) {
      console.log('catch', e)
    }
  }

  const handleFormatInput = (
    onChangeText: string,
    type: InputType,
    callback: (formatedValue: string) => void
  ) => {
    const formatedValue = formatInputValue(onChangeText, type)

    return callback(formatedValue)
  }

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
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

  const fetchDocsByID = async () => {
    try {
      await FirestoreService.fetchDocsByUserID(user?.uid!)

      return
    } catch (e) {
      e
    }
  }

  useEffect(() => {
    fetchDocsByID()
  }, [])

  return (
    <div className={styles.container}>
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
            <FormFields
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
            text={t('SCREENS.DASHBOARD.BUTTON.SEND')}
            onPressRight={handleSendDocument}
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
