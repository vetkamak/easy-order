import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
      <SafeAreaProvider>
          <PaperProvider>
              <Stack>
                  <Stack.Screen
                      name="index"
                      options={{
                          headerShown: false,
                      }}
                  />
                  <Stack.Screen
                      name="userProfile"
                      options={{
                          headerShown: false,
                      }}
                  />
                  <Stack.Screen
                      name="orderCartModal"
                      options={{
                          headerShown: false,
                          presentation: 'modal',
                      }}
                  />
                  <Stack.Screen
                      name="orderStatusModal"
                      options={{
                          headerShown: false,
                          presentation: 'modal',
                      }}
                  />
                  <Stack.Screen
                      name="cards"
                      options={{
                          headerShown: false,
                          presentation: 'modal',
                      }}
                  />
                  <Stack.Screen
                      name="comment"
                      options={{
                          headerShown: false,
                          presentation: 'modal',
                      }}
                  />
              </Stack>
          </PaperProvider>
      </SafeAreaProvider>
  );
}
