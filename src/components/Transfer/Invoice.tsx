import { useParams } from 'react-router-dom';
import { NavbarLogo } from '@/components';
import axios from 'axios';
import { useEffect, useState, forwardRef } from 'react';

const Invoice = forwardRef<HTMLDivElement>((props, ref) => {
  const URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [senderAccount, setSenderAccount] = useState(null);
  const [receiverAccount, setReceiverAccount] = useState(null);
  const [receiverName, setReceiverName] = useState(null);
  const [amount, setAmount] = useState(0);
  const [adminFee, setAdminFee] = useState(0);
  const [transactionDate, setTransactionDate] = useState(null);
  const [note, setNote] = useState(null);
  const [total, setTotal] = useState(0);

  function formatRupiah(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionResponse = await axios.get(`${URL}/transaction/${id}`);
        const transactionData = transactionResponse.data;

        setSenderAccount(transactionData.account_id);
        setReceiverAccount(transactionData.beneficiary_account);
        setTransactionDate(transactionData.transaction_date);
        setAmount(transactionData.amount);
        setAdminFee(transactionData.admin_fee);
        setNote(transactionData.note);
        setTotal(transactionData.total);

        // Fetch receiver account data only if receiverAccount is available
        if (transactionData.beneficiary_account) {
          const bankAccountResponse = await axios.get(
            `${URL}/bank-accounts/${transactionData.beneficiary_account}`
          );
          const bankAccountData = bankAccountResponse.data;

          setReceiverName(bankAccountData.owner_name);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id, URL, receiverAccount]);

  return (
    <div ref={ref}>
      <main
        className="relative h-[768px] w-[1366px] bg-body-blue px-10"
        id="receipt"
      >
        <div className="z-10 mx-auto pt-6">
          <div className="w-100 relative mb-6">
            <NavbarLogo className="h-[90px] w-fit" />
            <img
              className="max-lg:hidden absolute right-0 top-0"
              src="/images/transfer/invoice.png"
              alt=""
              aria-hidden={true}
            />
          </div>
          <h1 className="text-md-display font-bold">Invoice Transfer</h1>
          <h2 className="text-xs-display font-regular">
            Invoice ini merupakan bukti pembayaran yang sah
          </h2>
          <div className="mt-6 flex max-w-[50vw] gap-4">
            <div className="receipt-label w-1/2">
              <div className="">Rekening Sumber</div>
              <div className="">Rekening Tujuan</div>
              <div className="">Nama Penerima</div>
              <div className="">Nominal Transfer</div>
              <div className="">Biaya Admin</div>
              <div className="">Catatan</div>
              <div className="">Tanggal Transaksi</div>
              <div className="font-bold">Total</div>
            </div>
            <div className="receipt-value w-1/2">
              <div className="">{senderAccount}</div>
              <div className="">{receiverAccount}</div>
              <div className="">{receiverName}</div>
              <div className="">{formatRupiah(amount)}</div>
              <div className="">{formatRupiah(adminFee)}</div>
              <div className="">{note}</div>
              <div className="">{transactionDate}</div>
              <div className="font-bold">{formatRupiah(total)}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
});

export default Invoice;
