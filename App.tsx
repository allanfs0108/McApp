import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen, { RootStackParamList } from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import SacolaScreen from './screens/SacolaScreen';
import PedidoScreen from './screens/PedidoScreen';
import PedidoFinalizadoScreen from './screens/PedidoFinalizadoScreen';

import { CartProvider } from './context/CartContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <CartProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                    />

                    <Stack.Screen
                        name="Menu"
                        component={MenuScreen}
                    />

                    <Stack.Screen
                        name="ProductDetail"
                        component={ProductDetailScreen}
                    />

                    <Stack.Screen
                        name="Sacola"
                        component={SacolaScreen}
                    />

                    <Stack.Screen
                        name="Pedido"
                        component={PedidoScreen}
                    />

                    <Stack.Screen
                        name="PedidoFinalizado"
                        component={PedidoFinalizadoScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </CartProvider>
    );
}