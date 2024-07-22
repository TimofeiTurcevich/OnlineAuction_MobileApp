import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Image, StyleSheet, ScrollView, Dimensions, Text, TextInput, TouchableOpacity, FlatList, Modal } from "react-native";
import Carousel from "react-native-snap-carousel-v4";
import CarouselItem from "../components/CarouselItem";
import { WebView } from "react-native-webview";

const IMAGES = {
    image1: 'https://static-cse.canva.com/blob/847132/paulskorupskas7KLaxLbSXAunsplash2.jpg',
    image2: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?cs=srgb&dl=pexels-lukas-rodriguez-3680219.jpg&fm=jpg',
    image3: 'https://itproger.com/img/tasks/x1706855485.jpg.pagespeed.ic.ehYb3ppVQ3.webp'
};

export default function TestScreen() {
    const [images, setImages] = useState([
        { id: '1', image: IMAGES.image1 },
        { id: '2', image: IMAGES.image2 },
        { id: '3', image: IMAGES.image3 }
    ]);

    return (
        <WebView
            source={{ uri: 'http://192.168.0.123:9090/oauth2/authorize?response_type=code&client_id=auction_client&redirect_uri=http://192.168.0.123:8081&scope=openid&code_challenge=cS2hYB9O-2TW1WLeqSosrPTzYrKhlMUbgkXS95pNaac&code_challenge_method=S256' }}
            style={{ flex: 0.5, height: Dimensions.get('screen').height * 0.5, width: Dimensions.get('screen').width, backgroundColor: 'red' }}

        />
    );
}