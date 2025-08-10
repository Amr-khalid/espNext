import { motion } from "motion/react";

export default function Motion({children}:{children:React.ReactNode}) {
  return (
    <motion.div
    className="w-full"
      initial={{ opacity: 0.4, translateY: 20, scale: 0.5 }}
      transition={{ duration: .5 }}
      whileInView={{ opacity: 1, translateY: -4.5, scale: 1 }}
    >
      {children}
    </motion.div>
  );
}
