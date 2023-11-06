import { Text, View } from '@react-pdf/renderer'
import React, { FC, useEffect, useState } from 'react'
import { SectionProps } from './types'
import { styles } from './section.styles'
export const Section: FC<SectionProps> = ({
  firstChildren,
  secondChildren,
  title
}) => {
  const [windowWith, setCurrentWindowWith] = useState(window.innerWidth)

  const currentWindowWith = () => {
    setCurrentWindowWith(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', currentWindowWith)
    return () => {
      window.removeEventListener('resize', currentWindowWith)
    }
  }, [])

  return (
    <View style={styles(windowWith).container}>
      <View style={styles(windowWith).top}>
        <Text>{title}</Text>
      </View>
      <View style={styles(windowWith).section}>
        <View style={styles(windowWith).boxOne}>{firstChildren}</View>
        {secondChildren && (
          <View style={styles(windowWith).boxTwo}>{secondChildren}</View>
        )}
      </View>
    </View>
  )
}
