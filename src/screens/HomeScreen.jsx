import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import AllItems from './AllItems';
import Create from './Create';
import { getData } from '../api/common_service';

const HomeScreen = () => {
    const [data, setData] = useState([]);
    const [toggle , setToggle] = useState(false);
    const [activeScreen, setActiveScreen] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getAllItem = async () => {
            try {
                const response = await getData('get/allitems');
                console.log('Full Response:', response);
                if (response.status == 'SUCCESS') {
                    setData(response.data);
                    setIsLoading(false);
                } else {
                    console.log('Error fetching data:', response.message);
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        getAllItem();
    }, [activeScreen , toggle]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <View style={styles.buttonContainer}>
                <Pressable style={[styles.button, activeScreen === 0 ? { backgroundColor: 'green' } : null]} onPress={() => setActiveScreen(0)}>
                    <Text style={[styles.buttonText, activeScreen === 0 ? { color: '#fff' } : null]}>All Items</Text>
                </Pressable>
                <Pressable style={[styles.button, activeScreen === 1 ? { backgroundColor: 'green' } : null]} onPress={() => setActiveScreen(1)}>
                    <Text style={[styles.buttonText, activeScreen === 1 ? { color: '#fff' } : null]}>Low Stock</Text>
                </Pressable>
                <Pressable style={[styles.button, activeScreen === 2 ? { backgroundColor: 'green' } : null]} onPress={() => setActiveScreen(2)}>
                    <Text style={[styles.buttonText, activeScreen === 2 ? { color: '#fff' } : null]}>Create</Text>
                </Pressable>
            </View>
            {activeScreen === 0 && <AllItems data={data} isLoading={isLoading} />}
            {activeScreen === 1 && <AllItems data={data.filter((item) => item.stock < 10)} />}
            {activeScreen === 2 && <Create data={data} setData={setData} toggle={toggle} setToggle={setToggle}/>}
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: '4%',
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    buttonContainer: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        gap: 10,
        marginVertical: 40,
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'green',
    },
    buttonText: {
        color: 'green',
        fontSize: 12,
    },
});




























// import React from 'react';
// // import Test1 from './Test1.tsx';
// // import Test2 from './Test2.tsx';
// import Test3 from './Test3.tsx';

// const App = () => {

//   return (
//     <Test3/>
//   );
// };

// export default App;

