import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PagerView, {
  PagerViewOnPageScrollEventData,
} from 'react-native-pager-view';

import {ExpandingDot} from 'react-native-animated-pagination-dots';

import {strings} from '../../assets/strings';
import {colors} from '../../assets/colors';
import Btn from '../../assets/components/Btn';
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const INTRO_DATA = [
  {
    key: '1',
    title: strings.all_your_games_here,
    img: require('../../assets/img/fr_1.png'),
  },
  {
    key: '2',
    title: strings.show_your_achieves,
    img: require('../../assets/img/fr_3.png'),
  },
  {
    key: '3',
    title: strings.enter_now,
    img: require('../../assets/img/fr_4.png'),
  },
];

export default function OnBoarding() {
  const nav = useNavigation();
  const width = Dimensions.get('window').width;
  const ref = React.useRef<PagerView>(null);
  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const inputRange = [0, INTRO_DATA.length];
  const scrollX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
  ).interpolate({
    inputRange,
    outputRange: [0, INTRO_DATA.length * width],
  });

  function goToAuth() {
    nav.navigate('Login');
  }
  const onPageScroll = React.useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue,
            },
          },
        ],
        {
          useNativeDriver: false,
        },
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <ImageBackground
      source={require('../../assets/img/background_1.png')}
      style={styles.container}>
      <AnimatedPagerView
        initialPage={0}
        ref={ref}
        style={styles.PagerView}
        onPageScroll={onPageScroll}>
        {INTRO_DATA.map(({key, title, img}) => (
          <View key={key} style={styles.center}>
            {key === '3' && <Text style={styles.paragrafo}>{title}</Text>}
            {key === '3' ? (
              <Text style={[styles.title, {marginTop: -40}]}>
                {strings.its_free_and_easy}
              </Text>
            ) : (
              <Text style={styles.title}>{title}</Text>
            )}

            <Image
              source={img}
              style={styles.img}
              resizeMode="contain"
              resizeMethod="resize"
            />
            {key == '3' && <Btn method={goToAuth} />}
          </View>
        ))}
      </AnimatedPagerView>
      <View style={styles.dotsContainer}>
        <View>
          <ExpandingDot
            activeDotColor={colors.game_title}
            data={INTRO_DATA}
            expandingDotWidth={30}
            //@ts-ignore
            scrollX={scrollX}
            inActiveDotOpacity={0.6}
            dotStyle={{
              width: 15,
              height: 15,
              borderRadius: 5,
              marginHorizontal: 5,
              backgroundColor: colors.game_title,
            }}
            containerStyle={{
              top: 30,
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  PagerView: {
    flex: 1,
  },

  progressContainer: {flex: 0.1, backgroundColor: colors.game_title},
  center: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    rowGap: 40,
    // marginTop: '20%',
  },
  text: {
    fontSize: 30,
  },

  dotsContainer: {
    marginBottom: '30%',
    justifyContent: 'space-evenly',
  },
  img: {
    height: 300,
    width: '70%',
    borderRadius: 9,
  },
  title: {
    fontSize: 35,
    color: '#fff',
    fontWeight: '700',
    alignSelf: 'flex-start',
  },
  paragrafo: {
    fontSize: 27,
    color: '#fff',
    fontWeight: '400',
    alignSelf: 'flex-start',
  },
});
