import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { useIsFocused } from '@react-navigation/native';

import { FS, HP, VP } from '../../utils/Responsive.ts';
import { COLORS, errorMessage } from '../../utils/Constants.ts';
import { TextStyles } from '../../utils/TextStyles.ts';
import { ButtonSection as Button } from '../../components/Button.tsx';
import CategoryBoxSection from '../../components/home-sections/CategoryBox.tsx';
import PromotionalBoxSection from '../../components/home-sections/PromotionalBox.tsx';
import CategortyTabsSection from '../../components/home-sections/CategortyTabs.tsx';
import BannerOneSection from '../../components/home-sections/BannerOne.tsx';
import BannerTwoSection from '../../components/home-sections/BannerTwo.tsx';
import ItemVerticalBoxSection from '../../components/home-sections/ItemVerticalBox.tsx';
import Icon, { Icons } from '../../components/Icons';
import ItemBoxSection from '../../components/home-sections/ItemBox.tsx';
import HeadingSection from '../../components/Heading.tsx';
import {
  discountedItemLoaded,
  discountedItems,
  fetchDiscountedItems,
  fetchPopularItems,
  getFeaturedCategory,
  papularItemLoaded,
  papularItems,
} from '../../redux/features/items.ts';
import { AppDispatch } from '../../redux/store.ts';
import Right from '../../assets/svgs/right.svg';
import { proflieDetails } from '../../redux/features/profile.ts';
import CuisineBox from '../../components/home-sections/CuisineBox.tsx';
import SearchBoxItemsSection from '../../components/home-sections/SearchBoxItems.tsx';
import { askInitialPermission } from '../../utils/Permissions.ts';
import { setDialogContent } from '../../redux/features/customDialog.ts';
import Warning from '../../assets/svgs/warning.svg';
import { loadStorage, saveNotification, saveStorage } from '../../utils/Storage.ts';
import { commonSettingData, commonSettingLoaded, fetchCommonSettingData } from '../../redux/features/common-settings.ts';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

function HomeScreen({ navigation }: { navigation: any }): React.JSX.Element {
  const dispatch: AppDispatch = useDispatch();

  const isFocused = useIsFocused();

  const ProflieDetails = useSelector(proflieDetails);

  const { user } = ProflieDetails;

  const PapularItems = useSelector(papularItems);
  const PapularItemLoaded = useSelector(papularItemLoaded);

  const DiscountedItems = useSelector(discountedItems);
  const DiscountedItemLoaded = useSelector(discountedItemLoaded);

  const featuredCategory = useSelector(getFeaturedCategory);

  const CommonSettingData = useSelector(commonSettingData);
  const CommonSettingLoaded = useSelector(commonSettingLoaded);

  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [itemListFiltered, setItemListFiltered] = useState<any[]>([]);
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [notificationTrigger, setNotificationTrigger] = useState<number>(0);
  const [banner1, setBanner1] = useState<any>({});
  const [banner2, setBanner2] = useState<any[]>([]);

  const selectCategoryHandler = useCallback(
    (id: number) => {
      setSelectedCategory(id);

      // find in items
      const filtered = PapularItems.filter(
        item => item?.category_id === id || id === 0,
      );

      setItemListFiltered(filtered);
    },
    [PapularItems],
  );

  useEffect(() => {
    if (!PapularItemLoaded) {
      dispatch(fetchPopularItems());
    } else {
      setItemListFiltered(PapularItems);
    }
  }, [PapularItemLoaded]);

  useEffect(() => {
    if (!DiscountedItemLoaded) {
      dispatch(fetchDiscountedItems());
    }
  }, [DiscountedItemLoaded]);

  useEffect(() => {
    if (!CommonSettingLoaded) {
      dispatch(fetchCommonSettingData());
    }
  }, [CommonSettingLoaded]);

  // token update on initial load
  useEffect(() => {
    (async () => {
      const granted = await askInitialPermission();

      if (!granted) {
        dispatch(
          setDialogContent({
            title: <Warning width={FS(40)} height={VP(40)} />,
            message: errorMessage.notificationAccessError,
          }),
        );
      }
    })();
  }, []);

  // checkPermissions & check unread notification
  useEffect(() => {
    // checkPermissions();
    if (isFocused) {
      (async () => {
        const notificationList = await loadStorage('notificationList');

        const count = notificationList.length
          ? notificationList.filter((d: { read: any }) => !d?.read).length
          : 0;
        setNotificationCount(count);
      })();
    }
  }, [isFocused, notificationTrigger]);

  useEffect(() => {
    // Listener for foreground notifications
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      saveNotification(remoteMessage?.data);
      setNotificationTrigger(pre => ++pre);
    });

    // Clean up listener on unmount
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (CommonSettingData.length > 0) {
      setBanner1(CommonSettingData?.find(d => d?.metaKey === 'banner_1')?.metaValue || {});
      setBanner2(CommonSettingData?.find(d => d?.metaKey === 'banner_2')?.metaValue || {});
    }
  }, [CommonSettingData?.length])

  const handleNotifications = async () => {
    const notificationList = await loadStorage('notificationList');
    if (Array.isArray(notificationList)) {
      const updatedData = notificationList?.filter(item => Object.keys(item).length > 0)?.map((item: []) => ({
        ...item,
        read: true,
      }));
      saveStorage(updatedData, 'notificationList');
    }
    navigation.navigate(`NotificationScreen`);
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={['#24112F', '#EB05D0', '#403966']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Top banner area */}
              <View style={styles.bannerContainer}>
                {/* notification icon */}
                <TouchableOpacity
                  onPress={() => handleNotifications()}
                  style={styles.notificationBox}>
                  <Icon
                    type={Icons.Feather}
                    size={FS(20)}
                    name={`bell`}
                    color={COLORS.WHITE}
                  />

                  {notificationCount > 0 && (
                    <View style={styles.notificationCountBox}>
                      <Text style={styles.notificationCount}>
                        {notificationCount}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
                <View style={{ flexBasis: '35%', gap: screenHeight > 700 ? HP(13) : HP(0) }}>
                  <View style={{ left: HP(17), marginTop: screenHeight > 700 ? VP(30) : VP(20) }}>
                    <Text
                      style={{
                        ...TextStyles.ARCHITECTS_DAUGHTER_REGULAR,
                        color: COLORS.WHITE,
                        fontSize: FS(30),
                      }}>
                      not your average bubble tea.
                    </Text>
                  </View>
                  <View style={{ left: HP(17), marginTop: VP(13) }}>
                    <Button
                      text={`BUY NOW`}
                      onPress={() => navigation.navigate(`MenuScreen`, {
                        categoryId: 0
                      })}
                      textStyle={styles.buttonStyle}
                      activeButtonText={{ opacity: 0.65 }}
                      mainContainerStyle={{ borderRadius: FS(16) }}
                      LinearGradienrColor={[COLORS.WHITE, COLORS.WHITE]}
                      contentContainerStyle={{ top: -1, alignItems: "center" }}
                      style={{ width: FS(104), height: FS(30) }}
                      Icon={
                        <Icon
                          type={Icons.Feather}
                          size={FS(15)}
                          name={`chevron-right`}
                          color={COLORS.BLACK}
                        />
                      }
                      iconPosition={`right`}
                    />
                  </View>
                </View>
                <View style={{ flexBasis: '65%', marginVertical: VP(50) }}>
                  <Image
                    source={require('../../assets/images/bubble-tea-boba-milk-tea.png')}
                    style={styles.icon}
                  />
                </View>
              </View>

              {/* Under bottom area */}
              <View style={styles.itemContainer}>
                <View style={{ flex: 1, marginVertical: VP(48) }}>
                  {/* Search Box */}
                  <View
                    style={{
                      marginHorizontal: HP(20),
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: HP(10),
                      justifyContent: 'space-between',
                    }}>
                    <SearchBoxItemsSection navigation={navigation} />
                  </View>

                  {/* Category Boxes */}
                  <View style={{ marginTop: VP(27), marginHorizontal: HP(17) }}>
                    <CategoryBoxSection navigation={navigation} />
                  </View>

                  {/* Promotional Box */}
                  <View style={{ marginTop: VP(23), marginHorizontal: HP(21) }}>
                    <View style={styles.subContainer}>
                      <Text style={styles.heading}>
                        De lounge Popular{' '}
                        {featuredCategory && featuredCategory?.name
                          ? featuredCategory.name
                          : `items`}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate(`PopularMenuScreen`, {
                            categoryId:
                              featuredCategory && featuredCategory?.id
                                ? featuredCategory.id
                                : 0,
                            name:
                              featuredCategory && featuredCategory?.name
                                ? featuredCategory.name
                                : `Items`,
                          })
                        }
                        style={styles.headingRightContainer}>
                        <Text style={styles.headingRightTitleStyle}>
                          view all
                        </Text>
                        <Right width={FS(12)} height={VP(12)} />
                      </TouchableOpacity>
                    </View>
                    <PromotionalBoxSection
                      data={DiscountedItems}
                      dataLoaded={DiscountedItemLoaded}
                      navigation={navigation}
                    />
                  </View>

                  {/* Heading Menu */}
                  <View style={{ marginTop: VP(37), marginHorizontal: HP(21) }}>
                    <HeadingSection title={`MENU`} />
                  </View>

                  {/* Category Tabs */}
                  <View style={{ marginTop: VP(24.66), marginLeft: HP(21) }}>
                    <CategortyTabsSection
                      setSelectedCategory={selectCategoryHandler}
                      selectedCategory={selectedCategory}
                    />
                  </View>

                  {/* Item Boxes */}
                  <View style={{ marginTop: VP(20), marginLeft: HP(21) }}>
                    <ItemBoxSection
                      data={itemListFiltered}
                      dataLoaded={PapularItemLoaded}
                      navigation={navigation}
                    />
                  </View>

                  {/* Banner One */}
                  <View
                    style={{
                      marginTop: VP(31.66),
                      marginHorizontal: HP(16)
                    }}>
                    <BannerOneSection
                      data={banner1}
                    />
                  </View>

                  {/* Heading Section */}
                  <View
                    style={{
                      marginTop: VP(32.87),
                      marginHorizontal: HP(21)
                    }}>
                    <HeadingSection
                      textStyle={{ textTransform: 'uppercase' }}
                      title={`${user?.name}, what’s on your mind?`}
                    />
                  </View>

                  {/* Feature Category Boxes */}
                  <View style={{ marginTop: VP(20), marginHorizontal: HP(16) }}>
                    {/* <FeatureCategoryBoxSection /> */}
                    <CuisineBox navigation={navigation} />
                  </View>

                  {/* Banner Two */}
                  <View style={{ marginTop: VP(20) }}>
                    <BannerTwoSection
                      data={banner2}
                    />
                  </View>

                  {/* Heading Section */}
                  <View
                    style={{ marginTop: VP(32.87), marginHorizontal: HP(20) }}>
                    <HeadingSection
                      textStyle={{ fontSize: 16, textTransform: 'capitalize' }}
                      title={`"Sip and savor 50+ drinks and desserts"`}
                    />
                  </View>

                  {/* Item Vertical Boxes */}
                  <View style={{ marginTop: VP(22), marginHorizontal: HP(11) }}>
                    <ItemVerticalBoxSection
                      data={PapularItems}
                      dataLoaded={!PapularItemLoaded}
                      navigation={navigation}
                      hasMoreData={true}
                      loadMore={() => void 0}
                      HeaderComponent={() => {
                        return <></>;
                      }}
                    />
                  </View>

                  {/* Bottom Heading */}
                  <View style={{ marginTop: VP(53) }}>
                    <Text
                      style={{
                        ...TextStyles.POPPINS_BOLD,
                        fontSize: HP(40),
                        color: '#898989',
                        lineHeight: HP(47),
                        textAlign: 'center',
                      }}>
                      "Indulge your cravings."
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    height: VP(30),
                    backgroundColor: '#FDFDFD',
                    bottom: VP(-30),
                  }}>
                </View>
              </View>
            </ScrollView>
          </View>
        </LinearGradient>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#FDFDFD',
    flex: 2,
    // borderTopLeftRadius: 60,
    top: VP(-100),
  },
  icon: {
    // width: FS(260.97),
    // height: VP(284.76),
    width: FS(300.97),
    height: VP(294.76),
    resizeMode: 'contain',
    zIndex: 1,
  },
  buttonStyle: {
    ...TextStyles.LEXEND_REGULAR,
    textTransform: 'uppercase',
  },
  line: {
    height: 1,
    width: '100%',
    flex: 1,
    flexGrow: 1,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    ...TextStyles.RALEWAY_SEMI_BOLD,
    fontSize: 18,
    textTransform: 'capitalize',
  },
  headingRightContainer: {
    flexDirection: 'row',
    gap: HP(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingRightTitleStyle: {
    ...TextStyles.RALEWAY_MEDIUM,
    fontSize: HP(12),
    textTransform: 'capitalize',
  },
  bannerContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  notificationCount: {
    ...TextStyles.INTER_SEMI_BOLD,
    fontSize: HP(10),
    color: COLORS.WHITE,
  },
  notificationBox: {
    position: 'absolute',
    marginVertical: HP(20),
    right: HP(20),
  },
  notificationCountBox: {
    width: FS(15),
    height: FS(15),
    borderRadius: FS(7.5),
    backgroundColor: COLORS.THEME,
    justifyContent: 'center',
    alignItems: 'center',
    right: HP(-12),
    top: HP(-25)
  },
});

export default HomeScreen;