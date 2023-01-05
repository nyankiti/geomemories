import React, { useEffect } from 'react';
import { OutputBlockData } from '@editorjs/editorjs';
import { GeometoryObject } from 'entities/geometory';
import { FaMapMarkerAlt } from 'react-icons/fa';
/* globalState */
import { useProdMapStateSetter } from 'globalState/prodMapState';

type Props = {
  block: OutputBlockData;
};
const GeomPart = ({ block }: Props) => {
  const setProdMapState = useProdMapStateSetter();
  const geomObj = block.data as GeometoryObject;
  useEffect(() => {
    setProdMapState({
      position: [geomObj.latlng.lat as number, geomObj.latlng.lng as number],
      zoom: 12,
    });
  }, [block]);
  return (
    <div className="my-4">
      <div className="inline-flex w-full items-center justify-center">
        <FaMapMarkerAlt className="mr-2 text-cyan-700" size={28} />
        <h2 className="text-2xl font-normal">{geomObj.name}</h2>
      </div>
      <p className="text-center">{geomObj.formatted_address}</p>
    </div>
  );
};

export default GeomPart;
