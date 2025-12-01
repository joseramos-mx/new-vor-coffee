"use client";

import { createContext, useContext, useEffect, useState } from "react";
// Importamos las nuevas funciones
import { createCart, addToCart, getCart, removeFromCart, updateCart } from "@/lib/shopify";

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // Útil para mostrar spinners

  useEffect(() => {
    const loadCart = async () => {
      const storedCartId = localStorage.getItem("vor_cart_id");
      if (storedCartId) {
        const existingCart = await getCart(storedCartId);
        if (existingCart) setCart(existingCart);
      }
    };
    loadCart();
  }, []);

  const addItem = async (variantId: string, quantity: number) => {
    setIsUpdating(true);
    setIsOpen(true);
    try {
      let cartId = cart?.id;
      if (!cartId) {
        const newCart = await createCart();
        cartId = newCart.id;
        localStorage.setItem("vor_cart_id", cartId);
      }
      const updatedCart = await addToCart(cartId, [{ merchandiseId: variantId, quantity }]);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // --- NUEVA FUNCIÓN: BORRAR ITEM ---
  const removeItem = async (lineId: string) => {
    setIsUpdating(true);
    try {
        const updatedCart = await removeFromCart(cart.id, [lineId]);
        setCart(updatedCart);
    } catch (error) {
        console.error("Error removing item:", error);
    } finally {
        setIsUpdating(false);
    }
  };

  // --- NUEVA FUNCIÓN: ACTUALIZAR CANTIDAD ---
  const updateItem = async (lineId: string, quantity: number) => {
    setIsUpdating(true);
    try {
        // Si la cantidad es 0, mejor lo borramos
        if (quantity < 1) {
            await removeItem(lineId);
            return;
        }
        const updatedCart = await updateCart(cart.id, [{ id: lineId, quantity }]);
        setCart(updatedCart);
    } catch (error) {
        console.error("Error updating item:", error);
    } finally {
        setIsUpdating(false);
    }
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider value={{ 
        cart, isOpen, openCart, closeCart, isUpdating,
        addItem, removeItem, updateItem // Exportamos las nuevas funciones
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);