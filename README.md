# Appifylab Task - Frontend

A modern, responsive social networking platform frontend built with React 19, TypeScript, and Vite. This application provides a seamless user experience for profile management, social interactions, and content sharing with a clean, intuitive interface.

- **Live URL:** [https://appifylab-task-frontend.vercel.app/](https://appifylab-task-frontend.vercel.app/)
- **Repository:** [https://github.com/Anikroy7/appifylab_task_frontend](https://github.com/Anikroy7/appifylab_task_frontend)
- **Backend Repository:** [https://github.com/Anikroy7/appifylab_task_backend](https://github.com/Anikroy7/appifylab_task_backend)

## 📋 Project Description

This frontend application is a feature-rich social networking platform that enables users to connect, share, and interact with others. Built with modern web technologies, it offers a smooth and responsive user experience across all devices.

### Core Features

#### 🔐 Authentication & Authorization
- **User Registration**: Create new accounts with email and password
- **Secure Login**: JWT-based authentication with persistent sessions
- **Auto-login**: Remember user sessions with refresh token mechanism
- **Protected Routes**: Route guards for authenticated-only pages

#### 👤 User Profile Management
- **Complete Profile**: View and edit personal information
- **Profile Customization**: Update bio, profile picture, and cover photo
- **Skills & Languages**: Add and manage professional skills and languages
- **Work History**: Track employment history and education
- **Portfolio**: Showcase projects and work samples
- **Availability Settings**: Set hourly rates and availability

#### 📱 Social Features
- **News Feed**: View posts from all users in real-time
- **Create Posts**: Share text and image content
- **Post Visibility**: Control post privacy (public/private)
- **Like System**: Like and unlike posts with real-time updates
- **User Discovery**: Browse and search for other users
- **Session Management**: View and manage active login sessions across devices

#### 🎨 User Experience
- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop
- **Modern UI**: Clean and intuitive interface
- **Real-time Updates**: Instant feedback on user actions
- **Image Upload**: Seamless image upload with ImgBB integration
- **Loading States**: Smooth loading indicators for better UX
- **Error Handling**: User-friendly error messages

## 🛠️ Tech Stack

- **React 19**: Latest React features with improved performance
- **TypeScript**: Type-safe development with enhanced IDE support
- **Vite**: Lightning-fast build tool and development server
- **Redux Toolkit**: Efficient state management with RTK Query
- **React Router v7**: Modern client-side routing
- **CSS3**: Custom styling with modern CSS features
- **ESLint & Prettier**: Code quality and consistent formatting

## 📦 Prerequisites

Before running this project locally, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** - [Download](https://git-scm.com/)
- **Backend API** running (see [backend repository](https://github.com/Anikroy7/appifylab_task_backend))

## 🚀 Local Installation & Setup

Follow these steps to run the frontend application on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/Anikroy7/appifylab_task_frontend.git
cd appifylab_task_frontend
```

### 2. Install Dependencies

```bash
npm install
```

Or if you prefer yarn:
```bash
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root directory of the project. Copy the contents below and update the values according to your setup:

#### `.env.example`

```env
# ============================================
# API CONFIGURATION
# ============================================
# Backend API Base URL
# For local development (make sure backend is running on port 5000)
VITE_API_BASE_URL=http://localhost:5000

# For production
# VITE_API_BASE_URL=https://appifylab-task-backend.vercel.app

# ============================================
# IMAGE UPLOAD CONFIGURATION
# ============================================
# ImgBB API Key for image uploads
# Get your free API key from: https://api.imgbb.com/
VITE_IMGBB_KEY=your_imgbb_api_key_here

# Example (replace with your actual key):
# VITE_IMGBB_KEY=47939f6304aae8b97c9f1a872785ee6f
```

### 4. Get ImgBB API Key (Required for Image Uploads)

1. Visit [ImgBB API](https://api.imgbb.com/)
2. Sign up for a free account
3. Navigate to the API section
4. Copy your API key
5. Paste it in the `.env` file as `VITE_IMGBB_KEY`

### 5. Ensure Backend is Running

Before starting the frontend, make sure the backend API is running:

1. Follow the setup instructions in the [backend repository](https://github.com/Anikroy7/appifylab_task_backend)
2. Start the backend server (it should be running on `http://localhost:5000`)
3. Verify the backend is accessible by visiting `http://localhost:5000/api/v1` in your browser

## 🏃 Running the Application

### Development Mode

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will start on `http://localhost:5173` (or another port if 5173 is busy).

You should see output similar to:
```
  VITE v7.2.4  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Open your browser and navigate to `http://localhost:5173` to see the application.

### Production Build

To build the application for production:

```bash
npm run build
```

This will create an optimized production build in the `dist` folder.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Starts the Vite development server with HMR |
| `npm run build` | Compiles TypeScript and builds the app for production |
| `npm run lint` | Runs ESLint to check for code quality issues |
| `npm run preview` | Previews the production build locally |

## 📁 Project Structure

```
appifylab-task-frontend/
├── public/                    # Static assets
│   └── vite.svg              # Favicon and static files
├── src/
│   ├── main.tsx              # Application entry point
│   ├── App.tsx               # Main application component
│   ├── App.css               # Global app styles
│   ├── index.css             # Global CSS styles
│   ├── components/           # Reusable UI components
│   │   ├── Header.tsx        # Navigation header
│   │   ├── Sidebar.tsx       # User profile sidebar
│   │   ├── FeedContent.tsx   # News feed component
│   │   ├── MainContents.tsx  # Main content area
│   │   └── ...               # Other components
│   ├── pages/                # Page components
│   │   ├── HomePage.tsx      # Home/Feed page
│   │   ├── LoginPage.tsx     # Login page
│   │   ├── RegisterPage.tsx  # Registration page
│   │   └── ...               # Other pages
│   ├── store/                # Redux store configuration
│   │   ├── store.ts          # Redux store setup
│   │   ├── authSlice.ts      # Authentication state
│   │   ├── userSlice.ts      # User state
│   │   ├── postSlice.ts      # Post state
│   │   └── ...               # Other slices
│   ├── utils/                # Utility functions
│   │   └── api.ts            # API helper functions
│   ├── styles/               # Additional styles
│   └── assets/               # Images, fonts, etc.
├── .env                      # Environment variables (not in git)
├── .env.example              # Environment variables template
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── eslint.config.js          # ESLint configuration
└── README.md                 # This file
```

## 🎯 Key Features Walkthrough

### 1. User Registration & Login
- Navigate to `/register` to create a new account
- Fill in your details (name, email, password)
- After registration, you'll be redirected to login
- Login with your credentials to access the platform

### 2. Profile Management
- Click on your profile picture in the header
- Edit your profile information, bio, and skills
- Upload profile picture and cover photo
- Add work history, education, and portfolio items

### 3. Creating Posts
- From the home page, use the post creation form
- Write your content and optionally upload an image
- Choose visibility (public or private)
- Click "Post" to share with others

### 4. Interacting with Posts
- Like posts by clicking the heart icon
- View who liked a post
- See posts from all users in your feed

### 5. Session Management
- View all your active login sessions
- Log out from specific devices
- Manage your account security

## 🧪 Testing the Application

### Manual Testing Checklist

- [ ] User can register a new account
- [ ] User can login with valid credentials
- [ ] User can view and edit their profile
- [ ] User can create posts with text and images
- [ ] User can like/unlike posts
- [ ] User can view other users' profiles
- [ ] User can manage active sessions
- [ ] Application is responsive on mobile devices
- [ ] Images upload successfully
- [ ] Error messages display correctly

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. Backend Connection Error
**Error**: `Failed to fetch` or `Network Error`

**Solution**:
- Ensure the backend server is running on `http://localhost:5000`
- Check if `VITE_API_BASE_URL` in `.env` is correct
- Verify CORS is properly configured in the backend

#### 2. Image Upload Fails
**Error**: `Image upload failed` or `Invalid API key`

**Solution**:
- Verify `VITE_IMGBB_KEY` is set correctly in `.env`
- Get a valid API key from [ImgBB](https://api.imgbb.com/)
- Check your internet connection

#### 3. Port Already in Use
**Error**: `Port 5173 is already in use`

**Solution**:
- Vite will automatically try the next available port
- Or manually specify a port: `npm run dev -- --port 3000`

#### 4. Environment Variables Not Loading
**Error**: `undefined` when accessing `import.meta.env.VITE_*`

**Solution**:
- Ensure `.env` file is in the root directory
- All Vite env variables must start with `VITE_`
- Restart the dev server after changing `.env`

#### 5. TypeScript Errors
**Error**: Type errors during build

**Solution**:
- Run `npm install` to ensure all dependencies are installed
- Check `tsconfig.json` configuration
- Clear cache: `rm -rf node_modules/.vite`

## 🚀 Deployment

This application is deployed on Vercel. To deploy your own instance:

### Deploy to Vercel

1. **Install Vercel CLI** (optional):
```bash
npm install -g vercel
```

2. **Deploy via Vercel Dashboard**:
   - Push your code to GitHub
   - Visit [Vercel](https://vercel.com/)
   - Import your repository
   - Configure environment variables:
     - `VITE_API_BASE_URL`: Your production backend URL
     - `VITE_IMGBB_KEY`: Your ImgBB API key
   - Deploy!

3. **Deploy via CLI**:
```bash
vercel
```

### Environment Variables for Production

Make sure to set these environment variables in your Vercel project settings:

```env
VITE_API_BASE_URL=https://your-backend-url.vercel.app
VITE_IMGBB_KEY=your_actual_imgbb_api_key
```

## 🔒 Security Considerations

- Never commit `.env` file to version control
- Keep your ImgBB API key private
- Use HTTPS in production
- Implement proper authentication checks
- Sanitize user inputs
- Keep dependencies updated

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Anik Roy**
- GitHub: [@Anikroy7](https://github.com/Anikroy7)

## 📞 Support

For issues, questions, or contributions, please open an issue in the [GitHub repository](https://github.com/Anikroy7/appifylab_task_frontend/issues).

## 🔗 Related Links

- [Backend Repository](https://github.com/Anikroy7/appifylab_task_backend)
- [Live Demo](https://appifylab-task-frontend.vercel.app/)
- [API Documentation](https://appifylab-task-backend.vercel.app/)

---

**Happy Coding! 🚀**
