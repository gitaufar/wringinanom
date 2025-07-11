import { useState } from "react";
import InputField from "../field/InputField";
import InputFieldDropdown from "../field/InputFieldDropdown"; // jika belum ada, bisa gunakan input biasa
import InputFieldDate from "../field/InputFieldDate";
import { PendudukProps } from "../screen/admin/TambahPenduduk";

type Props = {
  formData: PendudukProps;
  editStates: { [K in keyof PendudukProps]: boolean };
  onChange: (field: keyof PendudukProps, value: string) => void;
  onToggleEdit: (field: keyof PendudukProps) => void;
};

export const TambahPendudukForm = ({
  formData,
  editStates,
  onChange,
  onToggleEdit,
}: Props) => {
  return (
    <div className="pt-6 px-6 pb-10 flex flex-col bg-white rounded-md gap-8">
      {/* Identitas */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InputField
          inputLabel="NIK"
          inputPlaceholder="Masukkan NIK"
          data={formData.nik}
          setData={(val) => onChange("nik", val)}
          setEditData={() => onToggleEdit("nik")}
          editData={editStates.nik}
          submited=""
          numberOnly
        />
        <InputField
          inputLabel="Nomor KK"
          inputPlaceholder="Masukkan No KK"
          data={formData.no_kk}
          setData={(val) => onChange("no_kk", val)}
          setEditData={() => onToggleEdit("no_kk")}
          editData={editStates.no_kk}
          submited=""
          numberOnly
        />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <InputField
          inputLabel="Nama Lengkap"
          inputPlaceholder="Masukkan Nama Lengkap"
          data={formData.nama_lengkap}
          setData={(val) => onChange("nama_lengkap", val)}
          setEditData={() => onToggleEdit("nama_lengkap")}
          editData={editStates.nama_lengkap ?? true}
          submited=""
        />
        <InputField
          inputLabel="Nama Ibu"
          inputPlaceholder="Masukkan Nama Ibu"
          data={formData.nama_ibu}
          setData={(val) => onChange("nama_ibu", val)}
          setEditData={() => onToggleEdit("nama_ibu")}
          editData={editStates.nama_ibu ?? true}
          submited=""
        />
        <InputField
          inputLabel="Nama Ayah"
          inputPlaceholder="Masukkan Nama Ayah"
          data={formData.nama_ayah}
          setData={(val) => onChange("nama_ayah", val)}
          setEditData={() => onToggleEdit("nama_ayah")}
          editData={editStates.nama_ayah ?? true}
          submited=""
        />
      </section>

      {/* Kelahiran */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <InputFieldDropdown
          inputLabel="Jenis Kelamin"
          inputPlaceholder="Pilih Jenis Kelamin"
          options={["Laki-laki", "Perempuan"]}
          data={formData.jenis_kelamin}
          setData={(val) => onChange("jenis_kelamin", val)}
          setEditData={() => onToggleEdit("jenis_kelamin")}
          editData={editStates.jenis_kelamin}
          submited=""
        />
        <InputField
          inputLabel="Tempat Lahir"
          inputPlaceholder="Masukkan Tempat Lahir"
          data={formData.tempat_lahir}
          setData={(val) => onChange("tempat_lahir", val)}
          setEditData={() => onToggleEdit("tempat_lahir")}
          editData={editStates.tempat_lahir}
          submited=""
        />
        <InputFieldDate
          inputLabel="Tanggal Lahir"
          data={formData.tanggal_lahir}
          setData={(val) => onChange("tanggal_lahir", val)}
          setEditData={() => onToggleEdit("tanggal_lahir")}
          editData={editStates.tanggal_lahir}
          submited=""
        />
      </section>

      {/* Pendidikan, Agama, Pekerjaan */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <InputFieldDropdown
          options={[
            "Tidak/Belum Sekolah",
            "Tamat SD/Sederajat",
            "Belum Tamat SD/Sederajat",
            "SMP/Sederajat",
            "SMA/Sederajat",
            "Diploma I/II",
            "Akademi/Diploma III/S. Muda",
            "Diploma IV/Strata I",
            "Strata II",
            "Strata III",
          ]}
          inputLabel="Pendidikan"
          inputPlaceholder="Masukkan Pendidikan"
          data={formData.pendidikan}
          setData={(val) => onChange("pendidikan", val)}
          setEditData={() => onToggleEdit("pendidikan")}
          editData={editStates.pendidikan}
          submited=""
        />
        <InputFieldDropdown
          options={[
            "Islam",
            "Hindu",
            "Budha",
            "Konghucu",
            "Protestan",
            "Katolik",
          ]}
          inputLabel="Agama"
          inputPlaceholder="Masukkan Agama"
          data={formData.agama}
          setData={(val) => onChange("agama", val)}
          setEditData={() => onToggleEdit("agama")}
          editData={editStates.agama}
          submited=""
        />
        <InputField
          inputLabel="Pekerjaan"
          inputPlaceholder="Masukkan Pekerjaan"
          data={formData.pekerjaan}
          setData={(val) => onChange("pekerjaan", val)}
          setEditData={() => onToggleEdit("pekerjaan")}
          editData={editStates.pekerjaan ?? true}
          submited=""
        />
      </section>

      {/* Status */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <InputFieldDropdown
          options={["A", "B", "AB", "O"]}
          inputLabel="Golongan Darah"
          inputPlaceholder="Masukkan Golongan Darah"
          data={formData.golongan_darah}
          setData={(val) => onChange("golongan_darah", val)}
          setEditData={() => onToggleEdit("golongan_darah")}
          editData={editStates.golongan_darah}
          submited=""
        />
        <InputFieldDropdown
          inputLabel="Status Perkawinan"
          inputPlaceholder="Pilih Status Perkawinan"
          options={["Sudah", "Belum", "Cerai"]}
          data={formData.status_perkawinan}
          setData={(val) => onChange("status_perkawinan", val)}
          setEditData={() => onToggleEdit("status_perkawinan")}
          editData={editStates.status_perkawinan}
          submited=""
        />
        {formData.status_perkawinan === "Sudah" && (
          <InputFieldDate
            inputLabel="Tanggal Perkawinan"
            data={formData.tanggal_perkawinan}
            setData={(val) => onChange("tanggal_perkawinan", val)}
            setEditData={() => onToggleEdit("tanggal_perkawinan")}
            editData={editStates.tanggal_perkawinan ?? true}
            submited=""
          />
        )}
      </section>

      {/* Status Keluarga */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InputFieldDropdown
          inputLabel="Status dalam Keluarga"
          inputPlaceholder="Pilih Status"
          options={["Kepala Keluarga", "Istri", "Anak"]}
          data={formData.status_keluarga}
          setData={(val) => onChange("status_keluarga", val)}
          setEditData={() => onToggleEdit("status_keluarga")}
          editData={editStates.status_keluarga}
          submited=""
        />
        <InputFieldDropdown
          options={["Simpar", "Kunci", "Besuki"]}
          inputLabel="Dusun"
          inputPlaceholder="Masukkan Dusun"
          data={formData.alamat}
          setData={(val) => onChange("alamat", val)}
          setEditData={() => onToggleEdit("alamat")}
          editData={editStates.alamat}
          submited=""
        />
      </section>

      {/* RT RW */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        <InputField
          inputLabel="RT"
          inputPlaceholder="Masukkan RT"
          data={formData.rt}
          setData={(val) => onChange("rt", val)}
          setEditData={() => onToggleEdit("rt")}
          editData={editStates.rt}
          submited=""
          numberOnly
        />
        <InputField
          inputLabel="RW"
          inputPlaceholder="Masukkan RW"
          data={formData.rw}
          setData={(val) => onChange("rw", val)}
          setEditData={() => onToggleEdit("rw")}
          editData={editStates.rw}
          submited=""
          numberOnly
        />
      </section>
    </div>
  );
};
