"use client";

import dynamic from 'next/dynamic';
import "react-toastify/dist/ReactToastify.css";

// Importaciones dinámicas
const ToastContainer = dynamic(
  () => import('react-toastify').then((mod) => mod.ToastContainer),
  { ssr: false }
);

const ScrollToTop = dynamic(
  () => import("./components/helper/scroll-to-top"),
  { ssr: false }
);

export default function ClientComponents() {
  return (
    <>
      <ToastContainer />
      <ScrollToTop />
    </>
  );
}