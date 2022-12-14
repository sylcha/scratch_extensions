
// create by scratch3-extension generator
const ArgumentType = Scratch.ArgumentType;
const BlockType = Scratch.BlockType;
const formatMessage = Scratch.formatMessage;
const log = Scratch.log;

const menuIconURI = null;
const blockIconURI = null;

class jouerPianoExt{
  constructor (runtime){
    this.runtime = runtime;
    // communication related
    this.comm = runtime.ioDevices.comm;
    this.session = null;
    this.runtime.registerPeripheralExtension('jouerPianoExt', this);
    // session callbacks
    this.reporter = null;
    this.onmessage = this.onmessage.bind(this);
    this.onclose = this.onclose.bind(this);
    this.write = this.write.bind(this);
    // string op
    this.decoder = new TextDecoder();
    this.lineBuffer = '';
  }

  onclose (){
    this.session = null;
  }

  write (data, parser = null){
    if (this.session){
      return new Promise(resolve => {
        if (parser){
          this.reporter = {
            parser,
            resolve
          }
        }
        this.session.write(data);
      })
    }
  }

  onmessage (data){
    const dataStr = this.decoder.decode(data);
    this.lineBuffer += dataStr;
    if (this.lineBuffer.indexOf('\n') !== -1){
      const lines = this.lineBuffer.split('\n');
      this.lineBuffer = lines.pop();
      for (const l of lines){
        if (this.reporter){
          const {parser, resolve} = this.reporter;
          resolve(parser(l));
        };
      }
    }
  }

  scan (){
    this.comm.getDeviceList().then(result => {
        this.runtime.emit(this.runtime.constructor.PERIPHERAL_LIST_UPDATE, result);
    });
  }

  getInfo (){
    return {
      id: 'jouerPianoExt',
      name: 'Piano',
      color1: '#b8e986',
      color2: '#b8e986',
      menuIconURI: menuIconURI,
      blockIconURI: blockIconURI,
      blocks: [
        {
          opcode: 'jouerPiano',
          blockType: BlockType.COMMAND,
          text: 'jouer piano'
        }
      ]
    }
  }

jouerPiano (args, util){
while (true) {
      if (this.mouse.down) {
        if (this.mouse.x > -250 && this.mouse.x < -180) {
          yield* this.startSound("C Piano");
        }
      if (this.mouse.x > -180 && this.mouse.x < -110) {
        yield* this.startSound("D Piano");
      }
      if (this.mouse.x > -110 && this.mouse.x < -40) {
        yield* this.startSound("E Piano");
      }
      if (this.mouse.x > -40 && this.mouse.x < 30) {
        yield* this.startSound("F Piano");
      }
      if (this.mouse.x > 30 && this.mouse.x < 100) {
        yield* this.startSound("G Piano");
      }
      if (this.mouse.x > 100 && this.mouse.x < 170) {
        yield* this.startSound("A Piano");
      }
      if (this.mouse.x > 170 && this.mouse.x < 240) {
        yield* this.startSound("B Piano");
      }
      }
      yield;
    }
}

}

// module.exports = jouerPianoExt;
Scratch.extensions.register(new jouerPianoExt())
