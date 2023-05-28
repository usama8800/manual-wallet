import Button from '@/components/button';
import Header from '@/components/header';
import Icon from '@/components/icon';
import Input from '@/components/input';
import Select from '@/components/select';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectAllNetworks } from '@/lib/slices/networks';
import { fetchAllWallets } from '@/lib/slices/wallets';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function AddWallet() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const networks = useAppSelector(selectAllNetworks);
  const [networkSelectedIndex, setNetworkSelectedIndex] = useState(-1);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);

  useEffect(() => {
    setAddButtonDisabled(
      networkSelectedIndex < 0 ||
      address.length === 0 ||
      privateKey.length === 0 ||
      name.length === 0
    );
  }, [address.length, name.length, networkSelectedIndex, privateKey.length]);

  function changeNetwork(index: number) {
    setNetworkSelectedIndex(index);
    setAddress('');
    setPrivateKey('');
  }

  async function randomWallet() {
    if (networkSelectedIndex < 0) return;
    const wallet = await window.electron.generateWallet(networks[networkSelectedIndex].symbol);
    setAddress(wallet.address);
    setPrivateKey(wallet.privateKey);
  }

  async function addWallet() {
    await window.electron.addWallet({
      networkSymbol: networks[networkSelectedIndex].symbol,
      address, privateKey, name,
      id: undefined as any,
    });
    dispatch(fetchAllWallets());
    router.replace('/wallets');
  }

  return (
    <div>
      <Header title="Add Wallet"></Header>

      <Input
        value={name}
        setValue={setName}
      >Name</Input>
      <Select
        options={networks.map(n => ({
          value: n.symbol, display: n.name, key: n.symbol,
        }))}
        selectedIndex={networkSelectedIndex}
        setSelectedIndex={changeNetwork}
      >Network</Select>
      <Input
        value={address}
        setValue={setAddress}
        trailing={(
          <Icon
            icon={'dice'}
            size={25}
            className='icon'
            onClick={randomWallet}
          ></Icon>
        )}
      >Address</Input>
      <Input
        value={privateKey}
        setValue={setPrivateKey}
        type={passwordShown ? 'text' : 'password'}
        trailing={(
          <Icon icon={passwordShown ? 'eyeOff' : 'eye'}
            size={25}
            className='icon'
            onClick={() => setPasswordShown(!passwordShown)}
          ></Icon>
        )}
      >Private Key</Input>

      <div className='buttonGroup'>
        <Button disabled={addButtonDisabled} onClick={addWallet}>Add</Button>
        <Button onClick={() => router.replace('/wallets')}>Cancel</Button>
      </div>
    </div>
  );
}
