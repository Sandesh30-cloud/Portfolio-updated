import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Sandesh Yesane. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Built with <Heart size={14} className="text-red-500 fill-red-500" /> using React & Tailwind
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
