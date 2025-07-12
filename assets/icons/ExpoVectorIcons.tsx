import {
  Entypo,
  Feather,
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import React from "react";

import * as LucideNative from "lucide-react-native";

const fontSets = {
  MaterialIcons,
  FontAwesome,
  Ionicons,
  Entypo,
  Feather,
  Octicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Fontisto,
};


const LucideSet = (LucideNative as any);


export type IconProps = {

  name: string;
  set?:
  | keyof typeof fontSets
  | "Lucide";
  size?: number;
  color?: string;
};

const FALLBACK_FONT_FAMILY: keyof typeof fontSets = "MaterialIcons";
const FALLBACK_FONT_ICON = "info";
const FALLBACK_LUCIDE_ICON = "Info";


const AppIcon: React.FC<IconProps> = ({
  name,
  set = FALLBACK_FONT_FAMILY,
  size = 24,
  color = "black",
}) => {

  if (set === "Lucide") {
    const LucideIcon =
      LucideSet[name] ?? LucideSet[FALLBACK_LUCIDE_ICON] ?? null;
    return LucideIcon ? <LucideIcon size={size} color={color} /> : null;
  }

  const RequestedSet = fontSets[set] ?? fontSets[FALLBACK_FONT_FAMILY];
  const iconExists =
    RequestedSet?.glyphMap
    //@ts-ignore
      ? !!RequestedSet.glyphMap[name]
      : true;
  const IconFamily = iconExists
    ? RequestedSet
    : fontSets[FALLBACK_FONT_FAMILY];
  const iconName = iconExists ? name : FALLBACK_FONT_ICON;

  return <IconFamily name={iconName as any} size={size} color={color} />;
};

export default AppIcon;
