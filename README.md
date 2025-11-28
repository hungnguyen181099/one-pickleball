# One Pickleball 🏓

Một ứng dụng mobile toàn diện cho cộng đồng yêu thích Pickleball, được xây dựng với **Expo** và **React Native**. Ứng dụng cung cấp các tính năng quản lý sân đấu, đặt sân, quản lý giải đấu, tin tức, và hệ thống xếp hạng người chơi.

## Tổng Quan Dự Án

**One Pickleball** là một nền tảng kết nối người chơi pickleball, cung cấp:

- 🏟️ **Tìm kiếm và đặt sân thi đấu** - Duyệt danh sách sân, xem chi tiết, đánh giá, giá cả
- 🏆 **Quản lý giải đấu** - Tham gia các giải đấu, xem kết quả, thống kê
- 📰 **Tin tức và chuỗi sự kiện** - Cập nhật tin tức về pickleball, sự kiện sắp tới
- 👤 **Hồ sơ người chơi** - Thống kê cá nhân, thành tích, xếp hạng, đạt được huy chương
- 🌙 **Chế độ tối/sáng** - Giao diện thân thiện với cả chế độ sáng và tối
- 📱 **Tương thích đa nền tảng** - Chạy trên iOS, Android, và Web

## Các Tính Năng Chính

### 🏠 Trang Chủ
- Chào mừng người dùng cá nhân
- Thống kê nhanh: số trận đấu, tỷ lệ thắng, xếp hạng
- Các hành động nhanh: tìm sân, giải đấu, social play, tìm đối thủ
- Sự kiện sắp tới (sliding list)
- Tin tức mới nhất (danh sách)
- Thông báo nhanh với badge

### 🏟️ Trang Sân Thi Đấu
- Danh sách sân với các bộ lọc:
  - Gần tôi (theo vị trí)
  - Đang mở (trạng thái hiện tại)
  - Đánh giá cao (rating)
  - Bộ lọc tùy chỉnh
- Chuyển đổi giữa chế độ danh sách và bản đồ
- Từng sân hiển thị:
  - Hình ảnh, tên, đánh giá và số lượt đánh giá
  - Giá giờ
  - Vị trí và khoảng cách
  - Tính năng (6 sân indoor, có đèn, WC, v.v.)
  - Trạng thái (đang mở/gần hết chỗ/đã đóng)
  - Nút yêu thích (heart)
  - Nút đặt sân/xem chi tiết

### 📊 Trang Giải Đấu
- Danh sách các giải đấu hiện tại và sắp tới
- Thông tin giải đấu chi tiết
- Tham gia giải đấu
- Xem bảng xếp hạng

### 📰 Trang Tin Tức
- Bài viết tin tức theo category (Kỹ thuật, Cộng đồng, Giải đấu)
- Thời gian đăng và thời gian đọc ước tính
- Hình ảnh minh họa
- Điều hướng đến chi tiết bài viết

### 👤 Trang Hồ sơ Người Dùng
- **Thông tin cá nhân**:
  - Avatar, tên, username, bio
  - Chỉnh sửa trang cá nhân
- **Thống kê**:
  - 24 trận đấu
  - 68% tỷ lệ thắng
  - Xếp hạng #42
  - 3 huy chương
- **Hành động nhanh**:
  - Giải đấu của tôi
  - Lịch sử đặt sân
  - Sân yêu thích
- **Thành tích**: Huy chương, Badge, thành tích mở khóa
- **Cài đặt**: 
  - Cài đặt chung
  - Bảo mật & quyền riêng tư
  - Thông báo
  - Trợ giúp & hỗ trợ
  - Đăng xuất

### 🔐 Xác Thực
- Màn hình đăng nhập với email/số điện thoại
- Đăng nhập bằng mạng xã hội (Facebook, Google)
- Đăng ký tài khoản mới
- Quên mật khẩu

## Cấu Trúc Dự Án

```
one-pickleball/
├── app/                              # Tất cả screen ứng dụng (File-based routing)
│   ├── _layout.tsx                   # Root layout - cấu hình toàn bộ app
│   ├── modal.tsx                     # Modal screen
│   ├── (auth)/                       # Auth group
│   │   ├── _layout.tsx               # Auth layout
│   │   ├── index.tsx                 # Màn hình Đăng nhập
│   │   └── register.tsx              # Màn hình Đăng ký
│   ├── (tabs)/                       # Main app tab navigation
│   │   ├── _layout.tsx               # Tab navigation layout
│   │   ├── index.tsx                 # Trang Chủ
│   │   ├── area.tsx                  # Trang Sân Thi Đấu
│   │   ├── tournament.tsx            # Trang Giải Đấu
│   │   ├── news.tsx                  # Trang Tin Tức
│   │   └── user.tsx                  # Trang Hồ Sơ Người Dùng
│   ├── (details)/                    # Chi tiết screens
│   │   ├── courtDetail/[id].tsx      # Chi tiết sân
│   │   ├── eventDetail/[id].tsx      # Chi tiết sự kiện
│   │   └── newDetail/[id].tsx        # Chi tiết tin tức
│   ├── (stack)/                      # Stack screens
│   │   ├── search.tsx                # Tìm kiếm
│   │   ├── setting.tsx               # Cài đặt
│   │   └── notification.tsx          # Thông báo
│   └── (booking)/                    # Booking flow
│       ├── bookcourse.tsx            # Đặt sân
│       └── checkout.tsx              # Thanh toán
├── components/                       # Reusable components
│   ├── home/                         # Components cho trang Chủ
│   │   ├── ActionCard.tsx            # Card hành động nhanh
│   │   ├── EventCardComponent.tsx    # Card sự kiện
│   │   ├── NewsItemComponent.tsx     # Item tin tức
│   │   ├── StatCard.tsx              # Card thống kê
│   │   └── index.ts                  # Barrel export
│   ├── user/                         # Components cho trang Người dùng
│   │   ├── StatCard.tsx              # Card thống kê người dùng
│   │   ├── AchievementCard.tsx       # Card thành tích
│   │   ├── SettingItemComponent.tsx  # Item cài đặt
│   │   └── index.ts                  # Barrel export
│   ├── ui/                           # UI components chung
│   │   ├── icon-symbol.tsx           # Icon symbol wrapper
│   │   ├── icon-symbol.ios.tsx       # Platform-specific icons
│   │   └── collapsible.tsx           # Collapsible component
│   ├── StatusBarWrapper.tsx          # Status bar wrapper
│   ├── ThemedView.tsx                # Themed container
│   ├── ThemedText.tsx                # Themed text
│   ├── ParallaxScrollView.tsx        # Parallax scroll effect
│   ├── HapticTab.tsx                 # Haptic feedback tab
│   ├── ExternalLink.tsx              # External link handler
│   └── HelloWave.tsx                 # Greeting component
├── contexts/                         # Context API
│   └── ThemeContext.tsx              # Theme (light/dark) context
├── hooks/                            # Custom hooks
│   ├── use-theme.ts                  # Hook quản lý theme
│   ├── use-theme-color.ts            # Hook lấy màu theme
│   ├── use-color-scheme.ts           # Hook lấy color scheme
│   └── use-color-scheme.web.ts       # Web-specific color scheme
├── constants/                        # Hằng số, theme, style
│   ├── theme.ts                      # Định nghĩa theme (color, radius, shadow)
│   └── styles/                       # StyleSheet cho từng screen
│       ├── home.styles.ts            # Styles trang Chủ
│       ├── area.styles.ts            # Styles trang Sân
│       ├── user.styles.ts            # Styles trang Người dùng
│       ├── tournament.styles.ts      # Styles trang Giải đấu
│       ├── news.styles.ts            # Styles trang Tin tức
│       ├── login.styles.ts           # Styles đăng nhập
│       ├── register.styles.ts        # Styles đăng ký
│       ├── search.styles.ts          # Styles tìm kiếm
│       ├── setting.styles.ts         # Styles cài đặt
│       ├── notification.styles.ts    # Styles thông báo
│       ├── booking.styles.ts         # Styles đặt sân
│       ├── courtdetail.styles.ts     # Styles chi tiết sân
│       ├── eventdeatil.styles.ts     # Styles chi tiết sự kiện
│       └── newdetail.styles.ts       # Styles chi tiết tin tức
├── services/                         # API calls, data services (trống)
├── types/                            # TypeScript types (trống)
├── utils/                            # Utility functions (trống)
├── assets/                           # Static assets
│   └── images/                       # Images (logo, favicon, v.v.)
├── config/                           # Configuration files
├── scripts/                          # Build scripts
├── .vscode/                          # VS Code settings
├── android/                          # Android native code
├── app.json                          # Expo app configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies và scripts
└── eslint.config.js                  # ESLint configuration
```

## Các Dependencies Chính

### Navigation & Routing
- `expo-router` - File-based routing
- `@react-navigation/native` - Navigation core
- `@react-navigation/bottom-tabs` - Bottom tab navigation
- `@react-navigation/elements` - Navigation elements

### UI & Styling
- `react-native` - Core framework
- `expo` - Expo platform
- `expo-linear-gradient` - Gradient component
- `expo-symbols` - System symbols
- `@expo/vector-icons` - Icon libraries

### Data Management
- `@tanstack/react-query` - Server state management

### Storage & Preferences
- `@react-native-async-storage/async-storage` - Persistent storage

### Animation & Interactions
- `react-native-reanimated` - Animation library
- `react-native-gesture-handler` - Gesture handling
- `expo-haptics` - Haptic feedback

### Other
- `expo-font` - Font loading
- `expo-image` - Image component
- `expo-splash-screen` - Splash screen
- `expo-constants` - Constants
- `react-native-safe-area-context` - Safe area
- `react-native-screens` - Native screens
- `react-native-worklets` - Worklets

## Cài Đặt & Chạy

### Yêu Cầu
- Node.js 16+ và npm hoặc yarn
- Expo CLI: `npm install -g expo-cli`
- iOS simulator hoặc emulator Android (tùy chọn)

### Cài Đặt Dependencies
```bash
npm install
```

### Chạy Ứng Dụng

**Development:**
```bash
npm start
```
Sau đó nhấn:
- `a` cho Android emulator
- `i` cho iOS simulator
- `w` cho web browser
- `j` cho Metro DevTools

**Trực tiếp trên nền tảng:**
```bash
npm run android      # Android
npm run ios          # iOS
npm run web          # Web
```

### Lint Code
```bash
npm run lint
```

### Reset Project
```bash
npm run reset-project
```

## Kiến Trúc & Các Khái Niệm

### File-Based Routing
Ứng dụng sử dụng `expo-router` cho file-based routing:
- `(tabs)` - Tab navigation group
- `(auth)` - Auth stack group
- `(details)` - Detail screens group
- `[id]` - Dynamic route parameters

### Theme System
- **Context API** - `ThemeContext` quản lý theme mode (light/dark/auto)
- **Async Storage** - Lưu trữ theme preference
- **Custom Hooks** - `useTheme()`, `useThemedColors()` cho dễ dàng access
- **Color Management** - Định nghĩa riêng cho light/dark mode

### Component Organization
- **Barrel Exports** - Các folder components có `index.ts` để export tất cả
- **Style Separation** - Mỗi screen có file styles riêng
- **Reusable Components** - UI components có thể tái sử dụng qua nhiều screens

### State Management
- **React Hooks** - `useState`, `useEffect` cho component state
- **React Query** - Server state management (cấu hình sẵn nhưng chưa sử dụng)
- **AsyncStorage** - Persistent local storage (theme preference)

## Tính Năng Design Pattern

### Responsive Design
- Sử dụng `Dimensions` từ react-native
- `SafeAreaView` cho an toàn trên các thiết bị
- Flexible layouts với flexbox

### Color & Theming
- Unified color palette trong `constants/theme.ts`
- Tất cả components sử dụng theme colors
- Support light/dark mode seamlessly

### Icons
- `@expo/vector-icons` (Ionicons, MaterialCommunityIcons, Feather, FontAwesome)
- `expo-symbols` cho native icons

### Data Display
- FlatList cho danh sách hiệu suất cao
- ScrollView cho content cuộn
- Card-based UI design

## Các Screen Chi Tiết

### 🏠 Home Screen (`app/(tabs)/index.tsx`)
```
- Header: Chào mừng + Notification + Avatar
- Search Bar: Tìm sân, giải đấu, người chơi
- Stat Cards: 3 thẻ hiển thị thống kê
- Quick Actions: 4 hành động nhanh (grid 2x2)
- Upcoming Events: Sliding horizontal list
- Latest News: Vertical list
```

### 🏟️ Area Screen (`app/(tabs)/area.tsx`)
```
- Page Header: Tiêu đề + Search button
- Filter Bar: Horizontal chip filter (nearby, open, rated, custom)
- View Toggle: List/Map mode
- Court List: FlatList với card components
  - Premium badge
  - Court image
  - Favorite button
  - Info (name, rating, reviews)
  - Price
  - Location + Distance
  - Features tags
  - Status indicator
  - Book button
```

### 👤 User Screen (`app/(tabs)/user.tsx`)
```
- Cover section
- Profile info: Avatar, name, username, bio, edit button
- Stats: 4 thẻ (trận đấu, tỷ lệ thắng, xếp hạng, huy chương)
- Quick actions: 3 item (giải đấu của tôi, lịch sử đặt sân, sân yêu thích)
- Achievements: Grid 4 items
- Settings: Menu items (cài đặt, bảo mật, thông báo, trợ giúp, đăng xuất)
```

### 🔐 Login Screen (`app/(auth)/index.tsx`)
```
- Header: Logo + Tiêu đề + Mô tả
- Form: 
  - Email/Phone input
  - Password input + Eye toggle
  - Forgot password link
- Primary button: Đăng nhập
- Social login: Facebook + Google buttons
- Footer: Đăng ký link
```

## CSS & Styling

Tất cả styling được tổ chức trong `constants/styles/`:
- **Platform-specific styles** cho iOS/Android
- **Theme-aware colors** - Tất cả color lấy từ theme
- **Consistent spacing & sizing** - Dùng hệ thống radius từ theme
- **Shadows & elevations** - Định nghĩa trong theme

Ví dụ:
```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Dynamic
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: Radius.md,
    ...Shadows.md,
  }
});
```

## Chế Độ Dark/Light

- **Auto Mode** (Default) - Theo system settings
- **Manual Toggle** - User có thể chuyển đổi thủ công
- **Persistent** - Lưu preference trong AsyncStorage
- **Real-time** - Tất cả component tự động cập nhật khi theme đổi

## Quy Ước Code

- **TypeScript** - Strictly typed
- **Components** - Functional components + hooks
- **Naming** - PascalCase cho components, camelCase cho functions/variables
- **Exports** - Barrel exports trong `index.ts` của các thư mục
- **Styling** - StyleSheet constants, không inline styles

## Lộ Trình Phát Triển

Những tính năng còn chưa hoàn thiện:
- ✅ UI/UX layouts
- ⚠️ API integration (services folder trống)
- ⚠️ Authentication logic
- ⚠️ Booking system
- ⚠️ Real-time notifications
- ⚠️ Map view cho sân thi đấu
- ⚠️ Chat/Messaging system

## Debugging

### Console Logs
```typescript
console.log('Login attempt:', formData);
```

### React DevTools
```bash
npm install -g react-devtools
react-devtools
```

### Expo DevTools
Nhấn `shift + m` trong Expo terminal

## Performance Optimization

- FlatList với `keyExtractor` cho efficient rendering
- Theme context để tránh re-renders không cần thiết
- Async storage cho non-blocking operations
- Memoization khi cần thiết (React.memo)

## Accessibility

- Proper color contrast cho light/dark mode
- Touch-friendly button sizes (min 44x44 points)
- Icon labels + text descriptions
- Alt text cho images

## Deployment

- **iOS App Store** - Cần Apple Developer account
- **Google Play Store** - Cần Google Play Developer account
- **Web** - Deploy static build
- **Expo Go** - Instant testing

Tham khảo: https://docs.expo.dev/build/introduction/

## Hỗ Trợ & Tài Liệu

- [Expo Docs](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Expo Router](https://docs.expo.dev/router/introduction)
- [Tanstack React Query](https://tanstack.com/query/latest)

## Giấy Phép

MIT

---

**Phiên bản:** 1.0.0  
**Tác giả:** One Pickleball Team  
**Cập nhật:** 2024
