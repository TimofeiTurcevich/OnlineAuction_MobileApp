// import React from "react";
// import { LinearGradient } from "expo-linear-gradient";
// import { ScrollView, StyleSheet } from "react-native";
// import { useSafeAreaInsets } from 'react-native-safe-area-context'
// import Lot from "./Lot";
// import Toogler from "./Toogler";

// export default function Lots(navigate) {
//     const insets = useSafeAreaInsets();
//     return (
//         <LinearGradient
//             colors={['rgba(255, 145, 193, 1)', 'rgba(255, 228, 88, 1)']}
//             style={styles.app}
//         >
//             <Toogler {...navigate} />
//             <ScrollView
//                 style={{ flexGrow: 1, width: '100%', marginTop: insets.top }}
//                 contentContainerStyle={{ alignItems: 'center' }}
//             >
//                 <Lot {...navigate} />
//                 <Lot {...navigate} />
//                 <Lot {...navigate} />
//                 <Lot {...navigate} />
//                 <Lot {...navigate} />
//                 <Lot {...navigate} />
//             </ScrollView>
//         </LinearGradient>
//     );
// }

// const styles =
//     StyleSheet.create({
//         app: {
//             flex: 1,
//             alignItems: 'center'
//         }
//     });