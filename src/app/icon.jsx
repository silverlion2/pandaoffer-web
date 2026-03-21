import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#10b981', // emerald-500
          color: 'white',
          borderRadius: '50%',
          fontSize: 22,
          fontWeight: 800,
          fontFamily: 'sans-serif',
          lineHeight: 1,
        }}
      >
        P
      </div>
    ),
    {
      ...size,
    }
  );
}
