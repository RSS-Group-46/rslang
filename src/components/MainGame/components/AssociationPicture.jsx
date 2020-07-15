import React  from 'react';
import { useSelector } from 'react-redux';

import { selectShowAssociationPicture } from '../../../redux/selectors/settings.selectors';


const AssociationPicture = ({srcAssociationPicture}) => {
    const showAssociationPicture = useSelector(selectShowAssociationPicture);

    return (
        <img src={srcAssociationPicture} alt="AssociationPicture" 
        className={showAssociationPicture ? 'maingame__header_img' : 'none'} 
        />
    );
  };
  
  export default AssociationPicture;