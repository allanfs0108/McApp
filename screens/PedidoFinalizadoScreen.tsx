import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from 'react-native';

import {
    Ionicons,
} from '@expo/vector-icons';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from './HomeScreen';

import { useCart } from '../context/CartContext';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'PedidoFinalizado'
>;

export default function PedidoFinalizadoScreen({
    navigation,
    route,
}: Props) {
    const { total } = route.params;

    const { clearCart } = useCart();

    function formatPrice(value: number) {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    }

    function finalizarPedido() {
        clearCart();

        navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'Home',
                },
            ],
        });
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#FFFFFF"
            />

            <View style={styles.content}>
                <View style={styles.successCircle}>
                    <Ionicons
                        name="checkmark"
                        size={65}
                        color="#FFFFFF"
                    />
                </View>

                <Text style={styles.title}>
                    Pedido finalizado!
                </Text>

                <Text style={styles.subtitle}>
                    Pagamento efetuado com sucesso.
                </Text>

                <View style={styles.orderCard}>
                    <Text style={styles.orderTitle}>
                        Pedido confirmado
                    </Text>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.label}>
                            Status
                        </Text>

                        <Text style={styles.status}>
                            Pago
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>
                            Pagamento
                        </Text>

                        <Text style={styles.value}>
                            Online
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>
                            Total
                        </Text>

                        <Text style={styles.total}>
                            {formatPrice(total)}
                        </Text>
                    </View>
                </View>

                <View style={styles.infoBox}>
                    <Ionicons
                        name="restaurant-outline"
                        size={24}
                        color="#000"
                    />

                    <Text style={styles.infoText}>
                        Seu pedido foi enviado para a cozinha.
                        Aguarde enquanto preparamos sua refeição!
                    </Text>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={finalizarPedido}
                >
                    <Text style={styles.buttonText}>
                        Voltar para o início
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },

    successCircle: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: '#2BAA3B',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
    },

    title: {
        fontSize: 27,
        fontWeight: '700',
        color: '#000',
        textAlign: 'center',
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 15,
        color: '#707070',
        textAlign: 'center',
        marginBottom: 30,
    },

    orderCard: {
        width: '100%',
        backgroundColor: '#F7F7F7',
        borderRadius: 18,
        padding: 20,
    },

    orderTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        marginBottom: 12,
    },

    divider: {
        height: 1,
        backgroundColor: '#DDDDDD',
        marginBottom: 14,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 13,
    },

    label: {
        fontSize: 14,
        color: '#707070',
    },

    value: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },

    status: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2BAA3B',
    },

    total: {
        fontSize: 17,
        fontWeight: '700',
        color: '#000',
    },

    infoBox: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8DD',
        borderRadius: 14,
        padding: 15,
        marginTop: 16,
        gap: 12,
    },

    infoText: {
        flex: 1,
        fontSize: 13,
        lineHeight: 19,
        color: '#555',
    },

    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },

    button: {
        backgroundColor: '#FFC72C',
        borderRadius: 24,
        paddingVertical: 15,
        alignItems: 'center',
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
});