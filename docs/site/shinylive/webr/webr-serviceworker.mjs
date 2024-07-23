var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};

// node_modules/@msgpack/msgpack/dist/utils/int.js
var require_int = __commonJS({
  "node_modules/@msgpack/msgpack/dist/utils/int.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getUint64 = exports.getInt64 = exports.setInt64 = exports.setUint64 = exports.UINT32_MAX = void 0;
    exports.UINT32_MAX = 4294967295;
    function setUint64(view, offset, value) {
      const high = value / 4294967296;
      const low = value;
      view.setUint32(offset, high);
      view.setUint32(offset + 4, low);
    }
    exports.setUint64 = setUint64;
    function setInt64(view, offset, value) {
      const high = Math.floor(value / 4294967296);
      const low = value;
      view.setUint32(offset, high);
      view.setUint32(offset + 4, low);
    }
    exports.setInt64 = setInt64;
    function getInt64(view, offset) {
      const high = view.getInt32(offset);
      const low = view.getUint32(offset + 4);
      return high * 4294967296 + low;
    }
    exports.getInt64 = getInt64;
    function getUint64(view, offset) {
      const high = view.getUint32(offset);
      const low = view.getUint32(offset + 4);
      return high * 4294967296 + low;
    }
    exports.getUint64 = getUint64;
  }
});

// node_modules/@msgpack/msgpack/dist/utils/utf8.js
var require_utf8 = __commonJS({
  "node_modules/@msgpack/msgpack/dist/utils/utf8.js"(exports) {
    "use strict";
    var _a;
    var _b;
    var _c;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.utf8DecodeTD = exports.TEXT_DECODER_THRESHOLD = exports.utf8DecodeJs = exports.utf8EncodeTE = exports.TEXT_ENCODER_THRESHOLD = exports.utf8EncodeJs = exports.utf8Count = void 0;
    var int_1 = require_int();
    var TEXT_ENCODING_AVAILABLE = (typeof process === "undefined" || ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a["TEXT_ENCODING"]) !== "never") && typeof TextEncoder !== "undefined" && typeof TextDecoder !== "undefined";
    function utf8Count(str) {
      const strLength = str.length;
      let byteLength = 0;
      let pos = 0;
      while (pos < strLength) {
        let value = str.charCodeAt(pos++);
        if ((value & 4294967168) === 0) {
          byteLength++;
          continue;
        } else if ((value & 4294965248) === 0) {
          byteLength += 2;
        } else {
          if (value >= 55296 && value <= 56319) {
            if (pos < strLength) {
              const extra = str.charCodeAt(pos);
              if ((extra & 64512) === 56320) {
                ++pos;
                value = ((value & 1023) << 10) + (extra & 1023) + 65536;
              }
            }
          }
          if ((value & 4294901760) === 0) {
            byteLength += 3;
          } else {
            byteLength += 4;
          }
        }
      }
      return byteLength;
    }
    exports.utf8Count = utf8Count;
    function utf8EncodeJs(str, output, outputOffset) {
      const strLength = str.length;
      let offset = outputOffset;
      let pos = 0;
      while (pos < strLength) {
        let value = str.charCodeAt(pos++);
        if ((value & 4294967168) === 0) {
          output[offset++] = value;
          continue;
        } else if ((value & 4294965248) === 0) {
          output[offset++] = value >> 6 & 31 | 192;
        } else {
          if (value >= 55296 && value <= 56319) {
            if (pos < strLength) {
              const extra = str.charCodeAt(pos);
              if ((extra & 64512) === 56320) {
                ++pos;
                value = ((value & 1023) << 10) + (extra & 1023) + 65536;
              }
            }
          }
          if ((value & 4294901760) === 0) {
            output[offset++] = value >> 12 & 15 | 224;
            output[offset++] = value >> 6 & 63 | 128;
          } else {
            output[offset++] = value >> 18 & 7 | 240;
            output[offset++] = value >> 12 & 63 | 128;
            output[offset++] = value >> 6 & 63 | 128;
          }
        }
        output[offset++] = value & 63 | 128;
      }
    }
    exports.utf8EncodeJs = utf8EncodeJs;
    var sharedTextEncoder = TEXT_ENCODING_AVAILABLE ? new TextEncoder() : void 0;
    exports.TEXT_ENCODER_THRESHOLD = !TEXT_ENCODING_AVAILABLE ? int_1.UINT32_MAX : typeof process !== "undefined" && ((_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b["TEXT_ENCODING"]) !== "force" ? 200 : 0;
    function utf8EncodeTEencode(str, output, outputOffset) {
      output.set(sharedTextEncoder.encode(str), outputOffset);
    }
    function utf8EncodeTEencodeInto(str, output, outputOffset) {
      sharedTextEncoder.encodeInto(str, output.subarray(outputOffset));
    }
    exports.utf8EncodeTE = (sharedTextEncoder === null || sharedTextEncoder === void 0 ? void 0 : sharedTextEncoder.encodeInto) ? utf8EncodeTEencodeInto : utf8EncodeTEencode;
    var CHUNK_SIZE = 4096;
    function utf8DecodeJs(bytes, inputOffset, byteLength) {
      let offset = inputOffset;
      const end = offset + byteLength;
      const units = [];
      let result = "";
      while (offset < end) {
        const byte1 = bytes[offset++];
        if ((byte1 & 128) === 0) {
          units.push(byte1);
        } else if ((byte1 & 224) === 192) {
          const byte2 = bytes[offset++] & 63;
          units.push((byte1 & 31) << 6 | byte2);
        } else if ((byte1 & 240) === 224) {
          const byte2 = bytes[offset++] & 63;
          const byte3 = bytes[offset++] & 63;
          units.push((byte1 & 31) << 12 | byte2 << 6 | byte3);
        } else if ((byte1 & 248) === 240) {
          const byte2 = bytes[offset++] & 63;
          const byte3 = bytes[offset++] & 63;
          const byte4 = bytes[offset++] & 63;
          let unit = (byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4;
          if (unit > 65535) {
            unit -= 65536;
            units.push(unit >>> 10 & 1023 | 55296);
            unit = 56320 | unit & 1023;
          }
          units.push(unit);
        } else {
          units.push(byte1);
        }
        if (units.length >= CHUNK_SIZE) {
          result += String.fromCharCode(...units);
          units.length = 0;
        }
      }
      if (units.length > 0) {
        result += String.fromCharCode(...units);
      }
      return result;
    }
    exports.utf8DecodeJs = utf8DecodeJs;
    var sharedTextDecoder = TEXT_ENCODING_AVAILABLE ? new TextDecoder() : null;
    exports.TEXT_DECODER_THRESHOLD = !TEXT_ENCODING_AVAILABLE ? int_1.UINT32_MAX : typeof process !== "undefined" && ((_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c["TEXT_DECODER"]) !== "force" ? 200 : 0;
    function utf8DecodeTD(bytes, inputOffset, byteLength) {
      const stringBytes = bytes.subarray(inputOffset, inputOffset + byteLength);
      return sharedTextDecoder.decode(stringBytes);
    }
    exports.utf8DecodeTD = utf8DecodeTD;
  }
});

// node_modules/@msgpack/msgpack/dist/ExtData.js
var require_ExtData = __commonJS({
  "node_modules/@msgpack/msgpack/dist/ExtData.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExtData = void 0;
    var ExtData = class {
      constructor(type, data) {
        this.type = type;
        this.data = data;
      }
    };
    exports.ExtData = ExtData;
  }
});

// node_modules/@msgpack/msgpack/dist/DecodeError.js
var require_DecodeError = __commonJS({
  "node_modules/@msgpack/msgpack/dist/DecodeError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DecodeError = void 0;
    var DecodeError = class extends Error {
      constructor(message) {
        super(message);
        const proto = Object.create(DecodeError.prototype);
        Object.setPrototypeOf(this, proto);
        Object.defineProperty(this, "name", {
          configurable: true,
          enumerable: false,
          value: DecodeError.name
        });
      }
    };
    exports.DecodeError = DecodeError;
  }
});

// node_modules/@msgpack/msgpack/dist/timestamp.js
var require_timestamp = __commonJS({
  "node_modules/@msgpack/msgpack/dist/timestamp.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.timestampExtension = exports.decodeTimestampExtension = exports.decodeTimestampToTimeSpec = exports.encodeTimestampExtension = exports.encodeDateToTimeSpec = exports.encodeTimeSpecToTimestamp = exports.EXT_TIMESTAMP = void 0;
    var DecodeError_1 = require_DecodeError();
    var int_1 = require_int();
    exports.EXT_TIMESTAMP = -1;
    var TIMESTAMP32_MAX_SEC = 4294967296 - 1;
    var TIMESTAMP64_MAX_SEC = 17179869184 - 1;
    function encodeTimeSpecToTimestamp({ sec, nsec }) {
      if (sec >= 0 && nsec >= 0 && sec <= TIMESTAMP64_MAX_SEC) {
        if (nsec === 0 && sec <= TIMESTAMP32_MAX_SEC) {
          const rv = new Uint8Array(4);
          const view = new DataView(rv.buffer);
          view.setUint32(0, sec);
          return rv;
        } else {
          const secHigh = sec / 4294967296;
          const secLow = sec & 4294967295;
          const rv = new Uint8Array(8);
          const view = new DataView(rv.buffer);
          view.setUint32(0, nsec << 2 | secHigh & 3);
          view.setUint32(4, secLow);
          return rv;
        }
      } else {
        const rv = new Uint8Array(12);
        const view = new DataView(rv.buffer);
        view.setUint32(0, nsec);
        (0, int_1.setInt64)(view, 4, sec);
        return rv;
      }
    }
    exports.encodeTimeSpecToTimestamp = encodeTimeSpecToTimestamp;
    function encodeDateToTimeSpec(date) {
      const msec = date.getTime();
      const sec = Math.floor(msec / 1e3);
      const nsec = (msec - sec * 1e3) * 1e6;
      const nsecInSec = Math.floor(nsec / 1e9);
      return {
        sec: sec + nsecInSec,
        nsec: nsec - nsecInSec * 1e9
      };
    }
    exports.encodeDateToTimeSpec = encodeDateToTimeSpec;
    function encodeTimestampExtension(object) {
      if (object instanceof Date) {
        const timeSpec = encodeDateToTimeSpec(object);
        return encodeTimeSpecToTimestamp(timeSpec);
      } else {
        return null;
      }
    }
    exports.encodeTimestampExtension = encodeTimestampExtension;
    function decodeTimestampToTimeSpec(data) {
      const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
      switch (data.byteLength) {
        case 4: {
          const sec = view.getUint32(0);
          const nsec = 0;
          return { sec, nsec };
        }
        case 8: {
          const nsec30AndSecHigh2 = view.getUint32(0);
          const secLow32 = view.getUint32(4);
          const sec = (nsec30AndSecHigh2 & 3) * 4294967296 + secLow32;
          const nsec = nsec30AndSecHigh2 >>> 2;
          return { sec, nsec };
        }
        case 12: {
          const sec = (0, int_1.getInt64)(view, 4);
          const nsec = view.getUint32(0);
          return { sec, nsec };
        }
        default:
          throw new DecodeError_1.DecodeError(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${data.length}`);
      }
    }
    exports.decodeTimestampToTimeSpec = decodeTimestampToTimeSpec;
    function decodeTimestampExtension(data) {
      const timeSpec = decodeTimestampToTimeSpec(data);
      return new Date(timeSpec.sec * 1e3 + timeSpec.nsec / 1e6);
    }
    exports.decodeTimestampExtension = decodeTimestampExtension;
    exports.timestampExtension = {
      type: exports.EXT_TIMESTAMP,
      encode: encodeTimestampExtension,
      decode: decodeTimestampExtension
    };
  }
});

// node_modules/@msgpack/msgpack/dist/ExtensionCodec.js
var require_ExtensionCodec = __commonJS({
  "node_modules/@msgpack/msgpack/dist/ExtensionCodec.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExtensionCodec = void 0;
    var ExtData_1 = require_ExtData();
    var timestamp_1 = require_timestamp();
    var ExtensionCodec = class {
      constructor() {
        this.builtInEncoders = [];
        this.builtInDecoders = [];
        this.encoders = [];
        this.decoders = [];
        this.register(timestamp_1.timestampExtension);
      }
      register({ type, encode: encode2, decode: decode2 }) {
        if (type >= 0) {
          this.encoders[type] = encode2;
          this.decoders[type] = decode2;
        } else {
          const index = 1 + type;
          this.builtInEncoders[index] = encode2;
          this.builtInDecoders[index] = decode2;
        }
      }
      tryToEncode(object, context) {
        for (let i = 0; i < this.builtInEncoders.length; i++) {
          const encodeExt = this.builtInEncoders[i];
          if (encodeExt != null) {
            const data = encodeExt(object, context);
            if (data != null) {
              const type = -1 - i;
              return new ExtData_1.ExtData(type, data);
            }
          }
        }
        for (let i = 0; i < this.encoders.length; i++) {
          const encodeExt = this.encoders[i];
          if (encodeExt != null) {
            const data = encodeExt(object, context);
            if (data != null) {
              const type = i;
              return new ExtData_1.ExtData(type, data);
            }
          }
        }
        if (object instanceof ExtData_1.ExtData) {
          return object;
        }
        return null;
      }
      decode(data, type, context) {
        const decodeExt = type < 0 ? this.builtInDecoders[-1 - type] : this.decoders[type];
        if (decodeExt) {
          return decodeExt(data, type, context);
        } else {
          return new ExtData_1.ExtData(type, data);
        }
      }
    };
    exports.ExtensionCodec = ExtensionCodec;
    ExtensionCodec.defaultCodec = new ExtensionCodec();
  }
});

// node_modules/@msgpack/msgpack/dist/utils/typedArrays.js
var require_typedArrays = __commonJS({
  "node_modules/@msgpack/msgpack/dist/utils/typedArrays.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createDataView = exports.ensureUint8Array = void 0;
    function ensureUint8Array(buffer) {
      if (buffer instanceof Uint8Array) {
        return buffer;
      } else if (ArrayBuffer.isView(buffer)) {
        return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
      } else if (buffer instanceof ArrayBuffer) {
        return new Uint8Array(buffer);
      } else {
        return Uint8Array.from(buffer);
      }
    }
    exports.ensureUint8Array = ensureUint8Array;
    function createDataView(buffer) {
      if (buffer instanceof ArrayBuffer) {
        return new DataView(buffer);
      }
      const bufferView = ensureUint8Array(buffer);
      return new DataView(bufferView.buffer, bufferView.byteOffset, bufferView.byteLength);
    }
    exports.createDataView = createDataView;
  }
});

// node_modules/@msgpack/msgpack/dist/Encoder.js
var require_Encoder = __commonJS({
  "node_modules/@msgpack/msgpack/dist/Encoder.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Encoder = exports.DEFAULT_INITIAL_BUFFER_SIZE = exports.DEFAULT_MAX_DEPTH = void 0;
    var utf8_1 = require_utf8();
    var ExtensionCodec_1 = require_ExtensionCodec();
    var int_1 = require_int();
    var typedArrays_1 = require_typedArrays();
    exports.DEFAULT_MAX_DEPTH = 100;
    exports.DEFAULT_INITIAL_BUFFER_SIZE = 2048;
    var Encoder = class {
      constructor(extensionCodec = ExtensionCodec_1.ExtensionCodec.defaultCodec, context = void 0, maxDepth = exports.DEFAULT_MAX_DEPTH, initialBufferSize = exports.DEFAULT_INITIAL_BUFFER_SIZE, sortKeys = false, forceFloat32 = false, ignoreUndefined = false, forceIntegerToFloat = false) {
        this.extensionCodec = extensionCodec;
        this.context = context;
        this.maxDepth = maxDepth;
        this.initialBufferSize = initialBufferSize;
        this.sortKeys = sortKeys;
        this.forceFloat32 = forceFloat32;
        this.ignoreUndefined = ignoreUndefined;
        this.forceIntegerToFloat = forceIntegerToFloat;
        this.pos = 0;
        this.view = new DataView(new ArrayBuffer(this.initialBufferSize));
        this.bytes = new Uint8Array(this.view.buffer);
      }
      reinitializeState() {
        this.pos = 0;
      }
      /**
       * This is almost equivalent to {@link Encoder#encode}, but it returns an reference of the encoder's internal buffer and thus much faster than {@link Encoder#encode}.
       *
       * @returns Encodes the object and returns a shared reference the encoder's internal buffer.
       */
      encodeSharedRef(object) {
        this.reinitializeState();
        this.doEncode(object, 1);
        return this.bytes.subarray(0, this.pos);
      }
      /**
       * @returns Encodes the object and returns a copy of the encoder's internal buffer.
       */
      encode(object) {
        this.reinitializeState();
        this.doEncode(object, 1);
        return this.bytes.slice(0, this.pos);
      }
      doEncode(object, depth) {
        if (depth > this.maxDepth) {
          throw new Error(`Too deep objects in depth ${depth}`);
        }
        if (object == null) {
          this.encodeNil();
        } else if (typeof object === "boolean") {
          this.encodeBoolean(object);
        } else if (typeof object === "number") {
          this.encodeNumber(object);
        } else if (typeof object === "string") {
          this.encodeString(object);
        } else {
          this.encodeObject(object, depth);
        }
      }
      ensureBufferSizeToWrite(sizeToWrite) {
        const requiredSize = this.pos + sizeToWrite;
        if (this.view.byteLength < requiredSize) {
          this.resizeBuffer(requiredSize * 2);
        }
      }
      resizeBuffer(newSize) {
        const newBuffer = new ArrayBuffer(newSize);
        const newBytes = new Uint8Array(newBuffer);
        const newView = new DataView(newBuffer);
        newBytes.set(this.bytes);
        this.view = newView;
        this.bytes = newBytes;
      }
      encodeNil() {
        this.writeU8(192);
      }
      encodeBoolean(object) {
        if (object === false) {
          this.writeU8(194);
        } else {
          this.writeU8(195);
        }
      }
      encodeNumber(object) {
        if (Number.isSafeInteger(object) && !this.forceIntegerToFloat) {
          if (object >= 0) {
            if (object < 128) {
              this.writeU8(object);
            } else if (object < 256) {
              this.writeU8(204);
              this.writeU8(object);
            } else if (object < 65536) {
              this.writeU8(205);
              this.writeU16(object);
            } else if (object < 4294967296) {
              this.writeU8(206);
              this.writeU32(object);
            } else {
              this.writeU8(207);
              this.writeU64(object);
            }
          } else {
            if (object >= -32) {
              this.writeU8(224 | object + 32);
            } else if (object >= -128) {
              this.writeU8(208);
              this.writeI8(object);
            } else if (object >= -32768) {
              this.writeU8(209);
              this.writeI16(object);
            } else if (object >= -2147483648) {
              this.writeU8(210);
              this.writeI32(object);
            } else {
              this.writeU8(211);
              this.writeI64(object);
            }
          }
        } else {
          if (this.forceFloat32) {
            this.writeU8(202);
            this.writeF32(object);
          } else {
            this.writeU8(203);
            this.writeF64(object);
          }
        }
      }
      writeStringHeader(byteLength) {
        if (byteLength < 32) {
          this.writeU8(160 + byteLength);
        } else if (byteLength < 256) {
          this.writeU8(217);
          this.writeU8(byteLength);
        } else if (byteLength < 65536) {
          this.writeU8(218);
          this.writeU16(byteLength);
        } else if (byteLength < 4294967296) {
          this.writeU8(219);
          this.writeU32(byteLength);
        } else {
          throw new Error(`Too long string: ${byteLength} bytes in UTF-8`);
        }
      }
      encodeString(object) {
        const maxHeaderSize = 1 + 4;
        const strLength = object.length;
        if (strLength > utf8_1.TEXT_ENCODER_THRESHOLD) {
          const byteLength = (0, utf8_1.utf8Count)(object);
          this.ensureBufferSizeToWrite(maxHeaderSize + byteLength);
          this.writeStringHeader(byteLength);
          (0, utf8_1.utf8EncodeTE)(object, this.bytes, this.pos);
          this.pos += byteLength;
        } else {
          const byteLength = (0, utf8_1.utf8Count)(object);
          this.ensureBufferSizeToWrite(maxHeaderSize + byteLength);
          this.writeStringHeader(byteLength);
          (0, utf8_1.utf8EncodeJs)(object, this.bytes, this.pos);
          this.pos += byteLength;
        }
      }
      encodeObject(object, depth) {
        const ext = this.extensionCodec.tryToEncode(object, this.context);
        if (ext != null) {
          this.encodeExtension(ext);
        } else if (Array.isArray(object)) {
          this.encodeArray(object, depth);
        } else if (ArrayBuffer.isView(object)) {
          this.encodeBinary(object);
        } else if (typeof object === "object") {
          this.encodeMap(object, depth);
        } else {
          throw new Error(`Unrecognized object: ${Object.prototype.toString.apply(object)}`);
        }
      }
      encodeBinary(object) {
        const size = object.byteLength;
        if (size < 256) {
          this.writeU8(196);
          this.writeU8(size);
        } else if (size < 65536) {
          this.writeU8(197);
          this.writeU16(size);
        } else if (size < 4294967296) {
          this.writeU8(198);
          this.writeU32(size);
        } else {
          throw new Error(`Too large binary: ${size}`);
        }
        const bytes = (0, typedArrays_1.ensureUint8Array)(object);
        this.writeU8a(bytes);
      }
      encodeArray(object, depth) {
        const size = object.length;
        if (size < 16) {
          this.writeU8(144 + size);
        } else if (size < 65536) {
          this.writeU8(220);
          this.writeU16(size);
        } else if (size < 4294967296) {
          this.writeU8(221);
          this.writeU32(size);
        } else {
          throw new Error(`Too large array: ${size}`);
        }
        for (const item of object) {
          this.doEncode(item, depth + 1);
        }
      }
      countWithoutUndefined(object, keys) {
        let count = 0;
        for (const key of keys) {
          if (object[key] !== void 0) {
            count++;
          }
        }
        return count;
      }
      encodeMap(object, depth) {
        const keys = Object.keys(object);
        if (this.sortKeys) {
          keys.sort();
        }
        const size = this.ignoreUndefined ? this.countWithoutUndefined(object, keys) : keys.length;
        if (size < 16) {
          this.writeU8(128 + size);
        } else if (size < 65536) {
          this.writeU8(222);
          this.writeU16(size);
        } else if (size < 4294967296) {
          this.writeU8(223);
          this.writeU32(size);
        } else {
          throw new Error(`Too large map object: ${size}`);
        }
        for (const key of keys) {
          const value = object[key];
          if (!(this.ignoreUndefined && value === void 0)) {
            this.encodeString(key);
            this.doEncode(value, depth + 1);
          }
        }
      }
      encodeExtension(ext) {
        const size = ext.data.length;
        if (size === 1) {
          this.writeU8(212);
        } else if (size === 2) {
          this.writeU8(213);
        } else if (size === 4) {
          this.writeU8(214);
        } else if (size === 8) {
          this.writeU8(215);
        } else if (size === 16) {
          this.writeU8(216);
        } else if (size < 256) {
          this.writeU8(199);
          this.writeU8(size);
        } else if (size < 65536) {
          this.writeU8(200);
          this.writeU16(size);
        } else if (size < 4294967296) {
          this.writeU8(201);
          this.writeU32(size);
        } else {
          throw new Error(`Too large extension object: ${size}`);
        }
        this.writeI8(ext.type);
        this.writeU8a(ext.data);
      }
      writeU8(value) {
        this.ensureBufferSizeToWrite(1);
        this.view.setUint8(this.pos, value);
        this.pos++;
      }
      writeU8a(values) {
        const size = values.length;
        this.ensureBufferSizeToWrite(size);
        this.bytes.set(values, this.pos);
        this.pos += size;
      }
      writeI8(value) {
        this.ensureBufferSizeToWrite(1);
        this.view.setInt8(this.pos, value);
        this.pos++;
      }
      writeU16(value) {
        this.ensureBufferSizeToWrite(2);
        this.view.setUint16(this.pos, value);
        this.pos += 2;
      }
      writeI16(value) {
        this.ensureBufferSizeToWrite(2);
        this.view.setInt16(this.pos, value);
        this.pos += 2;
      }
      writeU32(value) {
        this.ensureBufferSizeToWrite(4);
        this.view.setUint32(this.pos, value);
        this.pos += 4;
      }
      writeI32(value) {
        this.ensureBufferSizeToWrite(4);
        this.view.setInt32(this.pos, value);
        this.pos += 4;
      }
      writeF32(value) {
        this.ensureBufferSizeToWrite(4);
        this.view.setFloat32(this.pos, value);
        this.pos += 4;
      }
      writeF64(value) {
        this.ensureBufferSizeToWrite(8);
        this.view.setFloat64(this.pos, value);
        this.pos += 8;
      }
      writeU64(value) {
        this.ensureBufferSizeToWrite(8);
        (0, int_1.setUint64)(this.view, this.pos, value);
        this.pos += 8;
      }
      writeI64(value) {
        this.ensureBufferSizeToWrite(8);
        (0, int_1.setInt64)(this.view, this.pos, value);
        this.pos += 8;
      }
    };
    exports.Encoder = Encoder;
  }
});

// node_modules/@msgpack/msgpack/dist/encode.js
var require_encode = __commonJS({
  "node_modules/@msgpack/msgpack/dist/encode.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.encode = void 0;
    var Encoder_1 = require_Encoder();
    var defaultEncodeOptions = {};
    function encode2(value, options = defaultEncodeOptions) {
      const encoder = new Encoder_1.Encoder(options.extensionCodec, options.context, options.maxDepth, options.initialBufferSize, options.sortKeys, options.forceFloat32, options.ignoreUndefined, options.forceIntegerToFloat);
      return encoder.encodeSharedRef(value);
    }
    exports.encode = encode2;
  }
});

// node_modules/@msgpack/msgpack/dist/utils/prettyByte.js
var require_prettyByte = __commonJS({
  "node_modules/@msgpack/msgpack/dist/utils/prettyByte.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.prettyByte = void 0;
    function prettyByte(byte) {
      return `${byte < 0 ? "-" : ""}0x${Math.abs(byte).toString(16).padStart(2, "0")}`;
    }
    exports.prettyByte = prettyByte;
  }
});

// node_modules/@msgpack/msgpack/dist/CachedKeyDecoder.js
var require_CachedKeyDecoder = __commonJS({
  "node_modules/@msgpack/msgpack/dist/CachedKeyDecoder.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CachedKeyDecoder = void 0;
    var utf8_1 = require_utf8();
    var DEFAULT_MAX_KEY_LENGTH = 16;
    var DEFAULT_MAX_LENGTH_PER_KEY = 16;
    var CachedKeyDecoder = class {
      constructor(maxKeyLength = DEFAULT_MAX_KEY_LENGTH, maxLengthPerKey = DEFAULT_MAX_LENGTH_PER_KEY) {
        this.maxKeyLength = maxKeyLength;
        this.maxLengthPerKey = maxLengthPerKey;
        this.hit = 0;
        this.miss = 0;
        this.caches = [];
        for (let i = 0; i < this.maxKeyLength; i++) {
          this.caches.push([]);
        }
      }
      canBeCached(byteLength) {
        return byteLength > 0 && byteLength <= this.maxKeyLength;
      }
      find(bytes, inputOffset, byteLength) {
        const records = this.caches[byteLength - 1];
        FIND_CHUNK:
          for (const record of records) {
            const recordBytes = record.bytes;
            for (let j = 0; j < byteLength; j++) {
              if (recordBytes[j] !== bytes[inputOffset + j]) {
                continue FIND_CHUNK;
              }
            }
            return record.str;
          }
        return null;
      }
      store(bytes, value) {
        const records = this.caches[bytes.length - 1];
        const record = { bytes, str: value };
        if (records.length >= this.maxLengthPerKey) {
          records[Math.random() * records.length | 0] = record;
        } else {
          records.push(record);
        }
      }
      decode(bytes, inputOffset, byteLength) {
        const cachedValue = this.find(bytes, inputOffset, byteLength);
        if (cachedValue != null) {
          this.hit++;
          return cachedValue;
        }
        this.miss++;
        const str = (0, utf8_1.utf8DecodeJs)(bytes, inputOffset, byteLength);
        const slicedCopyOfBytes = Uint8Array.prototype.slice.call(bytes, inputOffset, inputOffset + byteLength);
        this.store(slicedCopyOfBytes, str);
        return str;
      }
    };
    exports.CachedKeyDecoder = CachedKeyDecoder;
  }
});

// node_modules/@msgpack/msgpack/dist/Decoder.js
var require_Decoder = __commonJS({
  "node_modules/@msgpack/msgpack/dist/Decoder.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Decoder = exports.DataViewIndexOutOfBoundsError = void 0;
    var prettyByte_1 = require_prettyByte();
    var ExtensionCodec_1 = require_ExtensionCodec();
    var int_1 = require_int();
    var utf8_1 = require_utf8();
    var typedArrays_1 = require_typedArrays();
    var CachedKeyDecoder_1 = require_CachedKeyDecoder();
    var DecodeError_1 = require_DecodeError();
    var isValidMapKeyType = (key) => {
      const keyType = typeof key;
      return keyType === "string" || keyType === "number";
    };
    var HEAD_BYTE_REQUIRED = -1;
    var EMPTY_VIEW = new DataView(new ArrayBuffer(0));
    var EMPTY_BYTES = new Uint8Array(EMPTY_VIEW.buffer);
    exports.DataViewIndexOutOfBoundsError = (() => {
      try {
        EMPTY_VIEW.getInt8(0);
      } catch (e) {
        return e.constructor;
      }
      throw new Error("never reached");
    })();
    var MORE_DATA = new exports.DataViewIndexOutOfBoundsError("Insufficient data");
    var sharedCachedKeyDecoder = new CachedKeyDecoder_1.CachedKeyDecoder();
    var Decoder = class {
      constructor(extensionCodec = ExtensionCodec_1.ExtensionCodec.defaultCodec, context = void 0, maxStrLength = int_1.UINT32_MAX, maxBinLength = int_1.UINT32_MAX, maxArrayLength = int_1.UINT32_MAX, maxMapLength = int_1.UINT32_MAX, maxExtLength = int_1.UINT32_MAX, keyDecoder = sharedCachedKeyDecoder) {
        this.extensionCodec = extensionCodec;
        this.context = context;
        this.maxStrLength = maxStrLength;
        this.maxBinLength = maxBinLength;
        this.maxArrayLength = maxArrayLength;
        this.maxMapLength = maxMapLength;
        this.maxExtLength = maxExtLength;
        this.keyDecoder = keyDecoder;
        this.totalPos = 0;
        this.pos = 0;
        this.view = EMPTY_VIEW;
        this.bytes = EMPTY_BYTES;
        this.headByte = HEAD_BYTE_REQUIRED;
        this.stack = [];
      }
      reinitializeState() {
        this.totalPos = 0;
        this.headByte = HEAD_BYTE_REQUIRED;
        this.stack.length = 0;
      }
      setBuffer(buffer) {
        this.bytes = (0, typedArrays_1.ensureUint8Array)(buffer);
        this.view = (0, typedArrays_1.createDataView)(this.bytes);
        this.pos = 0;
      }
      appendBuffer(buffer) {
        if (this.headByte === HEAD_BYTE_REQUIRED && !this.hasRemaining(1)) {
          this.setBuffer(buffer);
        } else {
          const remainingData = this.bytes.subarray(this.pos);
          const newData = (0, typedArrays_1.ensureUint8Array)(buffer);
          const newBuffer = new Uint8Array(remainingData.length + newData.length);
          newBuffer.set(remainingData);
          newBuffer.set(newData, remainingData.length);
          this.setBuffer(newBuffer);
        }
      }
      hasRemaining(size) {
        return this.view.byteLength - this.pos >= size;
      }
      createExtraByteError(posToShow) {
        const { view, pos } = this;
        return new RangeError(`Extra ${view.byteLength - pos} of ${view.byteLength} byte(s) found at buffer[${posToShow}]`);
      }
      /**
       * @throws {@link DecodeError}
       * @throws {@link RangeError}
       */
      decode(buffer) {
        this.reinitializeState();
        this.setBuffer(buffer);
        const object = this.doDecodeSync();
        if (this.hasRemaining(1)) {
          throw this.createExtraByteError(this.pos);
        }
        return object;
      }
      *decodeMulti(buffer) {
        this.reinitializeState();
        this.setBuffer(buffer);
        while (this.hasRemaining(1)) {
          yield this.doDecodeSync();
        }
      }
      async decodeAsync(stream) {
        let decoded = false;
        let object;
        for await (const buffer of stream) {
          if (decoded) {
            throw this.createExtraByteError(this.totalPos);
          }
          this.appendBuffer(buffer);
          try {
            object = this.doDecodeSync();
            decoded = true;
          } catch (e) {
            if (!(e instanceof exports.DataViewIndexOutOfBoundsError)) {
              throw e;
            }
          }
          this.totalPos += this.pos;
        }
        if (decoded) {
          if (this.hasRemaining(1)) {
            throw this.createExtraByteError(this.totalPos);
          }
          return object;
        }
        const { headByte, pos, totalPos } = this;
        throw new RangeError(`Insufficient data in parsing ${(0, prettyByte_1.prettyByte)(headByte)} at ${totalPos} (${pos} in the current buffer)`);
      }
      decodeArrayStream(stream) {
        return this.decodeMultiAsync(stream, true);
      }
      decodeStream(stream) {
        return this.decodeMultiAsync(stream, false);
      }
      async *decodeMultiAsync(stream, isArray) {
        let isArrayHeaderRequired = isArray;
        let arrayItemsLeft = -1;
        for await (const buffer of stream) {
          if (isArray && arrayItemsLeft === 0) {
            throw this.createExtraByteError(this.totalPos);
          }
          this.appendBuffer(buffer);
          if (isArrayHeaderRequired) {
            arrayItemsLeft = this.readArraySize();
            isArrayHeaderRequired = false;
            this.complete();
          }
          try {
            while (true) {
              yield this.doDecodeSync();
              if (--arrayItemsLeft === 0) {
                break;
              }
            }
          } catch (e) {
            if (!(e instanceof exports.DataViewIndexOutOfBoundsError)) {
              throw e;
            }
          }
          this.totalPos += this.pos;
        }
      }
      doDecodeSync() {
        DECODE:
          while (true) {
            const headByte = this.readHeadByte();
            let object;
            if (headByte >= 224) {
              object = headByte - 256;
            } else if (headByte < 192) {
              if (headByte < 128) {
                object = headByte;
              } else if (headByte < 144) {
                const size = headByte - 128;
                if (size !== 0) {
                  this.pushMapState(size);
                  this.complete();
                  continue DECODE;
                } else {
                  object = {};
                }
              } else if (headByte < 160) {
                const size = headByte - 144;
                if (size !== 0) {
                  this.pushArrayState(size);
                  this.complete();
                  continue DECODE;
                } else {
                  object = [];
                }
              } else {
                const byteLength = headByte - 160;
                object = this.decodeUtf8String(byteLength, 0);
              }
            } else if (headByte === 192) {
              object = null;
            } else if (headByte === 194) {
              object = false;
            } else if (headByte === 195) {
              object = true;
            } else if (headByte === 202) {
              object = this.readF32();
            } else if (headByte === 203) {
              object = this.readF64();
            } else if (headByte === 204) {
              object = this.readU8();
            } else if (headByte === 205) {
              object = this.readU16();
            } else if (headByte === 206) {
              object = this.readU32();
            } else if (headByte === 207) {
              object = this.readU64();
            } else if (headByte === 208) {
              object = this.readI8();
            } else if (headByte === 209) {
              object = this.readI16();
            } else if (headByte === 210) {
              object = this.readI32();
            } else if (headByte === 211) {
              object = this.readI64();
            } else if (headByte === 217) {
              const byteLength = this.lookU8();
              object = this.decodeUtf8String(byteLength, 1);
            } else if (headByte === 218) {
              const byteLength = this.lookU16();
              object = this.decodeUtf8String(byteLength, 2);
            } else if (headByte === 219) {
              const byteLength = this.lookU32();
              object = this.decodeUtf8String(byteLength, 4);
            } else if (headByte === 220) {
              const size = this.readU16();
              if (size !== 0) {
                this.pushArrayState(size);
                this.complete();
                continue DECODE;
              } else {
                object = [];
              }
            } else if (headByte === 221) {
              const size = this.readU32();
              if (size !== 0) {
                this.pushArrayState(size);
                this.complete();
                continue DECODE;
              } else {
                object = [];
              }
            } else if (headByte === 222) {
              const size = this.readU16();
              if (size !== 0) {
                this.pushMapState(size);
                this.complete();
                continue DECODE;
              } else {
                object = {};
              }
            } else if (headByte === 223) {
              const size = this.readU32();
              if (size !== 0) {
                this.pushMapState(size);
                this.complete();
                continue DECODE;
              } else {
                object = {};
              }
            } else if (headByte === 196) {
              const size = this.lookU8();
              object = this.decodeBinary(size, 1);
            } else if (headByte === 197) {
              const size = this.lookU16();
              object = this.decodeBinary(size, 2);
            } else if (headByte === 198) {
              const size = this.lookU32();
              object = this.decodeBinary(size, 4);
            } else if (headByte === 212) {
              object = this.decodeExtension(1, 0);
            } else if (headByte === 213) {
              object = this.decodeExtension(2, 0);
            } else if (headByte === 214) {
              object = this.decodeExtension(4, 0);
            } else if (headByte === 215) {
              object = this.decodeExtension(8, 0);
            } else if (headByte === 216) {
              object = this.decodeExtension(16, 0);
            } else if (headByte === 199) {
              const size = this.lookU8();
              object = this.decodeExtension(size, 1);
            } else if (headByte === 200) {
              const size = this.lookU16();
              object = this.decodeExtension(size, 2);
            } else if (headByte === 201) {
              const size = this.lookU32();
              object = this.decodeExtension(size, 4);
            } else {
              throw new DecodeError_1.DecodeError(`Unrecognized type byte: ${(0, prettyByte_1.prettyByte)(headByte)}`);
            }
            this.complete();
            const stack = this.stack;
            while (stack.length > 0) {
              const state = stack[stack.length - 1];
              if (state.type === 0) {
                state.array[state.position] = object;
                state.position++;
                if (state.position === state.size) {
                  stack.pop();
                  object = state.array;
                } else {
                  continue DECODE;
                }
              } else if (state.type === 1) {
                if (!isValidMapKeyType(object)) {
                  throw new DecodeError_1.DecodeError("The type of key must be string or number but " + typeof object);
                }
                if (object === "__proto__") {
                  throw new DecodeError_1.DecodeError("The key __proto__ is not allowed");
                }
                state.key = object;
                state.type = 2;
                continue DECODE;
              } else {
                state.map[state.key] = object;
                state.readCount++;
                if (state.readCount === state.size) {
                  stack.pop();
                  object = state.map;
                } else {
                  state.key = null;
                  state.type = 1;
                  continue DECODE;
                }
              }
            }
            return object;
          }
      }
      readHeadByte() {
        if (this.headByte === HEAD_BYTE_REQUIRED) {
          this.headByte = this.readU8();
        }
        return this.headByte;
      }
      complete() {
        this.headByte = HEAD_BYTE_REQUIRED;
      }
      readArraySize() {
        const headByte = this.readHeadByte();
        switch (headByte) {
          case 220:
            return this.readU16();
          case 221:
            return this.readU32();
          default: {
            if (headByte < 160) {
              return headByte - 144;
            } else {
              throw new DecodeError_1.DecodeError(`Unrecognized array type byte: ${(0, prettyByte_1.prettyByte)(headByte)}`);
            }
          }
        }
      }
      pushMapState(size) {
        if (size > this.maxMapLength) {
          throw new DecodeError_1.DecodeError(`Max length exceeded: map length (${size}) > maxMapLengthLength (${this.maxMapLength})`);
        }
        this.stack.push({
          type: 1,
          size,
          key: null,
          readCount: 0,
          map: {}
        });
      }
      pushArrayState(size) {
        if (size > this.maxArrayLength) {
          throw new DecodeError_1.DecodeError(`Max length exceeded: array length (${size}) > maxArrayLength (${this.maxArrayLength})`);
        }
        this.stack.push({
          type: 0,
          size,
          array: new Array(size),
          position: 0
        });
      }
      decodeUtf8String(byteLength, headerOffset) {
        var _a;
        if (byteLength > this.maxStrLength) {
          throw new DecodeError_1.DecodeError(`Max length exceeded: UTF-8 byte length (${byteLength}) > maxStrLength (${this.maxStrLength})`);
        }
        if (this.bytes.byteLength < this.pos + headerOffset + byteLength) {
          throw MORE_DATA;
        }
        const offset = this.pos + headerOffset;
        let object;
        if (this.stateIsMapKey() && ((_a = this.keyDecoder) === null || _a === void 0 ? void 0 : _a.canBeCached(byteLength))) {
          object = this.keyDecoder.decode(this.bytes, offset, byteLength);
        } else if (byteLength > utf8_1.TEXT_DECODER_THRESHOLD) {
          object = (0, utf8_1.utf8DecodeTD)(this.bytes, offset, byteLength);
        } else {
          object = (0, utf8_1.utf8DecodeJs)(this.bytes, offset, byteLength);
        }
        this.pos += headerOffset + byteLength;
        return object;
      }
      stateIsMapKey() {
        if (this.stack.length > 0) {
          const state = this.stack[this.stack.length - 1];
          return state.type === 1;
        }
        return false;
      }
      decodeBinary(byteLength, headOffset) {
        if (byteLength > this.maxBinLength) {
          throw new DecodeError_1.DecodeError(`Max length exceeded: bin length (${byteLength}) > maxBinLength (${this.maxBinLength})`);
        }
        if (!this.hasRemaining(byteLength + headOffset)) {
          throw MORE_DATA;
        }
        const offset = this.pos + headOffset;
        const object = this.bytes.subarray(offset, offset + byteLength);
        this.pos += headOffset + byteLength;
        return object;
      }
      decodeExtension(size, headOffset) {
        if (size > this.maxExtLength) {
          throw new DecodeError_1.DecodeError(`Max length exceeded: ext length (${size}) > maxExtLength (${this.maxExtLength})`);
        }
        const extType = this.view.getInt8(this.pos + headOffset);
        const data = this.decodeBinary(
          size,
          headOffset + 1
          /* extType */
        );
        return this.extensionCodec.decode(data, extType, this.context);
      }
      lookU8() {
        return this.view.getUint8(this.pos);
      }
      lookU16() {
        return this.view.getUint16(this.pos);
      }
      lookU32() {
        return this.view.getUint32(this.pos);
      }
      readU8() {
        const value = this.view.getUint8(this.pos);
        this.pos++;
        return value;
      }
      readI8() {
        const value = this.view.getInt8(this.pos);
        this.pos++;
        return value;
      }
      readU16() {
        const value = this.view.getUint16(this.pos);
        this.pos += 2;
        return value;
      }
      readI16() {
        const value = this.view.getInt16(this.pos);
        this.pos += 2;
        return value;
      }
      readU32() {
        const value = this.view.getUint32(this.pos);
        this.pos += 4;
        return value;
      }
      readI32() {
        const value = this.view.getInt32(this.pos);
        this.pos += 4;
        return value;
      }
      readU64() {
        const value = (0, int_1.getUint64)(this.view, this.pos);
        this.pos += 8;
        return value;
      }
      readI64() {
        const value = (0, int_1.getInt64)(this.view, this.pos);
        this.pos += 8;
        return value;
      }
      readF32() {
        const value = this.view.getFloat32(this.pos);
        this.pos += 4;
        return value;
      }
      readF64() {
        const value = this.view.getFloat64(this.pos);
        this.pos += 8;
        return value;
      }
    };
    exports.Decoder = Decoder;
  }
});

// node_modules/@msgpack/msgpack/dist/decode.js
var require_decode = __commonJS({
  "node_modules/@msgpack/msgpack/dist/decode.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decodeMulti = exports.decode = exports.defaultDecodeOptions = void 0;
    var Decoder_1 = require_Decoder();
    exports.defaultDecodeOptions = {};
    function decode2(buffer, options = exports.defaultDecodeOptions) {
      const decoder = new Decoder_1.Decoder(options.extensionCodec, options.context, options.maxStrLength, options.maxBinLength, options.maxArrayLength, options.maxMapLength, options.maxExtLength);
      return decoder.decode(buffer);
    }
    exports.decode = decode2;
    function decodeMulti(buffer, options = exports.defaultDecodeOptions) {
      const decoder = new Decoder_1.Decoder(options.extensionCodec, options.context, options.maxStrLength, options.maxBinLength, options.maxArrayLength, options.maxMapLength, options.maxExtLength);
      return decoder.decodeMulti(buffer);
    }
    exports.decodeMulti = decodeMulti;
  }
});

// node_modules/@msgpack/msgpack/dist/utils/stream.js
var require_stream = __commonJS({
  "node_modules/@msgpack/msgpack/dist/utils/stream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ensureAsyncIterable = exports.asyncIterableFromStream = exports.isAsyncIterable = void 0;
    function isAsyncIterable(object) {
      return object[Symbol.asyncIterator] != null;
    }
    exports.isAsyncIterable = isAsyncIterable;
    function assertNonNull(value) {
      if (value == null) {
        throw new Error("Assertion Failure: value must not be null nor undefined");
      }
    }
    async function* asyncIterableFromStream(stream) {
      const reader = stream.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            return;
          }
          assertNonNull(value);
          yield value;
        }
      } finally {
        reader.releaseLock();
      }
    }
    exports.asyncIterableFromStream = asyncIterableFromStream;
    function ensureAsyncIterable(streamLike) {
      if (isAsyncIterable(streamLike)) {
        return streamLike;
      } else {
        return asyncIterableFromStream(streamLike);
      }
    }
    exports.ensureAsyncIterable = ensureAsyncIterable;
  }
});

// node_modules/@msgpack/msgpack/dist/decodeAsync.js
var require_decodeAsync = __commonJS({
  "node_modules/@msgpack/msgpack/dist/decodeAsync.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decodeStream = exports.decodeMultiStream = exports.decodeArrayStream = exports.decodeAsync = void 0;
    var Decoder_1 = require_Decoder();
    var stream_1 = require_stream();
    var decode_1 = require_decode();
    async function decodeAsync(streamLike, options = decode_1.defaultDecodeOptions) {
      const stream = (0, stream_1.ensureAsyncIterable)(streamLike);
      const decoder = new Decoder_1.Decoder(options.extensionCodec, options.context, options.maxStrLength, options.maxBinLength, options.maxArrayLength, options.maxMapLength, options.maxExtLength);
      return decoder.decodeAsync(stream);
    }
    exports.decodeAsync = decodeAsync;
    function decodeArrayStream(streamLike, options = decode_1.defaultDecodeOptions) {
      const stream = (0, stream_1.ensureAsyncIterable)(streamLike);
      const decoder = new Decoder_1.Decoder(options.extensionCodec, options.context, options.maxStrLength, options.maxBinLength, options.maxArrayLength, options.maxMapLength, options.maxExtLength);
      return decoder.decodeArrayStream(stream);
    }
    exports.decodeArrayStream = decodeArrayStream;
    function decodeMultiStream(streamLike, options = decode_1.defaultDecodeOptions) {
      const stream = (0, stream_1.ensureAsyncIterable)(streamLike);
      const decoder = new Decoder_1.Decoder(options.extensionCodec, options.context, options.maxStrLength, options.maxBinLength, options.maxArrayLength, options.maxMapLength, options.maxExtLength);
      return decoder.decodeStream(stream);
    }
    exports.decodeMultiStream = decodeMultiStream;
    function decodeStream(streamLike, options = decode_1.defaultDecodeOptions) {
      return decodeMultiStream(streamLike, options);
    }
    exports.decodeStream = decodeStream;
  }
});

// node_modules/@msgpack/msgpack/dist/index.js
var require_dist = __commonJS({
  "node_modules/@msgpack/msgpack/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decodeTimestampExtension = exports.encodeTimestampExtension = exports.decodeTimestampToTimeSpec = exports.encodeTimeSpecToTimestamp = exports.encodeDateToTimeSpec = exports.EXT_TIMESTAMP = exports.ExtData = exports.ExtensionCodec = exports.Encoder = exports.DataViewIndexOutOfBoundsError = exports.DecodeError = exports.Decoder = exports.decodeStream = exports.decodeMultiStream = exports.decodeArrayStream = exports.decodeAsync = exports.decodeMulti = exports.decode = exports.encode = void 0;
    var encode_1 = require_encode();
    Object.defineProperty(exports, "encode", { enumerable: true, get: function() {
      return encode_1.encode;
    } });
    var decode_1 = require_decode();
    Object.defineProperty(exports, "decode", { enumerable: true, get: function() {
      return decode_1.decode;
    } });
    Object.defineProperty(exports, "decodeMulti", { enumerable: true, get: function() {
      return decode_1.decodeMulti;
    } });
    var decodeAsync_1 = require_decodeAsync();
    Object.defineProperty(exports, "decodeAsync", { enumerable: true, get: function() {
      return decodeAsync_1.decodeAsync;
    } });
    Object.defineProperty(exports, "decodeArrayStream", { enumerable: true, get: function() {
      return decodeAsync_1.decodeArrayStream;
    } });
    Object.defineProperty(exports, "decodeMultiStream", { enumerable: true, get: function() {
      return decodeAsync_1.decodeMultiStream;
    } });
    Object.defineProperty(exports, "decodeStream", { enumerable: true, get: function() {
      return decodeAsync_1.decodeStream;
    } });
    var Decoder_1 = require_Decoder();
    Object.defineProperty(exports, "Decoder", { enumerable: true, get: function() {
      return Decoder_1.Decoder;
    } });
    Object.defineProperty(exports, "DataViewIndexOutOfBoundsError", { enumerable: true, get: function() {
      return Decoder_1.DataViewIndexOutOfBoundsError;
    } });
    var DecodeError_1 = require_DecodeError();
    Object.defineProperty(exports, "DecodeError", { enumerable: true, get: function() {
      return DecodeError_1.DecodeError;
    } });
    var Encoder_1 = require_Encoder();
    Object.defineProperty(exports, "Encoder", { enumerable: true, get: function() {
      return Encoder_1.Encoder;
    } });
    var ExtensionCodec_1 = require_ExtensionCodec();
    Object.defineProperty(exports, "ExtensionCodec", { enumerable: true, get: function() {
      return ExtensionCodec_1.ExtensionCodec;
    } });
    var ExtData_1 = require_ExtData();
    Object.defineProperty(exports, "ExtData", { enumerable: true, get: function() {
      return ExtData_1.ExtData;
    } });
    var timestamp_1 = require_timestamp();
    Object.defineProperty(exports, "EXT_TIMESTAMP", { enumerable: true, get: function() {
      return timestamp_1.EXT_TIMESTAMP;
    } });
    Object.defineProperty(exports, "encodeDateToTimeSpec", { enumerable: true, get: function() {
      return timestamp_1.encodeDateToTimeSpec;
    } });
    Object.defineProperty(exports, "encodeTimeSpecToTimestamp", { enumerable: true, get: function() {
      return timestamp_1.encodeTimeSpecToTimestamp;
    } });
    Object.defineProperty(exports, "decodeTimestampToTimeSpec", { enumerable: true, get: function() {
      return timestamp_1.decodeTimestampToTimeSpec;
    } });
    Object.defineProperty(exports, "encodeTimestampExtension", { enumerable: true, get: function() {
      return timestamp_1.encodeTimestampExtension;
    } });
    Object.defineProperty(exports, "decodeTimestampExtension", { enumerable: true, get: function() {
      return timestamp_1.decodeTimestampExtension;
    } });
  }
});

// webR/error.ts
var WebRError = class extends Error {
  constructor(msg) {
    super(msg);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
};
var WebRChannelError = class extends WebRError {
};

// webR/compat.ts
var IN_NODE = typeof process !== "undefined" && process.release && process.release.name === "node";
var loadScript;
if (globalThis.document) {
  loadScript = (url) => new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
} else if (globalThis.importScripts) {
  loadScript = async (url) => {
    try {
      globalThis.importScripts(url);
    } catch (e) {
      if (e instanceof TypeError) {
        await Promise.resolve().then(() => __toESM(__require(url)));
      } else {
        throw e;
      }
    }
  };
} else if (IN_NODE) {
  loadScript = async (url) => {
    const nodePathMod = (await Promise.resolve().then(() => __toESM(__require("path")))).default;
    await Promise.resolve().then(() => __toESM(__require(nodePathMod.resolve(url))));
  };
} else {
  throw new WebRError("Cannot determine runtime environment");
}

// webR/emscripten.ts
var Module = {};
function dictEmFree(dict) {
  Object.keys(dict).forEach((key) => Module._free(dict[key]));
}

// webR/robj.ts
var RTypeMap = {
  null: 0,
  symbol: 1,
  pairlist: 2,
  closure: 3,
  environment: 4,
  promise: 5,
  call: 6,
  special: 7,
  builtin: 8,
  string: 9,
  logical: 10,
  integer: 13,
  double: 14,
  complex: 15,
  character: 16,
  dots: 17,
  any: 18,
  list: 19,
  expression: 20,
  bytecode: 21,
  pointer: 22,
  weakref: 23,
  raw: 24,
  s4: 25,
  new: 30,
  free: 31,
  function: 99
};
function isWebRDataJs(value) {
  return !!value && typeof value === "object" && Object.keys(RTypeMap).includes(value.type);
}
function isComplex(value) {
  return !!value && typeof value === "object" && "re" in value && "im" in value;
}

// webR/utils-r.ts
function protect(x) {
  Module._Rf_protect(handlePtr(x));
  return x;
}
function protectInc(x, prot) {
  Module._Rf_protect(handlePtr(x));
  ++prot.n;
  return x;
}
function protectWithIndex(x) {
  const pLoc = Module._malloc(4);
  Module._R_ProtectWithIndex(handlePtr(x), pLoc);
  const loc = Module.getValue(pLoc, "i32");
  return { loc, ptr: pLoc };
}
function unprotectIndex(index) {
  Module._Rf_unprotect(1);
  Module._free(index.ptr);
}
function reprotect(x, index) {
  Module._R_Reprotect(handlePtr(x), index.loc);
  return x;
}
function unprotect(n) {
  Module._Rf_unprotect(n);
}
function envPoke(env, sym, value) {
  Module._Rf_defineVar(handlePtr(sym), handlePtr(value), handlePtr(env));
}
function parseEvalBare(code, env) {
  const strings = {};
  const prot = { n: 0 };
  try {
    const envObj = new REnvironment(env);
    protectInc(envObj, prot);
    strings.code = Module.allocateUTF8(code);
    const out = Module._R_ParseEvalString(strings.code, envObj.ptr);
    return RObject.wrap(out);
  } finally {
    dictEmFree(strings);
    unprotect(prot.n);
  }
}
function safeEval(call, env) {
  return Module.getWasmTableEntry(Module.GOT.ffi_safe_eval.value)(
    handlePtr(call),
    handlePtr(env)
  );
}

// webR/robj-worker.ts
function handlePtr(x) {
  if (isRObject(x)) {
    return x.ptr;
  } else {
    return x;
  }
}
function assertRType(obj, type) {
  if (Module._TYPEOF(obj.ptr) !== RTypeMap[type]) {
    throw new Error(`Unexpected object type "${obj.type()}" when expecting type "${type}"`);
  }
}
function newObjectFromData(obj) {
  if (isWebRDataJs(obj)) {
    return new (getRWorkerClass(obj.type))(obj);
  }
  if (obj && typeof obj === "object" && "type" in obj && obj.type === "null") {
    return new RNull();
  }
  if (obj === null) {
    return new RLogical({ type: "logical", names: null, values: [null] });
  }
  if (typeof obj === "boolean") {
    return new RLogical(obj);
  }
  if (typeof obj === "number") {
    return new RDouble(obj);
  }
  if (typeof obj === "string") {
    return new RCharacter(obj);
  }
  if (isComplex(obj)) {
    return new RComplex(obj);
  }
  if (ArrayBuffer.isView(obj) || obj instanceof ArrayBuffer) {
    return new RRaw(obj);
  }
  if (Array.isArray(obj)) {
    return newObjectFromArray(obj);
  }
  if (typeof obj === "object") {
    return RDataFrame.fromObject(obj);
  }
  throw new Error("Robj construction for this JS object is not yet supported");
}
function newObjectFromArray(arr) {
  const prot = { n: 0 };
  const hasObjects = arr.every((v) => v && typeof v === "object" && !isRObject(v) && !isComplex(v));
  if (hasObjects) {
    const _arr = arr;
    const isConsistent = _arr.every((a) => {
      return Object.keys(a).filter((k) => !Object.keys(_arr[0]).includes(k)).length === 0 && Object.keys(_arr[0]).filter((k) => !Object.keys(a).includes(k)).length === 0;
    });
    const isAtomic = _arr.every((a) => Object.values(a).every((v) => {
      return isAtomicType(v) || isRVectorAtomic(v);
    }));
    if (isConsistent && isAtomic) {
      return RDataFrame.fromD3(_arr);
    }
  }
  if (arr.every((v) => typeof v === "boolean" || v === null)) {
    return new RLogical(arr);
  }
  if (arr.every((v) => typeof v === "number" || v === null)) {
    return new RDouble(arr);
  }
  if (arr.every((v) => typeof v === "string" || v === null)) {
    return new RCharacter(arr);
  }
  try {
    const call = new RCall([new RSymbol("c"), ...arr]);
    protectInc(call, prot);
    return call.eval();
  } finally {
    unprotect(prot.n);
  }
}
var RObjectBase = class {
  constructor(ptr) {
    this.ptr = ptr;
  }
  type() {
    const typeNumber = Module._TYPEOF(this.ptr);
    const type = Object.keys(RTypeMap).find(
      (typeName) => RTypeMap[typeName] === typeNumber
    );
    return type;
  }
};
var _slice, slice_fn;
var _RObject = class extends RObjectBase {
  constructor(data) {
    if (!(data instanceof RObjectBase)) {
      return newObjectFromData(data);
    }
    super(data.ptr);
    __privateAdd(this, _slice);
  }
  static wrap(ptr) {
    const typeNumber = Module._TYPEOF(ptr);
    const type = Object.keys(RTypeMap)[Object.values(RTypeMap).indexOf(typeNumber)];
    return new (getRWorkerClass(type))(new RObjectBase(ptr));
  }
  get [Symbol.toStringTag]() {
    return `RObject:${this.type()}`;
  }
  /** @internal */
  static getPersistentObject(prop) {
    return objs[prop];
  }
  /** @internal */
  getPropertyValue(prop) {
    return this[prop];
  }
  inspect() {
    parseEvalBare(".Internal(inspect(x))", { x: this });
  }
  isNull() {
    return Module._TYPEOF(this.ptr) === RTypeMap.null;
  }
  isNa() {
    try {
      const result = parseEvalBare("is.na(x)", { x: this });
      protect(result);
      return result.toBoolean();
    } finally {
      unprotect(1);
    }
  }
  isUnbound() {
    return this.ptr === objs.unboundValue.ptr;
  }
  attrs() {
    return RPairlist.wrap(Module._ATTRIB(this.ptr));
  }
  class() {
    const prot = { n: 0 };
    const classCall = new RCall([new RSymbol("class"), this]);
    protectInc(classCall, prot);
    try {
      return classCall.eval();
    } finally {
      unprotect(prot.n);
    }
  }
  setNames(values) {
    let namesObj;
    if (values === null) {
      namesObj = objs.null;
    } else if (Array.isArray(values) && values.every((v) => typeof v === "string" || v === null)) {
      namesObj = new RCharacter(values);
    } else {
      throw new Error("Argument to setNames must be null or an Array of strings or null");
    }
    Module._Rf_setAttrib(this.ptr, objs.namesSymbol.ptr, namesObj.ptr);
    return this;
  }
  names() {
    const names = RCharacter.wrap(Module._Rf_getAttrib(this.ptr, objs.namesSymbol.ptr));
    if (names.isNull()) {
      return null;
    } else {
      return names.toArray();
    }
  }
  includes(name) {
    const names = this.names();
    return names && names.includes(name);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toJs(options = { depth: 0 }, depth = 1) {
    throw new Error("This R object cannot be converted to JS");
  }
  subset(prop) {
    return __privateMethod(this, _slice, slice_fn).call(this, prop, objs.bracketSymbol.ptr);
  }
  get(prop) {
    return __privateMethod(this, _slice, slice_fn).call(this, prop, objs.bracket2Symbol.ptr);
  }
  getDollar(prop) {
    return __privateMethod(this, _slice, slice_fn).call(this, prop, objs.dollarSymbol.ptr);
  }
  pluck(...path) {
    const index = protectWithIndex(objs.null);
    try {
      const getter = (obj, prop) => {
        const out = obj.get(prop);
        return reprotect(out, index);
      };
      const result = path.reduce(getter, this);
      return result.isNull() ? void 0 : result;
    } finally {
      unprotectIndex(index);
    }
  }
  set(prop, value) {
    const prot = { n: 0 };
    try {
      const idx = new _RObject(prop);
      protectInc(idx, prot);
      const valueObj = new _RObject(value);
      protectInc(valueObj, prot);
      const assign = new RSymbol("[[<-");
      const call = Module._Rf_lang4(assign.ptr, this.ptr, idx.ptr, valueObj.ptr);
      protectInc(call, prot);
      return _RObject.wrap(safeEval(call, objs.baseEnv));
    } finally {
      unprotect(prot.n);
    }
  }
  /** @internal */
  static getMethods(obj) {
    const props = /* @__PURE__ */ new Set();
    let cur = obj;
    do {
      Object.getOwnPropertyNames(cur).map((p) => props.add(p));
    } while (cur = Object.getPrototypeOf(cur));
    return [...props.keys()].filter((i) => typeof obj[i] === "function");
  }
};
var RObject = _RObject;
_slice = new WeakSet();
slice_fn = function(prop, op) {
  const prot = { n: 0 };
  try {
    const idx = new _RObject(prop);
    protectInc(idx, prot);
    const call = Module._Rf_lang3(op, this.ptr, idx.ptr);
    protectInc(call, prot);
    return _RObject.wrap(safeEval(call, objs.baseEnv));
  } finally {
    unprotect(prot.n);
  }
};
var RNull = class extends RObject {
  constructor() {
    super(new RObjectBase(Module.getValue(Module._R_NilValue, "*")));
    return this;
  }
  toJs() {
    return { type: "null" };
  }
};
var RSymbol = class extends RObject {
  // Note that symbols don't need to be protected. This also means
  // that allocating symbols in loops with random data is probably a
  // bad idea because this leaks memory.
  constructor(x) {
    if (x instanceof RObjectBase) {
      assertRType(x, "symbol");
      super(x);
      return;
    }
    const name = Module.allocateUTF8(x);
    try {
      super(new RObjectBase(Module._Rf_install(name)));
    } finally {
      Module._free(name);
    }
  }
  toJs() {
    const obj = this.toObject();
    return {
      type: "symbol",
      printname: obj.printname,
      symvalue: obj.symvalue,
      internal: obj.internal
    };
  }
  toObject() {
    return {
      printname: this.printname().isUnbound() ? null : this.printname().toString(),
      symvalue: this.symvalue().isUnbound() ? null : this.symvalue().ptr,
      internal: this.internal().isNull() ? null : this.internal().ptr
    };
  }
  toString() {
    return this.printname().toString();
  }
  printname() {
    return RString.wrap(Module._PRINTNAME(this.ptr));
  }
  symvalue() {
    return RObject.wrap(Module._SYMVALUE(this.ptr));
  }
  internal() {
    return RObject.wrap(Module._INTERNAL(this.ptr));
  }
};
var RPairlist = class extends RObject {
  constructor(val) {
    if (val instanceof RObjectBase) {
      assertRType(val, "pairlist");
      super(val);
      return this;
    }
    const prot = { n: 0 };
    try {
      const { names, values } = toWebRData(val);
      const list = RPairlist.wrap(Module._Rf_allocList(values.length));
      protectInc(list, prot);
      for (let [i, next] = [0, list]; !next.isNull(); [i, next] = [i + 1, next.cdr()]) {
        next.setcar(new RObject(values[i]));
      }
      list.setNames(names);
      super(list);
    } finally {
      unprotect(prot.n);
    }
  }
  get length() {
    return this.toArray().length;
  }
  toArray(options = { depth: 1 }) {
    return this.toJs(options).values;
  }
  toObject({
    allowDuplicateKey = true,
    allowEmptyKey = false,
    depth = -1
  } = {}) {
    const entries = this.entries({ depth });
    const keys = entries.map(([k]) => k);
    if (!allowDuplicateKey && new Set(keys).size !== keys.length) {
      throw new Error("Duplicate key when converting pairlist without allowDuplicateKey enabled");
    }
    if (!allowEmptyKey && keys.some((k) => !k)) {
      throw new Error("Empty or null key when converting pairlist without allowEmptyKey enabled");
    }
    return Object.fromEntries(
      entries.filter((u, idx) => entries.findIndex((v) => v[0] === u[0]) === idx)
    );
  }
  entries(options = { depth: 1 }) {
    const obj = this.toJs(options);
    return obj.values.map((v, i) => [obj.names ? obj.names[i] : null, v]);
  }
  toJs(options = { depth: 0 }, depth = 1) {
    const namesArray = [];
    let hasNames = false;
    const values = [];
    for (let next = this; !next.isNull(); next = next.cdr()) {
      const symbol = next.tag();
      if (symbol.isNull()) {
        namesArray.push("");
      } else {
        hasNames = true;
        namesArray.push(symbol.toString());
      }
      if (options.depth && depth >= options.depth) {
        values.push(next.car());
      } else {
        values.push(next.car().toJs(options, depth + 1));
      }
    }
    const names = hasNames ? namesArray : null;
    return { type: "pairlist", names, values };
  }
  includes(name) {
    return name in this.toObject();
  }
  setcar(obj) {
    Module._SETCAR(this.ptr, obj.ptr);
  }
  car() {
    return RObject.wrap(Module._CAR(this.ptr));
  }
  cdr() {
    return RObject.wrap(Module._CDR(this.ptr));
  }
  tag() {
    return RObject.wrap(Module._TAG(this.ptr));
  }
};
var RCall = class extends RObject {
  constructor(val) {
    if (val instanceof RObjectBase) {
      assertRType(val, "call");
      super(val);
      return this;
    }
    const prot = { n: 0 };
    try {
      const { values } = toWebRData(val);
      const objs2 = values.map((value) => protectInc(new RObject(value), prot));
      const call = RCall.wrap(Module._Rf_allocVector(RTypeMap.call, values.length));
      protectInc(call, prot);
      for (let [i, next] = [0, call]; !next.isNull(); [i, next] = [i + 1, next.cdr()]) {
        next.setcar(objs2[i]);
      }
      super(call);
    } finally {
      unprotect(prot.n);
    }
  }
  setcar(obj) {
    Module._SETCAR(this.ptr, obj.ptr);
  }
  car() {
    return RObject.wrap(Module._CAR(this.ptr));
  }
  cdr() {
    return RObject.wrap(Module._CDR(this.ptr));
  }
  eval() {
    return Module.webr.evalR(this, { env: objs.baseEnv });
  }
  capture(options = {}) {
    return Module.webr.captureR(this, options);
  }
  deparse() {
    const prot = { n: 0 };
    try {
      const call = Module._Rf_lang2(
        new RSymbol("deparse1").ptr,
        Module._Rf_lang2(new RSymbol("quote").ptr, this.ptr)
      );
      protectInc(call, prot);
      const val = RCharacter.wrap(safeEval(call, objs.baseEnv));
      protectInc(val, prot);
      return val.toString();
    } finally {
      unprotect(prot.n);
    }
  }
};
var RList = class extends RObject {
  constructor(val, names = null) {
    if (val instanceof RObjectBase) {
      assertRType(val, "list");
      super(val);
      if (names) {
        if (names.length !== this.length) {
          throw new Error(
            "Can't construct named `RList`. Supplied `names` must be the same length as the list."
          );
        }
        this.setNames(names);
      }
      return this;
    }
    const prot = { n: 0 };
    try {
      const data = toWebRData(val);
      const ptr = Module._Rf_allocVector(RTypeMap.list, data.values.length);
      protectInc(ptr, prot);
      data.values.forEach((v, i) => {
        Module._SET_VECTOR_ELT(ptr, i, new RObject(v).ptr);
      });
      const _names = names ? names : data.names;
      if (_names && _names.length !== data.values.length) {
        throw new Error(
          "Can't construct named `RList`. Supplied `names` must be the same length as the list."
        );
      }
      RObject.wrap(ptr).setNames(_names);
      super(new RObjectBase(ptr));
    } finally {
      unprotect(prot.n);
    }
  }
  get length() {
    return Module._LENGTH(this.ptr);
  }
  isDataFrame() {
    const classes = RPairlist.wrap(Module._ATTRIB(this.ptr)).get("class");
    return !classes.isNull() && classes.toArray().includes("data.frame");
  }
  toArray(options = { depth: 1 }) {
    return this.toJs(options).values;
  }
  toObject({
    allowDuplicateKey = true,
    allowEmptyKey = false,
    depth = -1
  } = {}) {
    const entries = this.entries({ depth });
    const keys = entries.map(([k]) => k);
    if (!allowDuplicateKey && new Set(keys).size !== keys.length) {
      throw new Error("Duplicate key when converting list without allowDuplicateKey enabled");
    }
    if (!allowEmptyKey && keys.some((k) => !k)) {
      throw new Error("Empty or null key when converting list without allowEmptyKey enabled");
    }
    return Object.fromEntries(
      entries.filter((u, idx) => entries.findIndex((v) => v[0] === u[0]) === idx)
    );
  }
  toD3() {
    if (!this.isDataFrame()) {
      throw new Error(
        "Can't convert R list object to D3 format. Object must be of class 'data.frame'."
      );
    }
    const entries = this.entries();
    return entries.reduce((a, entry) => {
      entry[1].forEach((v, j) => a[j] = Object.assign(a[j] || {}, { [entry[0]]: v }));
      return a;
    }, []);
  }
  entries(options = { depth: -1 }) {
    const obj = this.toJs(options);
    if (this.isDataFrame() && options.depth < 0) {
      obj.values = obj.values.map((v) => v.toArray());
    }
    return obj.values.map((v, i) => [obj.names ? obj.names[i] : null, v]);
  }
  toJs(options = { depth: 0 }, depth = 1) {
    return {
      type: "list",
      names: this.names(),
      values: [...Array(this.length).keys()].map((i) => {
        if (options.depth && depth >= options.depth) {
          return this.get(i + 1);
        } else {
          return this.get(i + 1).toJs(options, depth + 1);
        }
      })
    };
  }
};
var RDataFrame = class extends RList {
  constructor(val) {
    if (val instanceof RObjectBase) {
      super(val);
      if (!this.isDataFrame()) {
        throw new Error("Can't construct `RDataFrame`. Supplied R object is not a `data.frame`.");
      }
      return this;
    }
    return RDataFrame.fromObject(val);
  }
  static fromObject(obj) {
    const { names, values } = toWebRData(obj);
    const prot = { n: 0 };
    try {
      const hasNames = !!names && names.length > 0 && names.every((v) => v);
      const hasArrays = values.length > 0 && values.every((v) => {
        return Array.isArray(v) || ArrayBuffer.isView(v) || v instanceof ArrayBuffer;
      });
      if (hasNames && hasArrays) {
        const _values = values;
        const isConsistentLength = _values.every((a) => a.length === _values[0].length);
        const isAtomic = _values.every((a) => {
          return isAtomicType(a[0]) || isRVectorAtomic(a[0]);
        });
        if (isConsistentLength && isAtomic) {
          const listObj = new RList({
            type: "list",
            names,
            values: _values.map((a) => newObjectFromData(a))
          });
          protectInc(listObj, prot);
          const asDataFrame = new RCall([new RSymbol("as.data.frame"), listObj]);
          protectInc(asDataFrame, prot);
          return new RDataFrame(asDataFrame.eval());
        }
      }
    } finally {
      unprotect(prot.n);
    }
    throw new Error("Can't construct `data.frame`. Source object is not eligible.");
  }
  static fromD3(arr) {
    return this.fromObject(
      Object.fromEntries(Object.keys(arr[0]).map((k) => [k, arr.map((v) => v[k])]))
    );
  }
};
var RFunction = class extends RObject {
  exec(...args) {
    const prot = { n: 0 };
    try {
      const call = new RCall([this, ...args]);
      protectInc(call, prot);
      return call.eval();
    } finally {
      unprotect(prot.n);
    }
  }
  capture(options = {}, ...args) {
    const prot = { n: 0 };
    try {
      const call = new RCall([this, ...args]);
      protectInc(call, prot);
      return call.capture(options);
    } finally {
      unprotect(prot.n);
    }
  }
};
var RString = class extends RObject {
  // Unlike symbols, strings are not cached and must thus be protected
  constructor(x) {
    if (x instanceof RObjectBase) {
      assertRType(x, "string");
      super(x);
      return;
    }
    const name = Module.allocateUTF8(x);
    try {
      super(new RObjectBase(Module._Rf_mkChar(name)));
    } finally {
      Module._free(name);
    }
  }
  toString() {
    return Module.UTF8ToString(Module._R_CHAR(this.ptr));
  }
  toJs() {
    return {
      type: "string",
      value: this.toString()
    };
  }
};
var REnvironment = class extends RObject {
  constructor(val = {}) {
    if (val instanceof RObjectBase) {
      assertRType(val, "environment");
      super(val);
      return this;
    }
    let nProt = 0;
    try {
      const { names, values } = toWebRData(val);
      const ptr = protect(Module._R_NewEnv(objs.globalEnv.ptr, 0, 0));
      ++nProt;
      values.forEach((v, i) => {
        const name = names ? names[i] : null;
        if (!name) {
          throw new Error("Can't create object in new environment with empty symbol name");
        }
        const sym = new RSymbol(name);
        const vObj = protect(new RObject(v));
        try {
          envPoke(ptr, sym, vObj);
        } finally {
          unprotect(1);
        }
      });
      super(new RObjectBase(ptr));
    } finally {
      unprotect(nProt);
    }
  }
  ls(all = false, sorted = true) {
    const ls = RCharacter.wrap(Module._R_lsInternal3(this.ptr, Number(all), Number(sorted)));
    return ls.toArray();
  }
  bind(name, value) {
    const sym = new RSymbol(name);
    const valueObj = protect(new RObject(value));
    try {
      envPoke(this, sym, valueObj);
    } finally {
      unprotect(1);
    }
  }
  names() {
    return this.ls(true, true);
  }
  frame() {
    return RObject.wrap(Module._FRAME(this.ptr));
  }
  subset(prop) {
    if (typeof prop === "number") {
      throw new Error("Object of type environment is not subsettable");
    }
    return this.getDollar(prop);
  }
  toObject({ depth = -1 } = {}) {
    const symbols = this.names();
    return Object.fromEntries(
      [...Array(symbols.length).keys()].map((i) => {
        const value = this.getDollar(symbols[i]);
        return [symbols[i], depth < 0 ? value : value.toJs({ depth })];
      })
    );
  }
  toJs(options = { depth: 0 }, depth = 1) {
    const names = this.names();
    const values = [...Array(names.length).keys()].map((i) => {
      if (options.depth && depth >= options.depth) {
        return this.getDollar(names[i]);
      } else {
        return this.getDollar(names[i]).toJs(options, depth + 1);
      }
    });
    return {
      type: "environment",
      names,
      values
    };
  }
};
var RVectorAtomic = class extends RObject {
  constructor(val, kind, newSetter) {
    if (val instanceof RObjectBase) {
      assertRType(val, kind);
      super(val);
      return this;
    }
    const prot = { n: 0 };
    try {
      const { names, values } = toWebRData(val);
      const ptr = Module._Rf_allocVector(RTypeMap[kind], values.length);
      protectInc(ptr, prot);
      values.forEach(newSetter(ptr));
      RObject.wrap(ptr).setNames(names);
      super(new RObjectBase(ptr));
    } finally {
      unprotect(prot.n);
    }
  }
  get length() {
    return Module._LENGTH(this.ptr);
  }
  get(prop) {
    return super.get(prop);
  }
  subset(prop) {
    return super.subset(prop);
  }
  getDollar() {
    throw new Error("$ operator is invalid for atomic vectors");
  }
  detectMissing() {
    const prot = { n: 0 };
    try {
      const call = Module._Rf_lang2(new RSymbol("is.na").ptr, this.ptr);
      protectInc(call, prot);
      const val = RLogical.wrap(safeEval(call, objs.baseEnv));
      protectInc(val, prot);
      const ret = val.toTypedArray();
      return Array.from(ret).map((elt) => Boolean(elt));
    } finally {
      unprotect(prot.n);
    }
  }
  toArray() {
    const arr = this.toTypedArray();
    return this.detectMissing().map((m, idx) => m ? null : arr[idx]);
  }
  toObject({ allowDuplicateKey = true, allowEmptyKey = false } = {}) {
    const entries = this.entries();
    const keys = entries.map(([k]) => k);
    if (!allowDuplicateKey && new Set(keys).size !== keys.length) {
      throw new Error(
        "Duplicate key when converting atomic vector without allowDuplicateKey enabled"
      );
    }
    if (!allowEmptyKey && keys.some((k) => !k)) {
      throw new Error(
        "Empty or null key when converting atomic vector without allowEmptyKey enabled"
      );
    }
    return Object.fromEntries(
      entries.filter((u, idx) => entries.findIndex((v) => v[0] === u[0]) === idx)
    );
  }
  entries() {
    const values = this.toArray();
    const names = this.names();
    return values.map((v, i) => [names ? names[i] : null, v]);
  }
  toJs() {
    return {
      type: this.type(),
      names: this.names(),
      values: this.toArray()
    };
  }
};
var _newSetter;
var _RLogical = class extends RVectorAtomic {
  constructor(val) {
    super(val, "logical", __privateGet(_RLogical, _newSetter));
  }
  getBoolean(idx) {
    return this.get(idx).toArray()[0];
  }
  toBoolean() {
    if (this.length !== 1) {
      throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");
    }
    const val = this.getBoolean(1);
    if (val === null) {
      throw new Error("Can't convert missing value `NA` to a JS boolean");
    }
    return val;
  }
  toTypedArray() {
    return new Int32Array(
      Module.HEAP32.subarray(
        Module._LOGICAL(this.ptr) / 4,
        Module._LOGICAL(this.ptr) / 4 + this.length
      )
    );
  }
  toArray() {
    const arr = this.toTypedArray();
    return this.detectMissing().map((m, idx) => m ? null : Boolean(arr[idx]));
  }
};
var RLogical = _RLogical;
_newSetter = new WeakMap();
__privateAdd(RLogical, _newSetter, (ptr) => {
  const data = Module._LOGICAL(ptr);
  const naLogical = Module.getValue(Module._R_NaInt, "i32");
  return (v, i) => {
    Module.setValue(data + 4 * i, v === null ? naLogical : Boolean(v), "i32");
  };
});
var _newSetter2;
var _RInteger = class extends RVectorAtomic {
  constructor(val) {
    super(val, "integer", __privateGet(_RInteger, _newSetter2));
  }
  getNumber(idx) {
    return this.get(idx).toArray()[0];
  }
  toNumber() {
    if (this.length !== 1) {
      throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");
    }
    const val = this.getNumber(1);
    if (val === null) {
      throw new Error("Can't convert missing value `NA` to a JS number");
    }
    return val;
  }
  toTypedArray() {
    return new Int32Array(
      Module.HEAP32.subarray(
        Module._INTEGER(this.ptr) / 4,
        Module._INTEGER(this.ptr) / 4 + this.length
      )
    );
  }
};
var RInteger = _RInteger;
_newSetter2 = new WeakMap();
__privateAdd(RInteger, _newSetter2, (ptr) => {
  const data = Module._INTEGER(ptr);
  const naInteger = Module.getValue(Module._R_NaInt, "i32");
  return (v, i) => {
    Module.setValue(data + 4 * i, v === null ? naInteger : Math.round(Number(v)), "i32");
  };
});
var _newSetter3;
var _RDouble = class extends RVectorAtomic {
  constructor(val) {
    super(val, "double", __privateGet(_RDouble, _newSetter3));
  }
  getNumber(idx) {
    return this.get(idx).toArray()[0];
  }
  toNumber() {
    if (this.length !== 1) {
      throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");
    }
    const val = this.getNumber(1);
    if (val === null) {
      throw new Error("Can't convert missing value `NA` to a JS number");
    }
    return val;
  }
  toTypedArray() {
    return new Float64Array(
      Module.HEAPF64.subarray(Module._REAL(this.ptr) / 8, Module._REAL(this.ptr) / 8 + this.length)
    );
  }
};
var RDouble = _RDouble;
_newSetter3 = new WeakMap();
__privateAdd(RDouble, _newSetter3, (ptr) => {
  const data = Module._REAL(ptr);
  const naDouble = Module.getValue(Module._R_NaReal, "double");
  return (v, i) => {
    Module.setValue(data + 8 * i, v === null ? naDouble : v, "double");
  };
});
var _newSetter4;
var _RComplex = class extends RVectorAtomic {
  constructor(val) {
    super(val, "complex", __privateGet(_RComplex, _newSetter4));
  }
  getComplex(idx) {
    return this.get(idx).toArray()[0];
  }
  toComplex() {
    if (this.length !== 1) {
      throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");
    }
    const val = this.getComplex(1);
    if (val === null) {
      throw new Error("Can't convert missing value `NA` to a JS object");
    }
    return val;
  }
  toTypedArray() {
    return new Float64Array(
      Module.HEAPF64.subarray(
        Module._COMPLEX(this.ptr) / 8,
        Module._COMPLEX(this.ptr) / 8 + 2 * this.length
      )
    );
  }
  toArray() {
    const arr = this.toTypedArray();
    return this.detectMissing().map(
      (m, idx) => m ? null : { re: arr[2 * idx], im: arr[2 * idx + 1] }
    );
  }
};
var RComplex = _RComplex;
_newSetter4 = new WeakMap();
__privateAdd(RComplex, _newSetter4, (ptr) => {
  const data = Module._COMPLEX(ptr);
  const naDouble = Module.getValue(Module._R_NaReal, "double");
  return (v, i) => {
    Module.setValue(data + 8 * (2 * i), v === null ? naDouble : v.re, "double");
    Module.setValue(data + 8 * (2 * i + 1), v === null ? naDouble : v.im, "double");
  };
});
var _newSetter5;
var _RCharacter = class extends RVectorAtomic {
  constructor(val) {
    super(val, "character", __privateGet(_RCharacter, _newSetter5));
  }
  getString(idx) {
    return this.get(idx).toArray()[0];
  }
  toString() {
    if (this.length !== 1) {
      throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");
    }
    const val = this.getString(1);
    if (val === null) {
      throw new Error("Can't convert missing value `NA` to a JS string");
    }
    return val;
  }
  toTypedArray() {
    return new Uint32Array(
      Module.HEAPU32.subarray(
        Module._STRING_PTR(this.ptr) / 4,
        Module._STRING_PTR(this.ptr) / 4 + this.length
      )
    );
  }
  toArray() {
    return this.detectMissing().map(
      (m, idx) => m ? null : Module.UTF8ToString(Module._R_CHAR(Module._STRING_ELT(this.ptr, idx)))
    );
  }
};
var RCharacter = _RCharacter;
_newSetter5 = new WeakMap();
__privateAdd(RCharacter, _newSetter5, (ptr) => {
  return (v, i) => {
    if (v === null) {
      Module._SET_STRING_ELT(ptr, i, objs.naString.ptr);
    } else {
      Module._SET_STRING_ELT(ptr, i, new RString(v).ptr);
    }
  };
});
var _newSetter6;
var _RRaw = class extends RVectorAtomic {
  constructor(val) {
    if (val instanceof ArrayBuffer) {
      val = new Uint8Array(val);
    }
    super(val, "raw", __privateGet(_RRaw, _newSetter6));
  }
  getNumber(idx) {
    return this.get(idx).toArray()[0];
  }
  toNumber() {
    if (this.length !== 1) {
      throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");
    }
    const val = this.getNumber(1);
    if (val === null) {
      throw new Error("Can't convert missing value `NA` to a JS number");
    }
    return val;
  }
  toTypedArray() {
    return new Uint8Array(
      Module.HEAPU8.subarray(Module._RAW(this.ptr), Module._RAW(this.ptr) + this.length)
    );
  }
};
var RRaw = _RRaw;
_newSetter6 = new WeakMap();
__privateAdd(RRaw, _newSetter6, (ptr) => {
  const data = Module._RAW(ptr);
  return (v, i) => {
    Module.setValue(data + i, Number(v), "i8");
  };
});
function toWebRData(jsObj) {
  if (isWebRDataJs(jsObj)) {
    return jsObj;
  } else if (Array.isArray(jsObj) || ArrayBuffer.isView(jsObj)) {
    return { names: null, values: jsObj };
  } else if (jsObj && typeof jsObj === "object" && !isComplex(jsObj)) {
    return {
      names: Object.keys(jsObj),
      values: Object.values(jsObj)
    };
  }
  return { names: null, values: [jsObj] };
}
function getRWorkerClass(type) {
  const typeClasses = {
    object: RObject,
    null: RNull,
    symbol: RSymbol,
    pairlist: RPairlist,
    closure: RFunction,
    environment: REnvironment,
    call: RCall,
    special: RFunction,
    builtin: RFunction,
    string: RString,
    logical: RLogical,
    integer: RInteger,
    double: RDouble,
    complex: RComplex,
    character: RCharacter,
    list: RList,
    raw: RRaw,
    function: RFunction,
    dataframe: RDataFrame
  };
  if (type in typeClasses) {
    return typeClasses[type];
  }
  return RObject;
}
function isRObject(value) {
  return value instanceof RObject;
}
function isRVectorAtomic(value) {
  const atomicRTypes = ["logical", "integer", "double", "complex", "character"];
  return isRObject(value) && atomicRTypes.includes(value.type()) || isRObject(value) && value.isNa();
}
function isAtomicType(value) {
  return value === null || typeof value === "number" || typeof value === "boolean" || typeof value === "string" || isComplex(value);
}
var objs;

// webR/utils.ts
function promiseHandles() {
  const out = {
    resolve: () => {
      return;
    },
    reject: () => {
      return;
    },
    promise: Promise.resolve()
  };
  const promise = new Promise((resolve, reject) => {
    out.resolve = resolve;
    out.reject = reject;
  });
  out.promise = promise;
  return out;
}

// webR/chan/serviceworker.ts
var import_msgpack = __toESM(require_dist());
var requests = {};
function handleInstall() {
  console.log("webR service worker installed");
  void self.skipWaiting();
}
function handleActivate(event) {
  console.log("webR service worker activating");
  event.waitUntil(self.clients.claim());
}
async function sendRequest(clientId, uuid) {
  const client = await self.clients.get(clientId);
  if (!client) {
    throw new WebRChannelError("Service worker client not found");
  }
  if (!(uuid in requests)) {
    requests[uuid] = promiseHandles();
    client.postMessage({ type: "request", data: uuid });
  }
  const response = await requests[uuid].promise;
  const headers = { "Cross-Origin-Embedder-Policy": "require-corp" };
  return new Response((0, import_msgpack.encode)(response), { headers });
}
function handleFetch(event) {
  const wasmMatch = /__wasm__\/webr-fetch-request\//.exec(event.request.url);
  if (!wasmMatch) {
    return false;
  }
  const requestBody = event.request.arrayBuffer();
  const requestResponse = requestBody.then(async (body) => {
    const data = (0, import_msgpack.decode)(body);
    return await sendRequest(data.clientId, data.uuid);
  });
  event.waitUntil(requestResponse);
  event.respondWith(requestResponse);
  return true;
}
function handleMessage(event) {
  switch (event.data.type) {
    case "register-client-main": {
      void self.clients.claim();
      const source = event.source;
      self.clients.get(source.id).then((client) => {
        if (!client) {
          throw new WebRChannelError("Can't respond to client in service worker message handler");
        }
        client.postMessage({
          type: "registration-successful",
          clientId: source.id
        });
      }, (reason) => {
        console.log(reason);
        throw new WebRChannelError("Can't respond to client in service worker message handler");
      });
      break;
    }
    case "wasm-webr-fetch-response": {
      if (event.data.uuid in requests) {
        requests[event.data.uuid].resolve(event.data.response);
        delete requests[event.data.uuid];
      }
      break;
    }
    default:
      return false;
  }
  return true;
}
var webRHandlers = {
  handleInstall,
  handleActivate,
  handleFetch,
  handleMessage
};
self.addEventListener("install", webRHandlers.handleInstall);
self.addEventListener("activate", webRHandlers.handleActivate);
self.addEventListener("fetch", webRHandlers.handleFetch);
self.addEventListener("message", webRHandlers.handleMessage);
export {
  handleActivate,
  handleFetch,
  handleInstall,
  handleMessage,
  webRHandlers
};
//# sourceMappingURL=webr-serviceworker.mjs.map
