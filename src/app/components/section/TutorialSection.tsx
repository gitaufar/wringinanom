"use client";

import ButtonGeneral from "../button/ButtonGeneral";

const TutorialSection = () => {
  return (
    <section className='flex flex-row py-14'>
        <div className='flex flex-col text-black'>
            <h1 className='text-5xl font-bold'>Langkah Penggunaan Sistem</h1>
            <p className='text-2xl text-gray-600'>Berikut ini langkah mudah dalam menggunakan sistem pelayanan online Desa Wringinanom. Kini, mengurus surat atau menyampaikan laporan bisa dilakukan dari rumah.</p>
            <div>
<ButtonGeneral text="Ajukan Sekarang" onClick={() => {}} icon="arrow"/>
            </div>
        </div>
        <div className='flex flex-col justify-center gap-4 bg-amber-200'>
            <div className='flex flex-row'>

            </div>
            <div>

            </div>
            <div>

            </div>
            <div>

            </div>
        </div>
    </section>
  )
}

export default TutorialSection