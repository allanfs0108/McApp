import React from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
} from 'react-native';

import {
    Ionicons,
} from '@expo/vector-icons';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from './HomeScreen';

import { useCart } from '../context/CartContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Pedido'>;

export default function PedidoScreen({ navigation }: Props) {
    const {
        items,
        increaseQuantity,
        decreaseQuantity,
        getTotal,
    } = useCart();

    const total = getTotal();

    function formatPrice(value: number) {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#FFFFFF"
            />

            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="chevron-back"
                        size={24}
                        color="#000"
                    />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    Seu Pedido
                </Text>

                <View style={styles.headerSpace} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <Text style={styles.sectionTitle}>
                    Resumo do pedido
                </Text>

                {items.map((item) => {
                    const price = Number(
                        item.product.price
                            .replace('R$', '')
                            .replace(/\./g, '')
                            .replace(',', '.')
                            .trim()
                    );

                    const totalProduto =
                        price * item.quantity;

                    return (
                        <View
                            key={item.product.id}
                            style={styles.productCard}
                        >
                            <Image
                                source={item.product.image}
                                style={styles.productImage}
                                resizeMode="contain"
                            />

                            <View style={styles.productInfo}>
                                <Text
                                    style={styles.productName}
                                >
                                    {item.product.name}
                                </Text>

                                <Text
                                    style={styles.unitPrice}
                                >
                                    {item.product.price} cada
                                </Text>

                                <View style={styles.quantityRow}>
                                    <TouchableOpacity
                                        style={styles.quantityButton}
                                        onPress={() =>
                                            decreaseQuantity(
                                                item.product.id
                                            )
                                        }
                                    >
                                        <Ionicons
                                            name="remove"
                                            size={18}
                                            color="#000"
                                        />
                                    </TouchableOpacity>

                                    <Text
                                        style={styles.quantity}
                                    >
                                        {item.quantity}
                                    </Text>

                                    <TouchableOpacity
                                        style={[
                                            styles.quantityButton,
                                            styles.plusButton,
                                        ]}
                                        onPress={() =>
                                            increaseQuantity(
                                                item.product.id
                                            )
                                        }
                                    >
                                        <Ionicons
                                            name="add"
                                            size={18}
                                            color="#FFF"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Text style={styles.itemTotal}>
                                {formatPrice(totalProduto)}
                            </Text>
                        </View>
                    );
                })}

                <View style={styles.summary}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>
                            Subtotal
                        </Text>

                        <Text style={styles.summaryValue}>
                            {formatPrice(total)}
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>
                            Taxa de entrega
                        </Text>

                        <Text style={styles.free}>
                            Grátis
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.summaryRow}>
                        <Text style={styles.totalLabel}>
                            Total
                        </Text>

                        <Text style={styles.totalValue}>
                            {formatPrice(total)}
                        </Text>
                    </View>
                </View>

                <View style={styles.paymentCard}>
                    <View style={styles.paymentIcon}>
                        <Ionicons
                            name="card-outline"
                            size={25}
                            color="#000"
                        />
                    </View>

                    <View style={styles.paymentInfo}>
                        <Text style={styles.paymentTitle}>
                            Forma de pagamento
                        </Text>

                        <Text style={styles.paymentText}>
                            Pagamento online
                        </Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.paymentButton}
                    onPress={() =>
                        navigation.navigate(
                            'PedidoFinalizado',
                            {
                                total,
                            }
                        )
                    }
                >
                    <Text style={styles.paymentButtonText}>
                        Pagar {formatPrice(total)}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },

    header: {
        height: 90,
        paddingTop: 35,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },

    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerSpace: {
        width: 40,
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },

    content: {
        padding: 20,
        paddingBottom: 130,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        marginBottom: 16,
    },

    productCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },

    productImage: {
        width: 75,
        height: 65,
        marginRight: 10,
    },

    productInfo: {
        flex: 1,
    },

    productName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000',
        marginBottom: 4,
    },

    unitPrice: {
        fontSize: 12,
        color: '#707070',
        marginBottom: 8,
    },

    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    quantityButton: {
        width: 28,
        height: 28,
        borderRadius: 7,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
        justifyContent: 'center',
    },

    plusButton: {
        backgroundColor: '#DA291C',
    },

    quantity: {
        fontSize: 15,
        fontWeight: '700',
        minWidth: 18,
        textAlign: 'center',
    },

    itemTotal: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000',
    },

    summary: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 18,
        marginTop: 8,
    },

    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },

    summaryLabel: {
        fontSize: 14,
        color: '#707070',
    },

    summaryValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },

    free: {
        color: '#2BAA3B',
        fontWeight: '700',
    },

    divider: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginVertical: 8,
    },

    totalLabel: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
    },

    totalValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },

    paymentCard: {
        marginTop: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },

    paymentIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    paymentInfo: {
        flex: 1,
    },

    paymentTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000',
        marginBottom: 4,
    },

    paymentText: {
        fontSize: 13,
        color: '#707070',
    },

    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        padding: 18,
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },

    paymentButton: {
        backgroundColor: '#FFC72C',
        borderRadius: 24,
        paddingVertical: 15,
        alignItems: 'center',
    },

    paymentButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
});