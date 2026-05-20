import {View, Text, Image, StyleSheet, TouchableOpacity,
  SafeAreaView, StatusBar
} from 'react-native';
 
import {MaterialCommunityIcons, Feather} from '@expo/vector-icons';
 
export default function App() {
  return (
    <SafeAreaView>
      <StatusBar/>
      <View>
        <View>
            <Image />
            <Text>McDonald's</Text>
        </View>
        <View>
          <Text>Seja Bem-vindo!</Text>
          <Text>Esxolha como prefere aproveitar sua refeição. Estamos aqui para
            oferecer praticidade e sabor em cada detalhe!
            </Text>
        </View>
        <View>
          <TouchableOpacity>
          <View>
              <MaterialCommunityIcons
              name="hamburger"
              />
          </View>
          <View>
            <Text>Para comer aqui!</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <Feather name="shopping-bag" />
            </View>
            <View>
              <Text>Para levar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  safeArea: {
 
  },
  container: {
 
  },
  header: {
 
  },
  logo: {
 
  },
  brandName: {
 
  },
  welcomeSection: {
 
  },
  title:{
   
  },
  subtitle: {
 
  },
  cardsRow: {
 
  },
  card: {
 
  },
  iconCircle: {
 
  },
  cardLabelPill: {
 
  },
  cardLabel: {
 
  },                                                                                                                                                                                                                                                                                                                                                                                                                                          
});