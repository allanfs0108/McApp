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

type Props = NativeStackScreenProps<RootStackParamList, 'Sacola'>;

export default function SacolaScreen({ navigation }: Props) {
    const {
        items,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
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
                    Minha Sacola
                </Text>

                <View style={styles.headerSpace} />
            </View>

            {items.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons
                        name="bag-outline"
                        size={70}
                        color="#BDBDBD"
                    />

                    <Text style={styles.emptyTitle}>
                        Sua sacola está vazia
                    </Text>

                    <Text style={styles.emptyText}>
                        Adicione produtos para continuar seu pedido.
                    </Text>

                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => navigation.navigate('Menu')}
                    >
                        <Text style={styles.menuButtonText}>
                            Ver cardápio
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.list}
                    >
                        {items.map((item) => {
                            const price = Number(
                                item.product.price
                                    .replace('R$', '')
                                    .replace(/\./g, '')
                                    .replace(',', '.')
                                    .trim()
                            );

                            const itemTotal =
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
                                            style={styles.productPrice}
                                        >
                                            {formatPrice(itemTotal)}
                                        </Text>

                                        <View
                                            style={styles.quantityRow}
                                        >
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
                                                    color="#FFFFFF"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        onPress={() =>
                                            removeFromCart(
                                                item.product.id
                                            )
                                        }
                                    >
                                        <Ionicons
                                            name="trash-outline"
                                            size={22}
                                            color="#DA291C"
                                        />
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </ScrollView>

                    <View style={styles.footer}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>
                                Total
                            </Text>

                            <Text style={styles.totalValue}>
                                {formatPrice(total)}
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.continueButton}
                            onPress={() =>
                                navigation.navigate('Pedido')
                            }
                        >
                            <Text
                                style={styles.continueButtonText}
                            >
                                Continuar para o pedido
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
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

    list: {
        padding: 20,
        paddingBottom: 140,
    },

    productCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    productImage: {
        width: 85,
        height: 75,
    },

    productInfo: {
        flex: 1,
    },

    productName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000',
        marginBottom: 6,
    },

    productPrice: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000',
        marginBottom: 10,
    },

    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    quantityButton: {
        width: 30,
        height: 30,
        borderRadius: 8,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
        justifyContent: 'center',
    },

    plusButton: {
        backgroundColor: '#DA291C',
    },

    quantity: {
        fontSize: 16,
        fontWeight: '700',
        minWidth: 20,
        textAlign: 'center',
    },

    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },

    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 14,
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

    continueButton: {
        backgroundColor: '#FFC72C',
        borderRadius: 24,
        paddingVertical: 14,
        alignItems: 'center',
    },

    continueButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000',
    },

    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },

    emptyTitle: {
        fontSize: 21,
        fontWeight: '700',
        color: '#000',
        marginTop: 18,
        marginBottom: 8,
    },

    emptyText: {
        fontSize: 14,
        color: '#707070',
        textAlign: 'center',
        lineHeight: 20,
    },

    menuButton: {
        marginTop: 24,
        backgroundColor: '#FFC72C',
        borderRadius: 22,
        paddingVertical: 13,
        paddingHorizontal: 30,
    },

    menuButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000',
    },
});