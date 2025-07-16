"use client"

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Checkbox, TextInput } from 'flowbite-react';
import LetterCard from '../components/card/LetterCard';

const LetterSelectionPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  // Data letters tidak berubah
  const letters = [
    { id: 1, title: "Surat Keterangan Anak Kandung", description: "Template surat keterangan resmi", topic: "Pemerintahan", color: "bg-red-700", icon: "📋" },
    { id: 2, title: "Surat Keterangan Ditinggal Suami atau Istri", description: "Surat pemberitahuan resiko", topic: "Pemerintahan", color: "bg-purple-700", icon: "⚠️" },
    { id: 3, title: "Surat Keterangan Beda Identitas Formal", description: "Surat proposal project IoT", topic: "Pemerintahan", color: "bg-green-600", icon: "🔧" },
    { id: 4, title: "Surat Keterangan Belum Nikah", description: "Surat pengantar dasar", topic: "Pemerintahan", color: "bg-gray-800", icon: "📝" },
    { id: 5, title: "Surat Keterangan Biodata Penduduk", description: "Surat kerjasama teknologi", topic: "Pemerintahan", color: "bg-cyan-600", icon: "📱" },
    { id: 6, title: "Surat Keterangan Cerai Mati", description: "Surat pengantar desain", topic: "Pemerintahan",  color: "bg-purple-800", icon: "🎨" },
    { id: 7, title: "Surat Keterangan Duda atau Janda", description: "Surat proposal marketing", topic: "Pemerintahan", color: "bg-teal-500", icon: "📊" },
    { id: 8, title: "Surat Keterangan Identitas", description: "Surat kerjasama programming", topic: "Pemerintahan", color: "bg-blue-800", icon: "💻" },
    { id: 9, title: "Surat Keterangan Kematian ", description: "Surat proposal project 3D", topic: "Pemerintahan",  color: "bg-indigo-700", icon: "🎬" },
    { id: 10, title: "Surat Keterangan Pindah Tempat", description: "Surat kerjasama app development", topic: "Pemerintahan", color: "bg-emerald-500", icon: "📱" },
    { id: 11, title: "Surat Keterangan Status", description: "Surat pengantar programming", topic: "Pemerintahan", level: "Dasar", color: "bg-violet-700", icon: "⚡" },
    { id: 12, title: "Surat Keterangan Tidak Diketahui Keberadaannnya", description: "Surat proposal IoT lengkap", topic: "Pemerintahan", color: "bg-lime-600", icon: "🌐" },
    { id: 13, title: "Surat Penambahan Anggota Keluarga", description: "Surat kerjasama platform IoT", topic: "Pemerintahan", color: "bg-green-700", icon: "🛠️" },
    { id: 14, title: "Surat Pernyataan Kelahiran", description: "Surat pengadaan hardware IoT", topic: "Pemerintahan", color: "bg-sky-700", icon: "🔌" },
    { id: 15, title: "Surat Keterangan Panggilan", description: "Surat pengantar IoT dasar", topic: "Pemerintahan", color: "bg-blue-900", icon: "📡" },
    { id: 16, title: "Surat Keterangan Tidak Keberatan", description: "Surat kerjasama development", topic: "Pemerintahan",  color: "bg-blue-700", icon: "🔷" },
    { id: 17, title: "Surat Keterangan Catatan Kepolisian", description: "Surat proposal pembuatan website", topic: "Pemerintahan", color: "bg-purple-600", icon: "🌐" },
    { id: 18, title: "Surat Keterangan Kehilangan Kepolisian", description: "Surat kerjasama pembelajaran", topic: "Pemerintahan", color: "bg-gray-400", icon: "🐍" },
    { id: 19, title: "Surat Pengantar", description: "Surat kerjasama advanced Python", topic: "Pemerintahan",  "color": "bg-amber-500", "icon": "🐍" },
    { id: 20, title: "Surat Keterangan Tidak Mampu", description: "Surat pengantar Python", topic: "Kesejahteraan Rakyat",  color: "bg-yellow-500", "icon": "🐍" },
    { id: 21, title: "Surat Keterangan Wali Niikah", description: "Surat proposal desain UI web", topic: "Kesejahteraan Rakyat",  color: "bg-sky-600", "icon": "🖥️" },
    { id: 22, title: "Surat Keterangan Pencabutan KIS", description: "Surat kerjasama version control", topic: "Kesejahteraan Rakyat",  color: "bg-red-600", icon: "📚" },
    { id: 23, title: "Surat Keterangan Wali Murid", description: "Surat pengantar command line", topic: "Kesejahteraan Rakyat",  color: "bg-gray-700", icon: "⌨️" },
    { id: 24, title: "UI/UX Design Mastery", description: "Surat kerjasama desain lengkap", topic: "Desain",  color: "bg-fuchsia-700", icon: "🎨" }
  ];
  
  // Hapus `levels`
  const topics = ["Pemerintahan", "Kesejahteraan Rakyat", "Pelayanan umum"];

  // Sederhanakan filter, hapus `selectedLevels`
  const filteredLetters = useMemo(() => {
    return letters.filter(letter => {
      const matchesSearch = letter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        letter.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTopic = selectedTopics.length === 0 || selectedTopics.includes(letter.topic);
      return matchesSearch && matchesTopic;
    });
  }, [searchTerm, selectedTopics]);

  const handleTopicChange = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };
  
  // Hapus `handleLevelChange` dan `toggleAccordion`

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-900 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
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

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          
          {/* ## Perubahan Utama di Sini: Sidebar Disederhanakan ## */}
          <aside className="w-full md:w-64 flex-shrink-0 bg-white border border-gray-200 p-4 rounded-lg shadow-sm h-fit">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tipe Surat</h3>
            <div className="space-y-2">
              {topics.map((topic) => (
                <div key={topic} className="flex items-center gap-2">
                  <Checkbox
                    id={`topic-${topic}`}
                    checked={selectedTopics.includes(topic)}
                    onChange={() => handleTopicChange(topic)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`topic-${topic}`} className="text-gray-700 font-medium">
                    {topic}
                  </label>
                </div>
              ))}
            </div>
          </aside>
          
          <main className="flex-1">
            <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-6">
              Semua Pelaporan ({filteredLetters.length})
            </p>
            {filteredLetters.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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