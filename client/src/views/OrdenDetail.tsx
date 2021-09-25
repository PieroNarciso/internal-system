import React from 'react';
import { useParams } from 'react-router-dom';


const OrdenDetail: React.FC = () => {
  const { ordenId } = useParams<{ ordenId: string }>();
  return (
    <div>{ordenId}</div>
  )
};

export default OrdenDetail;
