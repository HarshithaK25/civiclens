import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Clock3, Plus } from 'lucide-react';

const icons = {
  plus: Plus,
  alert: AlertTriangle,
  clock: Clock3,
  check: CheckCircle2,
};

export default function StatCard({ label, value, tone = 'teal', icon = 'plus' }) {
  const Icon = icons[icon] || Plus;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`stat-card ${tone}`}
    >
      <div className="stat-icon"><Icon size={18} /></div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </motion.div>
  );
}
