import React from 'react';

const PreviewFile = ({ file }: {
  file: File | null,
}) => {

  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>(null);

  const reader = new FileReader();

  if (file != null) {
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(isFileImage(file) ? reader.result : "");

    };
  }

  function isFileImage(file: File) {
    return file && file['type'].split('/')[0] === 'image';
  }

  return (

    <div className='mt-2 h-[85%]'>
      {/* @ts-ignore */}
      {preview && <img src={preview} className='object-cover h-full w-[70%] rounded-md' alt="Preview" width="70%" />}
    </div>

  )

}

export default PreviewFile
