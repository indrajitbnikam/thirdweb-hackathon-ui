import React, { FC } from 'react';
import { AudioCard } from '../audio-card';

interface IAudiobookCard {
  id: string;
  name: string;
  desc: string;
  image: string;
  uri: string;
  properties: any;
}

interface PurchaseCardProps {
  data: IAudiobookCard;
  onPurchase: (tokenId: number, quantity?: number) => void;
}

const PurchaseCard: FC<PurchaseCardProps> = ({ data, onPurchase }) => {
  const { id, name, desc, image } = data;
  return (
    <AudioCard
      id={id}
      name={name}
      nameHandle={() => {}}
      desc={desc}
      image={image}
      buttonName='Purchase'
      buttonHandle={onPurchase}
    />
  );
};

export default PurchaseCard;
