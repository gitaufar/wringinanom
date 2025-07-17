"use client"

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Checkbox, TextInput } from 'flowbite-react';
import LetterCard from '../components/card/LetterCard';
import { link } from 'fs';

// Fungsi bantuan untuk membuat slug URL dari judul
const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

const LetterSelectionPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  // Data surat mentah
  const baseLetters = [
    { id: 1, title: "Surat Keterangan Anak Kandung", description: "Template surat keterangan resmi", topic: "Pemerintahan", link:"anak_kandung" },
    { id: 2, title: "Surat Keterangan Ditinggal Suami atau Istri", description: "Surat pemberitahuan resiko", topic: "Pemerintahan", link:"ditinggal_pasangan" },
    { id: 3, title: "Surat Keterangan Beda Identitas Formal", description: "Surat proposal project IoT", topic: "Pemerintahan", link:"beda_identitas" },
    { id: 4, title: "Surat Keterangan Belum Nikah", description: "Surat pengantar dasar", topic: "Pemerintahan", link:"belum_nikah" },
    { id: 5, title: "Surat Keterangan Biodata Penduduk", description: "Surat kerjasama teknologi", topic: "Pemerintahan", link:"biodata_penduduk" },
    { id: 6, title: "Surat Keterangan Cerai Mati", description: "Surat pengantar desain", topic: "Pemerintahan", link:"cerai_mati" },
    { id: 7, title: "Surat Keterangan Duda atau Janda", description: "Surat proposal marketing", topic: "Pemerintahan", link:"duda_janda" },
    { id: 8, title: "Surat Keterangan Identitas", description: "Surat kerjasama programming", topic: "Pemerintahan", link:"identitas" },
    { id: 9, title: "Surat Keterangan Kematian", description: "Surat proposal project 3D", topic: "Pemerintahan", link:"kematian" },
    { id: 10, title: "Surat Keterangan Pindah Tempat", description: "Surat kerjasama app development", topic: "Pemerintahan", link:"pindah_tempat" },
    { id: 11, title: "Surat Keterangan Status", description: "Surat pengantar programming", topic: "Pemerintahan", link:"status" },
    { id: 12, title: "Surat Keterangan Tidak Diketahui Keberadaannnya", description: "Surat proposal IoT lengkap", topic: "Pemerintahan", link:"tidak_diketahui" },
    { id: 13, title: "Surat Penambahan Anggota Keluarga", description: "Surat kerjasama platform IoT", topic: "Pemerintahan", link:"penambahan_anggota" },
    { id: 14, title: "Surat Pernyataan Kelahiran", description: "Surat pengadaan hardware IoT", topic: "Pemerintahan", link:"pernyataan_kelahiran" },
    { id: 15, title: "Surat Keterangan Panggilan", description: "Surat pengantar IoT dasar", topic: "Pemerintahan", link:"panggilan" },
    { id: 16, title: "Surat Keterangan Tidak Keberatan", description: "Surat kerjasama development", topic: "Pemerintahan", link:"tidak_keberatan" },
    { id: 17, title: "Surat Keterangan Catatan Kepolisian", description: "Surat proposal pembuatan website", topic: "Pemerintahan", link:"catatan_kepolisian" },
    { id: 18, title: "Surat Keterangan Kehilangan Kepolisian", description: "Surat kerjasama pembelajaran", topic: "Pemerintahan", link:"kehilangan_kepolisian" },
    { id: 19, title: "Surat Pengantar", description: "Surat kerjasama advanced Python", topic: "Pemerintahan", link:"pengantar" },
    { id: 20, title: "Surat Keterangan Tidak Mampu", description: "Surat pengantar Python", topic: "Kesejahteraan Rakyat", link:"tidak_mampu" },
    { id: 21, title: "Surat Keterangan Wali Nikah", description: "Surat proposal desain UI web", topic: "Kesejahteraan Rakyat", link:"wali_nikah" },
    { id: 22, title: "Surat Keterangan Wali Murid", description: "Surat pengantar command line", topic: "Kesejahteraan Rakyat", link:"wali_murid" },
    { id: 23, title: "Surat Keterangan Domisili", description: "Surat kerjasama desain lengkap", topic: "Pelayanan Umum" , link:"domisili"},
    { id: 24, title: "Surat Keterangan Kuasa", description: "Surat proposal desain UI web", topic: "Pelayanan Umum", link:"kuasa" },
    { id: 25, title: "Surat Keterangan Objek", description: "Surat kerjasama version control", topic: "Pelayanan Umum", link:"objek" },
    { id: 26, title: "Surat Keterangan Penghasilan", description: "Surat pengantar command line", topic: "Pelayanan Umum", link:"penghasilan" },
    { id: 27, title: "Surat Keterangan Usaha", description: "Surat kerjasama desain lengkap", topic: "Pelayanan Umum", link:"usaha" }
  ];

  // Transformasi data untuk menambahkan link dan imageUrl secara dinamis
  const letters = useMemo(() => {
    return baseLetters.map(letter => {
      const slug = createSlug(letter.title);
      return {
        ...letter,
        // Path gambar diperbarui sesuai dengan nama folder Anda
        imageUrl: `/preview surat/${slug}.png` 
      };
    });
  }, []);

  const topics = ["Pemerintahan", "Kesejahteraan Rakyat", "Pelayanan Umum"];

  const filteredLetters = useMemo(() => {
    return letters.filter(letter => {
      const matchesSearch = letter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        letter.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTopic = selectedTopics.length === 0 || selectedTopics.includes(letter.topic);
      return matchesSearch && matchesTopic;
    });
  }, [searchTerm, selectedTopics, letters]);

  const handleTopicChange = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-900 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">Layanan Surat Desa</h1>
          <h2 className="text-xl md:text-2xl mb-4 text-gray-300">Pilih Template Surat Sesuai Kebutuhan Anda</h2>
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
              Semua Surat ({filteredLetters.length})
            </p>
            {filteredLetters.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLetters.map((letter) => (
                  <LetterCard
                    key={letter.id}
                    title={letter.title}
                    description={letter.description}
                    topic={letter.topic}
                    link={letter.link}
                    imageUrl={letter.imageUrl}
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
