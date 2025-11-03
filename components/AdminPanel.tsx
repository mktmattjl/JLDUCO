import React, { useState, useEffect } from 'react';
import { getAdminNotes } from '../services/geminiService';
import { CardItem, CardCategory } from '../types';

interface AdminPanelProps {
    item: CardItem | null;
    category: CardCategory | null;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ item, category }) => {
    const [notes, setNotes] = useState<string[]>([]);

    useEffect(() => {
        if (item && category) {
            // Fetch notes synchronously from the local file
            const fetchedNotes = getAdminNotes(item.name, category.name);
            setNotes(fetchedNotes);
        } else {
            setNotes([]);
        }
    }, [item, category]);

    return (
        <div className="p-6 h-full">
            <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-[#166886] pb-2 mb-4">
                Admin Cheat Sheet
            </h3>
            {!item ? (
                <div className="text-slate-500 mt-10 text-center">
                    <p>Notes for the selected item will appear here.</p>
                    <p className="text-sm mt-2">Currently waiting for an item selection.</p>
                </div>
            ) : (
                <div>
                    <h4 className="text-xl font-semibold text-[#166886] mb-2">{item.name}</h4>
                    <span className="text-sm bg-slate-200 text-slate-600 px-2 py-1 rounded-full">{category?.name}</span>
                    <div className="mt-6">
                        <h5 className="font-bold text-slate-700 mb-2">Talking Points & Recommendations:</h5>
                        <ul className="list-disc list-inside space-y-2 text-slate-600">
                            {notes.map((note, index) => (
                                <li key={index}>{note}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
