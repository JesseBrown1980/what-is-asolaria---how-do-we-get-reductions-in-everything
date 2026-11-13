// binary range coder, LZMA style, 12-bit probabilities. probability is P(bit==1)/4096.
export class Enc {
  constructor(){ this.low=0; this.range=0xFFFFFFFF; this.cache=0; this.pending=0; this.out=[]; this.first=true; }
  shiftLow(){
    const hi = Math.floor(this.low / 0x100000000);
    if (hi !== 0 || this.low < 0xFF000000) {
      if (this.first) this.first=false; else this.out.push((this.cache + hi) & 0xFF);
      while (this.pending > 0) { this.out.push((0xFF + hi) & 0xFF); this.pending--; }
      this.cache = (this.low >>> 24) & 0xFF;
    } else this.pending++;
    this.low = (this.low % 0x1000000) * 256;
  }
  bit(p1, bit){
    const p0 = 4096 - p1;
    const bound = Math.floor(this.range / 4096) * p0;
    if (bit === 0) this.range = bound;
    else { this.low += bound; this.range -= bound; }
    while (this.range < 0x1000000) { this.range = (this.range * 256) >>> 0; this.shiftLow(); }
  }
  finish(){ for (let i=0;i<5;i++) this.shiftLow(); return Buffer.from(this.out); }
}
export class Dec {
  constructor(buf){ this.b=buf; this.pos=0; this.code=0; this.range=0xFFFFFFFF;
    for (let i=0;i<4;i++) this.code = ((this.code*256) + (this.b[this.pos++]|0)) >>> 0; }
  bit(p1){
    const p0 = 4096 - p1;
    const bound = Math.floor(this.range / 4096) * p0;
    let bit;
    if (this.code < bound) { this.range = bound; bit = 0; }
    else { this.code -= bound; this.range -= bound; bit = 1; }
    while (this.range < 0x1000000) {
      this.range = (this.range * 256) >>> 0;
      this.code = ((this.code * 256) + (this.b[this.pos++]|0)) >>> 0;
    }
    return bit;
  }
}
