
import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import { CardCategory, CardItem } from '../types';
import AdminPanel from './AdminPanel';

interface AdminViewProps {
  onExit: () => void;
}

type View = 'CATEGORIES' | 'ITEMS' | 'NOTES';

const AdminView: React.FC<AdminViewProps> = ({ onExit }) => {
  const [view, setView] = useState<View>('CATEGORIES');
  const [selectedCategory, setSelectedCategory] = useState<CardCategory | null>(null);
  const [selectedItem, setSelectedItem] = useState<CardItem | null>(null);

  const handleSelectCategory = (category: CardCategory) => {
    setSelectedCategory(category);
    setView('ITEMS');
  };

  const handleSelectItem = (item: CardItem) => {
    setSelectedItem(item);
    setView('NOTES');
  };
  
  const backToCategories = () => {
      setSelectedCategory(null);
      setSelectedItem(null);
      setView('CATEGORIES');
  }

  const backToItems = () => {
    setSelectedItem(null);
    setView('ITEMS');
  }

  const renderContent = () => {
    switch (view) {
      case 'CATEGORIES':
        return (
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-6 px-4">Select a Category</h2>
            <ul className="divide-y divide-slate-200">
              {CATEGORIES.map(cat => (
                <li key={cat.name}>
                  <button onClick={() => handleSelectCategory(cat)} className="w-full text-left p-4 hover:bg-slate-100 transition-colors text-lg">
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'ITEMS':
        return (
          <div>
            <header className="flex items-center mb-6 px-4">
                <button onClick={backToCategories} className="text-[#166886] hover:underline mr-4">&larr; Back</button>
                <h2 className="text-3xl font-bold text-slate-800">{selectedCategory?.name}</h2>
            </header>
            <ul className="divide-y divide-slate-200">
              {selectedCategory?.items.map(item => (
                <li key={item.id}>
                  <button onClick={() => handleSelectItem(item)} className="w-full text-left p-4 hover:bg-slate-100 transition-colors text-lg">
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'NOTES':
        return (
            <div>
                <header className="flex items-center mb-6 px-4">
                    <button onClick={backToItems} className="text-[#166886] hover:underline mr-4">&larr; Back</button>
                    <h2 className="text-3xl font-bold text-slate-800">{selectedItem?.name}</h2>
                </header>
                <AdminPanel item={selectedItem} category={selectedCategory} />
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#166886]">Admin Mode</h1>
        <button
          onClick={onExit}
          className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-md hover:bg-slate-300 transition-colors"
        >
          Exit Admin Mode
        </button>
      </header>
      <main className="p-4 md:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminView;
