"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "./logo";
import brandData from "@/content/brand.json";

export function Footer() {
  const { instagram, phone, whatsapp } = brandData;

  return (
    <footer className="bg-obsidian border-t border-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Logo size="sm" />
            <p className="mt-4 text-subtext text-sm text-center md:text-left">
              Speciality Coffee. Precision Calibration.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-bone font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["Home", "Menu", "About", "Gallery", "Contact"].map((link) => (
                <Link
                  key={link}
                  href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                  className="text-subtext hover:text-gold transition-colors text-sm"
                >
                  {link}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center md:items-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-bone font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {instagram && (
                <motion.a
                  href={instagram.startsWith("http") ? instagram : `https://instagram.com/${instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-glass flex items-center justify-center text-bone hover:bg-gold hover:text-obsidian transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
                </motion.a>
              )}
              {whatsapp && (
                <motion.a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-glass flex items-center justify-center text-bone hover:bg-gold hover:text-obsidian transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5" />
                </motion.a>
              )}
              {phone && (
                <motion.a
                  href={`tel:${phone}`}
                  className="w-10 h-10 rounded-full bg-glass flex items-center justify-center text-bone hover:bg-gold hover:text-obsidian transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 pt-8 border-t border-glass-border text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-subtext text-sm">
            © {new Date().getFullYear()} FIX Speciality Coffee. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}