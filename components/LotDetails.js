// import React, { useState, useRef } from "react";
// import { View, Image, StyleSheet, ScrollView, Dimensions, Text, TextInput, TouchableOpacity, FlatList, Modal, Animated } from "react-native";
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { Ionicons, MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
// import Carousel from "react-native-snap-carousel-v4";
// import ImageViewer from 'react-native-image-zoom-viewer';
// import { LinearGradient } from "expo-linear-gradient";
// import CarouselItem from "./CarouselItem";
// import Countdown from "./Countdown";

// const IMAGES = {
//     image1: 'https://static-cse.canva.com/blob/847132/paulskorupskas7KLaxLbSXAunsplash2.jpg',
//     image2: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?cs=srgb&dl=pexels-lukas-rodriguez-3680219.jpg&fm=jpg',
//     image3: 'https://itproger.com/img/tasks/x1706855485.jpg.pagespeed.ic.ehYb3ppVQ3.webp'
// };

// const imageUrls = [
//     {
//         url: 'https://static-cse.canva.com/blob/847132/paulskorupskas7KLaxLbSXAunsplash2.jpg'
//     }, {
//         url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?cs=srgb&dl=pexels-lukas-rodriguez-3680219.jpg&fm=jpg'
//     }, {
//         url: 'https://itproger.com/img/tasks/x1706855485.jpg.pagespeed.ic.ehYb3ppVQ3.webp'
//     }
// ]

// export default function LotDetails({ route, navigation }) {
//     const insets = useSafeAreaInsets();
//     const [images, setImages] = useState([
//         { id: '1', image: IMAGES.image1 },
//         { id: '2', image: IMAGES.image2 },
//         { id: '3', image: IMAGES.image3 },
//         { id: '4', image: IMAGES.image3 },
//         { id: '5', image: IMAGES.image3 },
//         { id: '6', image: IMAGES.image3 }
//     ]);
//     // const { title } = route.params;

//     // console.log(title);
//     // navigation.setOptions({ title: "some2" })

//     const [indexSelected, setIndexSelected] = useState(0);
//     const [modalVisible, setModalVisible] = useState(false);
//     const [modalIndex, setModalIdex] = useState(0);
//     const [scrolling, setScrolling] = useState(false);

//     const onSelect = indexSelected => {
//         setIndexSelected(indexSelected);
//     };

//     const carouselRef = useRef(null);
//     const paginationRef = useRef(null);

//     const onTouchThumbnail = touched => {
//         if (touched === indexSelected) return;

//         carouselRef.current.scrollToIndex({ index: touched })
//     };

//     const openImageFullScreen = id => {
//         if (!scrolling) {
//             setModalVisible(true)
//             setModalIdex(id - 1)
//         }
//     }



//     return (
//         <LinearGradient
//             colors={['rgba(255, 145, 193, 1)', 'rgba(255, 228, 88, 1)']}
//         >
//             <ScrollView
//                 style={styles(insets).lot}
//                 contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}
//             >
//                 <Text style={{ fontSize: 35, width: '100%', textAlign: 'center', textAlignVertical: 'center' }}>Some title</Text>
//                 <FlatList
//                     data={images}
//                     style={{ width: '90%', marginBottom: 2 }}
//                     keyExtractor={(item) => item.id}
//                     renderItem={({ item, key }) => <CarouselItem item={item} open={openImageFullScreen} />}
//                     horizontal
//                     showsHorizontalScrollIndicator={false}
//                     pagingEnabled
//                     bounces={false}
//                     ref={carouselRef}
//                     onScrollBeginDrag={() => setScrolling(true)}
//                     onScrollEndDrag={() => setScrolling(false)}
//                     onMomentumScrollEnd={(event) => {
//                         const index = Math.floor(
//                             Math.floor(event.nativeEvent.contentOffset.x) /
//                             Math.floor(event.nativeEvent.layoutMeasurement.width) + 0.5
//                         )
//                         setIndexSelected(index)
//                         paginationRef.current.scrollToIndex({ index: index })
//                     }}
//                 />
//                 {/* <Carousel
//                     onSnapToItem={index => onSelect(index)}
//                     ref={carouselRef}
//                     layout="default"
//                     data={images}
//                     sliderWidth={Dimensions.get('screen').width * 0.9}
//                     itemWidth={Dimensions.get('screen').width}
//                     onScroll={() => setScrolling(true)}
//                     onMomentumScrollEnd={() => setScrolling(false)}

//                     renderItem={({ item, key }) =>
//                         <Image
//                             onTouchEnd={() => {
//                                 if (!scrolling) {
//                                     setModalVisible(true)
//                                     setModalIdex(item.id - 1)
//                                 }
//                             }}
//                             key={key}
//                             source={{
//                                 uri: item.image
//                             }}
//                             style={{
//                                 backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                                 width: '90%',
//                                 height: Dimensions.get('screen').height * 0.38,
//                                 borderRadius: 25,
//                                 marginBottom: 2
//                             }}
//                             resizeMode="contain"
//                         />
//                     }
//                 /> */}
//                 <Modal visible={modalVisible} transparent={true}>
//                     <AntDesign name="closecircleo" size={30} color="white" style={{ position: 'absolute', zIndex: 2, left: '92%', paddingTop: insets.top }} onPress={() => setModalVisible(false)} />
//                     <ImageViewer imageUrls={imageUrls} index={modalIndex} />
//                 </Modal>
//                 <View style={{ height: Dimensions.get('screen').height * 0.11, marginBottom: 2 }}>
//                     <FlatList
//                         data={images}
//                         style={{ maxWidth: '90%' }}
//                         keyExtractor={(item) => item.id}
//                         onScrollBeginDrag={() => setScrolling(true)}
//                         onScrollEndDrag={() => setScrolling(false)}
//                         renderItem={({ item, key }) =>
//                             <View style={[styles(insets).photos, {
//                                 borderColor: 'rgba(2, 184, 223, 0.8)',
//                                 borderWidth: item.id == indexSelected + 1 ? 2 : 0
//                             }]}
//                                 onTouchEnd={() => {
//                                     if (!scrolling) {
//                                         setIndexSelected(item.id - 1)
//                                         onTouchThumbnail(item.id - 1)
//                                     }
//                                 }}
//                             >
//                                 <Image
//                                     source={{
//                                         uri: item.image
//                                     }}
//                                     style={{
//                                         resizeMode: 'center',
//                                         width: '80%',
//                                         height: '80%'
//                                     }}
//                                 />
//                             </View>
//                         }
//                         // onLayout={() => paginationRef.current.scrollToIndex(indexSelected)}
//                         horizontal
//                         // showsHorizontalScrollIndicator={false}
//                         // pagingEnabled
//                         // bounces={false}
//                         ref={paginationRef}
//                     />
//                     {/* <ScrollView
//                         style={{
//                             maxWidth: Dimensions.get('screen').width * 0.9
//                         }}
//                         contentContainerStyle={{
//                             alignItems: 'center'
//                         }}
//                         horizontal={true}
//                     >
//                         {images.map((i) => {
//                             return (
//                                 <View style={[styles(insets).photos, {
//                                     borderColor: 'rgba(2, 184, 223, 0.8)',
//                                     borderWidth: i.id == indexSelected + 1 ? 2 : 0
//                                 }]}
//                                     onTouchEnd={() => {
//                                         setIndexSelected(i.id - 1)
//                                         onTouchThumbnail(i.id - 1)
//                                     }}
//                                 >
//                                     <Image
//                                         source={{
//                                             uri: i.image
//                                         }}
//                                         style={{
//                                             resizeMode: 'center',
//                                             width: '80%',
//                                             height: '80%'
//                                         }}
//                                     />
//                                 </View>
//                             );
//                         })}
//                     </ScrollView> */}
//                 </View>
//                 <View style={styles(insets).betDetails}>
//                     <View style={styles(insets).info}>
//                         <Text style={styles(insets).price}>Current bet: 133333312121$</Text >
//                         <Text style={styles(insets).time}>Ends in: <Countdown endDate={new Date('2025-03-19T13:50:37.165Z')} /></Text>
//                     </View>
//                     <View style={styles(insets).info}>
//                         <TextInput
//                             style={styles(insets).input}
//                             placeholder="213321$"
//                         />
//                         <TouchableOpacity style={styles(insets).button}>
//                             <Text style={{ fontSize: 24, textAlign: 'center', color: 'white' }}>Place a bet</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//                 <View style={styles(insets).icons}>
//                     <MaterialIcons name="favorite-border" size={60} color="black" style={{ flex: 1 }} />
//                     <TouchableOpacity style={styles(insets).message}>
//                         <Entypo name="new-message" size={60} color="black" />
//                         <Text style={{ fontSize: 28, textAlign: 'center', textAlignVertical: 'center', flex: 2 }}>Send a message</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style={styles(insets).betHistory}>
//                     {/* <Text style={{ color: 'white', width: '100%', fontSize: 24, textAlign: 'center' }}>No bet was made yet</Text> */}

//                     <Text style={{ flex: 1, width: '100%', fontSize: 30, marginBottom: 5, color: 'white', textAlign: 'center' }}>Bet History</Text>
//                     <View style={styles(insets).bet}>
//                         <Text style={{ flex: 1, fontSize: 24, color: 'white', textAlignVertical: 'center', textAlign: 'center' }}>
//                             №
//                         </Text>
//                         <Text style={{ flex: 3, fontSize: 24, color: 'white', textAlignVertical: 'center', textAlign: 'center' }}>
//                             Name
//                         </Text>
//                         <Text style={{ flex: 3, fontSize: 24, color: 'white', textAlignVertical: 'center', textAlign: 'center' }}>
//                             Price
//                         </Text>

//                     </View>
//                     <View style={styles(insets).bet}>
//                         <Text style={{ flex: 1, fontSize: 24, color: 'white', textAlignVertical: 'center', textAlign: 'center' }}>
//                             1
//                         </Text>
//                         <Text style={{ flex: 3, fontSize: 24, color: 'white', textAlignVertical: 'center', textAlign: 'center' }}>
//                             FirstName
//                         </Text>
//                         <Text style={{ flex: 3, fontSize: 24, color: 'white', textAlignVertical: 'center', textAlign: 'center' }}>
//                             321321321321$
//                         </Text>

//                     </View>
//                     <View style={styles(insets).bet}>
//                         <Text style={{ flex: 1, fontSize: 24, color: 'white', textAlignVertical: 'center', textAlign: 'center' }}>
//                             2
//                         </Text>
//                         <Text style={{ flex: 3, fontSize: 24, color: 'white', textAlignVertical: 'center', textAlign: 'center' }}>
//                             LatName FirstName
//                         </Text>
//                         <Text style={{ flex: 3, fontSize: 24, color: 'white', textAlignVertical: 'center', textAlign: 'center' }}>
//                             321321321$
//                         </Text>

//                     </View>
//                     <View style={styles(insets).bet}>
//                         <Text style={{ flex: 1, fontSize: 24, color: 'white', textAlignVertical: 'center', textAlign: 'center' }}>
//                             3
//                         </Text>
//                         <Text style={{ flex: 3, fontSize: 24, color: 'white', textAlignVertical: 'center', textAlign: 'center' }}>
//                             LastName
//                         </Text>
//                         <Text style={{ flex: 3, fontSize: 24, color: 'white', textAlignVertical: 'center', textAlign: 'center' }}>
//                             321312321321$
//                         </Text>

//                     </View>

//                 </View>
//             </ ScrollView>
//         </LinearGradient >
//     );
// }

// const styles = insets =>
//     StyleSheet.create({
//         photos: {
//             width: Dimensions.get('screen').width * 0.235,
//             height: Dimensions.get('screen').height * 0.1,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             borderRadius: 20,
//             marginRight: 2,
//             alignItems: 'center',
//             justifyContent: 'center'
//         },
//         betDetails: {
//             minHeight: Dimensions.get('screen').height * 0.15,
//             width: '90%',
//             borderRadius: 25,
//             borderColor: 'rgba(0, 0, 0, 0.5)',
//             borderWidth: 2,
//             alignItems: 'center',
//             marginBottom: 4
//         },
//         info: {
//             width: '100%',
//             flexDirection: 'row',
//             justifyContent: 'center',
//             alignItems: 'center',
//             flex: 1
//         },
//         price: {
//             fontSize: 18,
//             width: '49%',
//             height: 'auto',
//             textAlign: 'center',
//             marginRight: 4,
//         },
//         time: {
//             fontSize: 18,
//             width: '49%',
//             textAlign: 'center',
//             height: 'auto',
//         },
//         input: {
//             width: '49%',
//             textAlign: 'center',
//             borderColor: 'rgba(0, 0, 0, 0.5)',
//             borderWidth: 2,
//             borderRadius: 25,
//             marginRight: 4,
//             fontSize: 24
//         },
//         button: {
//             width: '49%',
//             // borderColor: 'rgba(255, 145, 193, 1)',
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             borderColor: 'rgba(0, 0, 0, 0.5)',
//             borderWidth: 1,
//             borderRadius: 25,
//             alignItems: 'center',
//             justifyContent: 'center'
//         },
//         icons: {
//             height: Dimensions.get('screen').height * 0.075,
//             width: '90%',
//             flexDirection: 'row',
//             // backgroundColor: 'white'
//         },
//         message: {
//             // width: '83%',
//             flex: 5,
//             flexDirection: 'row'
//             // backgroundColor: 'black'
//         },
//         betHistory: {
//             width: '90%',
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             minHeight: Dimensions.get('screen').height * 0.08,
//             borderRadius: 25,
//             alignItems: 'center',
//             justifyContent: 'center',
//             marginBottom: 10
//         },
//         bet: {
//             // backgroundColor: 'purple',
//             flex: 1,
//             width: '95%',
//             alignItems: 'center',
//             flexDirection: 'row',
//             marginBottom: 10,
//             borderBottomColor: 'white',
//             borderBottomWidth: 2
//         }
//     });