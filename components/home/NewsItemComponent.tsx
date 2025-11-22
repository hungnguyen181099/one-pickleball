import { NewsItem } from "@/app/(tabs)";
import { styles } from "@/assets/styles/home.styles";
import { useThemedColors } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export const NewsItemComponent = ({ item }: { item: NewsItem }) => {
  const colors = useThemedColors();

  return (
    <TouchableOpacity style={[styles.newsItem, { borderBottomColor: colors.border }]}>
      <View style={[styles.newsThumbnail, { backgroundColor: item.image as any }]}>
        <Text style={{ color: item.categoryColor, fontSize: 12, fontWeight: '600' }}>
          News
        </Text>
      </View>
      <View style={styles.newsContent}>
        <Text style={[styles.newsCategory, { color: item.categoryColor }]}>
          {item.category}
        </Text>
        <Text style={[styles.newsTitle, { color: colors.text }]}>{item.title}</Text>
        <View style={styles.newsMeta}>
          <Text style={[styles.newsMetaText, { color: colors.textTertiary }]}>{item.time}</Text>
          <Text style={[styles.newsMetaDot, { color: colors.textTertiary }]}>•</Text>
          <Text style={[styles.newsMetaText, { color: colors.textTertiary }]}>{item.readTime}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
    </TouchableOpacity>
  );
};
