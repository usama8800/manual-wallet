import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NextPageWithLayout } from './_app';

export default function Home(): NextPageWithLayout {
  const router = useRouter();
  useEffect(() => {
    router.replace('/wallets');
  });
  return <></>;
}
