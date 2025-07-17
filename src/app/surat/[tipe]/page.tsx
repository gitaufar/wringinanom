'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import SuratKeteranganKehilanganKepolisian from '@/app/components/form/SuratKehilanganKepolisian';
import SuratKeteranganCatatanKepolisian from '@/app/components/form/SuratKeteranganCatatanKepolisian';
import SuratKeteranganIdentitas from '@/app/components/form/SuratKeteranganIdentitas';
import SuratKeteranganTidakDiketahuiKeberadaannya from '@/app/components/form/SuratKeteranganTidakDiketahuiKeberadaannya';
import SuratKeteranganTidakKeberatan from '@/app/components/form/SuratKeteranganTidakKeberatan';
import SuratPengantar from '@/app/components/form/SuratPengantar';
import SuratPernyataanKelahiran from '@/app/components/form/SuratPernyataanKelahiran';
import PengajuanKeteranganAnakKandung from '@/app/components/form/PengajuanKeteranganAnakKandung';
import SuratKeteranganBedaIdentitas from '@/app/components/form/SuratKeteranganIdentitas';
import SuratKeteranganBelumNikah from '@/app/components/form/SuratKeteranganBelumNikah';
import SuratKeteranganBiodataPenduduk from '@/app/components/form/SuratKeteranganBiodataPenduduk';
import SuratKeteranganCeraiMati from '@/app/components/form/SuratKeteranganCeraiMati';
import SuratKeteranganDitinggalSuamiAtauIstri from '@/app/components/form/SuratKeteranganDitinggalSuamiAtauIstri';
import SuratKeteranganDudaJanda from '@/app/components/form/SuratKeteranganDudaJanda';
import SuratKeteranganKematian from '@/app/components/form/SuratKeteranganKematian';
import SuratKeteranganStatus from '@/app/components/form/SuratKeteranganStatus';
import SuratPenambahanAnggotaKeluarga from '@/app/components/form/SuratPenambahanAnggotaKeluarga';
import SuratKeteranganPanggilan from '@/app/components/form/SuratKeteranganPanggilan';
import SuratKeteranganTidakMampu from '@/app/components/form/SuratKeteranganTidakMampu';
import SuratKeteranganWaliNikah from '@/app/components/form/SuratKeteranganWaliNikah';
import SuratKeteranganWaliMurid from '@/app/components/form/SuratKeteranganWaliMurid';
import SuratKeteranganDomisili from '@/app/components/form/SuratKeteranganDomisili';
import SuratKeteranganKuasa from '@/app/components/form/SuratKeteranganKuasa';
import SuratKeteranganObyek from '@/app/components/form/SuratKeteranganObyek';
import SuratKeteranganPenghasilan from '@/app/components/form/SuratKeteranganPenghasilan';
import SuratKeteranganUsaha from '@/app/components/form/Usaha';

export default function Page() {
  const { jenis_surat } = useParams();

  let componentToRender;

  switch (jenis_surat) {
    case 'pengantar':
      componentToRender = <SuratPengantar />;
      break;
    case 'kehilangan_kepolisian':
      componentToRender = <SuratKeteranganKehilanganKepolisian />;
      break;
    case 'identitas':
      componentToRender = <SuratKeteranganIdentitas />;
      break;
    case 'pernyataan_kelahiran':
      componentToRender = <SuratPernyataanKelahiran />;
      break;
    case 'tidak_diketahui':
      componentToRender = <SuratKeteranganTidakDiketahuiKeberadaannya />;
      break;
    case 'tidak_keberatan':
      componentToRender = <SuratKeteranganTidakKeberatan />;
      break;
    case 'catatan_kepolisian':
      componentToRender = <SuratKeteranganCatatanKepolisian />;
      break;
    case 'anak_kandung':
      componentToRender = <PengajuanKeteranganAnakKandung />;
      break;
    case 'beda_identitas':
      componentToRender = <SuratKeteranganBedaIdentitas />;
      break;
    case 'belum_nikah':
      componentToRender = <SuratKeteranganBelumNikah />;
      break;
    case 'biodata_penduduk':
      componentToRender = <SuratKeteranganBiodataPenduduk />;
      break;
    case 'cerai_mati':
      componentToRender = <SuratKeteranganCeraiMati />;
      break;
    case 'ditinggal_pasangan':
      componentToRender = <SuratKeteranganDitinggalSuamiAtauIstri />;
      break;
    case 'duda_janda':
      componentToRender = <SuratKeteranganDudaJanda />;
      break;
    case 'biodata_penduduk':
      componentToRender = <SuratKeteranganBiodataPenduduk />;
      break;
    case 'kematian':
      componentToRender = <SuratKeteranganKematian />;
      break;
    case 'status':
      componentToRender = <SuratKeteranganStatus />;
      break;
    case 'penambahan_anggota':
      componentToRender = <SuratPenambahanAnggotaKeluarga />;
      break;
    case 'panggilan':
      componentToRender = <SuratKeteranganPanggilan />;
      break;
    case 'biodata_penduduk':
      componentToRender = <SuratKeteranganBiodataPenduduk />;
      break;
    case 'tidak_mampu':
      componentToRender = <SuratKeteranganTidakMampu />;
      break;
    case 'wali_nikah':
      componentToRender = <SuratKeteranganWaliNikah />;
      break;
    case 'wali_murid':
      componentToRender = <SuratKeteranganWaliMurid />;
      break;
    case 'domisili':
      componentToRender = <SuratKeteranganDomisili />;
      break;
    case 'kuasa':
      componentToRender = <SuratKeteranganKuasa />;
      break;
    case 'objek':
      componentToRender = <SuratKeteranganObyek />;
      break;
    case 'penghasilan':
      componentToRender = <SuratKeteranganPenghasilan />;
      break;
    case 'usaha':
      componentToRender = <SuratKeteranganUsaha />;
      break;
    default:
      componentToRender = <div>Halaman tidak ditemukan</div>;
      break;
  }

  return <>{componentToRender}</>;
}
