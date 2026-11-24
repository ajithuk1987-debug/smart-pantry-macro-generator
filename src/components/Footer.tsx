export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 py-6 px-4 text-center">
      <p className="text-xs text-slate-600">
        Built with ❤️ by{' '}
        <span className="text-emerald-500 font-medium">NutriPantry</span> •
        100% Free & Open Source • No paid APIs
      </p>
      <p className="text-xs text-slate-700 mt-1">
        Nutritional values are approximate. Consult a dietitian for personalized advice.
      </p>
    </footer>
  );
}
