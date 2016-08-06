const types = {
  INSTRUCTION: 'instruction',
  NEWS: 'news',
  FLAVOR: 'flavor',
};

class Broadcast {
  constructor(type, content) {
    this._type = type;
    this._content = content;
  }

  get type() {
    return this._type;
  }

  get content() {
    return this._content;
  }

  // Static enum kind of thing

  static get TYPES() {
    return types;
  }

  static instruction(content) {
    return new Broadcast(types.INSTRUCTION, content);
  }

  static news(content) {
    return new Broadcast(types.NEWS, content);
  }

  static flavor(content) {
    return new Broadcast(types.FLAVOR, content);
  }
}

export default Broadcast;
