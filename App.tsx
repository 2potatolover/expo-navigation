import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

type brainnour = {
  id: string;
  name: string;
  price: number;
};

type kaicenat =brainnour & {
  quantity: number;
};

const App = () => {
  const [cart, setCart] = useState<brainnour[]>([]);
  const [brainrotitems] = useState<brainnour[]>([
    { id: '1', name: 'Skibuddy toilet', price: 69.69 },
    { id: '2', name: 'Pewdiepies Chair', price: 399.99 },
    { id: '3', name: 'Duke Dennis', price: 2.49 },
    { id: '4', name: 'Prime bottle (empty)', price: 500.49 },
    { id: '5', name: 'Pyrocynical Plush', price: 200.99 },
  ]);

  const purchaserot = (item: brainnour) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((kaicenat) => kaicenat.id === item.id);
      if (existingItem) {
        return prevCart.map((kaicenat) =>
          kaicenat.id === item.id
            ? { ...kaicenat, quantity: kaicenat.quantity + 1 }
            : kaicenat
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const brainhealing = (item: kaicenat) => {
    setCart((prevCart) =>
      prevCart.reduce((acc, kaicenat) => {
        if (kaicenat.id === item.id && kaicenat.quantity > 1) {
          acc.push({ ...kaicenat, quantity: kaicenat.quantity - 1 });
        } else if (kaicenat.id !== item.id) {
          acc.push(kaicenat);
        }
        return acc;
      }, [] as kaicenat[])
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Grocery Store</Text>

      <FlatList
        data={brainrotitems}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>
              {item.name} - ${item.price.toFixed(2)}
            </Text>
            <Button title="Add to Cart" onPress={() => purchaserot(item)} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      <Text style={styles.cartHeader}>Your Cart</Text>
      {cart.length > 0 ? (
        <FlatList
          data={cart}
          renderItem={({ item }) => (
            <View style={styles.kaicenat}>
              <Text>{item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}</Text>
              <TouchableOpacity onPress={() => brainhealing(item)}>
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
  kaicenat: {
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
