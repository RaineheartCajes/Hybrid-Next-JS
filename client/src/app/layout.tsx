import ReduxProvider from "../redux/ReduxProvider";
import {AuthProvider} from "../components/auth-context";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const response = await fetch("https://dummyjson.com/users");
  // const result = await response.json();

  // const user = result.users[0] as User;

  return (
    <html lang="en">
      <ReduxProvider >
        <AuthProvider>
        <body className={inter.className}>{children}</body>
        </AuthProvider>
      </ReduxProvider>
    </html>
  );
}