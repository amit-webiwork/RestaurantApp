
import React, { useEffect, useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, TouchableOpacity, View, Image, BackHandler, Text, StyleSheet, ImageBackground } from 'react-native';

import OuterLayout from '../../components/OuterLayout';
import { AuthStackParamList } from '../../navigations/AuthStackNavigator';
import InnerBlock from '../../components/InnerBlock';
import { Button } from '../../components/Button';
import { FS, HP, VP } from '../../utils/Responsive';
import { showAlert } from '../../utils/Alert';
import { removeStorage, saveStorage } from '../../utils/Storage';
import { TextStyles } from '../../utils/TextStyles';
import { globalStyle } from '../../utils/GlobalStyle';
import CustomTextInput from '../../components/CustomTextInput';
import { COLORS } from '../../utils/Constants';

type NavigationProp = NativeStackScreenProps<AuthStackParamList>;

const SignUpScreen: React.FunctionComponent<NavigationProp> = ({
    navigation,
}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [passwordHide, setPasswordHide] = useState(true);
    const [icon, setIcon] = useState('eyeclosed.png');

    const [error, setError] = useState({ name: { status: false, text: "" }, email: { status: false, text: "" }, mobile: { status: false, text: "" }, password: { status: false, text: "" } });
    const [loading, setLoading] = useState(false);

    const [showMessage, setShowMessage] = useState(false);
    const [code1, setCode1] = useState("");

    const handlePasswordHide = () => {
        setPasswordHide((pre) => !pre)
    }

    const handleOnPress = () => {
        try {
            const firstNameVal = firstName.trim();
            const lastNameVal = lastName.trim();

            if (firstNameVal === "") {
                setError((pre) => ({ ...pre, firstName: { status: true, text: "Firstname is required!" } }));
                throw new Error("Firstname is required!");
            }

            setError((pre) => ({ ...pre, firstName: { status: false, text: "" } }));

            if (lastNameVal === "") {
                setError((pre) => ({ ...pre, lastName: { status: true, text: "Lastname is required!" } }));
                throw new Error("Lastname is required!");
            }

            setLoading(true);

            setError((pre) => ({ ...pre, lastName: { status: false, text: "" } }));

            saveStorage({ "firstname": firstNameVal, "lastname": lastNameVal }, "userDetails");

            setLoading(false);

            navigation.navigate(`HomeScreen`)

        } catch (err: any) {
            console.log(err)
        }
    };

    const dumpStorage = async () => {
        removeStorage("userDetails");
    }

    useEffect(() => {
        dumpStorage();
    }, [])

    return (
        <OuterLayout containerStyle={globalStyle.containerStyle}>
            <InnerBlock>
                <ImageBackground source={require('../../assets/images/bg.png')} style={styles.bg}>
                    <View style={styles.main}>
                        <View style={styles.subMain}>
                            <Text style={styles.headingText}>sign up</Text>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{ marginTop: VP(14) }}>
                                    <CustomTextInput
                                        placeholder='Full Name'
                                        formProps={{ text: name, setText: setName, error: error.name }}
                                        maxLength={100}
                                        styleInput={[styles.textInputStyle, {
                                            height: "auto"
                                        }]}
                                    />

                                    <CustomTextInput
                                        placeholder='Email'
                                        formProps={{ text: email, setText: setEmail, error: error.email }}
                                        maxLength={100}
                                        styleInput={[styles.textInputStyle, {
                                            height: "auto",
                                            marginTop: VP(13)
                                        }]}
                                    />

                                    <CustomTextInput
                                        placeholder='Mobile Number'
                                        formProps={{ text: mobile, setText: setMobile, error: error.mobile }}
                                        maxLength={20}
                                        styleInput={[styles.textInputStyle, {
                                            height: "auto",
                                            marginTop: VP(13)
                                        }]}
                                    />

                                    <CustomTextInput
                                        placeholder='Password'
                                        formProps={{ text: password, setText: setPassword, error: error.password }}
                                        maxLength={100}
                                        secureTextEntry={passwordHide}
                                        iconName={passwordHide ? require(`../../assets/icons/eyeclosed.png`) : require(`../../assets/icons/eyeopen.png`)}
                                        iconClick={true}
                                        iconAction={handlePasswordHide}
                                        styleInput={[styles.textInputStyle, {
                                            height: "auto",
                                            marginTop: VP(13)
                                        }]}
                                    />
                                </View>
                            </ScrollView>

                            <TouchableOpacity
                                onPress={() => navigation.navigate(`ForgotScreen`)}
                                style={{ marginTop: VP(16.5), alignSelf: "flex-end" }}
                            >
                                <Text style={{ ...TextStyles.RALEWAY_SEMI_BOLD, color: COLORS.BUTTON, fontSize: FS(12) }}>Forgot Password?</Text>
                            </TouchableOpacity>

                            <View>
                                <Button
                                    text={'sign up'}
                                    onPress={() => void (0)}
                                    textStyle={styles.buttonStyle}
                                    isLoading={false}
                                    activeButtonText={{ opacity: .65 }}
                                    mainContainerStyle={{ marginTop: VP(29) }}
                                    LinearGradienrColor={["#FF00E2", "#FF00E2"]}
                                    contentContainerStyle={{ top: -2 }}
                                />
                            </View>

                            <View style={{ flexDirection: "row", marginTop: VP(11), justifyContent: "center", alignItems: "center", gap: 7 }}>
                                <View style={styles.line}></View>
                                <Text style={{ ...TextStyles.RALEWAY_SEMI_BOLD, fontSize: FS(12) }}>Or</Text>
                                <View style={styles.line}></View>
                            </View>

                            <View style={{ flexDirection: "row", marginTop: VP(24.5), justifyContent: "center", gap: 14 }}>
                                <TouchableOpacity
                                    onPress={() => void (0)}
                                    style={{}}
                                >
                                    <Image source={require('../../assets/icons/facebook.png')} style={styles.icon} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => void (0)}
                                    style={{}}
                                >
                                    <Image source={require('../../assets/icons/google.png')} style={styles.icon} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: VP(42), flexDirection: "row", justifyContent: "center", gap: 6 }}>
                                <Text style={{ ...TextStyles.RALEWAY_SEMI_BOLD, fontSize: FS(12) }}>Already Have An Account?</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate(`LoginScreen`)}
                                    style={{}}
                                >
                                    <Text style={{ ...TextStyles.RALEWAY_SEMI_BOLD, fontSize: FS(12), color: COLORS.THEME }}>Log In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </InnerBlock>
        </OuterLayout>
    );
};

const styles = StyleSheet.create({
    bg: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    main: {
        marginHorizontal: HP(27),
        marginVertical: VP(60),
        backgroundColor: COLORS.BACKGROUND,
        borderRadius: 46,
    },
    subMain: {
        marginHorizontal: HP(30),
        marginVertical: VP(49),
    },
    headingText: {
        ...TextStyles.RALEWAY_BOLD,
        color: COLORS.THEME,
        fontSize: FS(28),
        textTransform: "capitalize"
    },
    textInputStyle: {
        width: "100%",
    },
    buttonStyle: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: FS(20),
        color: COLORS.WHITE,
        textTransform: "capitalize",
    },
    line: {
        height: 1,
        backgroundColor: "#929292",
        width: "20%",
    },
    icon: {
        width: HP(24),
        height: VP(24),
        resizeMode: "contain"
    }
});

export default SignUpScreen;
