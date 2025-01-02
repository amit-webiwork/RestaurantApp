import React, { memo, useState } from 'react';
import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    View
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import { VP } from '../../utils/Responsive';
import { CDN_URL } from '../../utils/Constants';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false
});

interface Props {
    data: string[];
}

const width = Dimensions.get('window').width;

const BannerTwo: React.FunctionComponent<Props> = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const renderDots = () => (
        <View style={styles.pagination}>
            {data.map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        activeIndex === index ? styles.activeDot : null,
                    ]}
                />
            ))}
        </View>
    );

    return (
        <View style={{ flex: 1, zIndex: 9999999 }}>
            <Carousel
                loop={true}
                testID={"xxx"}
                width={width}
                height={width / 2}
                autoPlay={true}
                data={data}
                scrollAnimationDuration={1500}
                autoPlayInterval={2000}
                // defaultScrollOffsetValue={scrollOffsetValue}
                onSnapToItem={(index) => setActiveIndex(index)}
                renderItem={({ item, index }) => (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <ImageBackground
                            source={{ uri: `${CDN_URL}${item}`, cache: 'force-cache' }}
                            style={styles.bg}
                        >
                        </ImageBackground>
                    </View>
                )}
                panGestureHandlerProps={{
                    activeOffsetX: [-10, 10],
                }}
            />
            {data.length > 1 && renderDots()}
        </View>
    );
};

// const BannerTwo: React.FunctionComponent<Props> = ({ data }) => {
//     return (
//         <TouchableOpacity
//             onPress={() => void (0)}
//             style={{}}
//         >
//             <ImageBackground source={require(`../../assets/images/banner-1.png`)} style={styles.bg}>
//             </ImageBackground>
//         </TouchableOpacity>
//     );
// };

const styles = StyleSheet.create({
    bg: {
        width: "100%",
        height: VP(194),
        resizeMode: "contain",
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#000',
    },
});

const BannerTwoSection = memo(BannerTwo);
export default BannerTwoSection;
