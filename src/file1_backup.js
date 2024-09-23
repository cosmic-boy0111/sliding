import { shallowEqual } from 'recompose';
import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
 
import Ticks from './Ticks';
import UnavailableImage from '../../atoms/UnavailableImage';
import PanoramicIcon from '../../icons/Panoramic';
import { useCustomDragImage } from '../../../modules/mobileDragDrop';
import useOnClickOutside from '../../../HOCs/useOnClickOutside';
import { Wrapper, ImageContainer, ImageFallback, PanoramicWrapper, ImageWrapper } from './Styles';
 
const SelectedImage = ({
  photo,
  style,
  theme,
  width,
  rotated,
  isLandscapePanoramic,
  isPortraitPanoramic,
  panoAspect,
  onDragStart,
  isMobileView,
  onClickToSelectPhoto,
  onClickEndPhoto,
  ...otherProps
}) => {
  const [dragRef] = useCustomDragImage(photo);
  const [isClicked, setIsClicked] = React.useState(false);
  const OnClickOutsideRef = React.useRef();
  useOnClickOutside(OnClickOutsideRef, () => setIsClicked(false));
 
  return (
    <Wrapper
      style={style}
      py={isMobileView ? '0px' : '5px'}
      {...otherProps}
      ref={OnClickOutsideRef}
    >
      {(isLandscapePanoramic || isPortraitPanoramic) && (
        <PanoramicWrapper>
          <PanoramicIcon
            style={{
              fill: theme._colorMonoXxlight_,
            }}
          />
        </PanoramicWrapper>
      )}
      <Ticks count={photo.selectedCount} />
      <ImageContainer
        draggable
        ref={dragRef}
        onDragStart={e => {
          e.dataTransfer.setData('photo', photo);
          e.dataTransfer.setData('type', 'PHOTO');
          onClickEndPhoto();
          onDragStart(photo);
        }}
        onClick={() => {
          setIsClicked(!isClicked);
          onClickToSelectPhoto(photo);
        }}
        isLandscapePanoramic={isLandscapePanoramic}
        isPortraitPanoramic={isPortraitPanoramic}
        width={width}
        panoAspect={panoAspect}
        isClicked={isClicked}
      >
        <ImageWrapper>
          <ImageFallback
            src={photo.rotation > 0 ? photo.urls.medium : photo.urls.small}
            fallbackImage={<UnavailableImage />}
            highlight={photo.selectedCount}
            rotation={photo.rotation ? photo.rotation : undefined}
            newWidth={rotated ? style.height - 4 : undefined}
            newHeight={rotated ? style.width - 4 : undefined}
            rotated={rotated}
            alt=""
          />
        </ImageWrapper>
      </ImageContainer>
    </Wrapper>
  );
};
 
SelectedImage.propTypes = {
  photo: PropTypes.object,
  style: PropTypes.object,
  theme: PropTypes.object,
  width: PropTypes.number,
  onDragStart: PropTypes.func,
  onClickToSelectPhoto: PropTypes.func,
  rotated: PropTypes.bool,
  isLandscapePanoramic: PropTypes.bool,
  isPortraitPanoramic: PropTypes.bool,
  panoAspect: PropTypes.number,
  isMobileView: PropTypes.bool,
};
 
SelectedImage.propTyeps = {
  onDragStart: () => {},
  onClickToSelectPhoto: () => {},
};
 
const areEqual = (prevProps, nextProps) => {
  if (!shallowEqual(prevProps.photo, nextProps.photo)) {
    return false;
  }
  if (!shallowEqual(prevProps.style, nextProps.style)) {
    return false;
  }
  if (!shallowEqual(prevProps.width, nextProps.width)) {
    return false;
  }
  return true;
};
 
export default withTheme(React.memo(SelectedImage, areEqual));