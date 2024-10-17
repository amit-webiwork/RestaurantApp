import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { globalStyle } from '../../../utils/GlobalStyle';
import { FS, HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { TextStyles } from '../../../utils/TextStyles';
import { COLORS } from '../../../utils/Constants';
import PopularMenuItemsSection from '../../../components/items/PopularMenuItems';
import CartLayout from '../../../components/cart/CartLayout';
import { getItemList } from '../../../utils/ApiCall';

const limit = 10;

interface HeaderProps {
    name: string;
}

const HeaderComponent = ({ name }: HeaderProps) => {
    return (
        <>
            {/* Heading */}
            <View style={{ paddingHorizontal: HP(21) }}>
                <Text style={styles.heading}>De lounge Popular {name}</Text>
            </View>
        </>
    )
}

function PopularMenuScreen({ route, navigation }: { route: any; navigation: any }): React.JSX.Element {
    const { params } = route;
    const { categoryId, name } = params;

    const [loader, setLoader] = useState(false);
    const [itemList, setItemList] = useState<ItemDetails[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMoreData, setHasMoreData] = useState<boolean>(true);

    const fetchItem = async (page: number) => {
        if (loader || !hasMoreData) return;

        setLoader(true);
        try {
            const params = { categoryIds: categoryId ? categoryId : '' }

            const offset = (page - 1) * limit;

            const response = await getItemList({ popular: 1, ...params }, limit, offset);

            if (response?.data?.length > 0) {
                setItemList(prev => [...prev, ...response?.data || []]);
            } else {
                setHasMoreData(false); // No more data to fetch
            }
        } catch (err) {
            setHasMoreData(false); // No more data to fetch
        } finally {
            setLoader(false);
        }
    }

    const loadMoreItems = useCallback(() => {
        if (!loader && hasMoreData) {
            setPage(prevPage => prevPage + 1);
        }
    }, [loader, hasMoreData, setPage]);

    useEffect(() => {
        console.log('-----run');
        fetchItem(page);
    }, [categoryId, page])

    return (
        <OuterLayout containerStyle={globalStyle.containerStyle}>
            <InnerBlock>
                <View style={{ paddingVertical: HP(20), marginBottom: VP(0) }}>
                    {/* Top navigation */}
                    <View style={{ paddingHorizontal: HP(21), paddingBottom: HP(20) }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{ alignSelf: "center" }}
                            >
                                <Icon type={Icons.Feather} size={FS(18)} name={`chevron-left`} color={COLORS.BLACK} />
                            </TouchableOpacity>
                            <Text style={styles.topHeading}>popular {name}</Text>
                        </View>
                    </View>

                    <View style={{}}>
                        <PopularMenuItemsSection
                            data={itemList}
                            dataLoaded={loader}
                            navigation={navigation}
                            loadMore={loadMoreItems}
                            hasMoreData={hasMoreData}
                            HeaderComponent={HeaderComponent}
                            name={name}
                        />
                    </View>
                </View>
            </InnerBlock>
            <CartLayout children={undefined} navigation={navigation}></CartLayout>
        </OuterLayout>
    )
}

const styles = StyleSheet.create({
    topHeading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: "#000000",
        fontSize: 18,
        textTransform: "capitalize",
        textAlign: "center",
        flex: 1
    },
    heading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: "#000000",
        fontSize: 18,
        textTransform: "capitalize"
    }
});

export default PopularMenuScreen;