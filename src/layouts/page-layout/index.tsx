import { Transition } from '@headlessui/react';
import { useEthers } from '@usedapp/core';
import React, { useContext, useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Button from '../../components/button';
import Header from '../../components/header';
import Modal from '../../components/modal';
import { isOnSupportedChain } from '../../helpers/web3';
import { AudioPlayerContext } from '../../providers/audio-player';
import CustomAudioPlayer from '../../components/audio-player';

const PageLayout = ({ children }: any) => {
  const [readyToCheck, setReadyToCheck] = useState(false);
  const { chainId, library } = useEthers();

  const {
    isVisible = true,
  } = useContext<any>(AudioPlayerContext);

  useEffect(() => {
    setTimeout(() => setReadyToCheck(true), 1000);
  }, []);

  const renderWarning = () => {
    // readyToCheck is being used to wait for metamask provider to load. Before metamask, infura provider loads which does not help.
    if (readyToCheck && !library?.provider.isMetaMask) {
      return (
        <Modal
          title='Warning!'
          description='Please make sure you have active Metamask connection.'
        />
      );
    }

    if (!isOnSupportedChain(chainId as number)) {
      return (
        <Modal
          title='Warning!'
          description='Change to Rinkeby Testnet to use application.'
        />
      );
    }

    return null;
  };

  return (
    <div className={`w-screen ${isVisible && 'mb-32'}`}>
      <Header />
      {children}

      {/* {isVisible && ( */}
      <Transition
        show={isVisible}
        enter='transition-opacity duration-1000'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-1000'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <CustomAudioPlayer />
      </Transition>
      {/* )} */}

      {renderWarning()}
    </div>
  );
};

export default PageLayout;
