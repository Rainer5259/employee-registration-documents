import styles from './dashboard.module.sass'
import { t } from 'i18next'
import InputWithExternalPlaceholder from '../../components/ui/InputWithExternalPlaceholder'
import FooterButtons from '../../components/FooterButtons'
import { FormEvent, useEffect, useState } from 'react'
import { Page, Text, View, Document } from '@react-pdf/renderer'
import FirestoreService from '../../services/Api/firestore.service'
import { PDFStyle } from './previewPDFStyle'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store'
import { EmployeesRegistersDocumentsInterface, InputType } from '~/utils/types'
import Cookies from 'js-cookie'
import { Section } from '../../components/PDFViewer/Section'
import { formatInputValue } from '../../utils/functions/formater'

export default function Dashboard() {
  const [name, setName] = useState<string>('John')
  const [lastName, setLastName] = useState<string>('Doe')
  const [gender, setGender] = useState<string>('Male')
  const [address, setAddress] = useState<string>(
    'Suzy Queue 4455 Landing Lange, APT 4 Louisville, KY 40018-1234'
  )
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [birthDate, setBirthDate] = useState<string>('')
  const [avatarURL, setAvatar] = useState<string>('')
  const [avatarFile, setAvatarFile] = useState<any>(null)
  const [biography, setBiography] = useState<string>(
    'Sou um entusiasta de tecnologia, apaixonado por resolver problemas e desenvolver soluções inovadoras. Adoro aprender novas tecnologias e explorar novas maneiras de aprimorar o desenvolvimento. Nos tempos livres, gosto de ler, escrever, e praticar esportes ao ar livre.'
  )
  const [office, setOffice] = useState<string>('Developer')
  const [issueDate, setIssueDate] = useState<string>('2023-01-15')
  const [sector, setSector] = useState<string>('Engineering')
  const [salary, setSalary] = useState<string>('')

  const user = useSelector((state: RootState) => state.authenticateUser.user)

  const handleSendDocument = async (event: FormEvent) => {
    event.preventDefault()
    const timestamp = new Date()

    const formData: EmployeesRegistersDocumentsInterface = {
      uid: user?.uid ?? '',
      employee: {
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
          created: timestamp,
          updated: timestamp
        }
      }
    }

    const formDataArray = Object.values(formData).every(value => !!value)

    if (!formDataArray) {
      return toast(t('ERRORS.FILL_FIELDS'))
    }

    try {
      if (user?.email || user?.uid) {
        await FirestoreService.sendDocument(formData)
        const fetchAllDocs = await FirestoreService.fetchDocs()
        console.log(fetchAllDocs)
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
    console.log(formatedValue)

    return callback(formatedValue)
  }

  useEffect(() => {
    const fetchDocByID = async () => {
      try {
        const docByID = await FirestoreService.fetchDocsByUserID(user?.uid!)
        console.log('docs by ID', docByID)
        return
      } catch (e) {
        console.log('catch, doc by ID not', e)
      }
    }
    fetchDocByID()
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
                  <img
                    style={{
                      width: 110,
                      height: 140,
                      backgroundColor: '#D8D9D9',
                      marginRight: 20,
                      borderWidth: 0,
                      borderRadius: 10
                    }}
                  />
                  <div className={styles.options}>
                    <text>Foto do perfil</text>
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
            onPressRight={handleSendDocument}
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
