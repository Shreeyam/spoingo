import { Geist, Geist_Mono } from "next/font/google";
import React from 'react';
import { Container } from '@/components/ui/container';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function Layout({ children }) {
  return (
    <Container>
      {children}
    </Container>
  );
}
