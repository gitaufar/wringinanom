"use client"

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Checkbox, TextInput } from 'flowbite-react'; 
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import LetterCard from '../components/card/LetterCard';

const LetterSelectionPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [openAccordion, setOpenAccordion] = useState<string | null>('Topik');

  const letters = [
    // ... data letters Anda tidak berubah ...
    { id: 1, title: "Surat Keterangan", description: "Template surat keterangan resmi", topic: "Resmi", level: "Semua Level", color: "bg-red-700", icon: "📋" },
    { id: 2, title: "React Resiko Dasar", description: "Surat pemberitahuan resiko", topic: "Bisnis", level: "Dasar", color: "bg-purple-700", icon: "⚠️" },
    { id: 3, title: "IoT Development with ESP32", description: "Surat proposal project IoT", topic: "Teknologi", level: "Lanjutan", color: "bg-green-600", icon: "🔧" },
    { id: 4, title: "Basics Dasar", description: "Surat pengantar dasar", topic: "Umum", level: "Dasar", color: "bg-gray-800", icon: "📝" },
    { id: 5, title: "React Native", description: "Surat kerjasama teknologi", topic: "Teknologi", level: "Menengah", color: "bg-cyan-600", icon: "📱" },
    { id: 6, title: "Intro to UI/UX", description: "Surat pengantar desain", topic: "Desain", level: "Dasar", color: "bg-purple-800", icon: "🎨" },
    { id: 7, title: "Intro to Digital Marketing", description: "Surat proposal marketing", topic: "Marketing", level: "Dasar", color: "bg-teal-500", icon: "📊" },
    { id: 8, title: "C++ Dasar", description: "Surat kerjasama programming", topic: "Teknologi", level: "Dasar", color: "bg-blue-800", icon: "💻" },
    { id: 9, title: "Android Dasar 3D - Blender", description: "Surat proposal project 3D", topic: "Teknologi", level: "Lanjutan", color: "bg-indigo-700", icon: "🎬" },
    { id: 10, title: "Android Dasar 2D", description: "Surat kerjasama app development", topic: "Teknologi", level: "Menengah", color: "bg-emerald-500", icon: "📱" },
    { id: 11, title: "C# Dasar", description: "Surat pengantar programming", topic: "Teknologi", level: "Dasar", color: "bg-violet-700", icon: "⚡" },
    { id: 12, title: "Internet of Things (IoT) Project", description: "Surat proposal IoT lengkap", topic: "Teknologi", level: "Lanjutan", color: "bg-lime-600", icon: "🌐" },
    { id: 13, title: "Internet of Things (IoT) - Software and Platforms", description: "Surat kerjasama platform IoT", topic: "Teknologi", level: "Lanjutan", color: "bg-green-700", icon: "🛠️" },
    { id: 14, title: "Internet of Things (IoT) - Hardware", description: "Surat pengadaan hardware IoT", topic: "Teknologi", level: "Lanjutan", color: "bg-sky-700", icon: "🔌" },
    { id: 15, title: "Internet of Things (IoT) - Fundamentals", description: "Surat pengantar IoT dasar", topic: "Teknologi", level: "Dasar", color: "bg-blue-900", icon: "📡" },
    { id: 16, title: "TypeScript Dasar", description: "Surat kerjasama development", topic: "Teknologi", level: "Menengah", color: "bg-blue-700", icon: "🔷" },
    { id: 17, title: "Bootstrap 5 - Membuat Website Landing Page", description: "Surat proposal pembuatan website", topic: "Web Development", level: "Menengah", color: "bg-purple-600", icon: "🌐" },
    { id: 18, title: "Algorithm & Data Structure with Python", description: "Surat kerjasama pembelajaran", topic: "Teknologi", level: "Lanjutan", color: "bg-gray-400", icon: "🐍" },
    { id: 19, "title": "Python Lanjutan", "description": "Surat kerjasama advanced Python", "topic": "Teknologi", "level": "Lanjutan", "color": "bg-amber-500", "icon": "🐍" },
    { id: 20, "title": "Python Dasar", "description": "Surat pengantar Python", "topic": "Teknologi", "level": "Dasar", "color": "bg-yellow-500", "icon": "🐍" },
    { id: 21, "title": "Web UI", "description": "Surat proposal desain UI web", "topic": "Desain", "level": "Menengah", "color": "bg-sky-600", "icon": "🖥️" },
    { id: 22, "title": "Git & GitHub Dasar", "description": "Surat kerjasama version control", "topic": "Teknologi", "level": "Dasar", "color": "bg-red-600", "icon": "📚" },
    { id: 23, "title": "Unix Command Line Dasar", "description": "Surat pengantar command line", "topic": "Teknologi", "level": "Dasar", "color": "bg-gray-700", "icon": "⌨️" },
    { id: 24, "title": "UI/UX Design Mastery", "description": "Surat kerjasama desain lengkap", "topic": "Desain", "level": "Lanjutan", "color": "bg-fuchsia-700", "icon": "🎨" }
  ];
  
  const topics = ["Resmi", "Bisnis", "Teknologi", "Umum", "Desain", "Marketing", "Web Development"];
  const levels = ["Semua Level", "Dasar", "Menengah", "Lanjutan"];

  const filteredLetters = useMemo(() => {
    return letters.filter(letter => {
      const matchesSearch = letter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        letter.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTopic = selectedTopics.length === 0 || selectedTopics.includes(letter.topic);
      const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(letter.level);
      return matchesSearch && matchesTopic && matchesLevel;
    });
  }, [searchTerm, selectedTopics, selectedLevels]);

  const handleTopicChange = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevels(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const toggleAccordion = (panel: string) => {
    setOpenAccordion(openAccordion === panel ? null : panel);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      {/* Spasi vertikal (py) disesuaikan untuk mobile */}
      <div className="bg-blue-900 py-8 md:py-12">
        {/* Spasi horizontal (px) ditambahkan untuk konsistensi */}
        <div className="max-w-7xl mx-auto px-4 text-center">
          {/* Ukuran teks disesuaikan untuk mobile */}
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">Kelas di Skilvul Berbasis Industri</h1>
          <h2 className="text-xl md:text-2xl mb-4 text-gray-300">Pilih Template Sesuai Kebutuhan Anda</h2>
          <div className="max-w-md mx-auto">
            <TextInput
              id="search"
              type="text"
              icon={Search}
              placeholder="Cari surat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Konten Utama */}
      {/* Padding (p) disesuaikan untuk mobile */}
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Jarak (gap) disesuaikan untuk mobile */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          
          <aside className="w-full md:w-64 flex-shrink-0 bg-white border border-gray-200 p-4 rounded-lg shadow-sm h-fit">
            <div className="w-full">
              {/* Accordion Item: Topik */}
              <div>
                <h2>
                  <button type="button" className="flex items-center justify-between w-full p-3 font-medium text-left text-gray-800 hover:bg-gray-100 rounded-t-lg" onClick={() => toggleAccordion('Topik')}>
                    <span>Topik</span>
                    <ChevronDownIcon className={`w-5 h-5 transition-transform text-gray-500 ${openAccordion === 'Topik' ? 'rotate-180' : ''}`} />
                  </button>
                </h2>
                {openAccordion === 'Topik' && (
                  <div className="p-3 border-t border-gray-200">
                    <div className="space-y-2">
                      {topics.map((topic) => (
                        <div key={topic} className="flex items-center gap-2">
                          <Checkbox id={`topic-${topic}`} checked={selectedTopics.includes(topic)} onChange={() => handleTopicChange(topic)} className="text-blue-600 focus:ring-blue-500" />
                          <label htmlFor={`topic-${topic}`} className="text-gray-700 font-medium">{topic}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* Accordion Item: Level */}
              <div>
                <h2>
                  <button type="button" className="flex items-center justify-between w-full p-3 font-medium text-left text-gray-800 hover:bg-gray-100" onClick={() => toggleAccordion('Level')}>
                    <span>Level</span>
                    <ChevronDownIcon className={`w-5 h-5 transition-transform text-gray-500 ${openAccordion === 'Level' ? 'rotate-180' : ''}`} />
                  </button>
                </h2>
                {openAccordion === 'Level' && (
                  <div className="p-3 border-t border-gray-200">
                    <div className="space-y-2">
                      {levels.map((level) => (
                        <div key={level} className="flex items-center gap-2">
                          <Checkbox id={`level-${level}`} checked={selectedLevels.includes(level)} onChange={() => handleLevelChange(level)} className="text-blue-600 focus:ring-blue-500" />
                          <label htmlFor={`level-${level}`} className="text-gray-700 font-medium">{level}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>
          
          <main className="flex-1">
            {/* Ukuran teks judul disesuaikan untuk mobile */}
            <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-6">
              Semua Pelaporan ({filteredLetters.length})
            </p>
            {filteredLetters.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLetters.map((letter) => (
                  <LetterCard
                    key={letter.id}
                    {...letter}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-300 text-6xl mb-4">📄</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Tidak ada surat ditemukan</h3>
                <p className="text-gray-600">Coba ubah kata kunci pencarian atau filter yang dipilih.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default LetterSelectionPage;