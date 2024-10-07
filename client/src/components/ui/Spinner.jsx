import React from 'react';
import { DNA } from 'react-loader-spinner';

export default function Spinner() {
  return (
    <DNA
      visible
      height="180"
      width="180"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  );
}
