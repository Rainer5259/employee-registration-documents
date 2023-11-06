import { StyleSheet } from '@react-pdf/renderer'

const styles = (width: number) => {
  return StyleSheet.create({
    container: {
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      position: 'relative',
      overflow: 'hidden'
    },

    top: {
      position: 'absolute',
      top: width < 480 ? 2 : 10,
      left: 30,
      backgroundColor: '#EAEAEA',
      paddingLeft: 8,
      paddingRight: 8,
      color: '#2581C4'
    },

    section: {
      display: 'flex',
      borderStyle: 'solid',
      margin: width < 480 ? 10 : 20,
      width: '90%',
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      height: width < 480 ? 170 : 140,
      padding: width < 480 ? 2 : 10,
      borderColor: '#AAB2B2'
    },

    boxOne: {
      justifyContent: 'space-between',
      padding: width < 480 ? 10 : 20,
      lineHeight: width < 480 ? 0.8 : 1.4,
      flex: width < 512 ? 4 : 3,
      overflow: 'hidden',
      wordWrap: 'break-word'
    },

    boxTwo: {
      flex: width < 512 ? 6 : 7,
      padding: width < 480 ? 10 : 20,
      justifyContent: 'space-between',
      lineHeight: 1.4,
      overflow: 'hidden',
      wordWrap: 'break-word'
    }
  })
}

export { styles }
