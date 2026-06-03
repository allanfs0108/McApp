import {View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, SafeAreaViewBase,} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Home: undefined;
    Menu: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
export default function HomeScreen({ navigation } : Props) {
return (
    <SafeAreaView style={styles.safeArea}>
        
    </SafeAreaView>
);
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
    title: {

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
    cardLabel:{

    }
})

