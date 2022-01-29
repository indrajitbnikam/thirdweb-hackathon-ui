import { ThirdwebSDK } from '@3rdweb/sdk';
import { useEthers } from '@usedapp/core';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import PlayCard from '../../src/components/play-card';
import { AppWeb3Context } from '../../src/providers/app-web3';
import { BigNumber } from '@3rdweb/sdk/node_modules/ethers';
import { getClaimedAudiobooks } from '../../src/services/web3';
import SearchBox from '../../src/components/search-box';
import { IAudiobookData } from '../../src/models/audiobook';

const OwnedPage: NextPage = () => {
  const [purchasedAudiobooks, setPurchasedAudiobooks] = useState<
    IAudiobookData[]
  >([]);
  const [filteredAudiobooks, setFilteredAudiobooks] = useState<
    IAudiobookData[]
  >([]);

  const { account } = useEthers();
  const { dropBundleModule } = useContext(AppWeb3Context);

  useEffect(() => {
    (async () => {
      if (!dropBundleModule) return;

      const claimedNFTs = await getClaimedAudiobooks(dropBundleModule);

      if (claimedNFTs) {
        setPurchasedAudiobooks(claimedNFTs);
        setFilteredAudiobooks(claimedNFTs);
      }
    })();
  }, [dropBundleModule, account]);

  const handleSearch = (query: string) => {
    const filteredAudiobooks = purchasedAudiobooks.filter((ab) => {
      const lowercaseQuery = query.toLowerCase();

      return (
        (ab.name as string).toLowerCase().includes(lowercaseQuery) ||
        (ab.desc as string).toLowerCase().includes(lowercaseQuery)
      );
    });

    setFilteredAudiobooks(filteredAudiobooks);
  };

  const renderPurchasedAudiobooks = () => {
    return (
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {filteredAudiobooks.map((ab) => (
          <PlayCard key={ab.id} data={ab} onPurchase={(_: number) => {}} />
        ))}
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Awesome Audiobooks - Owned</title>
        <meta name='description' content='Awesome Audiobooks - Owned' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='w-full bg-gray-100 shadow-inner h-30'>
        <div className='relative w-full -bottom-7'>
          <SearchBox onSearch={handleSearch} />
        </div>
      </div>
      <div className='max-w-6xl pt-8 m-auto'>
        <h2 className='pb-4 text-3xl font-semibold text-gray-800 '>
          Collection
        </h2>
        {purchasedAudiobooks.length > 0 && renderPurchasedAudiobooks()}
      </div>
    </>
  );
};

export default OwnedPage;
