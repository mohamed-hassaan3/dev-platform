# 📝 Full-Stack Blog App

A modern, full-stack blog application built with **Next.js**, **TypeScript**, **Prisma**, and **ShadCN**. This platform allows users to sign in with Google or GitHub, create posts, like and comment on them, and upload images. Deployed on **Vercel**, powered by **Supabase** and **Cloudinary**.

---

## 🚀 Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Database**: Supabase PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (Google & GitHub)
- **UI**: ShadCN UI with Tailwind CSS
- **Media Storage**: Cloudinary
- **Deployment**: Vercel
- **UI Enhancements**: Aceternity

---

## 📸 Features

- 🔐 OAuth authentication (Google & GitHub)
- 📝 Create, read, update, and delete posts
- 💬 Comment system for posts
- ❤️ Like functionality for posts
- 🖼 Image upload with Cloudinary
- 📱 Fully responsive and accessible UI

---

## 🌟 Live Demo

🔗 **[View Live on Vercel](https://dev-platform-beta.vercel.app)**

---

## 🛠️ Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/mohamed-hassaan3/dev-platform.git
cd dev-platform
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
# Supabase
DATABASE_URL=postgresql://postgres:[YOUR_PASSWORD]@db.[your-project-ref].supabase.co:5432/postgres

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up the Database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to view the app.


## 🎨 Style Kit

The application uses **ShadCN UI** and **Tailwind CSS** for a modern and responsive design. Below are the key style features:

- **Typography**: Clean and accessible fonts
- **Color Palette**: Tailored for a professional and minimalistic look
- **Components**: Pre-designed and reusable UI components
- **Responsive Design**: Optimized for all screen sizes

For more details, visit the [ShadCN UI Documentation](https://shadcn.dev) and [Tailwind CSS Documentation](https://tailwindcss.com).

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by Mohamed Hassaan.

