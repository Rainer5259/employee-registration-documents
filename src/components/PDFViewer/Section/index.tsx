import { Text, View } from '@react-pdf/renderer'
import React, { FC } from 'react'
import { styles } from './section.styles'
import { SectionProps } from './types'

export const Section: FC<SectionProps> = ({
  firstChildren,
  secondChildren,
  title
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.top}>{title}</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.boxOne}>{firstChildren}</View>
        {secondChildren && <View style={styles.boxTwo}>{secondChildren}</View>}
      </View>
    </View>
  )
}
