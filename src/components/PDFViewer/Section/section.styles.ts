import { StyleSheet } from '@react-pdf/renderer'

export const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    position: 'relative',
    overflow: 'hidden'
  },
  top: {
    position: 'absolute',
    top: 10,
    left: 30
  },

  section: {
    display: 'flex',
    borderStyle: 'solid',
    margin: 20,
    borderTopWidth: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    minHeight: 90,
    maxHeight: 140,
    borderColor: '#2581C4'
  },

  boxOne: {
    justifyContent: 'space-between',
    padding: 20,
    lineHeight: 1.4,
    flex: 3,
    overflow: 'hidden',
    wordWrap: 'break-word'
  },

  boxTwo: {
    flex: 7,
    padding: 20,
    justifyContent: 'space-between',
    lineHeight: 1.4,
    overflow: 'hidden',
    wordWrap: 'break-word'
  }
})
