import { useState, useRef, useCallback } from 'react';
import { Camera, Type, X, Plus, Search, Sparkles, Loader2 } from 'lucide-react';
import { IngredientItem } from '../types';
import { COMMON_INGREDIENTS, CATEGORY_LABELS } from '../data/ingredients';
import { detectIngredientsFromImage, detectIngredientsFromText } from '../engine/imageDetector';

interface IngredientInputProps {
  pantryItems: IngredientItem[];
  onPantryChange: (items: IngredientItem[]) => void;
}

type InputMode = 'browse' | 'camera' | 'text';

export default function IngredientInput({ pantryItems, onPantryChange }: IngredientInputProps) {
  const [mode, setMode] = useState<InputMode>('browse');
  const [textInput, setTextInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleItem = useCallback((item: IngredientItem) => {
    onPantryChange(
      pantryItems.some((p) => p.id === item.id)
        ? pantryItems.filter((p) => p.id !== item.id)
        : [...pantryItems, item]
    );
  }, [pantryItems, onPantryChange]);

  const removeItem = useCallback((id: string) => {
    onPantryChange(pantryItems.filter((p) => p.id !== id));
  }, [pantryItems, onPantryChange]);

  const handleImageCapture = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsDetecting(true);
    setPreviewUrl(URL.createObjectURL(file));

    try {
      const detected = await detectIngredientsFromImage(file);
      // Merge with existing, avoid duplicates
      const merged = [...pantryItems];
      for (const item of detected) {
        if (!merged.some((p) => p.id === item.id)) {
          merged.push(item);
        }
      }
      onPantryChange(merged);
    } catch {
      // Silently handle — user can still pick manually
    } finally {
      setIsDetecting(false);
    }
  }, [pantryItems, onPantryChange]);

  const handleTextDetect = useCallback(() => {
    if (!textInput.trim()) return;
    const detected = detectIngredientsFromText(textInput);
    const merged = [...pantryItems];
    for (const item of detected) {
      if (!merged.some((p) => p.id === item.id)) {
        merged.push(item);
      }
    }
    onPantryChange(merged);
    setTextInput('');
  }, [textInput, pantryItems, onPantryChange]);

  // Group ingredients by category
  const categories = Object.keys(CATEGORY_LABELS);

  const filteredIngredients = searchQuery.trim()
    ? COMMON_INGREDIENTS.filter(
        (ing) =>
          ing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ing.synonyms?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : COMMON_INGREDIENTS;

  return (
    <section className="space-y-6">
      {/* Section title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-100">
          What's in Your Pantry?
        </h2>
        <p className="text-slate-400 mt-1">Choose how to add your ingredients</p>
      </div>

      {/* Mode selector */}
      <div className="flex justify-center gap-2">
        {[
          { key: 'browse' as InputMode, icon: <Search className="w-4 h-4" />, label: 'Browse & Pick' },
          { key: 'camera' as InputMode, icon: <Camera className="w-4 h-4" />, label: 'Snap Photo' },
          { key: 'text' as InputMode, icon: <Type className="w-4 h-4" />, label: 'Type List' },
        ].map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              mode === m.key
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-neon'
                : 'glass-pill text-slate-400 hover:text-slate-200'
            }`}
          >
            {m.icon}
            <span className="hidden sm:inline">{m.label}</span>
          </button>
        ))}
      </div>

      {/* Camera mode */}
      {mode === 'camera' && (
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <div className="text-center space-y-3">
            <div className="text-5xl">📸</div>
            <p className="text-slate-300 text-sm">
              Take a photo of your ingredients or upload from gallery.
              <br />
              <span className="text-slate-500">We'll auto-detect what we can — you can always add more manually.</span>
            </p>
          </div>

          {previewUrl && (
            <div className="relative mx-auto w-full max-w-sm rounded-xl overflow-hidden border border-white/10">
              <img src={previewUrl} alt="Captured ingredients" className="w-full h-48 object-cover" />
              {isDetecting && (
                <div className="absolute inset-0 bg-slate-950/70 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm font-medium">Detecting ingredients...</span>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageCapture}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold rounded-xl hover:scale-105 active:scale-95 transition-transform shadow-lg"
            >
              <Camera className="w-5 h-5" />
              {previewUrl ? 'Take Another Photo' : 'Open Camera / Gallery'}
            </button>
          </div>
        </div>
      )}

      {/* Text mode */}
      {mode === 'text' && (
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <p className="text-slate-400 text-sm text-center">
            Type your ingredients separated by commas (e.g., "eggs, tomato, chicken, rice")
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTextDetect()}
              placeholder="eggs, tomato, chicken, rice, broccoli..."
              className="flex-1 bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
            />
            <button
              onClick={handleTextDetect}
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Detect</span>
            </button>
          </div>
        </div>
      )}

      {/* Browse mode — search + category grid */}
      {mode === 'browse' && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ingredients..."
              className="w-full bg-slate-800/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
            />
          </div>

          {/* Category sections */}
          <div className="space-y-5">
            {categories.map((cat) => {
              const catIngredients = filteredIngredients.filter((i) => i.category === cat);
              if (catIngredients.length === 0) return null;
              const { label, icon } = CATEGORY_LABELS[cat];

              return (
                <div key={cat}>
                  <h3 className="text-sm font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                    <span>{icon}</span> {label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {catIngredients.map((ing) => {
                      const selected = pantryItems.some((p) => p.id === ing.id);
                      return (
                        <button
                          key={ing.id}
                          onClick={() => toggleItem(ing)}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                            selected
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                              : 'glass-pill text-slate-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <span className="text-base">{ing.emoji}</span>
                          <span>{ing.name}</span>
                          {selected && <X className="w-3.5 h-3.5 ml-0.5 opacity-60" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected items summary */}
      {pantryItems.length > 0 && (
        <div className="glass-card rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" />
              Your Pantry ({pantryItems.length} items)
            </h3>
            <button
              onClick={() => onPantryChange([])}
              className="text-xs text-slate-500 hover:text-red-400 transition-colors"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {pantryItems.map((item) => (
              <span
                key={item.id}
                className="inline-flex items-center gap-1.5 bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-sm"
              >
                <span>{item.emoji}</span>
                {item.name}
                <button onClick={() => removeItem(item.id)} className="ml-0.5 hover:text-red-400 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
