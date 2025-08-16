# GuidelyAI

![GuidelyAI Banner](SS1.png) An intelligent career guidance companion built to help users navigate their professional journey. This application leverages the power of Google's Gemini API to provide personalized advice, insights, and support.

## About The Project

**GuidelyAI** is a web application designed to act as a personal AI guide for career development. Whether you're a student planning your future, a professional looking for a change, or anyone seeking career advice, this tool aims to provide valuable and actionable guidance and many features.

Built with a modern, robust, and scalable tech stack, GuidelyAI is ready to help you unlock your professional potential.

### Built With

This project is powered by a cutting-edge technology stack:

* **[Next.js](https://nextjs.org/)** - A powerful React framework for building fast and scalable web applications.
* **[PostgreSQL](https://www.postgresql.org/)** - A sophisticated open-source relational database.
* **[Gemini API](https://ai.google.dev/)** - Google's latest and most capable large language model.
* **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework for rapid UI development.
* **[shadcn/ui](https://ui.shadcn.com/)** - A collection of beautifully designed, reusable components.
* **[Vercel](https://vercel.com/)** - The platform for deploying and hosting the application.

## Screenshots

Here are a couple of screenshots of GuidelyAI in action:

**Screenshot 1: Main Dashboard**
![Screenshot 1](./SS1.png)

**Screenshot 2: Career Path Analysis**
![Screenshot 2](./SS2.png)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:

* **Node.js** (v18.0 or newer)
* **npm**, **yarn**, **pnpm**, or **bun**

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/GuidelyAI.git](https://github.com/your-username/GuidelyAI.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd GuidelyAI
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```
4.  **Set up your environment variables:**
    Create a `.env.local` file in the root of the project and add your database connection string and Gemini API key.
    ```env
    DATABASE_URL="your_postgresql_connection_string"
    GEMINI_API_KEY="your_gemini_api_key"
    ```
5.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Features

* **Personalized Career Advice:** Get tailored recommendations based on your profile and goals.
* **Resume Analysis:** Upload your resume for AI-powered feedback.
* **Interview Preparation:** Practice common interview questions and get tips.
* **Skill Gap Analysis:** Identify the skills you need to advance in your chosen field.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.