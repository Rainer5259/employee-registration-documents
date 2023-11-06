import { StyleSheet } from '@react-pdf/renderer'

export const PDFStyle = StyleSheet.create({
  document: { flex: 1, position: 'relative' },
  page: {
    backgroundColor: '#EAEAEA',
    marginTop: 40,
    display: 'flex',
    justifyContent: 'center',
    padding: 40
  },
  container: {
    flexDirection: 'column',
    display: 'flex'
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    display: 'flex',
    height: 80
  },
  text: {
    fontSize: 14,
    fontWeight: 400,
    fontFamily: 'Helvetica Neue',
    color: '#2B2C2C'
  }
})
