import axios from 'axios';
import Video, { DRMType } from 'react-native-video';
import { View, Button, Text, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';

const Login = ({ route }) => {
  const [urlS, setUrl] = useState(null);
    const [tokenS, setToken] = useState(null);
    const [selectedQuality, setSelectedQuality] = useState(null);
    useEffect(() => {
        const { token } = route.params;
        let device = 0;
        if (Platform.OS === 'android') {
            device = 1
        } else {
            device = 2
        }

      

        const url = "https://api.videocrypt.com/getVideoDetailsDrm"
        const formData = new FormData();
        formData.append('flag', 1);
        formData.append('name', "3402280_0_4983245221790388");
        // 3402280_0_4983245221790388
        axios({
            url: url,
            method: "POST",
            headers: {
                'accessKey': "UkxINFFWOUEzQ1U4RlRLWE8wWU4=",
                'secretKey': "eit1bHNjRUF3QjBrOVQ3THg2Zk1pNXFkbWJLU0hoT1dqWXluMXJhMw==",
                'device-type': device,
                'user-id': "ADMIN_10000097_97",
                'device-id': '3402280_0_4983245221790388',
                'version': '2',
                'device-name': 'ChromeCDM',
                'account-id': '10000814',
                "Content-Type": 'multipart/form-data'
            },
            data: formData
        }).then((res) => {
            console.log("res", res.data.data)
            // setVideoUrl(res.data.data.link.token)
            setToken(res.data.data.link.token)
            // console.log("token", res.data.data.link.token)
            setUrl(res.data.data.link.file_url)
            console.log("token", res.data.data.link.token)
        })
        // console.warn(tokenS)
    }, [])

    const handleQualityChange = (quality) => {
        setSelectedQuality(quality);
    };

    return (
        <View>
            <Text>Hellooo</Text>
            <Video
                source={{
                    uri: "https://dtuzmefvo5j7s.cloudfront.net/hustle_prod/prodapp/video-encrypt/vod_drm_ios/3402280/1683553136_8023098943798627/07da5636-fb57-4ab4-a6cc-4447ad8c5db7.m3u8"
                }}
                selectableTrack={{
                    type: 'resolution',
                    values: ['240p', '360p', '480p', '720p', '1080p'],
                    selected: selectedQuality,
                    onSelect: handleQualityChange
                }}
                paused={false}
                onLoad={() => console.log('onLoad')}
                onLoadStart={() => console.log('onLoadStart')}
                muted={false}               
                {...tokenS ? {
                        drm: {
                            type: 'fairplay',
                            licenseServer: 'https://license.videocrypt.com/validateLicence?pallyconCustomdataV2='+tokenS,
                            certificateUrl: 'https://license.pallycon.com/ri/fpsKeyManager.do?siteId=SKM1',
                            base64Certificate: true,
                            headers: {
                                'pallycon-customdata-v2': tokenS,
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }
                } : {}}
                volume={1}
                style={{
                    width: '100%',
                    height: 300,
                }}
                controls={true}
                onError={err => {
                    console.log('[err]', err);
                }}
            />
        </View>

     
    );

}

export default Login;











   //     <View >
        //        <Text>{tokenS}</Text>
        //        <Text>{urlS}</Text>

        //         <Video
        //       source={{
        //         uri: urlS, 
        //       }}
        //       selectableTrack={{
        //           type: 'resolution',
        //           values: ['240p', '360p', '480p', '720p', '1080p'],
        //           selected: selectedQuality,
        //           onSelect: handleQualityChange
        //         }}
        //       paused={false}
        //       onLoad={() => console.log('onLoad')}
        //       onLoadStart={() => console.log('onLoadStart')}
        //       muted={false}
        //       //
        //       {...tokenS? {
        //         drm : {
        //           type: 'widevine',
        //           // type : DRMType.WIDEVINE,
        //           licenseServer: 'https://license.videocrypt.com/validateLicence?pallyconCustomdataV2='+tokenS,
        //           headers: {
        //             'Authorization' : token,
        //             'Content-Type': 'application/x-www-form-urlencoded',
        //             },
        //         }
        //       } : {

        //        } }
        //       volume={1}
        //       style={{
        //         width: '100%',
        //   height: 300,
        //       }}
        //       controls={true}
        //       onError={err => {
        //         console.log('[err]', err);
        //       }}
        //     />
        //     <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        //         {['240p', '360p', '480p', '720p', '1080p'].map(quality => (
        //           <Button key={quality} title={quality} onPress={() => handleQualityChange(quality)} disabled={quality === selectedQuality} />
        //         ))}
        //       </View>
        // </View>       