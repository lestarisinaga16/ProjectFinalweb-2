import React, { useState } from 'react';
import {
  PencilSquareIcon,
  TrashIcon,
  UserCircleIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';


import AddDeliveriesForm from '../components/AddDeliveries'; 

export type DeliveryStatus = 'Dipesan' | 'Diproses' | 'Sedang Dikirim' | 'Diterima';
const ALL_STATUSES: DeliveryStatus[] = ['Dipesan', 'Diproses', 'Sedang Dikirim', 'Diterima'];

interface DeliveryListItem {
  idPesanan: string;
  namaPemesan: string;
  alamat: string;
  status: DeliveryStatus;
}

export interface DeliveryDetail extends DeliveryListItem {
    noHp: string;
    pesananItems: string;
    total: number;
    catatan: string;
}

const initialDeliveryListData: DeliveryListItem[] = [
  { idPesanan: 'P001', namaPemesan: 'Lestari', alamat: 'Komplek UNAI', status: 'Sedang Dikirim' },
  { idPesanan: 'P002', namaPemesan: 'Budi', alamat: 'Jl. Merdeka 10', status: 'Diproses' },
];

const sampleDetailData: { [key: string]: DeliveryDetail } = {
    'P001': { idPesanan: 'P001', namaPemesan: 'Lestari', noHp: '+629582', alamat: 'Komplek Unai', pesananItems: 'Nasi uduk (2x), es cendol (1x)', total: 28000, catatan: 'Tanpa Pedas', status: 'Sedang Dikirim' },
    'P002': { idPesanan: 'P002', namaPemesan: 'Budi', noHp: '+6212345', alamat: 'Jl. Merdeka 10', pesananItems: 'Ayam Bakar (1x)', total: 25000, catatan: 'Banyak sambal', status: 'Diproses' }
};

interface AppHeaderProps { activePage?: string; }
const AppHeader: React.FC<AppHeaderProps> = ({ activePage = 'Pengiriman' }) => { /* ... kode header ... */
    const navItems = [
      { name: 'Home', href: '/' },
      { name: 'Menu', href: '/menu' },
      { name: 'Pesan', href: '/pesan' },
      { name: 'Pengiriman', href: '/deliveries' },
      { name: 'Testimonies', href: '/testimonies' }, ];
    return ( <header className="w-full bg-red-800 text-white"> <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> <ul className="flex justify-center space-x-6 sm:space-x-10 h-12 items-center text-sm sm:text-base"> {navItems.map((item) => ( <li key={item.name}> <a href={item.href} className={`relative text-white hover:text-yellow-300 transition duration-150 ease-in-out pb-1 ${ item.name === activePage ? 'font-semibold after:content-[""] after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-[2px] after:bg-yellow-400' : '' }`} > {item.name} </a> </li> ))} </ul> </nav> </header> );
};


const Deliveries: React.FC = () => { 
  const [deliveries, setDeliveries] = useState<DeliveryListItem[]>(initialDeliveryListData);
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryDetail | null>(
      sampleDetailData[initialDeliveryListData[0]?.idPesanan] || null
  );
  const [showForm, setShowForm] = useState(false); 
  const [editingDeliveryId, setEditingDeliveryId] = useState<string | null>(null); 

  
  const deliveryToEdit = editingDeliveryId ? sampleDetailData[editingDeliveryId] : null;


  const handleTambahPengiriman = () => {
    console.log('Tombol Tambah Pengiriman diklik');
    setEditingDeliveryId(null); 
    setShowForm(true);         
    setSelectedDelivery(null); 
  };

  const handleEditDelivery = (e: React.MouseEvent, idPesanan: string) => {
      e.stopPropagation(); 
      console.log(`Edit delivery with ID: ${idPesanan}`);
      if (sampleDetailData[idPesanan]) { 
            setEditingDeliveryId(idPesanan); 
            setShowForm(true);            
            setSelectedDelivery(null);     
      } else {
          console.error(`Data untuk ${idPesanan} tidak ditemukan untuk diedit.`);
          alert(`Data untuk ${idPesanan} tidak ditemukan.`);
      }
  };

  const handleDeleteDelivery = (e: React.MouseEvent, idPesanan: string) => {
      e.stopPropagation(); 
      console.log(`Delete delivery with ID: ${idPesanan}`);
      setShowForm(false); 
      setEditingDeliveryId(null);

      if (window.confirm(`Apakah Anda yakin ingin menghapus pengiriman ${idPesanan}?`)) {
         
          setDeliveries(prev => prev.filter(d => d.idPesanan !== idPesanan));
          if (sampleDetailData[idPesanan]) { delete sampleDetailData[idPesanan]; }
          if (selectedDelivery?.idPesanan === idPesanan) { setSelectedDelivery(null); }
          console.log(`Pengiriman ${idPesanan} dihapus.`);
      } else {
          console.log(`Penghapusan ${idPesanan} dibatalkan.`);
      }
  };

  const handleSelectDelivery = (deliveryListItem: DeliveryListItem) => {
      console.log(`Selected delivery: ${deliveryListItem.idPesanan}`);
      const detail = sampleDetailData[deliveryListItem.idPesanan];
      
      if (!showForm) {
          setSelectedDelivery(detail || null);
          if (!detail) { console.warn(`Detail data for ${deliveryListItem.idPesanan} not found.`); }
      }
  };

  const handleAddDelivery = (newDeliveryData: DeliveryDetail) => {
      console.log('Menambah pengiriman baru:', newDeliveryData);
      
      const newListItem: DeliveryListItem = { idPesanan: newDeliveryData.idPesanan, namaPemesan: newDeliveryData.namaPemesan, alamat: newDeliveryData.alamat, status: newDeliveryData.status, };
      setDeliveries(prev => [newListItem, ...prev]);
      sampleDetailData[newDeliveryData.idPesanan] = newDeliveryData; 
      setShowForm(false); 
  };

  const handleUpdateDelivery = (updatedData: DeliveryDetail) => {
      console.log('Mengupdate pengiriman:', updatedData);
     

      
      setDeliveries(prev => prev.map(d =>
          d.idPesanan === updatedData.idPesanan
          ? { 
              idPesanan: updatedData.idPesanan,
              namaPemesan: updatedData.namaPemesan,
              alamat: updatedData.alamat,
              status: updatedData.status,
            }
          : d
      ));

      
      if (sampleDetailData[updatedData.idPesanan]) {
          sampleDetailData[updatedData.idPesanan] = updatedData;
      }

      setShowForm(false); 
      setEditingDeliveryId(null); 
      setSelectedDelivery(updatedData); 
  };

  // Fungsi untuk cancel (menutup form add/edit)
  const handleCancelForm = () => {
      console.log('Form ditutup (Batal)');
      setShowForm(false);
      setEditingDeliveryId(null); // Pastikan keluar dari mode edit
  };

  // --- Helper Functions (formatCurrency, getStatusStyle - tidak berubah) ---
   const formatCurrency = (amount: number) => { return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }); }
   const getStatusStyle = (statusToCheck: DeliveryStatus, currentStatus: DeliveryStatus): { icon: React.ElementType, color: string } => {
        const currentIndex = ALL_STATUSES.indexOf(currentStatus);
        const checkIndex = ALL_STATUSES.indexOf(statusToCheck);
        if (checkIndex <= currentIndex) { return { icon: CheckCircleIcon, color: 'text-green-600' }; }
        else { return { icon: QuestionMarkCircleIcon, color: 'text-gray-400' }; }
    }


  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 relative pb-20">
      <AppHeader activePage="Pengiriman" />
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Top Section */}
        <div className="flex justify-between items-center mb-5 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Pengiriman</h2>
          <button
            onClick={handleTambahPengiriman}
            className="bg-white text-gray-700 text-sm py-1 px-3 rounded border border-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500 transition duration-150 ease-in-out shadow-sm"
            disabled={showForm} // Disable jika form (add/edit) aktif
          >
            Tambah Pengiriman
          </button>
        </div>
        {}
        <div className="flex items-center space-x-1 mb-4"> <div className="h-1 w-4 bg-gray-400 rounded-full"></div> <div className="h-1 w-4 bg-gray-400 rounded-full"></div> </div>

        {}
        {showForm && (
            <AddDeliveriesForm
                
                initialData={deliveryToEdit}
               
                onAddDelivery={handleAddDelivery}
                onUpdateDelivery={handleUpdateDelivery}
               
                onCancel={handleCancelForm}
            />
        )}

        {}
        {!showForm && (
            <>
                {/* Delivery Table */}
                <div className="overflow-x-auto shadow border-b border-gray-200 rounded-md mb-8">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                        <thead className="bg-gray-50">
                           <tr>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">ID Pesanan</th>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Nama Pemesan</th>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Alamat</th>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">Status</th>
                                <th scope="col" className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                           </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {deliveries.length > 0 ? (
                            deliveries.map((delivery) => (
                            <tr
                                key={delivery.idPesanan}
                                onClick={() => handleSelectDelivery(delivery)} // Select HANYA jika form tidak aktif
                                className={`hover:bg-gray-100 ${selectedDelivery?.idPesanan === delivery.idPesanan ? 'bg-gray-100' : ''} ${showForm ? 'cursor-default' : 'cursor-pointer'}`} // Ubah cursor jika form aktif
                            >
                                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-300">{delivery.idPesanan}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 border-r border-gray-300">{delivery.namaPemesan}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 border-r border-gray-300">{delivery.alamat}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 border-r border-gray-300">{delivery.status}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-center">
                                    <div className="flex justify-center items-center space-x-3">
                                        {/* Tombol Edit */}
                                        <button
                                            onClick={(e) => handleEditDelivery(e, delivery.idPesanan)}
                                            className="text-gray-500 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                            title="Edit Pengiriman"
                                            disabled={showForm} // Disable jika form aktif
                                        >
                                            <PencilSquareIcon className="h-5 w-5" />
                                        </button>
                                        {/* Tombol Hapus */}
                                        <button
                                            onClick={(e) => handleDeleteDelivery(e, delivery.idPesanan)}
                                            className="text-gray-500 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                            title="Hapus Pengiriman"
                                            disabled={showForm} // Disable jika form aktif
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr><td colSpan={5} className="px-4 py-4 text-center text-sm text-gray-500">Tidak ada data pengiriman.</td></tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Detail Section (Hanya tampil jika item terpilih DAN form tidak aktif) */}
                {selectedDelivery && !showForm && (
                    <div className="border border-gray-200 rounded-md p-4 sm:p-6">
                         <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4"> Detail Pengiriman {selectedDelivery.idPesanan} </h3>
                         <div className="space-y-2 text-sm text-gray-700"> <p><span className="font-medium">Pemesan :</span> {selectedDelivery.namaPemesan} ({selectedDelivery.noHp})</p> <p><span className="font-medium">Alamat :</span> {selectedDelivery.alamat}</p> <p><span className="font-medium">Pesanan :</span> {selectedDelivery.pesananItems}</p> <p><span className="font-medium">Total :</span> {formatCurrency(selectedDelivery.total)}</p> <p><span className="font-medium">Catatan :</span> {selectedDelivery.catatan || '-'}</p> </div>
                         <div className="mt-6 pt-4 border-t border-gray-200"> <div className="flex justify-around items-start text-center text-xs sm:text-sm mb-4"> {ALL_STATUSES.map((status) => { const { icon: StatusIcon, color } = getStatusStyle(status, selectedDelivery.status); return ( <div key={status} className={`flex flex-col items-center ${color}`}> <StatusIcon className="h-7 w-7 sm:h-8 sm:w-8 mb-1"/> <span>{status}</span> </div> ); })} </div> </div>
                    </div>
                )}
            </>
        )}
        {/* --- End Conditional Render --- */}

      </main>
      {/* User Icon */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10"> <UserCircleIcon className="h-9 w-9 sm:h-10 sm:w-10 text-gray-500 hover:text-gray-700 cursor-pointer" aria-label="User Profile" /> </div>
    </div>
  );
};

export default Deliveries; // Rename export default juga