import React, { memo } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Dimensions,
    View,
    Text
} from 'react-native';

import { VP } from '../../utils/Responsive';
import Carousel from 'react-native-reanimated-carousel';

function SliderSection() {
    const width = Dimensions.get('window').width;
    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={[...new Array(6).keys()]}
                scrollAnimationDuration={1000}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: width > 500 ? 0.95 : 0.9,
                    parallaxScrollingOffset: 50,
                  }}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {index}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}

const BannerTwo: React.FunctionComponent = () => {
    return (
        <>
            <SliderSection />
            <TouchableOpacity
                onPress={() => void (0)}
                style={{}}
            >
                <ImageBackground source={require(`../../assets/images/banner-1.png`)} style={styles.bg}>
                </ImageBackground>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    bg: {
        width: "100%",
        height: VP(194),
        resizeMode: "contain",
    },
});

const BannerTwoSection = memo(BannerTwo);
export default BannerTwoSection;
