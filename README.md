# 💳 Digital Wallet 

A modern, secure, and user-friendly digital wallet application built with React.js, Redux Toolkit, and RTK Query. This frontend application provides a comprehensive financial management system similar to popular mobile financial services like bKash or Nagad.



## 🌟 Project Overview

The Digital Wallet Frontend is a role-based financial application that enables seamless money management across three user types: Users, Agents, and Admins. Built with modern React technologies, it offers a secure, responsive, and accessible interface for performing various financial operations.

**Key Highlights:**
- 🔐 JWT-based authentication with role-based access control
- 💰 Real-time wallet balance and transaction management
- 📱 Fully responsive design optimized for mobile and desktop
- 🌙 Light/dark mode toggle for enhanced user experience
- ♿ Accessibility-first approach with ARIA compliance
- 📊 Interactive charts and analytics dashboard
- 🚀 Optimized performance with RTK Query data caching

## ✨ Features

### 👤 User Features
- **Wallet Management**
  - View real-time wallet balance
  - Deposit money to wallet
  - Withdraw funds to bank account
  - Send money to other users
- **Transaction Management**
  - View detailed transaction history
  - Filter transactions by date, type, and amount
  - Export transaction reports
- **Profile Management**
  - Update personal information
  - Change password securely
  - Manage security settings

### 🏪 Agent Features
- **Cash Services**
  - Cash-in operations for customers
  - Cash-out processing
  - Real-time balance management
- **Business Management**
  - Commission tracking and history
  - Transaction volume analytics
  - Customer service tools
- **Profile & Settings**
  - Update business information
  - Commission rate viewing
  - Performance metrics

### 👨‍💼 Admin Features
- **User Management**
  - View and manage all users
  - Activate/deactivate accounts
  - Role assignment and permissions
- **Transaction Oversight**
  - Monitor all system transactions
  - Advanced filtering and search
  - Suspicious activity detection
- **Analytics & Reports**
  - System-wide financial analytics
  - User behavior insights
  - Revenue and commission reports
- **System Controls**
  - Configure system settings
  - Manage fee structures
  - Security monitoring

### 🔧 General Features
- **Authentication & Security**
  - Secure JWT-based authentication
  - Role-based route protection
  - Session persistence
  - Secure logout functionality
- **User Experience**
  - Intuitive navigation with role-based menus
  - Loading states and skeleton screens
  - Form validations with real-time feedback
  - Toast notifications for user actions
  - Guided tour for new users
- **Technical Features**
  - Pagination for large data sets
  - Interactive charts and visualizations
  - Light/dark theme toggle
  - Responsive design for all devices
  - Accessibility compliance (WCAG 2.1)

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Redux Toolkit** - Efficient state management
- **RTK Query** - Powerful data fetching and caching
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

### Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Husky** - Git hooks for code quality

### APIs & Integration
- **RESTful API** - Backend integration
- **JWT Authentication** - Secure token-based auth
- **Axios** - HTTP client for API requests

## 🚀 Setup Instructions

Follow these steps to run the project locally:

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/mohibbullah272/digital_wallet_client.git
cd digital-wallet-frontend
```

### 2. Install Dependencies
```bash
# Using npm
npm install

# Using yarn
yarn install
```


### 3. Start Development Server
```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production
```bash
# Using npm
npm run build

# Using yarn
yarn build
```

## 🌐 Live Demo

🚀 **Live URL**: [https://tiny-kleicha-6063df.netlify.app](https://tiny-kleicha-6063df.netlify.app)

**Demo Credentials:**
- **User**: `user@gmail.com` / `12345678`
- **Agent**: `agent2@gmail.com` / `12345678`
- **Admin**: `admin@gmail.com` / `12345678`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── store/              # Redux store configuration
├── services/           # RTK Query API services
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── assets/             # Static assets
└── styles/             # Global styles
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Ensure responsive design
- Maintain accessibility standards

## 📋 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
npm run test         # Run tests
```

## 🔮 Future Improvements

- [ ] **Mobile App**: React Native version
- [ ] **Offline Support**: PWA capabilities
- [ ] **Multi-language**: Internationalization (i18n)
- [ ] **Advanced Analytics**: More detailed reporting
- [ ] **QR Code**: Payment integration
- [ ] **Biometric Auth**: Fingerprint/Face ID
- [ ] **Push Notifications**: Real-time alerts
- [ ] **Two-Factor Auth**: Enhanced security




