import React, { useState, useCallback, useEffect } from 'react';
import { Screen, CardCategory, CardItem, SessionLog, AppContextType, RouletteItem } from './types';
import { CATEGORIES } from './constants';
import HomeScreen from './components/HomeScreen';
import CategoryScreen from './components/CategoryScreen';
import GridScreen from './components/GridScreen';
import DetailScreen from './components/DetailScreen';
import AdminView from './components/AdminView';
import RouletteOverlay from './components/RouletteOverlay';

export const AppContext = React.createContext<AppContextType | null>(null);

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>(Screen.Home);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [sessionLogs, setSessionLogs] = useState<SessionLog[]>([]);
  const [currentCategory, setCurrentCategory] = useState<CardCategory | null>(null);
  const [currentItem, setCurrentItem] = useState<CardItem | null>(null);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [rouletteState, setRouletteState] = useState<{ items: RouletteItem[], onComplete: (selection: RouletteItem) => void } | null>(null);


  useEffect(() => {
    // Log session data to console as it happens
    if (sessionLogs.length > 0) {
      console.log("Current Session Log:", sessionLogs[sessionLogs.length - 1]);
    }
  }, [sessionLogs]);

  const addLog = useCallback((log: Omit<SessionLog, 'timestamp'>) => {
    setSessionLogs(prev => [...prev, { ...log, timestamp: new Date() }]);
  }, []);

  const startSession = useCallback(() => {
    setSessionLogs([]);
    setSessionStartTime(Date.now());
    addLog({ event: 'session_start' });
    setScreen(Screen.Category);
  }, [addLog]);

  const selectCategory = useCallback((category: CardCategory) => {
    setCurrentCategory(category);
    addLog({ event: 'category_selected', detail: category.name });
    setScreen(Screen.Grid);
  }, [addLog]);

  const selectItem = useCallback((item: CardItem, categoryOverride?: CardCategory) => {
    const categoryToSet = categoryOverride || currentCategory;
    if (!categoryToSet) return;

    setCurrentItem(item);
    setCurrentCategory(categoryToSet);
    addLog({ event: 'item_view_start', detail: item.name });
    setScreen(Screen.Detail);
  }, [addLog, currentCategory]);
  
  const surpriseMe = useCallback(() => {
    addLog({ event: 'surprise_me_selected', detail: 'global' });
    const allItems: RouletteItem[] = CATEGORIES.flatMap(category => 
      category.items.map(item => ({ item, category }))
    );
    setRouletteState({
      items: allItems,
      onComplete: (selection) => {
        setRouletteState(null);
        selectItem(selection.item, selection.category);
      }
    });
  }, [addLog, selectItem]);

  const startCategoryRoulette = useCallback(() => {
      if (!currentCategory) return;
      addLog({ event: 'surprise_me_selected', detail: currentCategory.name });
      const items = currentCategory.items.map(item => ({ item, category: currentCategory }));
      setRouletteState({
          items,
          onComplete: (selection) => {
              setRouletteState(null);
              selectItem(selection.item);
          }
      });
  }, [currentCategory, addLog, selectItem]);

  const backToGrid = useCallback(() => {
      if (currentItem) {
          addLog({ event: 'item_view_end', detail: currentItem.name });
      }
      setCurrentItem(null);
      setScreen(Screen.Grid);
  }, [addLog, currentItem]);

  const backToCategory = useCallback(() => {
    setCurrentCategory(null);
    setCurrentItem(null);
    setScreen(Screen.Category);
  }, []);

  const backToHome = useCallback(() => {
    setScreen(Screen.Home);
    // Reset session state
    setCurrentCategory(null);
    setCurrentItem(null);
    setSessionLogs([]);
    setSessionStartTime(null);
  }, []);

  const toggleAdminMode = () => setIsAdminMode(prev => !prev);

  const contextValue: AppContextType = {
    isAdminMode,
    currentItem,
    currentCategory
  };

  const renderScreen = () => {
    switch (screen) {
      case Screen.Home:
        return <HomeScreen onStart={startSession} onToggleAdmin={toggleAdminMode} />;
      case Screen.Category:
        return <CategoryScreen categories={CATEGORIES} onSelect={selectCategory} onBack={backToHome} onSurpriseMe={surpriseMe} />;
      case Screen.Grid:
        return currentCategory && <GridScreen category={currentCategory} onSelectItem={selectItem} onBack={backToCategory} onStartRoulette={startCategoryRoulette} />;
      case Screen.Detail:
        return currentItem && currentCategory && <DetailScreen item={currentItem} onBack={backToGrid} />;
      default:
        return <HomeScreen onStart={startSession} onToggleAdmin={toggleAdminMode} />;
    }
  };

  if (isAdminMode) {
    return <AdminView onExit={toggleAdminMode} />;
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div className="w-full min-h-screen text-slate-800">
        <main className="h-screen overflow-y-auto">
          {renderScreen()}
        </main>
        {rouletteState && <RouletteOverlay items={rouletteState.items} onComplete={rouletteState.onComplete} />}
      </div>
    </AppContext.Provider>
  );
};

export default App;