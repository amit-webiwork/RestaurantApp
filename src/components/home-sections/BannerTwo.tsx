import React, { memo, useEffect, useState } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Dimensions,
    View,
    Text,
    Image,
    InteractionManager,
    ActivityIndicator
} from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive';
import Carousel from 'react-native-reanimated-carousel';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { COLORS } from '../../utils/Constants';

const getBannerImage = (index: number) => {
    const images = [
        require('../../assets/images/banner-1.png'),
        // require('../../assets/images/banner-2.webp'),
        // require('../../assets/images/banner-3.webp'),
    ];

    return images[index % images.length];  // Loop back if index exceeds array
}

const width = Dimensions.get('window').width;
const height = width * 0.6;

function SliderSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={height}
                // autoPlay={true}
                data={[...new Array(1).keys()]}
                scrollAnimationDuration={800}
                // mode="parallax"
                snapEnabled={true}
                pagingEnabled={true}
                modeConfig={{
                    parallaxScrollingScale: width > 500 ? 0.95 : 0.9,
                    parallaxScrollingOffset: 50,
                }}
                // onSnapToItem={(index) => console.log('current index:', index)}
                onSnapToItem={(index) => setCurrentIndex(index)}
                renderItem={({ index }) => (
                    <View style={[styles.slide, { height }]}>
                        <Image
                            source={getBannerImage(index)}
                            style={styles.banner}
                            resizeMethod="resize"  // Improves image loading on slow devices
                        />
                    </View>
                )}
            />

            <View style={styles.navigationContainer}>
                {[...Array(1).keys()].map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.bubble,
                            currentIndex === i && styles.activeBubble,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

// const BannerTwo: React.FunctionComponent = () => {
//     return (
//         <>
//             <TouchableOpacity
//                 onPress={() => void (0)}
//                 style={{}}
//             >
//                 <ImageBackground
//                     source={require(`../../assets/images/banner-1.png`)}
//                     style={styles.bg}
//                 >
//                 </ImageBackground>
//             </TouchableOpacity>
//         </>
//     );
// };

const BannerTwo = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const interactionHandle = InteractionManager.runAfterInteractions(() => {
            setIsLoaded(true);
        });

        return () => interactionHandle.cancel();
    }, []);

    if (!isLoaded) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator
                    size="large"
                    color={COLORS.BUTTON}
                />
            </View>
        );
    }

    return <SliderSection />;
};

const styles = StyleSheet.create({
    bg: {
        width: '100%',
        height: VP(194),
        resizeMode: 'contain',
    },
    banner: {
        width: '100%',
        height: '100%', // Adjust to take full height of the parent
        resizeMode: 'cover', // 'cover' ensures image scales properly
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', // Ensure it uses the full Carousel height
    },
    navigationContainer: {
        position: 'absolute',
        bottom: HP(10),
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bubble: {
        width: FS(10),
        height: FS(10),
        borderRadius: FS(5),
        backgroundColor: 'gray',
        marginHorizontal: 5,
    },
    activeBubble: {
        backgroundColor: 'white',
        width: FS(12),
        height: FS(12),
        borderRadius: FS(6),
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const BannerTwoSection = memo(BannerTwo);
export default BannerTwoSection;
