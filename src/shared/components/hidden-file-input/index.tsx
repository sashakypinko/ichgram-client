import { ChangeEvent, FC } from 'react';
import { styled } from '@mui/material';
import Extensions from '@shared/enums/extensions.enum';

const VisuallyHiddenInput = styled('input')({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});

interface Props {
  accept: Extensions[];
  onSelect: (files: FileList) => void;
  multiple?: boolean;
}

const HiddenFileInput: FC<Props> = ({ accept, onSelect, multiple }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      onSelect(files);
    }
  };

  return (
    <VisuallyHiddenInput
      type="file"
      accept={accept.map((ext) => `.${ext}`).join(',')}
      onChange={handleChange}
      multiple={multiple}
      hidden
    />
  );
};

export default HiddenFileInput;
