import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function getFormatForOCR(mimeType: string): string {
  const formatMap: { [key: string]: string } = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/tiff': 'tiff',
    'application/pdf': 'pdf',
  };
  return formatMap[mimeType] || 'jpg';
}

function requestWithFile(file: File) {
  const message = {
    images: [
      {
        format: getFormatForOCR(file.type),
        name: file.name,
      },
    ],
    requestId: uuidv4(),
    timestamp: Date.now(),
    version: 'V2',
  };
  const formData = new FormData();

  formData.append('file', file);
  formData.append('message', JSON.stringify(message));

  return axios
    .post('/api/ocr', formData)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
      throw new Error('OCR request failed');
    })
    .catch((e) => {
      console.warn('requestWithFile error:', e.response?.data || e.message);
    });
}

export { requestWithFile };
