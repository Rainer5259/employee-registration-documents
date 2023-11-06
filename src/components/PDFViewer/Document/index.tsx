import { Document, Page, Text, View } from '@react-pdf/renderer'
import React, { FC } from 'react'
import { Section } from '../Section'
import { PDFStyle } from './previewPDFStyle'
import { DocumentViewerProps } from './types'
import { t } from 'i18next'

const DocumentViewer: FC<DocumentViewerProps> = ({
  address,
  biography,
  birthDate,
  gender,
  issueDate,
  name,
  office,
  phoneNumber,
  salary,
  sector
}) => {
  return (
    <Document style={PDFStyle.document}>
      <Page size="A4" style={PDFStyle.page}>
        <View style={PDFStyle.container}>
          <Section
            title={name}
            firstChildren={<Text style={PDFStyle.text}>{biography}</Text>}
          />

          <Section
            title={t('SCREENS.DASHBOARD.PDF_VIEWER.TITLE.CONTACT_DETAILS')}
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
  )
}
export default DocumentViewer
