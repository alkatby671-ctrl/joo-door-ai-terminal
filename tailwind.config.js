module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        panel: '#0f172a',
        panelAlt: '#111827',
        accent: '#4f46e5',
        accentSoft: '#818cf8',
        success: '#22c55e',
        warning: '#fbbf24',
        danger: '#ef4444',
      },
      boxShadow: {
        glow: '0 0 30px rgba(79, 70, 229, 0.35)',
      },
    },
  },
  plugins: [],
};
