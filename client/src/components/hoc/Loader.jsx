import React from 'react';
import Spinner from '../ui/Spinner';

export default function Loader({ children, isLoading }) {
  return isLoading ? <Spinner /> : children;
}
