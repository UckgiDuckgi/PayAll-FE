import { Button } from '@/components/ui/button';
import { useCallback, useRef, useState } from 'react';

interface CameraCaptureProps {
  onCapture: (file: File) => void;
}

export function CameraCapture({ onCapture }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsActive(true);
      }
    } catch (error) {
      console.error('카메라 접근 오류:', error);
      alert('카메라 접근 권한이 필요합니다.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsActive(false);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        const file = new File([blob], 'camera-capture.jpg', {
          type: 'image/jpeg',
        });
        onCapture(file);
        stopCamera();
      },
      'image/jpeg',
      0.8
    );
  }, [onCapture, stopCamera]);

  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='relative w-full max-w-md aspect-video bg-black rounded-lg overflow-hidden'>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className='w-full h-full object-cover'
        />
      </div>

      <div className='flex gap-2'>
        {!isActive ? (
          <Button onClick={startCamera}>카메라 시작</Button>
        ) : (
          <>
            <Button onClick={capturePhoto} variant='default'>
              사진 촬영
            </Button>
            <Button onClick={stopCamera} variant='outline'>
              카메라 종료
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
