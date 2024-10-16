import { StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { apiEndpoints, BACKEND_URL, CDN_URL, errorMessage } from '../../utils/Constants';
import { loadStorage, saveStorage } from '../../utils/Storage';
import { setProflieDetails } from '../../redux/features/profile';
import { showFadeAlert } from '../../utils/Alert';
import { setDialogContent } from '../../redux/features/customDialog';
import { FS, HP, VP } from '../../utils/Responsive';
import Warning from '../../assets/svgs/warning.svg';
import NormalLoader from '../NormalLoader';
import { AppDispatch } from '../../redux/store';

const createFormData = (photo: { fileName: any; type: any; uri: string; }, body: any = {}) => {
    const data: any = new FormData();

    data.append('file', {
        name: photo.fileName,
        type: photo.type,
        uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
    });

    return data;
};

function ProfileImageContainer(props: any) {
    const dispatch: AppDispatch = useDispatch();

    const { profile } = props;

    const [photo, setPhoto] = useState<any>(null);
    const [loader, setLoader] = useState(false);

    const handleChoosePhoto = () => {
        launchImageLibrary({ mediaType: 'photo', quality: .6 }, (response) => {

            if (response?.assets && response?.assets[0] && response?.assets[0]['uri']) {
                setPhoto(response?.assets[0]);
                handleUploadPhoto(response?.assets[0]);
            } else {
                // setPhoto(null);
            }
        });
    };

    const handleUploadPhoto = async (photo: any) => {
        try {
            const formData = createFormData(photo);

            setLoader(true);

            const res = await axios.post(BACKEND_URL + apiEndpoints.profileUpload, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json"
                }
            });

            const resData = res.data;

            const userDetails = await loadStorage('userDetails');

            userDetails['user']['profileImg'] = resData?.profileImg || "";

            saveStorage(userDetails, "userDetails");
            dispatch(setProflieDetails(userDetails));
            setLoader(false);
            showFadeAlert(resData?.message || "Profile image uploaded successfully");
        } catch (error: any) {
            setLoader(false);
            setPhoto(null);
            dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: `${error?.response?.data?.message}` || errorMessage.commonMessage }));
        }
    };

    useEffect(() => {
        const profile_img = profile?.profileImg ? { uri: `${CDN_URL}${profile?.profileImg}` } : null;
        setPhoto(profile_img);
    }, [profile])

    return (
        <>
            <NormalLoader visible={loader} />
            {photo ? (
                <>
                    <Image
                        source={{ uri: photo.uri }}
                        style={styles.avatar}
                    />
                </>
            ) : (<Image source={require('../../assets/images/account.png')} style={styles.avatar} />)}

            <TouchableOpacity
                onPress={handleChoosePhoto}
                style={{
                    backgroundColor: "#FFFFFF",
                    width: FS(25.33),
                    height: FS(25.33),
                    borderRadius: FS(25.33) / 2,
                    justifyContent: "center",
                    alignItems: "center",
                    top: FS(85),
                    right: FS(120),
                    position: "absolute"
                }}
            >
                <Image source={require(`../../assets/icons/pencil.png`)} style={{ width: FS(12.68), height: VP(11.98) }} />
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    avatar: {
        resizeMode: "cover",
        width: FS(115.47),
        height: FS(118.49),
        borderRadius: FS(115.47) / 2
    },
});

export default ProfileImageContainer;