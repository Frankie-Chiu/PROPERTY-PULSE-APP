"use client";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/app/properties/components/Navbar";
import Footer from "@/app/properties/components/Footer";
import { GlobalProvider } from "@/context/GlobalContext";

const ClientLayout = ({ children }) => {
  return (
    <SessionProvider>
      <GlobalProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </GlobalProvider>
    </SessionProvider>
  );
};

export default ClientLayout;
