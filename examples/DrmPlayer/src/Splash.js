import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Splash = ({navigation}) => {
    const [videoList, setVideoList] = useState([]);

    useEffect(() => {
        const url = "https://api.videocrypt.com/getVideoList"
        const formData = new FormData();
        formData.append('flag', 1);

        axios({
            url: url,
            method: "POST",
            headers: {
                'accessKey': "TTdBSlNPVVFWRUs0RzJORDY5SFA=",
                'secretKey': "WHc3QmhnS0VSNUZBK1ZRQ29HWk1wc2M2UFMyYUltM2pmSFR5TGtPdg==",
                'device-type': 1,
                "Content-Type": 'multipart/form-data'
            },
            data: formData
        }).then((res) => {
            setVideoList(res.data.data.video_list);
        }).catch(err => { console.log(err) })
    }, [])

    
    const handleLoadMore = () => {
        setPage(page => page + 1);
    };


    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Login', { token: item.token })}>
            <View style={styles.itemContainer} >
                <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );

return(
    <View style={{ padding: 20, }}>
            {videoList ?
                <FlatList
                    data={videoList}
                    keyExtractor={({ id }) => id.toString()}
                    renderItem={renderItem}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.2}
                />
                : <Text style={{ fontSize: 30, color: '#000' }}>Loading...</Text>}
        </View>
);

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,

    },
    itemDialogContainer: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        borderColor: '#000',
        borderWidth: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#808080',
    },
    itemBitrate: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#808080',
        width: 120,
        textAlign: 'center'
    },
    itemDownload: {
        marginTop: 10,
        padding: 5,
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default Splash;