
import React from 'react';
import { motion } from 'framer-motion';

export default function ScrollReveal({ children, className = "" }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }} // Trigger when 10% of element is in view
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // Smooth cubic-bezier
            className={className}
        >
            {children}
        </motion.div>
    );
}
