import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useState } from 'react'
import { postData, getData } from '../api/common_service'

const Create = ({ data, setData, toggle, setToggle }) => {
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [itemId, setItemId] = useState(null);

    const handleAddItem = async () => {
        if (itemName && itemQuantity) {
            const data = {
                id: itemId,
                name: itemName,
                stock: itemQuantity
            }
            try {
                const response = await postData('add/item', data);
                if (response.status == 'SUCCESS') {
                    alert(response.message);
                    setToggle(!toggle);
                    if (!isEditing) {
                        setItemName('');
                        setItemQuantity('');
                    }
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            alert('Please enter both item name and quantity');
        }
    };

    const handleEditItem = (name, stock, id) => {
        setIsEditing(true);
        setItemName(name);
        setItemQuantity(stock);
        setItemId(id);
    };

    const handleDeleteItem = async (id) => {
        try {
            const response = await getData(`delete/item/${id}`);
            if (response.status == 'SUCCESS') {
                alert(response.message);
                setToggle(!toggle);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleBack = () => {
        setIsEditing(false);
        setItemName('');
        setItemQuantity('');
        setItemId(null);
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Enter an Item...'
                style={styles.input}
                placeholderTextColor='#999'
                value={itemName}
                onChangeText={(item) => setItemName(item)}
            />
            <TextInput
                placeholder='Enter Stock Amount...'
                style={styles.input}
                placeholderTextColor='#999'
                value={String(itemQuantity || '')}
                onChangeText={(quantity => setItemQuantity(Number(quantity)))}
                keyboardType='numeric'
            />
            <Pressable style={styles.button} onPress={() => handleAddItem()}>
                <Text style={styles.buttonText}>{ isEditing ? 'EDIT ITEM' : 'ADD ITEM' }</Text>
            </Pressable>

            {isEditing && (
                <Pressable style={styles.buttonBack} onPress={() => handleBack()}>
                    <Text style={styles.buttonText}>BACK</Text>
                </Pressable>
            )}

            <View style={styles.headingContainer}>
                <Text style={styles.headingText}>All Items in the Stock</Text>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.itemContainer, { backgroundColor: item.stock < 10 ? "#FFCCCC" : "#D7F6BF" }]}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <View style={{ flexDirection: "row", gap: "25" }}>
                            <Text style={styles.itemText}>{item.stock}kg</Text>
                            <Text style={styles.itemText} onPress={() => handleEditItem(item.name, item.stock, item.id)}>Edit</Text>
                            <Text style={styles.itemText} onPress={() => handleDeleteItem(item.id)}>Delete</Text>
                        </View>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20, gap: 10 }}
            />
        </View >
    )
}

export default Create

const styles = StyleSheet.create({
    container: {
        paddingVertical: '4%',
    },
    input: {
        borderRadius: 7,
        borderWidth: 1.5,
        borderColor: '#D7F6BF',
        fontSize: 16,
        color: '#000000',
        marginBottom: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    button: {
        backgroundColor: '#CABFEEFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 7,
        alignItems: 'center',
    },
    buttonBack: {
        backgroundColor: '#ff8080',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 7,
        alignItems: 'center',
        marginVertical: 10,
        width: '30%',
        alignSelf: 'flex-end',
    },
    buttonText: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    headingText: {
        fontSize: 16,
        fontWeight: '500',
        marginVertical: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
    },
    itemText: {
        fontSize: 14,
        fontWeight: '400',
    },
});