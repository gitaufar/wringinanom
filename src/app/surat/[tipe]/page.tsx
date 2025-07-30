'use client';

import React, { JSX } from 'react';
import { useParams } from 'next/navigation';



import SuratKeteranganIdentitas from '@/app/components/form/SuratKeteranganIdentitas';
import SuratKeteranganTidakKeberatan from '@/app/components/form/SuratKeteranganTidakKeberatan';
import SuratPengantar from '@/app/components/form/SuratPengantar';
import PengajuanKeteranganAnakKandung from '@/app/components/form/PengajuanKeteranganAnakKandung';
import SuratKeteranganBelumNikah from '@/app/components/form/SuratKeteranganBelumNikah';
import SuratKeteranganBiodataPenduduk from '@/app/components/form/SuratKeteranganBiodataPenduduk';
import SuratKeteranganDudaJanda from '@/app/components/form/SuratKeteranganDudaJanda';
import SuratKeteranganStatus from '@/app/components/form/SuratKeteranganStatus';
import SuratPenambahanAnggotaKeluarga from '@/app/components/form/SuratPenambahanAnggotaKeluarga';
import SuratKeteranganTidakMampu from '@/app/components/form/SuratKeteranganTidakMampu';
import SuratKeteranganWaliMurid from '@/app/components/form/SuratKeteranganWaliMurid';
import SuratKeteranganDomisili from '@/app/components/form/SuratKeteranganDomisili';
import SuratKeteranganKuasa from '@/app/components/form/SuratKeteranganKuasa';
import SuratKeteranganObyek from '@/app/components/form/SuratKeteranganObyek';
import SuratKeteranganPenghasilan from '@/app/components/form/SuratKeteranganPenghasilan';
import SuratKeteranganUsaha from '@/app/components/form/Usaha';
import BedaIdentitasForm from '@/app/components/form/SuratKeteranganBedaIdentitas';

export default function Page(): JSX.Element {
    const { tipe } = useParams();

    let componentToRender;

    switch (tipe) {
        case 'pengantar':
            componentToRender = <SuratPengantar tipe={tipe} />;
            break;
        case 'identitas':
            componentToRender = <SuratKeteranganIdentitas tipe={tipe} />;
            break;
        case 'tidak_keberatan':
            componentToRender = <SuratKeteranganTidakKeberatan tipe={tipe} />;
            break;
        case 'anak_kandung':
            componentToRender = <PengajuanKeteranganAnakKandung tipe={tipe} />;
            break;
        case 'beda_identitas':
            componentToRender = <BedaIdentitasForm tipe={tipe} />;            
            break;
        case 'belum_nikah':
            componentToRender = <SuratKeteranganBelumNikah tipe={tipe} />;
            break;
        case 'biodata_penduduk':
            componentToRender = <SuratKeteranganBiodataPenduduk tipe={tipe} />;
            break;
        case 'duda_janda':
            componentToRender = <SuratKeteranganDudaJanda tipe={tipe} />;
            break;
        case 'status':
            componentToRender = <SuratKeteranganStatus tipe={tipe} />;
            break;
        case 'penambahan_anggota':
            componentToRender = <SuratPenambahanAnggotaKeluarga tipe={tipe} />;
            break;
        case 'tidak_mampu':
            componentToRender = <SuratKeteranganTidakMampu tipe={tipe} />;
            break;
        case 'wali_murid':
            componentToRender = <SuratKeteranganWaliMurid tipe={tipe} />;
            break;
        case 'domisili':
            componentToRender = <SuratKeteranganDomisili tipe={tipe} />;
            break;
        case 'kuasa':
            componentToRender = <SuratKeteranganKuasa tipe={tipe} />;
            break;
        case 'objek':
            componentToRender = <SuratKeteranganObyek tipe={tipe} />;
            break;
        case 'penghasilan':
            componentToRender = <SuratKeteranganPenghasilan tipe={tipe} />;
            break;
        case 'usaha':
            componentToRender = <SuratKeteranganUsaha tipe={tipe} />;
            break;
        default:
            componentToRender = <div>Halaman tidak ditemukan</div>;
            break;
    }

    return <>{componentToRender}</>;
}
