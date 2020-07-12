import React  from 'react';
import { useSelector } from 'react-redux';

import { selectShowAssociationPicture } from '../../../redux/selectors/settings.selectors';

let imgClassName;

const AssociationPicture = (props) => {
    const showAssociationPicture = useSelector(selectShowAssociationPicture);
    if (showAssociationPicture) {
      imgClassName = 'maingame__header_img';
    } else {
        imgClassName = 'none';
    }

    return (
        <>
            <img src={props.srcAssociationPicture} alt="AssociationPicture" className={imgClassName} />
        </>
    );
  };
  
  export default AssociationPicture;