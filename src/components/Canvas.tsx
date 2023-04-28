import { useCallback } from 'react';
import { useEffect, useRef, useState } from 'react';
import Fps from './Fps';
import { CanvasElement, CanvasContainer, PageContainer } from './Canvas.styled';
import Settings from './Settings';

export interface Settings {
  size: number;
  // Add more settings here as needed
}

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [settings, setSettings] = useState<Settings>({ size: 50 });
  const [frameRate, setFrameRate] = useState<number>(0);

  // Resize the canvas to fill browser window dynamically
  const resize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bounds = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    console.log('resizing');
    canvas.width = bounds.width * dpr;
    canvas.height = bounds.height * dpr;
  };

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Tick function (called every frame)
  const tick = useCallback(
    (frames: number, timeStamp?: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      draw(ctx, settings);

      // Update frame rate
      frames++;
      const lastTimeStamp = performance.now();
      if (timeStamp && lastTimeStamp > timeStamp + 1000) {
        setFrameRate(frames);
        frames = 0;
        timeStamp = lastTimeStamp;
      }

      // Handle next frame
      animationRef.current = requestAnimationFrame(
        tick.bind(null, frames, timeStamp || lastTimeStamp),
      );
    },
    [settings],
  );

  useEffect(() => {
    animationRef.current = requestAnimationFrame(tick.bind(null, 0));

    return () => {
      if (animationRef.current) {
        console.log('Animation cleanup');
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [tick]);

  return (
    <PageContainer>
      <Settings settings={settings} setSettings={setSettings} />
      <CanvasContainer>
        <Fps frameRate={frameRate} />
        <CanvasElement ref={canvasRef} />
      </CanvasContainer>
    </PageContainer>
  );
}
export const draw = function (ctx: CanvasRenderingContext2D, settings: Settings) {
  console.log('draw');

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const { size } = settings;
  // get the value between 0.9 and 1.1

  ctx.fillStyle = 'red';
  for (let i = 0; i < 100; i++) {
    const randS = 0.9 + Math.random() * 0.2;
    const updatedSize = size * randS;
    const randomX = Math.random() * ctx.canvas.width;
    const randomY = Math.random() * ctx.canvas.height;
    ctx.beginPath();
    // ctx.arc(randomX, randomY, updatedSize, 0, Math.PI * 2);
    ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, size, 0, Math.PI * 2);
    ctx.fill();
  }
};
