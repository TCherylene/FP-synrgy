import { ButtonPrimary } from '@/components';
import { TransactionProps } from '@/types/transaction';
import { useNavigate } from 'react-router-dom';
import formatRupiah from '@/utils/formatRupiah';

interface TransactionDataProps {
  transaction: TransactionProps | null;
}

function TransactionData({ transaction }: TransactionDataProps) {
  const navigate = useNavigate();
  const handleDownload = () => {
    if (transaction)
      navigate(`/transfer/invoice/${transaction.transaction_id}`);
  };

  const formatHour = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString('id-ID', { hour12: false }).slice(0, -3);
  };

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('id-ID', { dateStyle: 'full' });
  };

  return (
    <>
      {transaction && (
        <div className="sticky top-[20px] flex w-full flex-col items-center gap-5">
          <div className="flex h-max items-center justify-center rounded-[20px] bg-white px-[30px] py-[60px] shadow-[0_4px_5px_5px_#EAF6FF]">
            <div className="flex flex-col gap-y-5">
              <div className="flex w-[447px] flex-col items-center">
                <div className="flex h-12.5 w-12.5 items-center justify-center rounded-[25px] bg-success">
                  <img
                    src="/images/icons/checklist.png"
                    alt=""
                    className="w-[22.5px]"
                  />
                </div>
                <span className="text-center text-xl-body font-bold">
                  Transaksi Berhasil
                </span>
                <div className="flex items-center gap-x-2">
                  <span className="text-sm-body text-dark-grey">
                    {formatDate(transaction.transaction_date)}
                  </span>
                  <div className="h-2.5 w-2.5 rounded-[5px] bg-dot-grey"></div>
                  <span className="text-sm-body text-dark-grey">
                    {formatHour(transaction.transaction_date)}
                  </span>
                </div>
              </div>
              <div className="h-0 w-full rounded-[3px] border-[3px] border-neutral-03 border-opacity-30"></div>
              <div className="grid grid-cols-[170px_126px] gap-x-[7.5px] gap-y-[15px] px-[30px] text-xl-body">
                <span className="text-muted-black">Rekening Sumber</span>
                <span className="text-dark-grey">
                  {transaction.from.account_number}
                </span>
                <span className="text-muted-black">Rekening Tujuan</span>
                <span className="text-dark-grey">
                  {transaction.to.account_number}
                </span>
                <span className="text-muted-black">Nama penerima</span>
                <span className="text-dark-grey">
                  {transaction.to.owner_name}
                </span>
                <span className="text-muted-black">Nominal Transfer </span>
                <span className="text-dark-grey">
                  {formatRupiah(transaction.amount)}
                </span>
                <span className="text-muted-black">Biaya Admin</span>
                <span className="text-dark-grey">
                  {formatRupiah(transaction.admin_fee)}
                </span>
                <span className="text-muted-black">Catatan</span>
                <span className="text-dark-grey">{transaction.note}</span>
                <span className="font-bold text-muted-black">Total</span>
                <span className="font-bold text-dark-grey">
                  {formatRupiah(transaction.total)}
                </span>
              </div>
            </div>
          </div>
          <ButtonPrimary
            className="flex items-center gap-5 rounded-[10px]"
            onClick={handleDownload}
          >
            <img src="/images/icons/download.svg" alt="" />
            <span>Unduh</span>
          </ButtonPrimary>
        </div>
      )}
    </>
  );
}

export default TransactionData;
