import Image from 'next/image';
import React, { useRef, useState } from 'react';
// import ColorThief from 'colorthief';

export interface AudioCardProps {
  id: string;
  name: string;
  currencyUnit: string;
  price: string;
  balance: number;
  nameHandle: (data: any) => void;
  desc?: string;
  image: string;
  buttonName: string;
  buttonHandle: (data: any) => void;
}

export const AudioCard = (props: AudioCardProps) => {
  const {
    id,
    name,
    nameHandle,
    desc,
    image,
    buttonName,
    buttonHandle,
    balance,
    price,
    currencyUnit,
  } = props;

  const renderBalance = () => {
    return `owned : ${balance}`;
  };

  const [cardBgColor, setCardBgColor] = useState()

  return (
    <div className='block bg-white rounded-lg shadow-md hover:shadow-xl' style={{ backgroundColor: cardBgColor }}>
      <div className='rounded-t-lg aspect-square'>
        <Image
          src={image}
          alt='audio card picture'
          width={'100%'}
          height={'100%'}
          layout='responsive'
          className='rounded-t-lg'
          // onLoad={(e) => {
            // const colorThief = new ColorThief();
            // const result = colorThief.getColor(e.target, 25);
            // const paletteResp = colorThief.getPalette(e.target, 25)[2];
            // setCardBgColor(`rgba(${paletteResp[0]}, ${paletteResp[1]}, ${paletteResp[2]}, 0.5)`);
            // console.log("result : ", result);
            // console.log("paletteResp : ", paletteResp);
          // }}
        />
      </div>
      <div className='flex flex-row justify-between px-4 pt-4 '>
        <span className='px-2 py-1 text-xs font-semibold leading-none tracking-wide text-gray-600 uppercase bg-gray-200 rounded-full '>
          #{id}
        </span>
        {balance > 0 && (
          <span className='py-1 text-xs font-semibold leading-none tracking-wide text-gray-600 uppercas'>
            {renderBalance()}
          </span>
        )}
      </div>
      <div className='flex flex-row justify-between px-4 pt-3 '>
        <div>
          <h1
            className='mb-2 font-bold text-gray-600 hover:cursor-pointer'
            onClick={() => nameHandle(id)}
          >
            {name}
          </h1>
          <p className='block mb-2 overflow-hidden text-sm text-gray-600'>
            {desc}
          </p>
        </div>
        <div className='mb-2 text-sm text-gray-600'>
          {`${currencyUnit} : ${price}`}
        </div>
      </div>
      <div className='h-10 border-t hover:border-transparent'>
        <div
          className='grid w-full h-full mr-2 text-sm rounded-bl-lg rounded-br-lg hover:font-bold place-content-center hover:cursor-pointer hover:text-white hover:bg-indigo-500'
          onClick={() => buttonHandle(Number(id))}
        >
          {buttonName}
        </div>
      </div>
    </div>
  );
};
