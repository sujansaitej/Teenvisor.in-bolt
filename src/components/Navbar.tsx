"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Forum", href: "/forum" },
    { name: "Resources", href: "/blog" },
    { name: "About Us", href: "/about" },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="bg-theme-dark border-b border-theme-orange/20 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center text-2xl font-bold text-theme-orange">
              Teenvisor
            </Link>
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className="text-gray-300 hover:text-theme-orange transition duration-200 font-medium"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <Link
              href="/signin"
              className="bg-theme-orange text-white px-4 py-2 rounded-lg hover:bg-theme-orange/90 transition duration-200"
            >
              Sign In
            </Link>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-theme-dark border-t border-theme-orange/20"
            >
              <div className="px-4 py-3 space-y-2">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    whileHover={{ x: 10 }}
                  >
                    <Link
                      href={item.href}
                      className="block text-gray-300 hover:text-theme-orange px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/signin"
                    className="block w-full text-center bg-theme-orange hover:bg-theme-orange/90 text-white px-4 py-2 rounded-full font-medium transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
