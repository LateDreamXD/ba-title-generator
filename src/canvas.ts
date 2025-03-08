import settings from './settings';
import loadFont from './utils/loadFont';
import SVGs from './utils/loadSVGs';
const { halo, cross } = SVGs;
const {
  canvasHeight,
  canvasWidth,
  textSize,
  subTextSize,
  horizontalTilt,
  textBaseLine,
  graphOffset,
  paddingX,
  hollowPath,
} = settings;
const font = `${textSize}px RoGSanSrfStd-Bd, GlowSansSC-Normal-Heavy_diff, apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif`;

export default class LogoCanvas {
  public canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  public textL: string;
  public textR: string;
  public subText: string;
  public subTextSize: number;
  private textMetricsL: TextMetrics | null = null;
  private textMetricsR: TextMetrics | null = null;
  private canvasWidthL = canvasWidth / 2;
  private canvasWidthR = canvasWidth / 2;
  private textWidthL = 0;
  private textWidthR = 0;
  private graphOffset: typeof graphOffset;
  private accentColor: string;
  private transparentBg: boolean;
  private swapColors: boolean;
  private darkMode: boolean;
  constructor(config: drawConfig) {
    this.textL = config.textL || 'Blue';
    this.textR = config.textR || 'Archive';
    this.subText = config.subText || 'ブルーアーカイブ';
    this.subTextSize = config.subTextSize || subTextSize;
    this.darkMode = config.darkMode || false;
    this.swapColors = config.swapColors || false;
    this.transparentBg = config.transparentBg || false;

    this.graphOffset = config.graphOffset || graphOffset;
    this.accentColor = config.accentColor || '#128AFA';

    this.canvas = document.querySelector('#canvas')!;
    this.ctx = this.canvas.getContext('2d')!;
    this.canvas.height = canvasHeight;
    this.canvas.width = canvasWidth;
  }
  get backgroundColor() {
    return this.darkMode ? '#2B2B2B' : '#fff';
  }
  get textColor() {
    return this.darkMode ? '#fff' : '#2B2B2B';
  }
  get primaryColor() {
    return this.swapColors ? this.textColor : this.accentColor;
  }
  get secondaryColor() {
    return this.swapColors ? this.accentColor : this.textColor;
  }
  async draw() {
    // const loading = document.querySelector('#loading')!;
    // loading.classList.remove('hidden');
    const c = this.ctx;
    //predict canvas width
    await loadFont(this.textL + this.textR + this.subText);
    // loading.classList.add('hidden');
    c.font = font;
    this.textMetricsL = c.measureText(this.textL);
    this.textMetricsR = c.measureText(this.textR);
    this.setWidth();
    //clear canvas
    c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //Background
    if (!this.transparentBg) {
      c.fillStyle = this.backgroundColor;
      c.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    //guide line
    if (import.meta.env.DEV) {
      c.strokeStyle = '#00cccc';
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(this.canvasWidthL, 0);
      c.lineTo(this.canvasWidthL, this.canvas.height);
      c.stroke();
      console.log(this.textMetricsL.width, this.textMetricsR.width);
      console.log(this.textWidthL, this.textWidthR);
      c.moveTo(this.canvasWidthL - this.textWidthL, 0);
      c.lineTo(this.canvasWidthL - this.textWidthL, this.canvas.height);
      c.moveTo(this.canvasWidthL + this.textWidthR, 0);
      c.lineTo(this.canvasWidthL + this.textWidthR, this.canvas.height);
      c.stroke();
    }
    //blue text -> halo -> black text -> cross
    //                     sub text
    c.font = font;
    c.fillStyle = this.primaryColor;
    c.textAlign = 'end';
    c.setTransform(1, 0, horizontalTilt, 1, 0, 0);
    c.fillText(this.textL, this.canvasWidthL, this.canvas.height * textBaseLine);
    c.resetTransform(); //restore don't work
    this.drawSVG(
      c,
      halo,
      this.canvasWidthL - this.canvas.height / 2 + this.graphOffset.X,
      this.graphOffset.Y,
      canvasHeight,
      canvasHeight,
      this.textColor,
    );
    c.fillStyle = this.secondaryColor;
    c.textAlign = 'start';
    if (this.transparentBg) {
      c.globalCompositeOperation = 'destination-out';
    }
    c.strokeStyle = this.backgroundColor;
    c.lineWidth = 12;
    c.setTransform(1, 0, horizontalTilt, 1, 0, 0);
    c.strokeText(this.textR, this.canvasWidthL, this.canvas.height * textBaseLine);
    c.globalCompositeOperation = 'source-over';
    c.fillText(this.textR, this.canvasWidthL, this.canvas.height * textBaseLine);
    c.resetTransform();
    const subFont = font.replace(textSize.toString(), this.subTextSize.toString());
    c.font = subFont;
    c.fillStyle = this.swapColors? this.accentColor: this.textColor;
    c.setTransform(1, 0, horizontalTilt, 1, 0, 0);
    c.fillText(
      this.subText,
      this.canvasWidthL + this.subText.length * 4,
      this.canvas.height * textBaseLine + (this.subTextSize * 1.2)
    );
    c.resetTransform();
    const graph = {
      X: this.canvasWidthL - this.canvas.height / 2 + graphOffset.X,
      Y: this.graphOffset.Y,
    };
    c.beginPath();
    c.moveTo(
      graph.X + (hollowPath[0][0] / 500) * canvasHeight,
      graph.Y + (hollowPath[0][1] / 500) * canvasHeight
    );
    for (let i = 1; i < 4; i++) {
      c.lineTo(
        graph.X + (hollowPath[i][0] / 500) * canvasHeight,
        graph.Y + (hollowPath[i][1] / 500) * canvasHeight
      );
    }
    c.closePath();
    if (this.transparentBg) {
      c.globalCompositeOperation = 'destination-out';
    }
    c.fillStyle = this.backgroundColor;
    c.fill();
    c.globalCompositeOperation = 'source-over';
    this.drawSVG(
      c,
      cross,
      this.canvasWidthL - this.canvas.height / 2 + graphOffset.X,
      this.graphOffset.Y,
      canvasHeight,
      canvasHeight,
      this.accentColor,
    );
  }
  private drawSVG(c: CanvasRenderingContext2D, paths: string[], x: number, y: number, w: number, h: number, color: string) {
    const path = new Path2D();
    paths.forEach(pathString => {
      const matrix = document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGMatrix();
      const transformedMatrix = matrix.scale(w / 500, h / 500);
      path.addPath(new Path2D(pathString), transformedMatrix);
    });
    c.fillStyle = color;
    c.translate(x, y);
    c.fill(path);
  }
  setWidth() {
    this.textWidthL =
      this.textMetricsL!.width -
      (textBaseLine * canvasHeight + this.textMetricsL!.fontBoundingBoxDescent) * horizontalTilt;
    this.textWidthR =
      this.textMetricsR!.width +
      (textBaseLine * canvasHeight - this.textMetricsR!.fontBoundingBoxAscent) * horizontalTilt;
    //extend canvas
    if (this.textWidthL + paddingX > canvasWidth / 2) {
      this.canvasWidthL = this.textWidthL + paddingX;
    } else {
      this.canvasWidthL = canvasWidth / 2;
    }
    if (this.textWidthR + paddingX > canvasWidth / 2) {
      this.canvasWidthR = this.textWidthR + paddingX;
    } else {
      this.canvasWidthR = canvasWidth / 2;
    }
    this.canvas.width = this.canvasWidthL + this.canvasWidthR;
  }
  generateImg() {
    let outputCanvas: HTMLCanvasElement;
    if (
      this.textWidthL + paddingX < canvasWidth / 2 ||
      this.textWidthR + paddingX < canvasWidth / 2
    ) {
      outputCanvas = document.createElement('canvas');
      outputCanvas.width = this.textWidthL + this.textWidthR + paddingX * 2;
      outputCanvas.height = this.canvas.height;
      const ctx = outputCanvas.getContext('2d')!;
      ctx.drawImage(
        this.canvas,
        canvasWidth / 2 - this.textWidthL - paddingX,
        0,
        this.textWidthL + this.textWidthR + paddingX * 2,
        this.canvas.height,
        0,
        0,
        this.textWidthL + this.textWidthR + paddingX * 2,
        this.canvas.height
      );
    } else {
      outputCanvas = this.canvas;
    }
    return new Promise<Blob>((resolve, reject) => {
      outputCanvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject();
        }
      });
    });
  }
  saveImg() {
    this.generateImg().then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.textL}${this.textR}_ba-title@${location.hostname}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }
  async copyImg() {
    const blob = await this.generateImg();
    const cp = [new ClipboardItem({ 'image/png': blob })];
    await navigator.clipboard.write(cp);
  }
}
