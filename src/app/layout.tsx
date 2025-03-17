import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import * as motion from "motion/react-client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Love Terminal",
  description: "A romantic terminal experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-dvh bg-gradient-to-b from-gray-900 to-pink-900 p-4 sm:p-8 relative overflow-hidden`}>
        {/* Animated Background Pattern */}
        <div className="fixed inset-0 z-10 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0,
                y: '100vh',
                x: `${Math.random() * 100}%`,
                scale: Math.random() * 2 + 0.5
              }}
              animate={{ 
                opacity: [0, 0.3, 0],
                y: '-100vh',
                rotate: [0, 360]
              }}
              transition={{
                duration: Math.random() * 8 + 12,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2
              }}
              className="absolute text-pink-200/20"
              style={{
                fontSize: `${Math.random() * 20 + 10}px`,
                left: `${Math.random() * 100}%`
              }}
            >
              ❤️
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <main className="relative z-10">
          {children}
        </main>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-0 left-0 right-0 text-center py-4 text-gray-400 text-xs sm:text-sm"
        >
          Made with{" "}
          <motion.span
            animate={{
              scale: [1, 1.2, 1],
              color: ["#f472b6", "#ff1493", "#f472b6"]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
          >
            ❤️
          </motion.span>{" "}
          by{" "}
          <a 
            href="https://kyawphyothu.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-pink-400 hover:text-pink-300 transition-colors"
          >
            Kyaw Phyo Thu
          </a>
        </motion.footer>
      </body>
    </html>
  );
}
