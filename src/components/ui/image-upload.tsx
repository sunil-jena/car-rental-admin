import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Upload } from 'lucide-react';
import { cn } from '../lib/utils';
import Image from 'next/image';

interface ImageUploadProps {
  onUpload: (file: File) => void;
  value?: string;
  onRemove?: () => void;
  isLoading?: boolean;
  className?: string;
  accept?: Record<string, string[]>;
  maxSize?: number;
  placeholder?: string;
}

export const ImageUpload = ({
  onUpload,
  value = '',
  onRemove,
  isLoading = false,
  className,
  accept = {
    'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
  },
  maxSize = 5 * 1024 * 1024, // 5MB
  placeholder = 'Drop image here or click to browse',
}: ImageUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);

  // Handle file drop and set preview
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles[0]) {
        const file = acceptedFiles[0];
        if (file.size <= maxSize) {
          const fileUrl = URL.createObjectURL(file);
          setPreview(fileUrl); // Show the preview of the uploaded image
          onUpload(file);
        } else {
          alert(`File size exceeds the ${maxSize / 1024 / 1024}MB limit.`);
        }
      }
      setDragActive(false);
    },
    [onUpload, maxSize]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept,
      maxSize,
      multiple: false,
      onDragEnter: () => setDragActive(true),
      onDragLeave: () => setDragActive(false),
    });

  const hasError = fileRejections.length > 0;

  // Show image preview if value or preview URL is available
  if (value || preview) {
    return (
      <Card className={cn('relative overflow-hidden', className)}>
        <div className='relative w-full aspect-video'>
          <Image
            src={preview || value}
            alt='Uploaded image'
            width={1080}
            height={720}
            className='w-full h-full object-cover'
          />
          {/* Show X button when an image is previewed */}
          {onRemove && (
            <Button
              type='button'
              variant='destructive'
              size='icon'
              className='absolute top-2 right-2 bg-blue-600 text-white hover:bg-blue-700 rounded-full'
              onClick={onRemove}
            >
              <X className='h-4 w-4' />
            </Button>
          )}
        </div>
      </Card>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn('relative cursor-pointer', className)}
    >
      <input {...getInputProps()} />
      <Card
        className={cn(
          'border-2 border-dashed transition-colors duration-200 hover:border-primary/50',
          isDragActive || dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300',
          hasError && 'border-red-300 bg-red-50',
          isLoading && 'pointer-events-none opacity-50'
        )}
      >
        <div className='flex flex-col items-center justify-center p-8 text-center'>
          <div
            className={cn(
              'mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full',
              isDragActive || dragActive
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-400'
            )}
          >
            {isLoading ? (
              <div className='h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent' />
            ) : (
              <Upload className='h-6 w-6' />
            )}
          </div>

          <div className='space-y-2'>
            <p className='text-sm font-medium'>
              {isLoading
                ? 'Uploading...'
                : isDragActive || dragActive
                  ? 'Drop the image here'
                  : placeholder}
            </p>
            <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 5MB</p>
          </div>

          {hasError && (
            <div className='mt-2 text-xs text-red-600'>
              {fileRejections[0]?.errors[0]?.message}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
