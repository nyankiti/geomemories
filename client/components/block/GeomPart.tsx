import React, { useEffect } from 'react';
import { OutputBlockData } from '@editorjs/editorjs';
import { GeometoryObject } from 'entities/geometory';
/* globalState */
import { useProdMapStateSetter } from 'globalState/prodMapState';

type Props = {
  block: OutputBlockData<string, any>;
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
    <div>
      <p>{geomObj.formatted_address}</p>
    </div>
  );
};

export default GeomPart;
