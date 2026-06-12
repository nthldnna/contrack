# ConTrack - Smart Inventory Management System

ConTrack is a modern, full-stack inventory management system designed to help businesses efficiently track materials, suppliers, and stock movement in real-time. Built with Next.js 16, React 19, and Supabase, ConTrack provides a comprehensive solution for inventory optimization and analytics.

## 🚀 Features

- **Real-time Inventory Tracking** - Monitor stock levels across all materials and locations instantly
- **Supplier Management** - Organize and manage supplier information efficiently
- **Material Categorization** - Categorize materials by type, units, and properties
- **Stock Alerts** - Get notified when stock levels fall below thresholds
- **Analytics Dashboard** - Visual insights and data-driven decision-making tools
- **User Authentication** - Secure email/password authentication with Supabase Auth
- **Responsive Design** - Modern, mobile-friendly interface with Tailwind CSS
- **Data Export** - Export inventory data for reporting and analysis

## 📋 Modules

### 1. **Dashboard**
- Overview of key inventory metrics
- Stock level summaries
- Recent activity logs
- Quick access to frequently used functions
- **File**: `src/app/(protected)/dashboard/page.tsx`

### 2. **Materials Management**
- Create, read, update, and delete materials
- Track material properties and specifications
- Assign materials to categories
- Define units of measurement
- **File**: `src/app/(protected)/materials/page.tsx`

### 3. **Supplier Management**
- Maintain supplier database
- Contact information and details
- Track supplier relationships
- View supplier-linked materials
- **File**: `src/app/(protected)/suppliers/page.tsx`

### 4. **Stock Management**
- Real-time stock level monitoring
- Stock in/out transactions
- Historical stock movements
- Low stock warnings
- **File**: `src/app/(protected)/stocks/page.tsx`

### 5. **Categories**
- Organize materials by categories
- Create and manage category hierarchy
- Filter materials by category
- **File**: `src/app/(protected)/categories/page.tsx`

### 6. **Units**
- Define measurement units (kg, liter, pieces, etc.)
- Manage unit conversions
- Apply units to materials
- **File**: `src/app/(protected)/units/page.tsx`

### 7. **Authentication**
- User signup and registration
- Secure login with email/password
- Session management
- Password reset functionality
- **Files**: `src/app/(auth)/login/page.tsx`, `src/app/(auth)/signup/page.tsx`

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **UI Library**: React 19.2.4
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Charts**: Recharts
- **Font**: Geist (optimized via next/font)

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **ORM**: Supabase JavaScript Client
- **API**: Next.js API Routes

### Development Tools
- **Language**: TypeScript 5
- **Linter**: ESLint 9
- **Package Manager**: npm/yarn/pnpm/bun

## 📁 Project Structure

```
contrack/
├── src/
│   ├── app/
│   │   ├── (auth)/                 # Authentication routes
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (protected)/            # Protected routes (require auth)
│   │   │   ├── dashboard/
│   │   │   ├── materials/
│   │   │   ├── suppliers/
│   │   │   ├── stocks/
│   │   │   ├── categories/
│   │   │   ├── units/
│   │   │   └── layout.tsx
│   │   ├── components/             # Reusable components
│   │   │   ├── ui/
│   │   │   │   ├── CreateModal.tsx
│   │   │   │   ├── UpdateModal.tsx
│   │   │   │   ├── DeleteModal.tsx
│   │   │   │   ├── DataTable.tsx
│   │   │   │   └── Modal.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home page
│   │   └── icon.png
│   ├── lib/
│   │   └── modules/                # Business logic modules
│   │       ├── dashboard.tsx
│   │       ├── categories.tsx
│   │       ├── materials.tsx
│   │       ├── stocks.tsx
│   │       ├── suppliers.tsx
│   │       └── units.tsx
│   └── assets/
│       └── images/
├── public/                          # Static files
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm/bun
- Supabase account and project
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/nthldnna/contrack.git
cd contrack
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The application uses Supabase with the following main tables:

- **users** - User accounts and authentication
- **materials** - Material/product inventory
- **suppliers** - Supplier information
- **stocks** - Stock levels and movements
- **categories** - Material categories
- **units** - Measurement units

## 📖 Usage

### Creating Materials
1. Navigate to Materials module
2. Click "Create Material"
3. Fill in material details (name, category, unit)
4. Save to add to inventory

### Managing Stock
1. Go to Stock Management module
2. Log stock in/out transactions
3. View real-time stock levels
4. Monitor low stock warnings

### Viewing Analytics
1. Access the Dashboard
2. View key metrics and charts
3. Analyze inventory trends
4. Export data for reports

## 🔐 Security

- **Authentication**: Supabase Auth with email/password
- **Session Management**: Secure session tokens
- **Database Access**: Row-level security (RLS) on Supabase
- **HTTPS**: All data transmitted securely

## 🎨 Design

ConTrack features a modern, intuitive interface with:
- Clean blue and white color scheme
- Responsive design for all devices
- Smooth animations and transitions
- Accessible UI components
- Dark mode ready

## 📝 Available Scripts

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🔄 Workflow

1. **Authentication** - Users sign up/login
2. **Dashboard** - View inventory overview
3. **Material Management** - Add/edit materials
4. **Supplier Setup** - Register suppliers
5. **Stock Tracking** - Log inventory movements
6. **Analytics** - Monitor performance

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

### Development Workflow
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📧 Support

For support, email us at [nthldnna@gmail.com](mailto:nthldnna@gmail.com)

## 🔗 Links

- **GitHub**: [nthldnna/contrack](https://github.com/nthldnna/contrack)
- **Supabase**: [Supabase Documentation](https://supabase.com/docs)
- **Next.js**: [Next.js Documentation](https://nextjs.org/docs)
- **Tailwind CSS**: [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database powered by [Supabase](https://supabase.com/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)

---

**ConTrack** - Making Inventory Management Simple & Efficient
