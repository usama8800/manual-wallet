import Button from '@/components/button';
import Header from '@/components/header';
import WalletINN from '@/components/walletINN';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectNetwork } from '@/lib/slices/networks';
import { fetchAllWallets, selectWallet } from '@/lib/slices/wallets';
import Image from 'next/image';
import { useRouter } from 'next/router';
import QRCode from 'qrcode';
import { useRef, useState } from 'react';

export default function Wallet() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const dialog = useRef<HTMLDialogElement>(null);
  const [qrData, setQrData] = useState({ src: '', data: '' });
  const id = +(router.query.id as string);
  const wallet = useAppSelector(selectWallet(+id));
  const network = useAppSelector(selectNetwork(wallet?.networkSymbol ?? ''));
  let nameTimeout: NodeJS.Timeout;
  const [name, setName] = useState(wallet?.name || '');

  function updateName(n: string) {
    if (nameTimeout) clearTimeout(nameTimeout);
    setName(n);
    if (n.trim() === '') return;
    nameTimeout = setTimeout(async () => {
      await window.electron.updateWallet(id, { name: n });
      dispatch(fetchAllWallets());
    }, 500);
  }

  async function openDialog(type: 'public' | 'private') {
    if (dialog.current) {
      const data = (type === 'public' ? wallet!.address : wallet!.privateKey) || (type === 'public' ? 'No public key' : 'No private key');
      const dataUri = await QRCode.toDataURL(data);
      setQrData({ src: dataUri, data });
      dialog.current.showModal();
    }
  }

  if (!wallet || !network) return <></>;
  return (
    <>
      <div>
        <Header>
          <WalletINN wallet={wallet} name={name} setName={updateName}></WalletINN>
        </Header>

        <div className='buttonGroup'>
          <Button onClick={() => openDialog('public')}>Show Public Key</Button>
          <Button onClick={() => openDialog('private')}>Show Private Key</Button>
        </div>

        <div>

        </div>
      </div>
      <dialog ref={dialog} style={{
        padding: 40,
        backgroundColor: 'rgb(var(--background-2-rgb))',
        outline: 'none',
        boxShadow: '0 0 20px 15px rgba(0, 0, 0, 0.6)',
        borderRadius: 10,
      }}>
        {qrData.src && (
          <Image src={qrData.src} width={200} height={200} alt='' style={{
            width: '100%',
            height: 'auto',
          }}></Image>
        )}
        <div style={{
          color: 'rgb(var(--foreground-rgb))',
          margin: '20px 0',
          maxWidth: '300px',
          overflowWrap: 'anywhere',
          fontSize: '0.7rem',
          textAlign: 'center',
        }}>{qrData.data}</div>
        <Button onClick={() => dialog.current?.close()} oppositeColors>Close</Button>
      </dialog>
    </>
  );
}
