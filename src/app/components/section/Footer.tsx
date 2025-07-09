import React from 'react'

const Footer = () => {
  return (
    <>
      <section className="flex justify-between bg-[#34518D] pt-12 pb-14 px-14">
        
        <div>
          <h1 className="text-white text-2xl font-bold">Desa Wringinanom</h1>
          <p className="text-white text-lg leading-relaxed mt-4 whitespace-pre-line max-w-[35ch]">
            {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since `}
          </p>
        </div>

        
        <div className="text-white text-right space-y-3">
          <h2 className="text-xl font-semibold">Kontak Desa</h2>
          <p>(kontak) 0812-3456-7890</p>
          <p>(Email) kontak@desakita.id</p>
          <p>(lokasi) Jl. Raya Desa No. 123</p>
        </div>
      </section>

      
      <div className="bg-[#34518D] border-t border-white py-4 text-center">
        <p className="text-white text-sm">&copy; 2025 Desa Wringinanom. All rights reserved.</p>
      </div>
    </>
  )
}

export default Footer
