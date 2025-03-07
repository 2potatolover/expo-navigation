import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// Define types for grocery item and cart item
type GroceryItem = {
  id: string;
  name: string;
  price: number;
};

type CartItem = GroceryItem & {
  quantity: number;
};

const App = () => {
  // State for grocery items and cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [groceryItems] = useState<GroceryItem[]>([
    { id: '1', name: 'Apple', price: 1.99 },
    { id: '2', name: 'Banana', price: 0.99 },
    { id: '3', name: 'Carrot', price: 2.49 },
    { id: '4', name: 'Milk', price: 3.49 },
    { id: '5', name: 'Eggs', price: 2.99 },
  ]);

  // Add item to cart
  const addToCart = (item: GroceryItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (item: CartItem) => {
    setCart((prevCart) =>
      prevCart.reduce((acc, cartItem) => {
        if (cartItem.id === item.id && cartItem.quantity > 1) {
          acc.push({ ...cartItem, quantity: cartItem.quantity - 1 });
        } else if (cartItem.id !== item.id) {
          acc.push(cartItem);
        }
        return acc;
      }, [] as CartItem[])
    );
  };

  // Calculate total price of the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Grocery Store</Text>

      {/* Grocery items list */}
      <FlatList
        data={groceryItems}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>
              {item.name} - ${item.price.toFixed(2)}
            </Text>
            <Button title="Add to Cart" onPress={() => addToCart(item)} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      <Text style={styles.cartHeader}>Your Cart</Text>
      {/* Cart items list */}
      {cart.length > 0 ? (
        <FlatList
          data={cart}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text>{item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}</Text>
              <TouchableOpacity onPress={() => removeFromCart(item)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>Your cart is empty</Text>
      )}

      <Text style={styles.total}>Total: ${calculateTotal()}</Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  cartHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
  cartItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  removeText: {
    color: 'red',
    fontSize: 14,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default App;
