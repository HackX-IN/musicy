import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const RecentlyPlayedCard = ({ item, index }) => {
  const truncatedName =
    item.track.name.length > 15
      ? item.track.name.slice(0, 11) + "..."
      : item.track.name;
  const navigation = useNavigation();
  return (
    <Pressable
      key={index}
      onPress={() =>
        navigation.navigate("Info", {
          item: item,
          index: index,
        })
      }
      style={{ margin: 10, alignItems: "center" }}
    >
      <Image
        style={{ width: 130, height: 130, borderRadius: 5 }}
        source={{ uri: item.track.album.images[0].url }}
      />
      <Text
        numberOfLines={1}
        style={{
          fontSize: 13,
          fontWeight: "500",
          color: "white",
          marginTop: 10,
        }}
      >
        {truncatedName}
      </Text>
    </Pressable>
  );
};

export default RecentlyPlayedCard;

const styles = StyleSheet.create({});
