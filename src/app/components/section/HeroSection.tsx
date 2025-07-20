"use client";
import ButtonGeneral from '../button/ButtonGeneral'
import SearchIcon from '../icon/SearchIcon';

const HeroSection = () => {
  return (
   <section className='min-h-screen relative flex items-center justify-center flex-col text-center text-white gap-4'>
        <img src="/png/bg-home.png" className='absolute h-screen md:w-screen object-cover -z-20'/>
        <div className='size-full bg-black absolute opacity-50 -z-10'></div>
        <div className='w-full flex justify-center absolute inset-0 mt-10 py-3.5 px-4 sm:px-6 md:px-10'>
            <div className='bg-white w-full max-w-xl h-fit px-5 py-3.5 rounded-2xl justify-between flex flex-row items-center'>
                <input type="" placeholder='Cari riwayat laporanmu di sini...' className='w-full h-full bg-transparent outline-none text-black text-base'/>
                <SearchIcon />
            </div>
        </div>
<p className="w-full text-base sm:text-lg md:text-xl lg:text-2xl text-center px-4">
  Selamat Datang di Website Resmi Administrasi
</p>

<h1 className="w-full text-6xl sm:text-8xl md:text-10xl font-bold">
  DESA WRINGINANOM
</h1>

<p className="w-full text-base sm:text-lg md:text-xl lg:text-2xl text-center px-4 mt-2">
  Pusat Informasi dan Layanan Digital untuk Warga Desa Wringinanom,<br className="hidden md:block" />
  Kec. Poncokusumo, Kab. Malang
</p>

<ButtonGeneral
  className="mt-6 px-6 py-3 text-base sm:text-lg"
  text="Mulai Sekarang"
  icon="arrow"
  onClick={() => {}}
/>
   </section>
  )
}

export default HeroSection