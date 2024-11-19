import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PDFView from 'react-native-pdf';

import { globalStyle } from '../../utils/GlobalStyle';
import { FS, HP } from '../../utils/Responsive';
import Icon, { Icons } from '../../components/Icons';
import { COLORS } from '../../utils/Constants';

const ReceiptScreen = ({ navigation, route }: { navigation: any, route: any }) => {
    const { pdfPath } = route.params;

    return (
        <View style={{flex: 1}}>
            <View style={{ paddingHorizontal: HP(18), paddingVertical: HP(20) }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={globalStyle.navigationIconBox}
                    >
                        <Icon
                            type={Icons.Feather}
                            size={FS(20)}
                            name={`chevron-left`}
                            color={COLORS.BLACK}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                {pdfPath ? (
                    <PDFView
                        style={{ flex: 1 }}
                        source={{ uri: pdfPath }} // The file path of the saved PDF
                        onError={(error) => {
                            console.log('Failed to load PDF:', error);
                        }}
                    />
                ) : (
                    <Text>No receipt available</Text>
                )}
            </View>
        </View>
    );
};

export default ReceiptScreen;
