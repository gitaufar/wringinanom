type StatusCardProps = {
  status: 'Selesai' | 'Menunggu' | 'Dibatalkan' | 'Diproses'; // Menambahkan 'Diproses'
};

const statusStyles: { [key: string]: string } = {
  Selesai: 'bg-green-100 text-green-700',
  Menunggu: 'bg-yellow-100 text-yellow-700',
  Dibatalkan: 'bg-red-100 text-red-700',
  Diproses: 'bg-blue-100 text-blue-700', // Menambahkan gaya untuk status 'Diproses'
};

export default function StatusCard({ status }: StatusCardProps) {
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>
      {status}
    </span>
  );
}
