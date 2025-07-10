"use client";
import { getPenduduk, getPendudukByNik } from '@/lib/api/penduduk';
import React, { useEffect } from 'react';

export const TestApi = () => {
    console.log("TestApi");
    useEffect(() => {
        const fetchPenduduk = async () => {
          try {
            const penduduk = await getPendudukByNik("1213065011960005");
            console.log(penduduk);
          } catch (error) {
            console.error("Gagal mengambil data penduduk:", error);
          }
        };
    
        fetchPenduduk();
      }, []);
    
  return (
    <div>TestApi</div>
  )
}
