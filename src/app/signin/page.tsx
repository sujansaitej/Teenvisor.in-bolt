  'use client';

  import { useState } from 'react';
  import { useRouter } from 'next/navigation';
  import Link from 'next/link';
  import { motion } from 'framer-motion';

  export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const containerVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
          when: "beforeChildren",
          staggerChildren: 0.2
        }
      }
    };

    const childVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5
        }
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        if (response.ok) {
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    return (
      <motion.div 
        className="min-h-screen bg-theme-dark flex items-center justify-center p-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-xl max-w-md w-full p-8 border border-theme-orange/20"
          variants={childVariants}
        >
          <motion.div 
            className="text-center mb-8"
            variants={childVariants}
          >
            <h2 className="text-3xl font-bold text-theme-orange">Welcome Back!</h2>
            <p className="text-gray-300 mt-2">Sign in to Teenvisor</p>
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            variants={childVariants}
          >
            <motion.div variants={childVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-theme-orange focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </motion.div>

            <motion.div variants={childVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-theme-orange focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </motion.div>

            <motion.div 
              className="flex items-center justify-between"
              variants={childVariants}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-theme-orange rounded border-gray-700 bg-gray-800"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-theme-orange hover:text-theme-orange/80">
                Forgot password?
              </Link>
            </motion.div>

            <motion.button
              type="submit"
              className="w-full bg-theme-orange text-white py-3 rounded-lg hover:bg-theme-orange/90 transition duration-200"
              variants={childVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </motion.button>
          </motion.form>

          <motion.div 
            className="mt-6 text-center"
            variants={childVariants}
          >
            <p className="text-sm text-gray-300">
              Don't have an account?{' '}
              <Link href="/signup" className="text-theme-orange hover:text-theme-orange/80 font-medium">
                Sign up
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }
