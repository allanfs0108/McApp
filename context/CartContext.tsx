
import React, { createContext, useContext, useState } from 'react';
import { Product } from '../data/produtos';

export type CartItem = {
    product: Product;
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    increaseQuantity: (productId: string) => void;
    decreaseQuantity: (productId: string) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    getTotal: () => number;
    getItemCount: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    function addToCart(product: Product, quantity: number) {
        setItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.product.id === product.id
            );

            if (existingItem) {
                return currentItems.map((item) =>
                    item.product.id === product.id
                        ? {
                              ...item,
                              quantity: item.quantity + quantity,
                          }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    product,
                    quantity,
                },
            ];
        });
    }

    function increaseQuantity(productId: string) {
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.product.id === productId
                    ? {
                          ...item,
                          quantity: item.quantity + 1,
                      }
                    : item
            )
        );
    }

    function decreaseQuantity(productId: string) {
        setItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.product.id === productId
                        ? {
                              ...item,
                              quantity: item.quantity - 1,
                          }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    }

    function removeFromCart(productId: string) {
        setItems((currentItems) =>
            currentItems.filter((item) => item.product.id !== productId)
        );
    }

    function clearCart() {
        setItems([]);
    }

    function parsePrice(price: string) {
        return Number(
            price
                .replace('R$', '')
                .replace(/\./g, '')
                .replace(',', '.')
                .trim()
        );
    }

    function getTotal() {
        return items.reduce((total, item) => {
            const price = parsePrice(item.product.price);

            return total + price * item.quantity;
        }, 0);
    }

    function getItemCount() {
        return items.reduce((total, item) => total + item.quantity, 0);
    }

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart,
                getTotal,
                getItemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart deve ser usado dentro de CartProvider');
    }

    return context;
}