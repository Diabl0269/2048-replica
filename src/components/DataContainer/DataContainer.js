import React from 'react'
import { View, Text } from 'react-native'
import style from './style.js'

export default ({ title, data }) => {
  return (
    <View style={style.container}>
      <Text style={style.title}>{title}</Text>
      <Text style={style.data}>{data}</Text>
    </View>
  )
}
