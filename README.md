# One Pickleball

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61dafb.svg)
![Expo SDK](https://img.shields.io/badge/Expo%20SDK-54.0-000.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-lightgrey.svg)

Ứng dụng mobile Pickleball chuyên nghiệp được xây dựng với React Native và Expo, hỗ trợ tìm kiếm sân, đặt lịch, quản lý giải đấu và khám phá cộng đồng Pickleball.

[Tìm hiểu thêm](#-về-dự-án) • [Cài đặt](#-cài-đặt) • [Hướng dẫn sử dụng](#-chạy-ứng-dụng) • [Đóng góp](#-đóng-góp)

</div>

---

## 📋 Mục lục

- [Về dự án](#-về-dự-án)
- [Tính năng](#-tính-năng)
- [Công nghệ & Stack](#-công-nghệ--stack)
- [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [Cài đặt](#-cài-đặt)
- [Chạy ứng dụng](#-chạy-ứng-dụng)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Script sẵn có](#-script-sẵn-có)
- [Cấu hình](#-cấu-hình)
- [Troubleshooting](#-troubleshooting)
- [Tài liệu tham khảo](#-tài-liệu-tham-khảo)
- [Đóng góp](#-đóng-góp)
- [License](#-license)

---

## 📱 Về dự án

**One Pickleball** là một ứng dụng mobile toàn diện dành cho cộng đồng Pickleball. Ứng dụng cung cấp các tính năng để người dùng có thể:

- Tìm kiếm sân Pickleball gần nhất
- Xem tin tức và sự kiện cộng đồng
- Quản lý và tham gia các giải đấu
- Theo dõi lịch sử đặt lịch
- Tương tác với cộng đồng Pickleball

Ứng dụng được phát triển bằng React Native với Expo, đảm bảo hiệu suất cao và trải nghiệp người dùng mượt mà trên cả iOS, Android và Web.

---

## 🚀 Tính năng

### Tính năng chính

- **🏐 Khám phá sân Pickleball**
  - Tìm kiếm sân gần nhất theo vị trí
  - Xem thông tin chi tiết sân
  - Lọc theo tiêu chí (giá, lịch mở cửa, tiện ích)

- **📅 Đặt lịch & Booking**
  - Đặt lịch sân trực tuyến
  - Xem lịch sử đặt lịch
  - Quản lý đặt lịch của bạn

- **🏆 Quản lý giải đấu**
  - Xem danh sách giải đấu
  - Tham gia giải đấu
  - Theo dõi lịch trình giải đấu
  - Quản lý các giải đấu của bạn

- **📰 Tin tức & Cộng đồng**
  - Theo dõi tin tức Pickleball
  - Khám phá sự kiện cộng đồng
  - Tương tác với người dùng khác

- **👤 Quản lý tài khoản**
  - Đăng nhập/Đăng ký
  - Chỉnh sửa hồ sơ người dùng
  - Quản lý cài đặt & bảo mật
  - Sở thích cá nhân

- **🔔 Thông báo**
  - Nhận thông báo về đặt lịch
  - Thông báo về sự kiện
  - Thông báo tương tác cộng đồng

---

## 🛠️ Công nghệ & Stack

### Frontend

- **React Native**: 0.81.5
- **Expo SDK**: 54.0.24
- **React**: 19.1.0
- **TypeScript**: 5.9.2

### Navigation & Routing

- **Expo Router**: 6.0.15 (File-based routing)
- **React Navigation**: 7.1.8
  - Bottom Tabs Navigation: 7.4.0
  - Navigation Elements: 2.6.3

### State Management & Data Fetching

- **TanStack React Query**: 5.90.11 (Server state management, caching, synchronization)
- **React Context**: ThemeContext (Client state)

### Storage & Persistence

- **AsyncStorage**: 2.2.0 (Persistent local storage)

### UI & Animation

- **Expo Vector Icons**: 15.0.3
- **Expo Linear Gradient**: 15.0.7
- **React Native Reanimated**: 4.1.1 (Advanced animations)
- **React Native Worklets**: 0.5.1 (Worklet support)
- **React Native Gesture Handler**: 2.28.0 (Gesture recognition)
- **React Native Safe Area Context**: 5.6.0 (Safe area handling)
- **React Native Screens**: 4.16.0 (Native screen management)

### Media & Image

- **Expo Image**: 3.0.10 (Fast image loading)
- **Expo Image Picker**: 17.0.8 (Image selection)
- **Expo Web Browser**: 15.0.9 (Web browser integration)

### Utilities

- **Expo Font**: 14.0.9 (Custom fonts)
- **Expo Haptics**: 15.0.7 (Haptic feedback)
- **Expo Symbols**: 1.0.7 (Symbol icons)
- **Expo System UI**: 6.0.8 (System UI integration)
- **Expo Constants**: 18.0.10 (App constants)
- **Expo Linking**: 8.0.9 (Deep linking)
- **Expo Status Bar**: 3.0.8 (Status bar control)
- **Expo Splash Screen**: 31.0.11 (Splash screen)

### Development

- **ESLint**: 9.25.0
- **ESLint Config Expo**: 10.0.0
- **@types/react**: 19.1.0

### Platform Support

- **React DOM**: 19.1.0 (Web support)
- **React Native Web**: 0.21.0 (Web compatibility layer)

---

## 📋 Yêu cầu hệ thống

### Tối thiểu

- **Node.js**: 16.x hoặc cao hơn (khuyến nghị 18.x+)
- **npm**: 8.x hoặc cao hơn (hoặc yarn 1.22.x+)
- **Git**: 2.0+

### Cài đặt Expo

- **Expo CLI**: Cài đặt global (`npm install -g expo-cli`)

### Hệ điều hành cụ thể

#### iOS

- **macOS**: 12.0 hoặc cao hơn
- **Xcode**: 13.0 hoặc cao hơn
- **CocoaPods**: 1.11.0 hoặc cao hơn
- **Swift**: 5.3+
- **iOS SDK**: iOS 14.0 trở lên

#### Android

- **Android Studio**: 4.0 hoặc cao hơn
- **Android SDK**: 21 (API 21) trở lên
- **Java**: JDK 11.0 hoặc cao hơn
- **Gradle**: 6.7 hoặc cao hơn

#### Web

- Bất kỳ trình duyệt hiện đại nào (Chrome, Firefox, Safari, Edge)

---

## 📦 Cài đặt

### 1. Clone Repository

```bash
git clone https://github.com/hungsieuhay/one-pickleball.git
cd one-pickleball
```

### 2. Cài đặt Dependencies

Sử dụng npm:

```bash
npm install
```

Hoặc sử dụng yarn:

```bash
yarn install
```

### 3. Cấu hình Environment Variables

Tạo file `.env.local` trong thư mục gốc của dự án:

```env
# API Configuration
EXPO_PUBLIC_API_URL=https://api.onepickleball.com
EXPO_PUBLIC_API_TIMEOUT=30000

# Feature Flags
EXPO_PUBLIC_ENABLE_NOTIFICATIONS=true
EXPO_PUBLIC_ENABLE_ANALYTICS=false
EXPO_PUBLIC_ENABLE_CRASH_REPORTING=false
```

**Ghi chú**:

- Các biến bắt đầu với `EXPO_PUBLIC_` có thể truy cập từ client-side
- Tạo file `.env.local` (không commit) để lưu các giá trị cục bộ
- Xem `config/app.config.ts` để hiểu các biến cấu hình

### 4. Cài đặt Pods (iOS only)

```bash
cd ios
pod install
cd ..
```

---

## 🎯 Chạy ứng dụng

### Development Mode

Bắt đầu Expo development server:

```bash
npm start
# hoặc
yarn start
```

Lệnh này sẽ hiển thị menu tương tác với các tùy chọn sau:

```
› Opening the Expo dev menu
 › Press ? to show all available commands.
 › Press 'i' to open iOS Simulator
 › Press 'a' to open Android Emulator
 › Press 'w' to open Web
 › Press 'c' to show QR code
 › Press 'r' to reload
 › Press 'm' to toggle menu
 › Press 'j' to open debugger
```

### Chạy trên iOS Simulator

```bash
# Cách 1: Từ menu Expo
npm start
# Nhấn 'i'

# Cách 2: Trực tiếp
npm run ios
# hoặc
expo run:ios
```

### Chạy trên Android Emulator

```bash
# Cách 1: Từ menu Expo
npm start
# Nhấn 'a'

# Cách 2: Trực tiếp
npm run android
# hoặc
expo run:android
```

### Chạy trên Web

```bash
# Cách 1: Từ menu Expo
npm start
# Nhấn 'w'

# Cách 2: Trực tiếp
npm run web
# hoặc
expo start --web
```

### Debug & Development

Sử dụng Expo DevTools:

```bash
npm start

# Sau đó, từ menu:
# - Nhấn 'j' để mở debugger (DevTools)
# - Nhấn 'm' để hiển thị menu options
# - Nhấn 'r' để reload ứng dụng
```

### Linting

Kiểm tra lỗi code:

```bash
npm run lint
# hoặc
yarn lint
```

---

## 📂 Cấu trúc thư mục

```
one-pickleball/
├── app/                           # Expo Router screens (File-based routing)
│   ├── (auth)/                    # Authentication screens
│   │   └── [auth screens files]
│   ├── (tabs)/                    # Main tab navigation
│   │   ├── index.tsx              # Home/Dashboard
│   │   ├── area.tsx               # Browse areas/fields
│   │   ├── tournament.tsx         # Tournaments
│   │   ├── news.tsx               # News & Community
│   │   ├── user.tsx               # User profile
│   │   └── _layout.tsx            # Tab navigator config
│   ├── (stack)/                   # Stack screens (details, settings, etc.)
│   │   ├── mytournament.tsx       # My tournaments
│   │   ├── historybooking.tsx     # Booking history
│   │   ├── search.tsx             # Advanced search
│   │   ├── editprofile.tsx        # Edit profile
│   │   ├── favoritefield.tsx      # Favorite fields
│   │   ├── notification.tsx       # Notifications
│   │   ├── setting.tsx            # Settings
│   │   ├── helpandsupport.tsx     # Help & Support
│   │   └── securityandprivacy.tsx # Security & Privacy
│   ├── (booking)/                 # Booking flow screens
│   │   └── [booking screens]
│   ├── (details)/                 # Detail screens
│   │   └── [detail screens]
│   ├── _layout.tsx                # Root layout with providers
│   └── modal.tsx                  # Modal screen
│
├── components/                    # Reusable UI components
│   ├── home/                      # Home-specific components
│   ├── user/                      # User-specific components
│   ├── ui/                        # Generic UI components
│   ├── themed-text.tsx            # Text with theme support
│   ├── themed-view.tsx            # View with theme support
│   ├── haptic-tab.tsx             # Tab with haptic feedback
│   ├── parallax-scroll-view.tsx   # Parallax scroll effect
│   ├── status-bar-wrapper.tsx     # Status bar wrapper
│   ├── external-link.tsx          # External link component
│   └── hello-wave.tsx             # Wave animation component
│
├── contexts/                      # React Context for global state
│   └── ThemeContext.tsx           # Theme context (light/dark mode)
│
├── hooks/                         # Custom React hooks
│   ├── use-theme.ts               # Theme hook
│   ├── use-theme-color.ts         # Theme color hook
│   ├── use-color-scheme.ts        # Color scheme detection
│   └── use-color-scheme.web.ts    # Web-specific color scheme
│
├── services/                      # API & external services
│   ├── api/
│   │   ├── client.ts              # Base API client (Fetch API)
│   │   └── tournament.service.ts  # Tournament API endpoints
│   └── storage/
│       └── storage.service.ts     # AsyncStorage utility wrapper
│
├── types/                         # TypeScript type definitions
│   └── index.ts                   # All type exports
│
├── constants/                     # App constants
│   ├── theme.ts                   # Theme constants
│   └── styles/                    # Style constants
│
├── utils/                         # Utility functions
│   └── [helper functions]
│
├── config/                        # Configuration files
│   ├── app.config.ts              # Centralized app configuration
│   └── constants.ts               # App constants
│
├── assets/                        # Static assets
│   ├── images/                    # Images & icons
│   │   ├── logo.png
│   │   └── favicon.png
│   └── fonts/                     # Custom fonts
│
├── .expo/                         # Expo configuration
├── .vscode/                       # VS Code settings
│
├── app.json                       # Expo app configuration
├── package.json                   # Dependencies & scripts
├── tsconfig.json                  # TypeScript configuration
├── eslint.config.js               # ESLint configuration
├── expo-env.d.ts                  # Expo TypeScript definitions
├── README.md                      # This file
└── .gitignore                     # Git ignore rules
```

### Giải thích cấu trúc

- **app/**: Tất cả screens và routing logic (Expo Router file-based)
  - Sử dụng thư mục `(name)` để nhóm screens
  - `_layout.tsx` định cấu hình navigation cho mỗi group
  - Tệp tên `_layout.tsx` không hiển thị là screen

- **components/**: Reusable components
  - Các components có thể được sử dụng lại ở nhiều nơi
  - Được tổ chức theo feature (home, user) hoặc type (ui)

- **services/**: Business logic & API calls
  - `api/`: Tất cả API-related logic
  - `storage/`: Local storage operations

- **hooks/**: Custom hooks
  - `use-*` naming convention
  - Platform-specific hooks có hậu tố (`.web.ts`)

- **types/**: TypeScript definitions
  - Centralized type definitions

- **config/**: App configuration
  - Centralized configuration management
  - Environment variables

---

## 💻 Script sẵn có

| Script    | Mô tả                      | Lệnh              |
| --------- | -------------------------- | ----------------- |
| `start`   | Bắt đầu development server | `npm start`       |
| `ios`     | Chạy trên iOS Simulator    | `npm run ios`     |
| `android` | Chạy trên Android Emulator | `npm run android` |
| `web`     | Chạy trên Web browser      | `npm run web`     |
| `lint`    | Kiểm tra lỗi code          | `npm run lint`    |

### Ví dụ sử dụng

```bash
# Bắt đầu development
npm start

# Chạy trên iOS (ngắn gọn)
npm run ios

# Kiểm tra code quality
npm run lint
```

---

## 🔧 Cấu hình

### app.json (Expo Configuration)

Cấu hình chính cho ứng dụng Expo:

```json
{
  "expo": {
    "name": "one-pickleball",
    "slug": "one-pickleball",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/logo.png",
    "scheme": "onepickleball",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/logo.png",
        "backgroundColor": "#ffffff"
      }
    }
  }
}
```

### config/app.config.ts (Application Configuration)

Cấu hình centralized cho toàn bộ ứng dụng:

```typescript
export const AppConfig = {
  // API Configuration
  api: {
    baseUrl: process.env.EXPO_PUBLIC_API_URL || 'https://api.onepickleball.com',
    timeout: 30000,
    retryAttempts: 3,
  },

  // App Information
  app: {
    name: 'onePickleball',
    version: '1.0.0',
    bundleId: 'com.onepickleball.app',
  },

  // Feature Flags
  features: {
    enableNotifications: true,
    enableAnalytics: false,
    enableCrashReporting: false,
  },

  // Storage Keys
  storageKeys: {
    theme: '@app_theme_mode',
    user: '@user_data',
    token: '@auth_token',
    language: '@app_language',
  },

  // Pagination
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 50,
  },
};
```

### tsconfig.json (TypeScript Configuration)

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./*"] // Path alias untuk imports
    }
  }
}
```

Path aliases cho imports sạch:

```typescript
// Thay vì: import Component from '../../../components/MyComponent'
import Component from '@/components/MyComponent';
```

---

## 🐛 Troubleshooting

### Lỗi: "Cannot find module..." sau khi `npm install`

**Nguyên nhân**: Dependencies chưa được cài đặt đầy đủ

**Giải pháp**:

```bash
# Xóa node_modules và cài đặt lại
rm -rf node_modules package-lock.json
npm install
```

### Lỗi: Metro bundler crashed

**Nguyên nhân**: Cache bundler bị lỗi

**Giải pháp**:

```bash
npm start -- --reset-cache
# hoặc
expo start -c
```

### Lỗi: Port 8081 đã được sử dụng

**Windows**:

```powershell
# Tìm process sử dụng port 8081
netstat -ano | findstr :8081

# Kill process (thay PID)
taskkill /PID <PID> /F
```

**macOS/Linux**:

```bash
# Tìm process
lsof -i :8081

# Kill process (thay PID)
kill -9 <PID>
```

### Lỗi: Pod install failed (iOS)

```bash
cd ios

# Xóa Pods cũ
rm -rf Pods
rm Podfile.lock

# Cài đặt lại
pod install --repo-update

cd ..
```

### Lỗi: ANDROID_HOME not set

**macOS**:

```bash
# Thêm vào ~/.zshrc hoặc ~/.bash_profile
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Reload
source ~/.zshrc
```

**Windows** (PowerShell):

```powershell
[Environment]::SetEnvironmentVariable("ANDROID_HOME", "C:\Users\<YourUsername>\AppData\Local\Android\sdk", "User")
```

### Lỗi: TypeScript compilation error

```bash
# Kiểm tra lỗi TypeScript
npm run lint

# Xóa cache TypeScript
rm -rf .next
```

### Ứng dụng chạy chậm hoặc bị lag

1. **Kiểm tra Memory Usage**:

   ```bash
   npm start
   # Nhấn 'j' để mở DevTools
   # Kiểm tra Memory profiling
   ```

2. **Optimize Bundle Size**:

   ```bash
   npm run lint
   ```

3. **Clear Cache**:
   ```bash
   npm start -- --reset-cache
   ```

### Không thể kết nối đến API

1. **Kiểm tra Base URL**:
   - Xem `config/app.config.ts`
   - Đảm bảo `EXPO_PUBLIC_API_URL` được set đúng

2. **Kiểm tra Network**:

   ```bash
   # Test API endpoint
   curl https://api.onepickleball.com/health
   ```

3. **Kiểm tra Firewall**:
   - Đảm bảo firewall không chặn kết nối

---

## 📚 Tài liệu tham khảo

### Official Documentation

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Documentation](https://docs.expo.dev/routing/introduction/)
- [React Navigation Documentation](https://reactnavigation.org/)

### Libraries Documentation

- [TanStack React Query](https://tanstack.com/query/latest)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [AsyncStorage Documentation](https://react-native-async-storage.github.io/async-storage/)
- [Expo Icons](https://icons.expo.fyi/)

### Development Tools

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [ESLint Configuration](https://eslint.org/docs/rules/)
- [Expo EAS Build](https://docs.expo.dev/build/introduction/)

### Community Resources

- [Expo Community Slack](https://expo.io/slack)
- [React Native Community Discord](https://discord.gg/react-native)
- [Stack Overflow: react-native](https://stackoverflow.com/questions/tagged/react-native)

---

## 🤝 Đóng góp

Chúng tôi rất hoan nghênh mọi đóng góp từ cộng đồng!

### Các bước đóng góp

1. **Fork Repository**

   ```bash
   # Trên GitHub, click nút "Fork"
   ```

2. **Clone Fork của bạn**

   ```bash
   git clone https://github.com/<your-username>/one-pickleball.git
   cd one-pickleball
   ```

3. **Tạo Feature Branch**

   ```bash
   git checkout -b feature/AmazingFeature
   # hoặc
   git checkout -b bugfix/SomeBugFix
   ```

4. **Commit Changes**

   ```bash
   git add .
   git commit -m "Add some AmazingFeature"
   # Viết commit message rõ ràng và mô tả
   ```

5. **Push to Branch**

   ```bash
   git push origin feature/AmazingFeature
   ```

6. **Mở Pull Request**
   - Đi tới GitHub repository
   - Click "Compare & pull request"
   - Mô tả thay đổi của bạn
   - Click "Create Pull Request"

### Quy tắc đóng góp

- Đảm bảo code tuân theo ESLint rules: `npm run lint`
- Viết clean code và có comment khi cần
- Update README nếu thêm features mới
- Test code trước khi submit PR
- Tuân theo commit message convention

### Commit Message Convention

```
[type]: [subject]

[body]

[footer]
```

**Types**: feat, fix, docs, style, refactor, perf, test, chore

**Ví dụ**:

```
feat: Add search functionality for fields

Implement advanced search with filters for:
- Location
- Price range
- Amenities

Closes #123
```

---

## 📄 License

Project này được phát hành dưới giấy phép [MIT License](LICENSE).

Xem file `LICENSE` để biết chi tiết đầy đủ.

---

## 👤 Tác giả

**Hùng Siêu Huy**

- GitHub: [@hungsieuhay](https://github.com/hungsieuhay)
- Repository: [one-pickleball](https://github.com/hungsieuhay/one-pickleball)

---

## 📞 Liên hệ & Support

- **GitHub Issues**: [Report bugs hoặc request features](https://github.com/hungsieuhay/one-pickleball/issues)
- **Discussions**: [Join community discussions](https://github.com/hungsieuhay/one-pickleball/discussions)
- **Email**: [Contact via issues]

---

## 🗺️ Roadmap

- [ ] Push notifications
- [ ] Real-time chat
- [ ] Payment integration
- [ ] Social features (friends, ratings)
- [ ] Advanced analytics
- [ ] Offline mode
- [ ] Multi-language support

---

## 📊 Project Statistics

- **Lines of Code**: ~3000+
- **Components**: 20+
- **Screens**: 15+
- **API Endpoints**: 10+
- **Test Coverage**: In progress

---

## 🎉 Cảm ơn

Cảm ơn tất cả những người đã đóng góp, báo cáo bugs, và giúp cải thiện dự án này!

---

<div align="center">

Made with ❤️ by the One Pickleball Team

⭐ Hãy star repo nếu bạn thấy nó hữu ích!

</div>
