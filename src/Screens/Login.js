import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react"; // Removed { useEffect } since it's not being used
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useAuthRequest,
  makeRedirectUri,
  useAutoDiscovery,
  ResponseType,
} from "expo-auth-session";

export default function Login() {
  const navigation = useNavigation();
  useEffect(() => {
    // Function to retrieve token and expiration date from AsyncStorage
    const getTokenFromStorage = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const expirationDate = await AsyncStorage.getItem("expirationDate");
        console.log(token);
        console.log(expirationDate);
        if (token && expirationDate) {
          const currentTime = Date.now();
          if (currentTime < parseInt(expirationDate)) {
            // here the token is still valid
            navigation.replace("Main");
          }
        }
      } catch (error) {
        console.error("Error retrieving token from AsyncStorage:", error);
      }
    };

    // Call the function to retrieve token and expiration date
    getTokenFromStorage();
  }, []);

  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "03c3d6de60e942e283bde7153417f4b1",
      scopes: [
        "user-read-email",
        "user-read-private",
        "playlist-read-private",
        "user-top-read",
        "user-library-read",
        "user-read-recently-played",
        "playlist-read-collaborative",
        "playlist-modify-public",
      ],
      // usePKCE: false, // Commented out because usePKCE is true by default
      redirectUri: makeRedirectUri({ native: "exp://192.168.1.7:8081" }),
    },
    discovery
  );

  // Inside your Authenticate() function
  async function Authenticate() {
    try {
      const result = await promptAsync(); // Assuming promptAsync returns the result object you provided
      // result.params.expires_in
      if (result?.type === "success") {
        if (result.params.access_token) {
          const expirationDate = new Date(result.params.expires_in).getTime();
          await AsyncStorage.setItem("token", result.params.access_token);
          await AsyncStorage.setItem(
            "expirationDate",
            expirationDate.toString()
          );
          navigation.navigate("Main");
        } else {
          console.error("Access token not found in authentication response.");
        }
      } else if (result.type === "cancel") {
        console.log("Authentication canceled");
      } else {
        console.error("Authentication error:", result);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  }
  return (
    <LinearGradient colors={["#040306", "#131624"]} className="flex-1">
      <SafeAreaView>
        <View className="h-80 mt-11">
          <Entypo
            name="spotify-with-circle"
            size={80}
            color="white"
            style={{ textAlign: "center" }}
          />
          <Text className="text-white text-center text-3xl mt-5">
            Millions Of Songs!
          </Text>
        </View>
        <View style={{ height: 20 }} />
        <Pressable
          style={{
            backgroundColor: "#1DB954",
            padding: 10,
            borderRadius: 15,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
          }}
          onPress={() => Authenticate()}
        >
          <Text className="text-white text-center text-xl ">
            Log In With Spotify
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "black",
            padding: 10,
            borderRadius: 15,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            marginTop: 20,
            borderColor: "white",
            borderWidth: 0.8,
          }}
          className="flex-row px-2  "
        >
          <Entypo name="phone" size={24} color="white" />
          <Text className="text-white text-center text-xl ml-2 ">
            Continue with Phone number
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "black",
            padding: 10,
            borderRadius: 15,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            marginTop: 20,
            borderColor: "white",
            borderWidth: 0.8,
          }}
          className="flex-row "
        >
          <Entypo name="google-play" size={24} color="yellow" />
          <Text className="text-white text-center text-xl ml-2 ">
            Continue with Google
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "black",
            padding: 10,
            borderRadius: 15,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            marginTop: 20,
            borderColor: "white",
            borderWidth: 0.8,
          }}
          className="flex-row "
        >
          <Entypo name="facebook" size={24} color="blue" />
          <Text className="text-white text-center text-xl ml-2 ">
            Continue with facebook
          </Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
}
