
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import ModelLogin from './screens/model/Login';
import ModelRegister from './screens/model/Register';
import Profile from './screens/model/Profile';
import Information from './screens/model/Information';
import Colors from './constants/colors';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';
import { ModelContextProvider } from './store/model_context'
import { Button, Pressable } from 'react-native'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: async (error: any, query) => {
      console.log(error);
      // How to get status code fo error
      if (error.request.status === 401) {
        console.log("Refreshing Token");
        // await api.get("/api/refresh-token");
        queryClient.refetchQueries(query.queryKey);
      }
    },
  }),
});

const Drawer = createDrawerNavigator();
function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}
export default function App() {

  return (
    <>
      <NavigationContainer >
        <QueryClientProvider client={queryClient}>
          <ModelContextProvider>

            <Drawer.Navigator initialRouteName="Home"
            >

              <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
              <Drawer.Screen name="ModelLogin" component={ModelLogin} options={{
                title: 'Login',
                headerTintColor: '#fff',
                headerStyle: {
                  backgroundColor: Colors.primary,
                },

              }} />
              <Drawer.Screen name="ModelRegister" component={ModelRegister} options={{
                title: 'Register', headerTintColor: '#fff',
                headerStyle: { backgroundColor: Colors.primary },

              }} />
              <Drawer.Screen name="ModelProfile" component={Profile} options={({ navigation }) => ({
                title: 'Your Account', headerTintColor: '#fff',
                contentStyle: {
                  backgroundColor: '#FFFFFF'
                },
                headerStyle: { backgroundColor: Colors.primary, },
                headerBackVisible: false,
                headerRight: () => (
                  <Pressable onPress={() => navigation.toggleDrawer()}>
                    <Button title='Button' />
                  </Pressable>
                ),

              })} />
              <Drawer.Screen name="ModelInformation" component={Information} options={{
                title: 'General Information', headerTintColor: '#fff',
                headerStyle: { backgroundColor: Colors.primary, },
              }} />
            </Drawer.Navigator>
          </ModelContextProvider>

        </QueryClientProvider>

      </NavigationContainer >

    </>

  );
}

