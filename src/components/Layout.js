import React from 'react';
import { Container } from '@/components/ui/container';
import "./globals.css";

export default function Layout({ children }) {
  return (
    <Container>
      {children}
    </Container>
  );
}
