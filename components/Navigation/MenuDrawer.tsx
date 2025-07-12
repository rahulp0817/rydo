import { Feather, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { HapticTab } from "../HapticTab";

type RoutePath = "/explore" | "/settings";

const MenuDrawer = () => {
  const router = useRouter();

  const menuItems: Array<{
    title: string;
    icon: string;
    route: RoutePath;
  }> = [
    {
      title: "Help",
      icon: "help-circle",
      route: "/explore",
    },
    {
      title: "Parcel - Send Items",
      icon: "box",
      route: "/explore",
    },
    {
      title: "Payments",
      icon: "credit-card",
      route: "/explore",
    },
    {
      title: "My Rides",
      icon: "clock",
      route: "/explore",
    },
    {
      title: "Safty",
      icon: "shield",
      route: "/explore",
    },
    {
      title: "My Rewards",
      icon: "gift",
      route: "/explore",
    },
    {
      title: "Notifications",
      icon: "bell",
      route: "/explore",
    },
    {
      title: "Claims",
      icon: "file-text",
      route: "/explore",
    },
    {
      title: "Settings",
      icon: "settings",
      route: "/settings",
    },
     {
      title: "About us",
      icon: "info",
      route: "/explore",
    },
  ];

  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => (
        <HapticTab
          key={item.title}
          onPress={() => {
            Haptics.selectionAsync();
            router.push(item.route);
          }}
          style={[
            styles.item,
            index !== 0 && styles.itemBorderTop,
            index === menuItems.length - 1 && styles.itemBorderBottom,
          ]}
        >
          <View style={styles.iconBox}>
            <Feather name={item.icon as any} size={20} color="#4B5563" />
          </View>

          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.title}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#000"
            style={styles.chevron}
          />
        </HapticTab>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    marginBottom: 8,
    marginTop: 24,
    borderColor: "#D1D5DB",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  itemBorderTop: {
    borderTopWidth: 1,
    borderColor: "#D1D5DB",
  },
  itemBorderBottom: {
    borderBottomWidth: 0,
  },
  iconBox: {
    borderRadius: 8,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4B5563",
    marginLeft: 16,
    flex: 1,
  },
  chevron: {
    marginLeft: "auto",
  },
});

export default MenuDrawer;
