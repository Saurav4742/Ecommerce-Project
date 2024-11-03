import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  Image,
} from 'react-native'
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = () => {
  const list = [



    // baki hai ye




  ];
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView>
        <View style={{
          backgroundColor: "#00CED1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center"
        }}
        >
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 7,
              gap: 10,
              backgroundColor: "white",
              borderRadius: 3,
              height: 38,
              flex: 1,
            }}
          >
            <AntDesign style={{ paddingLeft: 10 }}
              name="search1"
              size={22}
              color="black"
            />
            <TextInput placeholder='search' style={{ width: 700 }} />
          </Pressable>

          <Feather name="mic" size={24} color="black" />
        </View>

        <View style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5, padding: 10, backgroundColor: "#AFEEEE"
        }}
        >
          <Ionicons name="location-outline" size={24} color="black" />

          <Pressable>
            <Text style={{ fontSize: 13, fontWeight: 500 }}>
              Deliver to saurav - surat 395007
            </Text>
          </Pressable>

          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list.map((item, index) => (
            <Pressable>
              <Image style={{ width: 50, resizeMode: "contain" }} source={{ uri: item.image }} />
            </Pressable>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})