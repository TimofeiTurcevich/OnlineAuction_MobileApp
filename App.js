import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthProvider } from './context/AuthContext';
import AppDrawerNavigation from './navigation/AppDrawerNavigation';

// function Demo() {
//   const insets = useSafeAreaInsets();
//   return (
//     <LinearGradient
//       colors={['rgba(255, 145, 193, 1)', 'rgba(255, 228, 88, 1)']}
//       style={styles(insets).container}
//     >
//       <ScrollView style={styles(insets).container}>
//         <Text>Open up App.js to start workig on yorftyjcsgkfjcguk</Text>
//         <Text>Open up App.js to start workig on yorftyjcsgkfjcguk</Text>
//         <Text>Open up App.js to start workig on yorftyjcsgkfjcguk</Text>
//         <StatusBar style="auto" />
//       </ScrollView>
//     </LinearGradient>
//   );
// }

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppDrawerNavigation />
      </AuthProvider>
    </SafeAreaProvider >
  );
}