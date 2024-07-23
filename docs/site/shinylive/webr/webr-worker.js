"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
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
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});
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
      register({ type, encode: encode3, decode: decode3 }) {
        if (type >= 0) {
          this.encoders[type] = encode3;
          this.decoders[type] = decode3;
        } else {
          const index = 1 + type;
          this.builtInEncoders[index] = encode3;
          this.builtInDecoders[index] = decode3;
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
    function encode3(value, options = defaultEncodeOptions) {
      const encoder2 = new Encoder_1.Encoder(options.extensionCodec, options.context, options.maxDepth, options.initialBufferSize, options.sortKeys, options.forceFloat32, options.ignoreUndefined, options.forceIntegerToFloat);
      return encoder2.encodeSharedRef(value);
    }
    exports.encode = encode3;
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
    function decode3(buffer, options = exports.defaultDecodeOptions) {
      const decoder2 = new Decoder_1.Decoder(options.extensionCodec, options.context, options.maxStrLength, options.maxBinLength, options.maxArrayLength, options.maxMapLength, options.maxExtLength);
      return decoder2.decode(buffer);
    }
    exports.decode = decode3;
    function decodeMulti(buffer, options = exports.defaultDecodeOptions) {
      const decoder2 = new Decoder_1.Decoder(options.extensionCodec, options.context, options.maxStrLength, options.maxBinLength, options.maxArrayLength, options.maxMapLength, options.maxExtLength);
      return decoder2.decodeMulti(buffer);
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
      const decoder2 = new Decoder_1.Decoder(options.extensionCodec, options.context, options.maxStrLength, options.maxBinLength, options.maxArrayLength, options.maxMapLength, options.maxExtLength);
      return decoder2.decodeAsync(stream);
    }
    exports.decodeAsync = decodeAsync;
    function decodeArrayStream(streamLike, options = decode_1.defaultDecodeOptions) {
      const stream = (0, stream_1.ensureAsyncIterable)(streamLike);
      const decoder2 = new Decoder_1.Decoder(options.extensionCodec, options.context, options.maxStrLength, options.maxBinLength, options.maxArrayLength, options.maxMapLength, options.maxExtLength);
      return decoder2.decodeArrayStream(stream);
    }
    exports.decodeArrayStream = decodeArrayStream;
    function decodeMultiStream(streamLike, options = decode_1.defaultDecodeOptions) {
      const stream = (0, stream_1.ensureAsyncIterable)(streamLike);
      const decoder2 = new Decoder_1.Decoder(options.extensionCodec, options.context, options.maxStrLength, options.maxBinLength, options.maxArrayLength, options.maxMapLength, options.maxExtLength);
      return decoder2.decodeStream(stream);
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

// node_modules/xmlhttprequest-ssl/lib/XMLHttpRequest.js
var require_XMLHttpRequest = __commonJS({
  "node_modules/xmlhttprequest-ssl/lib/XMLHttpRequest.js"(exports, module2) {
    var fs = require("fs");
    var Url = require("url");
    var spawn = require("child_process").spawn;
    module2.exports = XMLHttpRequest2;
    XMLHttpRequest2.XMLHttpRequest = XMLHttpRequest2;
    function XMLHttpRequest2(opts) {
      "use strict";
      opts = opts || {};
      var self = this;
      var http = require("http");
      var https = require("https");
      var request;
      var response;
      var settings = {};
      var disableHeaderCheck = false;
      var defaultHeaders = {
        "User-Agent": "node-XMLHttpRequest",
        "Accept": "*/*"
      };
      var headers = Object.assign({}, defaultHeaders);
      var forbiddenRequestHeaders = [
        "accept-charset",
        "accept-encoding",
        "access-control-request-headers",
        "access-control-request-method",
        "connection",
        "content-length",
        "content-transfer-encoding",
        "cookie",
        "cookie2",
        "date",
        "expect",
        "host",
        "keep-alive",
        "origin",
        "referer",
        "te",
        "trailer",
        "transfer-encoding",
        "upgrade",
        "via"
      ];
      var forbiddenRequestMethods = [
        "TRACE",
        "TRACK",
        "CONNECT"
      ];
      var sendFlag = false;
      var errorFlag = false;
      var abortedFlag = false;
      var listeners = {};
      this.UNSENT = 0;
      this.OPENED = 1;
      this.HEADERS_RECEIVED = 2;
      this.LOADING = 3;
      this.DONE = 4;
      this.readyState = this.UNSENT;
      this.onreadystatechange = null;
      this.responseText = "";
      this.responseXML = "";
      this.response = Buffer.alloc(0);
      this.status = null;
      this.statusText = null;
      var isAllowedHttpHeader = function(header) {
        return disableHeaderCheck || header && forbiddenRequestHeaders.indexOf(header.toLowerCase()) === -1;
      };
      var isAllowedHttpMethod = function(method) {
        return method && forbiddenRequestMethods.indexOf(method) === -1;
      };
      this.open = function(method, url, async, user, password) {
        this.abort();
        errorFlag = false;
        abortedFlag = false;
        if (!isAllowedHttpMethod(method)) {
          throw new Error("SecurityError: Request method not allowed");
        }
        settings = {
          "method": method,
          "url": url.toString(),
          "async": typeof async !== "boolean" ? true : async,
          "user": user || null,
          "password": password || null
        };
        setState(this.OPENED);
      };
      this.setDisableHeaderCheck = function(state) {
        disableHeaderCheck = state;
      };
      this.setRequestHeader = function(header, value) {
        if (this.readyState != this.OPENED) {
          throw new Error("INVALID_STATE_ERR: setRequestHeader can only be called when state is OPEN");
        }
        if (!isAllowedHttpHeader(header)) {
          console.warn('Refused to set unsafe header "' + header + '"');
          return false;
        }
        if (sendFlag) {
          throw new Error("INVALID_STATE_ERR: send flag is true");
        }
        headers[header] = value;
        return true;
      };
      this.getResponseHeader = function(header) {
        if (typeof header === "string" && this.readyState > this.OPENED && response.headers[header.toLowerCase()] && !errorFlag) {
          return response.headers[header.toLowerCase()];
        }
        return null;
      };
      this.getAllResponseHeaders = function() {
        if (this.readyState < this.HEADERS_RECEIVED || errorFlag) {
          return "";
        }
        var result = "";
        for (var i in response.headers) {
          if (i !== "set-cookie" && i !== "set-cookie2") {
            result += i + ": " + response.headers[i] + "\r\n";
          }
        }
        return result.substr(0, result.length - 2);
      };
      this.getRequestHeader = function(name) {
        if (typeof name === "string" && headers[name]) {
          return headers[name];
        }
        return "";
      };
      this.send = function(data) {
        if (this.readyState != this.OPENED) {
          throw new Error("INVALID_STATE_ERR: connection must be opened before send() is called");
        }
        if (sendFlag) {
          throw new Error("INVALID_STATE_ERR: send has already been called");
        }
        var ssl = false, local = false;
        var url = Url.parse(settings.url);
        var host;
        switch (url.protocol) {
          case "https:":
            ssl = true;
          case "http:":
            host = url.hostname;
            break;
          case "file:":
            local = true;
            break;
          case void 0:
          case "":
            host = "localhost";
            break;
          default:
            throw new Error("Protocol not supported.");
        }
        if (local) {
          if (settings.method !== "GET") {
            throw new Error("XMLHttpRequest: Only GET method is supported");
          }
          if (settings.async) {
            fs.readFile(unescape(url.pathname), function(error, data2) {
              if (error) {
                self.handleError(error, error.errno || -1);
              } else {
                self.status = 200;
                self.responseText = data2.toString("utf8");
                self.response = data2;
                setState(self.DONE);
              }
            });
          } else {
            try {
              this.response = fs.readFileSync(unescape(url.pathname));
              this.responseText = this.response.toString("utf8");
              this.status = 200;
              setState(self.DONE);
            } catch (e) {
              this.handleError(e, e.errno || -1);
            }
          }
          return;
        }
        var port = url.port || (ssl ? 443 : 80);
        var uri = url.pathname + (url.search ? url.search : "");
        headers["Host"] = host;
        if (!(ssl && port === 443 || port === 80)) {
          headers["Host"] += ":" + url.port;
        }
        if (settings.user) {
          if (typeof settings.password == "undefined") {
            settings.password = "";
          }
          var authBuf = new Buffer(settings.user + ":" + settings.password);
          headers["Authorization"] = "Basic " + authBuf.toString("base64");
        }
        if (settings.method === "GET" || settings.method === "HEAD") {
          data = null;
        } else if (data) {
          headers["Content-Length"] = Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data);
          if (!headers["Content-Type"]) {
            headers["Content-Type"] = "text/plain;charset=UTF-8";
          }
        } else if (settings.method === "POST") {
          headers["Content-Length"] = 0;
        }
        var agent = opts.agent || false;
        var options = {
          host,
          port,
          path: uri,
          method: settings.method,
          headers,
          agent
        };
        if (ssl) {
          options.pfx = opts.pfx;
          options.key = opts.key;
          options.passphrase = opts.passphrase;
          options.cert = opts.cert;
          options.ca = opts.ca;
          options.ciphers = opts.ciphers;
          options.rejectUnauthorized = opts.rejectUnauthorized === false ? false : true;
        }
        errorFlag = false;
        if (settings.async) {
          var doRequest = ssl ? https.request : http.request;
          sendFlag = true;
          self.dispatchEvent("readystatechange");
          var responseHandler = function(resp2) {
            response = resp2;
            if (response.statusCode === 302 || response.statusCode === 303 || response.statusCode === 307) {
              settings.url = response.headers.location;
              var url2 = Url.parse(settings.url);
              host = url2.hostname;
              var newOptions = {
                hostname: url2.hostname,
                port: url2.port,
                path: url2.path,
                method: response.statusCode === 303 ? "GET" : settings.method,
                headers
              };
              if (ssl) {
                newOptions.pfx = opts.pfx;
                newOptions.key = opts.key;
                newOptions.passphrase = opts.passphrase;
                newOptions.cert = opts.cert;
                newOptions.ca = opts.ca;
                newOptions.ciphers = opts.ciphers;
                newOptions.rejectUnauthorized = opts.rejectUnauthorized === false ? false : true;
              }
              request = doRequest(newOptions, responseHandler).on("error", errorHandler);
              request.end();
              return;
            }
            setState(self.HEADERS_RECEIVED);
            self.status = response.statusCode;
            response.on("data", function(chunk) {
              if (chunk) {
                var data2 = Buffer.from(chunk);
                self.response = Buffer.concat([self.response, data2]);
              }
              if (sendFlag) {
                setState(self.LOADING);
              }
            });
            response.on("end", function() {
              if (sendFlag) {
                sendFlag = false;
                setState(self.DONE);
                self.responseText = self.response.toString("utf8");
              }
            });
            response.on("error", function(error) {
              self.handleError(error);
            });
          };
          var errorHandler = function(error) {
            self.handleError(error);
          };
          request = doRequest(options, responseHandler).on("error", errorHandler);
          if (opts.autoUnref) {
            request.on("socket", (socket) => {
              socket.unref();
            });
          }
          if (data) {
            request.write(data);
          }
          request.end();
          self.dispatchEvent("loadstart");
        } else {
          var contentFile = ".node-xmlhttprequest-content-" + process.pid;
          var syncFile = ".node-xmlhttprequest-sync-" + process.pid;
          fs.writeFileSync(syncFile, "", "utf8");
          var execString = "var http = require('http'), https = require('https'), fs = require('fs');var doRequest = http" + (ssl ? "s" : "") + ".request;var options = " + JSON.stringify(options) + ";var responseText = '';var responseData = Buffer.alloc(0);var req = doRequest(options, function(response) {response.on('data', function(chunk) {  var data = Buffer.from(chunk);  responseText += data.toString('utf8');  responseData = Buffer.concat([responseData, data]);});response.on('end', function() {fs.writeFileSync('" + contentFile + "', JSON.stringify({err: null, data: {statusCode: response.statusCode, headers: response.headers, text: responseText, data: responseData.toString('base64')}}), 'utf8');fs.unlinkSync('" + syncFile + "');});response.on('error', function(error) {fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');fs.unlinkSync('" + syncFile + "');});}).on('error', function(error) {fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');fs.unlinkSync('" + syncFile + "');});" + (data ? "req.write('" + JSON.stringify(data).slice(1, -1).replace(/'/g, "\\'") + "');" : "") + "req.end();";
          var syncProc = spawn(process.argv[0], ["-e", execString]);
          var statusText;
          while (fs.existsSync(syncFile)) {
          }
          self.responseText = fs.readFileSync(contentFile, "utf8");
          syncProc.stdin.end();
          fs.unlinkSync(contentFile);
          if (self.responseText.match(/^NODE-XMLHTTPREQUEST-ERROR:/)) {
            var errorObj = JSON.parse(self.responseText.replace(/^NODE-XMLHTTPREQUEST-ERROR:/, ""));
            self.handleError(errorObj, 503);
          } else {
            self.status = self.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:([0-9]*),.*/, "$1");
            var resp = JSON.parse(self.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:[0-9]*,(.*)/, "$1"));
            response = {
              statusCode: self.status,
              headers: resp.data.headers
            };
            self.responseText = resp.data.text;
            self.response = Buffer.from(resp.data.data, "base64");
            setState(self.DONE, true);
          }
        }
      };
      this.handleError = function(error, status) {
        this.status = status || 0;
        this.statusText = error;
        this.responseText = error.stack;
        errorFlag = true;
        setState(this.DONE);
      };
      this.abort = function() {
        if (request) {
          request.abort();
          request = null;
        }
        headers = Object.assign({}, defaultHeaders);
        this.responseText = "";
        this.responseXML = "";
        this.response = Buffer.alloc(0);
        errorFlag = abortedFlag = true;
        if (this.readyState !== this.UNSENT && (this.readyState !== this.OPENED || sendFlag) && this.readyState !== this.DONE) {
          sendFlag = false;
          setState(this.DONE);
        }
        this.readyState = this.UNSENT;
      };
      this.addEventListener = function(event, callback) {
        if (!(event in listeners)) {
          listeners[event] = [];
        }
        listeners[event].push(callback);
      };
      this.removeEventListener = function(event, callback) {
        if (event in listeners) {
          listeners[event] = listeners[event].filter(function(ev) {
            return ev !== callback;
          });
        }
      };
      this.dispatchEvent = function(event) {
        if (typeof self["on" + event] === "function") {
          if (this.readyState === this.DONE && settings.async)
            setTimeout(function() {
              self["on" + event]();
            }, 0);
          else
            self["on" + event]();
        }
        if (event in listeners) {
          for (let i = 0, len = listeners[event].length; i < len; i++) {
            if (this.readyState === this.DONE)
              setTimeout(function() {
                listeners[event][i].call(self);
              }, 0);
            else
              listeners[event][i].call(self);
          }
        }
      };
      var setState = function(state) {
        if (self.readyState === state || self.readyState === self.UNSENT && abortedFlag)
          return;
        self.readyState = state;
        if (settings.async || self.readyState < self.OPENED || self.readyState === self.DONE) {
          self.dispatchEvent("readystatechange");
        }
        if (self.readyState === self.DONE) {
          let fire;
          if (abortedFlag)
            fire = "abort";
          else if (errorFlag)
            fire = "error";
          else
            fire = "load";
          self.dispatchEvent(fire);
          self.dispatchEvent("loadend");
        }
      };
    }
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
var WebRWorkerError = class extends WebRError {
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
        await Promise.resolve().then(() => __toESM(require(url)));
      } else {
        throw e;
      }
    }
  };
} else if (IN_NODE) {
  loadScript = async (url) => {
    const nodePathMod = (await Promise.resolve().then(() => __toESM(require("path")))).default;
    await Promise.resolve().then(() => __toESM(require(nodePathMod.resolve(url))));
  };
} else {
  throw new WebRError("Cannot determine runtime environment");
}

// webR/emscripten.ts
var Module2 = {};
function dictEmFree(dict) {
  Object.keys(dict).forEach((key) => Module2._free(dict[key]));
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
  Module2._Rf_protect(handlePtr(x));
  return x;
}
function protectInc(x, prot) {
  Module2._Rf_protect(handlePtr(x));
  ++prot.n;
  return x;
}
function protectWithIndex(x) {
  const pLoc = Module2._malloc(4);
  Module2._R_ProtectWithIndex(handlePtr(x), pLoc);
  const loc = Module2.getValue(pLoc, "i32");
  return { loc, ptr: pLoc };
}
function unprotectIndex(index) {
  Module2._Rf_unprotect(1);
  Module2._free(index.ptr);
}
function reprotect(x, index) {
  Module2._R_Reprotect(handlePtr(x), index.loc);
  return x;
}
function unprotect(n) {
  Module2._Rf_unprotect(n);
}
function envPoke(env, sym, value) {
  Module2._Rf_defineVar(handlePtr(sym), handlePtr(value), handlePtr(env));
}
function parseEvalBare(code, env) {
  const strings = {};
  const prot = { n: 0 };
  try {
    const envObj = new REnvironment(env);
    protectInc(envObj, prot);
    strings.code = Module2.allocateUTF8(code);
    const out = Module2._R_ParseEvalString(strings.code, envObj.ptr);
    return RObject.wrap(out);
  } finally {
    dictEmFree(strings);
    unprotect(prot.n);
  }
}
var UnwindProtectException = class extends Error {
  constructor(message, cont) {
    super(message);
    this.name = "UnwindProtectException";
    this.cont = cont;
  }
};
function safeEval(call, env) {
  return Module2.getWasmTableEntry(Module2.GOT.ffi_safe_eval.value)(
    handlePtr(call),
    handlePtr(env)
  );
}

// webR/chan/task-common.ts
var SZ_BUF_DOESNT_FIT = 0;
var SZ_BUF_FITS_IDX = 1;
var SZ_BUF_SIZE_IDX = 0;
var transferCache = /* @__PURE__ */ new WeakMap();
function transfer(obj, transfers) {
  transferCache.set(obj, transfers);
  return obj;
}
function isUUID(x) {
  return typeof x === "string" && x.length === UUID_LENGTH;
}
var UUID_LENGTH = 63;
function generateUUID() {
  const result = Array.from({ length: 4 }, randomSegment).join("-");
  if (result.length !== UUID_LENGTH) {
    throw new Error("comlink internal error: UUID has the wrong length");
  }
  return result;
}
function randomSegment() {
  let result = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16);
  const pad = 15 - result.length;
  if (pad > 0) {
    result = Array.from({ length: pad }, () => 0).join("") + result;
  }
  return result;
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
  if (Module2._TYPEOF(obj.ptr) !== RTypeMap[type]) {
    throw new Error(`Unexpected object type "${obj.type()}" when expecting type "${type}"`);
  }
}
var shelters = /* @__PURE__ */ new Map();
function keep(shelter, x) {
  const ptr = handlePtr(x);
  Module2._R_PreserveObject(ptr);
  if (shelter === void 0) {
    return;
  }
  if (isUUID(shelter)) {
    shelters.get(shelter).push(ptr);
    return;
  }
  throw new Error("Unexpected shelter type " + typeof shelter);
}
function destroy(shelter, x) {
  const ptr = handlePtr(x);
  Module2._R_ReleaseObject(ptr);
  const objs2 = shelters.get(shelter);
  const loc = objs2.indexOf(ptr);
  if (loc < 0) {
    throw new Error("Can't find object in shelter.");
  }
  objs2.splice(loc, 1);
}
function purge(shelter) {
  const ptrs = shelters.get(shelter);
  for (const ptr of ptrs) {
    try {
      Module2._R_ReleaseObject(ptr);
    } catch (e) {
      console.error(e);
    }
  }
  shelters.set(shelter, []);
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
    const typeNumber = Module2._TYPEOF(this.ptr);
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
    const typeNumber = Module2._TYPEOF(ptr);
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
    return Module2._TYPEOF(this.ptr) === RTypeMap.null;
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
    return RPairlist.wrap(Module2._ATTRIB(this.ptr));
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
    Module2._Rf_setAttrib(this.ptr, objs.namesSymbol.ptr, namesObj.ptr);
    return this;
  }
  names() {
    const names = RCharacter.wrap(Module2._Rf_getAttrib(this.ptr, objs.namesSymbol.ptr));
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
      const call = Module2._Rf_lang4(assign.ptr, this.ptr, idx.ptr, valueObj.ptr);
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
    const call = Module2._Rf_lang3(op, this.ptr, idx.ptr);
    protectInc(call, prot);
    return _RObject.wrap(safeEval(call, objs.baseEnv));
  } finally {
    unprotect(prot.n);
  }
};
var RNull = class extends RObject {
  constructor() {
    super(new RObjectBase(Module2.getValue(Module2._R_NilValue, "*")));
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
    const name = Module2.allocateUTF8(x);
    try {
      super(new RObjectBase(Module2._Rf_install(name)));
    } finally {
      Module2._free(name);
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
    return RString.wrap(Module2._PRINTNAME(this.ptr));
  }
  symvalue() {
    return RObject.wrap(Module2._SYMVALUE(this.ptr));
  }
  internal() {
    return RObject.wrap(Module2._INTERNAL(this.ptr));
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
      const list = RPairlist.wrap(Module2._Rf_allocList(values.length));
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
    Module2._SETCAR(this.ptr, obj.ptr);
  }
  car() {
    return RObject.wrap(Module2._CAR(this.ptr));
  }
  cdr() {
    return RObject.wrap(Module2._CDR(this.ptr));
  }
  tag() {
    return RObject.wrap(Module2._TAG(this.ptr));
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
      const call = RCall.wrap(Module2._Rf_allocVector(RTypeMap.call, values.length));
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
    Module2._SETCAR(this.ptr, obj.ptr);
  }
  car() {
    return RObject.wrap(Module2._CAR(this.ptr));
  }
  cdr() {
    return RObject.wrap(Module2._CDR(this.ptr));
  }
  eval() {
    return Module2.webr.evalR(this, { env: objs.baseEnv });
  }
  capture(options = {}) {
    return Module2.webr.captureR(this, options);
  }
  deparse() {
    const prot = { n: 0 };
    try {
      const call = Module2._Rf_lang2(
        new RSymbol("deparse1").ptr,
        Module2._Rf_lang2(new RSymbol("quote").ptr, this.ptr)
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
      const ptr = Module2._Rf_allocVector(RTypeMap.list, data.values.length);
      protectInc(ptr, prot);
      data.values.forEach((v, i) => {
        Module2._SET_VECTOR_ELT(ptr, i, new RObject(v).ptr);
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
    return Module2._LENGTH(this.ptr);
  }
  isDataFrame() {
    const classes = RPairlist.wrap(Module2._ATTRIB(this.ptr)).get("class");
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
    const name = Module2.allocateUTF8(x);
    try {
      super(new RObjectBase(Module2._Rf_mkChar(name)));
    } finally {
      Module2._free(name);
    }
  }
  toString() {
    return Module2.UTF8ToString(Module2._R_CHAR(this.ptr));
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
      const ptr = protect(Module2._R_NewEnv(objs.globalEnv.ptr, 0, 0));
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
    const ls = RCharacter.wrap(Module2._R_lsInternal3(this.ptr, Number(all), Number(sorted)));
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
    return RObject.wrap(Module2._FRAME(this.ptr));
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
      const ptr = Module2._Rf_allocVector(RTypeMap[kind], values.length);
      protectInc(ptr, prot);
      values.forEach(newSetter(ptr));
      RObject.wrap(ptr).setNames(names);
      super(new RObjectBase(ptr));
    } finally {
      unprotect(prot.n);
    }
  }
  get length() {
    return Module2._LENGTH(this.ptr);
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
      const call = Module2._Rf_lang2(new RSymbol("is.na").ptr, this.ptr);
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
      Module2.HEAP32.subarray(
        Module2._LOGICAL(this.ptr) / 4,
        Module2._LOGICAL(this.ptr) / 4 + this.length
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
  const data = Module2._LOGICAL(ptr);
  const naLogical = Module2.getValue(Module2._R_NaInt, "i32");
  return (v, i) => {
    Module2.setValue(data + 4 * i, v === null ? naLogical : Boolean(v), "i32");
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
      Module2.HEAP32.subarray(
        Module2._INTEGER(this.ptr) / 4,
        Module2._INTEGER(this.ptr) / 4 + this.length
      )
    );
  }
};
var RInteger = _RInteger;
_newSetter2 = new WeakMap();
__privateAdd(RInteger, _newSetter2, (ptr) => {
  const data = Module2._INTEGER(ptr);
  const naInteger = Module2.getValue(Module2._R_NaInt, "i32");
  return (v, i) => {
    Module2.setValue(data + 4 * i, v === null ? naInteger : Math.round(Number(v)), "i32");
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
      Module2.HEAPF64.subarray(Module2._REAL(this.ptr) / 8, Module2._REAL(this.ptr) / 8 + this.length)
    );
  }
};
var RDouble = _RDouble;
_newSetter3 = new WeakMap();
__privateAdd(RDouble, _newSetter3, (ptr) => {
  const data = Module2._REAL(ptr);
  const naDouble = Module2.getValue(Module2._R_NaReal, "double");
  return (v, i) => {
    Module2.setValue(data + 8 * i, v === null ? naDouble : v, "double");
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
      Module2.HEAPF64.subarray(
        Module2._COMPLEX(this.ptr) / 8,
        Module2._COMPLEX(this.ptr) / 8 + 2 * this.length
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
  const data = Module2._COMPLEX(ptr);
  const naDouble = Module2.getValue(Module2._R_NaReal, "double");
  return (v, i) => {
    Module2.setValue(data + 8 * (2 * i), v === null ? naDouble : v.re, "double");
    Module2.setValue(data + 8 * (2 * i + 1), v === null ? naDouble : v.im, "double");
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
      Module2.HEAPU32.subarray(
        Module2._STRING_PTR(this.ptr) / 4,
        Module2._STRING_PTR(this.ptr) / 4 + this.length
      )
    );
  }
  toArray() {
    return this.detectMissing().map(
      (m, idx) => m ? null : Module2.UTF8ToString(Module2._R_CHAR(Module2._STRING_ELT(this.ptr, idx)))
    );
  }
};
var RCharacter = _RCharacter;
_newSetter5 = new WeakMap();
__privateAdd(RCharacter, _newSetter5, (ptr) => {
  return (v, i) => {
    if (v === null) {
      Module2._SET_STRING_ELT(ptr, i, objs.naString.ptr);
    } else {
      Module2._SET_STRING_ELT(ptr, i, new RString(v).ptr);
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
      Module2.HEAPU8.subarray(Module2._RAW(this.ptr), Module2._RAW(this.ptr) + this.length)
    );
  }
};
var RRaw = _RRaw;
_newSetter6 = new WeakMap();
__privateAdd(RRaw, _newSetter6, (ptr) => {
  const data = Module2._RAW(ptr);
  return (v, i) => {
    Module2.setValue(data + i, Number(v), "i8");
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
function initPersistentObjects() {
  objs = {
    baseEnv: REnvironment.wrap(Module2.getValue(Module2._R_BaseEnv, "*")),
    bracket2Symbol: RSymbol.wrap(Module2.getValue(Module2._R_Bracket2Symbol, "*")),
    bracketSymbol: RSymbol.wrap(Module2.getValue(Module2._R_BracketSymbol, "*")),
    dollarSymbol: RSymbol.wrap(Module2.getValue(Module2._R_DollarSymbol, "*")),
    emptyEnv: REnvironment.wrap(Module2.getValue(Module2._R_EmptyEnv, "*")),
    false: RLogical.wrap(Module2.getValue(Module2._R_FalseValue, "*")),
    globalEnv: REnvironment.wrap(Module2.getValue(Module2._R_GlobalEnv, "*")),
    na: RLogical.wrap(Module2.getValue(Module2._R_LogicalNAValue, "*")),
    namesSymbol: RSymbol.wrap(Module2.getValue(Module2._R_NamesSymbol, "*")),
    naString: RObject.wrap(Module2.getValue(Module2._R_NaString, "*")),
    null: RNull.wrap(Module2.getValue(Module2._R_NilValue, "*")),
    true: RLogical.wrap(Module2.getValue(Module2._R_TrueValue, "*")),
    unboundValue: RObject.wrap(Module2.getValue(Module2._R_UnboundValue, "*"))
  };
}

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
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function replaceInObject(obj, test, replacer, ...replacerArgs) {
  if (obj === null || obj === void 0 || isImageBitmap(obj)) {
    return obj;
  }
  if (obj instanceof ArrayBuffer) {
    return new Uint8Array(obj);
  }
  if (test(obj)) {
    return replacer(obj, ...replacerArgs);
  }
  if (Array.isArray(obj) || ArrayBuffer.isView(obj)) {
    return obj.map(
      (v) => replaceInObject(v, test, replacer, ...replacerArgs)
    );
  }
  if (obj instanceof RObjectBase) {
    return obj;
  }
  if (typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, replaceInObject(v, test, replacer, ...replacerArgs)])
    );
  }
  return obj;
}
function newCrossOriginWorker(url, cb) {
  const req = new XMLHttpRequest();
  req.open("get", url, true);
  req.onload = () => {
    const worker = new Worker(URL.createObjectURL(new Blob([req.responseText])));
    cb(worker);
  };
  req.send();
}
function isCrossOrigin(urlString) {
  if (IN_NODE)
    return false;
  const url1 = new URL(location.href);
  const url2 = new URL(urlString, location.origin);
  if (url1.host === url2.host && url1.port === url2.port && url1.protocol === url2.protocol) {
    return false;
  }
  return true;
}
function isImageBitmap(value) {
  return typeof ImageBitmap !== "undefined" && value instanceof ImageBitmap;
}
function throwUnreachable(context) {
  let msg = "Reached the unreachable";
  msg = msg + (context ? ": " + context : ".");
  throw new WebRError(msg);
}

// webR/chan/task-main.ts
var import_msgpack = __toESM(require_dist());
var encoder = new TextEncoder();
async function syncResponse(endpoint, data, response) {
  try {
    let { taskId, sizeBuffer, dataBuffer, signalBuffer } = data;
    const bytes = (0, import_msgpack.encode)(response);
    const fits = bytes.length <= dataBuffer.length;
    Atomics.store(sizeBuffer, SZ_BUF_SIZE_IDX, bytes.length);
    Atomics.store(sizeBuffer, SZ_BUF_FITS_IDX, +fits);
    if (!fits) {
      const [uuid, dataPromise] = requestResponseMessage(endpoint);
      dataBuffer.set(encoder.encode(uuid));
      await signalRequester(signalBuffer, taskId);
      dataBuffer = (await dataPromise).dataBuffer;
    }
    dataBuffer.set(bytes);
    Atomics.store(sizeBuffer, SZ_BUF_FITS_IDX, 1);
    await signalRequester(signalBuffer, taskId);
  } catch (e) {
    console.warn(e);
  }
}
function requestResponseMessage(ep) {
  const id = generateUUID();
  return [
    id,
    new Promise((resolve) => {
      if (IN_NODE) {
        ep.once("message", (message) => {
          if (!message.id || message.id !== id) {
            return;
          }
          resolve(message);
        });
      } else {
        ep.addEventListener("message", function l(ev) {
          if (!ev.data || !ev.data.id || ev.data.id !== id) {
            return;
          }
          ep.removeEventListener("message", l);
          resolve(ev.data);
        });
      }
      if (ep.start) {
        ep.start();
      }
    })
  ];
}
async function signalRequester(signalBuffer, taskId) {
  const index = (taskId >> 1) % 32;
  let sleepTime = 1;
  while (Atomics.compareExchange(signalBuffer, index + 1, 0, taskId) !== 0) {
    await sleep(sleepTime);
    if (sleepTime < 32) {
      sleepTime *= 2;
    }
  }
  Atomics.or(signalBuffer, 0, 1 << index);
  Atomics.notify(signalBuffer, 0);
}

// webR/chan/queue.ts
var _promises, _resolvers, _add, add_fn;
var AsyncQueue = class {
  constructor() {
    __privateAdd(this, _add);
    __privateAdd(this, _promises, void 0);
    __privateAdd(this, _resolvers, void 0);
    __privateSet(this, _resolvers, []);
    __privateSet(this, _promises, []);
  }
  reset() {
    __privateSet(this, _resolvers, []);
    __privateSet(this, _promises, []);
  }
  put(t) {
    if (!__privateGet(this, _resolvers).length) {
      __privateMethod(this, _add, add_fn).call(this);
    }
    const resolve = __privateGet(this, _resolvers).shift();
    resolve(t);
  }
  async get() {
    if (!__privateGet(this, _promises).length) {
      __privateMethod(this, _add, add_fn).call(this);
    }
    const promise = __privateGet(this, _promises).shift();
    return promise;
  }
  isEmpty() {
    return !__privateGet(this, _promises).length;
  }
  isBlocked() {
    return !!__privateGet(this, _resolvers).length;
  }
  get length() {
    return __privateGet(this, _promises).length - __privateGet(this, _resolvers).length;
  }
};
_promises = new WeakMap();
_resolvers = new WeakMap();
_add = new WeakSet();
add_fn = function() {
  __privateGet(this, _promises).push(
    new Promise((resolve) => {
      __privateGet(this, _resolvers).push(resolve);
    })
  );
};

// webR/chan/message.ts
function newRequest(msg, transferables) {
  return newRequestResponseMessage(
    {
      type: "request",
      data: {
        uuid: generateUUID(),
        msg
      }
    },
    transferables
  );
}
function newResponse(uuid, resp, transferables) {
  return newRequestResponseMessage(
    {
      type: "response",
      data: {
        uuid,
        resp
      }
    },
    transferables
  );
}
function newRequestResponseMessage(msg, transferables) {
  if (transferables) {
    transfer(msg, transferables);
  }
  return msg;
}
function newSyncRequest(msg, data) {
  return {
    type: "sync-request",
    data: { msg, reqData: data }
  };
}

// webR/payload.ts
function webRPayloadAsError(payload) {
  const e = new WebRWorkerError(payload.obj.message);
  if (payload.obj.name !== "Error") {
    e.name = payload.obj.name;
  }
  e.stack = payload.obj.stack;
  return e;
}
function isWebRPayload(value) {
  return !!value && typeof value === "object" && "payloadType" in value && "obj" in value;
}
function isWebRPayloadPtr(value) {
  return isWebRPayload(value) && value.payloadType === "ptr";
}

// webR/chan/channel.ts
var _parked;
var ChannelMain = class {
  constructor() {
    this.inputQueue = new AsyncQueue();
    this.outputQueue = new AsyncQueue();
    this.systemQueue = new AsyncQueue();
    __privateAdd(this, _parked, /* @__PURE__ */ new Map());
  }
  async read() {
    return await this.outputQueue.get();
  }
  async flush() {
    const msg = [];
    while (!this.outputQueue.isEmpty()) {
      msg.push(await this.read());
    }
    return msg;
  }
  async readSystem() {
    return await this.systemQueue.get();
  }
  write(msg) {
    this.inputQueue.put(msg);
  }
  async request(msg, transferables) {
    const req = newRequest(msg, transferables);
    const { resolve, reject, promise } = promiseHandles();
    __privateGet(this, _parked).set(req.data.uuid, { resolve, reject });
    this.write(req);
    return promise;
  }
  putClosedMessage() {
    this.outputQueue.put({ type: "closed" });
  }
  resolveResponse(msg) {
    const uuid = msg.data.uuid;
    const handles = __privateGet(this, _parked).get(uuid);
    if (handles) {
      const payload = msg.data.resp;
      __privateGet(this, _parked).delete(uuid);
      if (payload.payloadType === "err") {
        handles.reject(webRPayloadAsError(payload));
      } else {
        handles.resolve(payload);
      }
    } else {
      console.warn("Can't find request.");
    }
  }
};
_parked = new WeakMap();

// webR/chan/task-worker.ts
var import_msgpack2 = __toESM(require_dist());
var decoder = new TextDecoder("utf-8");
var _scheduled, _resolved, _result, _exception, _syncGen;
var SyncTask = class {
  constructor(endpoint, msg, transfers = []) {
    __privateAdd(this, _scheduled, false);
    __privateAdd(this, _resolved, void 0);
    __privateAdd(this, _result, void 0);
    __privateAdd(this, _exception, void 0);
    __privateAdd(this, _syncGen, void 0);
    this.syncifier = new _Syncifier();
    this.endpoint = endpoint;
    this.msg = msg;
    this.transfers = transfers;
    __privateSet(this, _resolved, false);
  }
  scheduleSync() {
    if (__privateGet(this, _scheduled)) {
      return;
    }
    __privateSet(this, _scheduled, true);
    this.syncifier.scheduleTask(this);
    __privateSet(this, _syncGen, this.doSync());
    __privateGet(this, _syncGen).next();
    return this;
  }
  poll() {
    if (!__privateGet(this, _scheduled)) {
      throw new Error("Task not synchronously scheduled");
    }
    const { done, value } = __privateGet(this, _syncGen).next();
    if (!done) {
      return false;
    }
    __privateSet(this, _resolved, true);
    __privateSet(this, _result, value);
    return true;
  }
  *doSync() {
    const { endpoint, msg, transfers } = this;
    const sizeBuffer = new Int32Array(new SharedArrayBuffer(8));
    const signalBuffer = this.signalBuffer;
    const taskId = this.taskId;
    let dataBuffer = acquireDataBuffer(UUID_LENGTH);
    const syncMsg = newSyncRequest(msg, {
      sizeBuffer,
      dataBuffer,
      signalBuffer,
      taskId
    });
    endpoint.postMessage(syncMsg, transfers);
    yield;
    if (Atomics.load(sizeBuffer, SZ_BUF_FITS_IDX) === SZ_BUF_DOESNT_FIT) {
      const id = decoder.decode(dataBuffer.slice(0, UUID_LENGTH));
      releaseDataBuffer(dataBuffer);
      const size2 = Atomics.load(sizeBuffer, SZ_BUF_SIZE_IDX);
      dataBuffer = acquireDataBuffer(size2);
      endpoint.postMessage({ id, dataBuffer });
      yield;
    }
    const size = Atomics.load(sizeBuffer, SZ_BUF_SIZE_IDX);
    return (0, import_msgpack2.decode)(dataBuffer.slice(0, size));
  }
  get result() {
    if (__privateGet(this, _exception)) {
      throw __privateGet(this, _exception);
    }
    if (__privateGet(this, _resolved)) {
      return __privateGet(this, _result);
    }
    throw new Error("Not ready.");
  }
  syncify() {
    this.scheduleSync();
    this.syncifier.syncifyTask(this);
    return this.result;
  }
};
_scheduled = new WeakMap();
_resolved = new WeakMap();
_result = new WeakMap();
_exception = new WeakMap();
_syncGen = new WeakMap();
var _Syncifier = class {
  constructor() {
    this.nextTaskId = new Int32Array([1]);
    this.signalBuffer = new Int32Array(new SharedArrayBuffer(32 * 4 + 4));
    this.tasks = /* @__PURE__ */ new Map();
  }
  scheduleTask(task) {
    task.taskId = this.nextTaskId[0];
    this.nextTaskId[0] += 2;
    task.signalBuffer = this.signalBuffer;
    this.tasks.set(task.taskId, task);
  }
  waitOnSignalBuffer() {
    const timeout = 50;
    for (; ; ) {
      const status = Atomics.wait(this.signalBuffer, 0, 0, timeout);
      switch (status) {
        case "ok":
        case "not-equal":
          return;
        case "timed-out":
          if (interruptBuffer[0] !== 0) {
            handleInterrupt();
          }
          break;
        default:
          throw new Error("Unreachable");
      }
    }
  }
  *tasksIdsToWakeup() {
    const flag = Atomics.load(this.signalBuffer, 0);
    for (let i = 0; i < 32; i++) {
      const bit = 1 << i;
      if (flag & bit) {
        Atomics.and(this.signalBuffer, 0, ~bit);
        const wokenTask = Atomics.exchange(this.signalBuffer, i + 1, 0);
        yield wokenTask;
      }
    }
  }
  pollTasks(task) {
    let result = false;
    for (const wokenTaskId of this.tasksIdsToWakeup()) {
      const wokenTask = this.tasks.get(wokenTaskId);
      if (!wokenTask) {
        throw new Error(`Assertion error: unknown taskId ${wokenTaskId}.`);
      }
      if (wokenTask.poll()) {
        this.tasks.delete(wokenTaskId);
        if (wokenTask === task) {
          result = true;
        }
      }
    }
    return result;
  }
  syncifyTask(task) {
    for (; ; ) {
      this.waitOnSignalBuffer();
      if (this.pollTasks(task)) {
        return;
      }
    }
  }
};
var dataBuffers = [];
function acquireDataBuffer(size) {
  const powerof2 = Math.ceil(Math.log2(size));
  if (!dataBuffers[powerof2]) {
    dataBuffers[powerof2] = [];
  }
  const result = dataBuffers[powerof2].pop();
  if (result) {
    result.fill(0);
    return result;
  }
  return new Uint8Array(new SharedArrayBuffer(2 ** powerof2));
}
function releaseDataBuffer(buffer) {
  const powerof2 = Math.ceil(Math.log2(buffer.byteLength));
  dataBuffers[powerof2].push(buffer);
}
var interruptBuffer = new Int32Array(new ArrayBuffer(4));
var handleInterrupt = () => {
  interruptBuffer[0] = 0;
  throw new Error("Interrupted!");
};
function setInterruptHandler(handler) {
  handleInterrupt = handler;
}
function setInterruptBuffer(buffer) {
  interruptBuffer = new Int32Array(buffer);
}

// webR/chan/channel-shared.ts
if (IN_NODE) {
  globalThis.Worker = require("worker_threads").Worker;
}
var _interruptBuffer, _handleEventsFromWorker, handleEventsFromWorker_fn, _onMessageFromWorker;
var SharedBufferChannelMain = class extends ChannelMain {
  constructor(config) {
    super();
    __privateAdd(this, _handleEventsFromWorker);
    __privateAdd(this, _interruptBuffer, void 0);
    this.close = () => {
      return;
    };
    __privateAdd(this, _onMessageFromWorker, async (worker, message) => {
      if (!message || !message.type) {
        return;
      }
      switch (message.type) {
        case "resolve":
          __privateSet(this, _interruptBuffer, new Int32Array(message.data));
          this.resolve();
          return;
        case "response":
          this.resolveResponse(message);
          return;
        case "system":
          this.systemQueue.put(message.data);
          return;
        default:
          this.outputQueue.put(message);
          return;
        case "sync-request": {
          const msg = message;
          const payload = msg.data.msg;
          const reqData = msg.data.reqData;
          switch (payload.type) {
            case "read": {
              const response = await this.inputQueue.get();
              await syncResponse(worker, reqData, response);
              break;
            }
            default:
              throw new WebRChannelError(`Unsupported request type '${payload.type}'.`);
          }
          return;
        }
        case "request":
          throw new WebRChannelError(
            "Can't send messages of type 'request' from a worker. Please Use 'sync-request' instead."
          );
      }
    });
    const initWorker = (worker) => {
      __privateMethod(this, _handleEventsFromWorker, handleEventsFromWorker_fn).call(this, worker);
      this.close = () => {
        worker.terminate();
        this.putClosedMessage();
      };
      const msg = {
        type: "init",
        data: { config, channelType: ChannelType.SharedArrayBuffer }
      };
      worker.postMessage(msg);
    };
    if (isCrossOrigin(config.baseUrl)) {
      newCrossOriginWorker(
        `${config.baseUrl}webr-worker.js`,
        (worker) => initWorker(worker)
      );
    } else {
      const worker = new Worker(`${config.baseUrl}webr-worker.js`);
      initWorker(worker);
    }
    ({ resolve: this.resolve, promise: this.initialised } = promiseHandles());
  }
  interrupt() {
    if (!__privateGet(this, _interruptBuffer)) {
      throw new WebRChannelError("Failed attempt to interrupt before initialising interruptBuffer");
    }
    this.inputQueue.reset();
    __privateGet(this, _interruptBuffer)[0] = 1;
  }
};
_interruptBuffer = new WeakMap();
_handleEventsFromWorker = new WeakSet();
handleEventsFromWorker_fn = function(worker) {
  if (IN_NODE) {
    worker.on("message", (message) => {
      void __privateGet(this, _onMessageFromWorker).call(this, worker, message);
    });
  } else {
    worker.onmessage = (ev) => __privateGet(this, _onMessageFromWorker).call(this, worker, ev.data);
  }
};
_onMessageFromWorker = new WeakMap();
var _ep, _dispatch, _interruptBuffer2, _interrupt;
var SharedBufferChannelWorker = class {
  constructor() {
    __privateAdd(this, _ep, void 0);
    __privateAdd(this, _dispatch, () => 0);
    __privateAdd(this, _interruptBuffer2, new Int32Array(new SharedArrayBuffer(4)));
    __privateAdd(this, _interrupt, () => {
      return;
    });
    this.onMessageFromMainThread = () => {
      return;
    };
    __privateSet(this, _ep, IN_NODE ? require("worker_threads").parentPort : globalThis);
    setInterruptBuffer(__privateGet(this, _interruptBuffer2).buffer);
    setInterruptHandler(() => this.handleInterrupt());
  }
  resolve() {
    this.write({ type: "resolve", data: __privateGet(this, _interruptBuffer2).buffer });
  }
  write(msg, transfer2) {
    __privateGet(this, _ep).postMessage(msg, transfer2);
  }
  writeSystem(msg, transfer2) {
    __privateGet(this, _ep).postMessage({ type: "system", data: msg }, transfer2);
  }
  read() {
    const msg = { type: "read" };
    const task = new SyncTask(__privateGet(this, _ep), msg);
    return task.syncify();
  }
  inputOrDispatch() {
    for (; ; ) {
      const msg = this.read();
      if (msg.type === "stdin") {
        return Module2.allocateUTF8(msg.data);
      }
      __privateGet(this, _dispatch).call(this, msg);
    }
  }
  run(args) {
    Module2.callMain(args);
  }
  setInterrupt(interrupt) {
    __privateSet(this, _interrupt, interrupt);
  }
  handleInterrupt() {
    if (__privateGet(this, _interruptBuffer2)[0] !== 0) {
      __privateGet(this, _interruptBuffer2)[0] = 0;
      __privateGet(this, _interrupt).call(this);
    }
  }
  setDispatchHandler(dispatch2) {
    __privateSet(this, _dispatch, dispatch2);
  }
};
_ep = new WeakMap();
_dispatch = new WeakMap();
_interruptBuffer2 = new WeakMap();
_interrupt = new WeakMap();

// webR/chan/channel-service.ts
var import_msgpack3 = __toESM(require_dist());
if (IN_NODE) {
  globalThis.Worker = require("worker_threads").Worker;
}
var _syncMessageCache, _registration, _interrupted, _registerServiceWorker, registerServiceWorker_fn, _onMessageFromServiceWorker, onMessageFromServiceWorker_fn, _handleEventsFromWorker2, handleEventsFromWorker_fn2, _onMessageFromWorker2;
var ServiceWorkerChannelMain = class extends ChannelMain {
  constructor(config) {
    super();
    __privateAdd(this, _registerServiceWorker);
    __privateAdd(this, _onMessageFromServiceWorker);
    __privateAdd(this, _handleEventsFromWorker2);
    this.close = () => {
      return;
    };
    __privateAdd(this, _syncMessageCache, /* @__PURE__ */ new Map());
    __privateAdd(this, _registration, void 0);
    __privateAdd(this, _interrupted, false);
    __privateAdd(this, _onMessageFromWorker2, (worker, message) => {
      if (!message || !message.type) {
        return;
      }
      switch (message.type) {
        case "resolve":
          this.resolve();
          return;
        case "response":
          this.resolveResponse(message);
          return;
        case "system":
          this.systemQueue.put(message.data);
          return;
        default:
          this.outputQueue.put(message);
          return;
        case "sync-request": {
          const request = message.data;
          __privateGet(this, _syncMessageCache).set(request.data.uuid, request.data.msg);
          return;
        }
        case "request":
          throw new WebRChannelError(
            "Can't send messages of type 'request' from a worker.Use service worker fetch request instead."
          );
      }
    });
    console.warn(
      "The ServiceWorker communication channel is deprecated and will be removed in a future version of webR. Consider using the PostMessage channel instead. If blocking input is required (for example, `browser()`) the SharedArrayBuffer channel should be used. See https://docs.r-wasm.org/webr/latest/serving.html for further information."
    );
    const initWorker = (worker) => {
      __privateMethod(this, _handleEventsFromWorker2, handleEventsFromWorker_fn2).call(this, worker);
      this.close = () => {
        worker.terminate();
        this.putClosedMessage();
      };
      void __privateMethod(this, _registerServiceWorker, registerServiceWorker_fn).call(this, `${config.serviceWorkerUrl}webr-serviceworker.js`).then(
        (clientId) => {
          const msg = {
            type: "init",
            data: {
              config,
              channelType: ChannelType.ServiceWorker,
              clientId,
              location: window.location.href
            }
          };
          worker.postMessage(msg);
        }
      );
    };
    if (isCrossOrigin(config.serviceWorkerUrl)) {
      newCrossOriginWorker(
        `${config.serviceWorkerUrl}webr-worker.js`,
        (worker) => initWorker(worker)
      );
    } else {
      const worker = new Worker(`${config.serviceWorkerUrl}webr-worker.js`);
      initWorker(worker);
    }
    ({ resolve: this.resolve, promise: this.initialised } = promiseHandles());
  }
  activeRegistration() {
    var _a;
    if (!((_a = __privateGet(this, _registration)) == null ? void 0 : _a.active)) {
      throw new WebRChannelError("Attempted to obtain a non-existent active registration.");
    }
    return __privateGet(this, _registration).active;
  }
  interrupt() {
    __privateSet(this, _interrupted, true);
  }
};
_syncMessageCache = new WeakMap();
_registration = new WeakMap();
_interrupted = new WeakMap();
_registerServiceWorker = new WeakSet();
registerServiceWorker_fn = async function(url) {
  __privateSet(this, _registration, await navigator.serviceWorker.register(url));
  await navigator.serviceWorker.ready;
  window.addEventListener("beforeunload", () => {
    var _a;
    void ((_a = __privateGet(this, _registration)) == null ? void 0 : _a.unregister());
  });
  const clientId = await new Promise((resolve) => {
    navigator.serviceWorker.addEventListener(
      "message",
      function listener(event) {
        if (event.data.type === "registration-successful") {
          navigator.serviceWorker.removeEventListener("message", listener);
          resolve(event.data.clientId);
        }
      }
    );
    this.activeRegistration().postMessage({ type: "register-client-main" });
  });
  navigator.serviceWorker.addEventListener("message", (event) => {
    void __privateMethod(this, _onMessageFromServiceWorker, onMessageFromServiceWorker_fn).call(this, event);
  });
  return clientId;
};
_onMessageFromServiceWorker = new WeakSet();
onMessageFromServiceWorker_fn = async function(event) {
  if (event.data.type === "request") {
    const uuid = event.data.data;
    const message = __privateGet(this, _syncMessageCache).get(uuid);
    if (!message) {
      throw new WebRChannelError("Request not found during service worker XHR request");
    }
    __privateGet(this, _syncMessageCache).delete(uuid);
    switch (message.type) {
      case "read": {
        const response = await this.inputQueue.get();
        this.activeRegistration().postMessage({
          type: "wasm-webr-fetch-response",
          uuid,
          response: newResponse(uuid, response)
        });
        break;
      }
      case "interrupt": {
        const response = __privateGet(this, _interrupted);
        this.activeRegistration().postMessage({
          type: "wasm-webr-fetch-response",
          uuid,
          response: newResponse(uuid, response)
        });
        this.inputQueue.reset();
        __privateSet(this, _interrupted, false);
        break;
      }
      default:
        throw new WebRChannelError(`Unsupported request type '${message.type}'.`);
    }
    return;
  }
};
_handleEventsFromWorker2 = new WeakSet();
handleEventsFromWorker_fn2 = function(worker) {
  if (IN_NODE) {
    worker.on("message", (message) => {
      __privateGet(this, _onMessageFromWorker2).call(this, worker, message);
    });
  } else {
    worker.onmessage = (ev) => __privateGet(this, _onMessageFromWorker2).call(this, worker, ev.data);
  }
};
_onMessageFromWorker2 = new WeakMap();
var _ep2, _mainThreadId, _location, _lastInterruptReq, _dispatch2, _interrupt2;
var ServiceWorkerChannelWorker = class {
  constructor(data) {
    __privateAdd(this, _ep2, void 0);
    __privateAdd(this, _mainThreadId, void 0);
    __privateAdd(this, _location, void 0);
    __privateAdd(this, _lastInterruptReq, Date.now());
    __privateAdd(this, _dispatch2, () => 0);
    __privateAdd(this, _interrupt2, () => {
      return;
    });
    this.onMessageFromMainThread = () => {
      return;
    };
    if (!data.clientId || !data.location) {
      throw new WebRChannelError("Can't start service worker channel");
    }
    __privateSet(this, _mainThreadId, data.clientId);
    __privateSet(this, _location, data.location);
    __privateSet(this, _ep2, IN_NODE ? require("worker_threads").parentPort : globalThis);
  }
  resolve() {
    this.write({ type: "resolve" });
  }
  write(msg, transfer2) {
    __privateGet(this, _ep2).postMessage(msg, transfer2);
  }
  writeSystem(msg, transfer2) {
    __privateGet(this, _ep2).postMessage({ type: "system", data: msg }, transfer2);
  }
  syncRequest(message) {
    const request = newRequest(message);
    this.write({ type: "sync-request", data: request });
    let retryCount = 0;
    for (; ; ) {
      try {
        const url = new URL("__wasm__/webr-fetch-request/", __privateGet(this, _location));
        const xhr = new XMLHttpRequest();
        xhr.timeout = 6e4;
        xhr.responseType = "arraybuffer";
        xhr.open("POST", url, false);
        const fetchReqBody = {
          clientId: __privateGet(this, _mainThreadId),
          uuid: request.data.uuid
        };
        xhr.send((0, import_msgpack3.encode)(fetchReqBody));
        return (0, import_msgpack3.decode)(xhr.response);
      } catch (e) {
        if (e instanceof DOMException && retryCount++ < 1e3) {
          console.log("Service worker request failed - resending request");
        } else {
          throw e;
        }
      }
    }
  }
  read() {
    const response = this.syncRequest({ type: "read" });
    return response.data.resp;
  }
  inputOrDispatch() {
    for (; ; ) {
      const msg = this.read();
      if (msg.type === "stdin") {
        return Module2.allocateUTF8(msg.data);
      }
      __privateGet(this, _dispatch2).call(this, msg);
    }
  }
  run(args) {
    Module2.callMain(args);
  }
  setInterrupt(interrupt) {
    __privateSet(this, _interrupt2, interrupt);
  }
  handleInterrupt() {
    if (Date.now() > __privateGet(this, _lastInterruptReq) + 1e3) {
      __privateSet(this, _lastInterruptReq, Date.now());
      const response = this.syncRequest({ type: "interrupt" });
      const interrupted = response.data.resp;
      if (interrupted) {
        __privateGet(this, _interrupt2).call(this);
      }
    }
  }
  setDispatchHandler(dispatch2) {
    __privateSet(this, _dispatch2, dispatch2);
  }
};
_ep2 = new WeakMap();
_mainThreadId = new WeakMap();
_location = new WeakMap();
_lastInterruptReq = new WeakMap();
_dispatch2 = new WeakMap();
_interrupt2 = new WeakMap();

// webR/chan/channel-postmessage.ts
if (IN_NODE) {
  globalThis.Worker = require("worker_threads").Worker;
}
var _worker, _handleEventsFromWorker3, handleEventsFromWorker_fn3, _onMessageFromWorker3;
var PostMessageChannelMain = class extends ChannelMain {
  constructor(config) {
    super();
    __privateAdd(this, _handleEventsFromWorker3);
    this.close = () => {
      return;
    };
    __privateAdd(this, _worker, void 0);
    __privateAdd(this, _onMessageFromWorker3, async (worker, message) => {
      if (!message || !message.type) {
        return;
      }
      switch (message.type) {
        case "resolve":
          this.resolve();
          return;
        case "response":
          this.resolveResponse(message);
          return;
        case "system":
          this.systemQueue.put(message.data);
          return;
        default:
          this.outputQueue.put(message);
          return;
        case "request": {
          const msg = message;
          const payload = msg.data.msg;
          switch (payload.type) {
            case "read": {
              const input = await this.inputQueue.get();
              if (__privateGet(this, _worker)) {
                const response = newResponse(msg.data.uuid, input);
                __privateGet(this, _worker).postMessage(response);
              }
              break;
            }
            default:
              throw new WebRChannelError(`Unsupported request type '${payload.type}'.`);
          }
          return;
        }
        case "sync-request":
          throw new WebRChannelError(
            "Can't send messages of type 'sync-request' in PostMessage mode. Use 'request' instead."
          );
      }
    });
    const initWorker = (worker) => {
      __privateSet(this, _worker, worker);
      __privateMethod(this, _handleEventsFromWorker3, handleEventsFromWorker_fn3).call(this, worker);
      this.close = () => worker.terminate();
      const msg = {
        type: "init",
        data: { config, channelType: ChannelType.PostMessage }
      };
      worker.postMessage(msg);
    };
    if (isCrossOrigin(config.baseUrl)) {
      newCrossOriginWorker(
        `${config.baseUrl}webr-worker.js`,
        (worker) => initWorker(worker)
      );
    } else {
      const worker = new Worker(`${config.baseUrl}webr-worker.js`);
      initWorker(worker);
    }
    ({ resolve: this.resolve, promise: this.initialised } = promiseHandles());
  }
  interrupt() {
    console.error("Interrupting R execution is not available when using the PostMessage channel");
  }
};
_worker = new WeakMap();
_handleEventsFromWorker3 = new WeakSet();
handleEventsFromWorker_fn3 = function(worker) {
  if (IN_NODE) {
    worker.on("message", (message) => {
      void __privateGet(this, _onMessageFromWorker3).call(this, worker, message);
    });
  } else {
    worker.onmessage = (ev) => __privateGet(this, _onMessageFromWorker3).call(this, worker, ev.data);
  }
};
_onMessageFromWorker3 = new WeakMap();
var _ep3, _parked2, _dispatch3, _promptDepth, _asyncREPL;
var PostMessageChannelWorker = class {
  constructor() {
    __privateAdd(this, _ep3, void 0);
    __privateAdd(this, _parked2, /* @__PURE__ */ new Map());
    __privateAdd(this, _dispatch3, () => 0);
    __privateAdd(this, _promptDepth, 0);
    /*
     * This is a fallback REPL for webR running in PostMessage mode. The prompt
     * section of R's R_ReplDLLdo1 returns empty with -1, which allows this
     * fallback REPL to yield to the event loop with await.
     *
     * The drawback of this approach is that nested REPLs do not work, such as
     * readline, browser or menu. Attempting to use a nested REPL prints an error
     * to the JS console.
     *
     * R/Wasm errors during execution are caught and the REPL is restarted at the
     * top level. Any other JS errors are re-thrown.
     */
    __privateAdd(this, _asyncREPL, async () => {
      for (; ; ) {
        try {
          __privateSet(this, _promptDepth, 0);
          const msg = await this.request({ type: "read" });
          if (msg.type === "stdin") {
            const str = Module.allocateUTF8(msg.data);
            Module._strcpy(Module._DLLbuf, str);
            Module.setValue(Module._DLLbufp, Module._DLLbuf, "*");
            Module._free(str);
            try {
              while (Module._R_ReplDLLdo1() > 0)
                ;
            } catch (e) {
              if (e instanceof WebAssembly.Exception) {
                Module._R_ReplDLLinit();
                Module._R_ReplDLLdo1();
              } else {
                throw e;
              }
            }
          } else {
            __privateGet(this, _dispatch3).call(this, msg);
          }
        } catch (e) {
          if (!(e instanceof WebAssembly.Exception)) {
            throw e;
          }
        }
      }
    });
    __privateSet(this, _ep3, IN_NODE ? require("worker_threads").parentPort : globalThis);
  }
  resolve() {
    this.write({ type: "resolve" });
  }
  write(msg, transfer2) {
    __privateGet(this, _ep3).postMessage(msg, transfer2);
  }
  writeSystem(msg, transfer2) {
    __privateGet(this, _ep3).postMessage({ type: "system", data: msg }, transfer2);
  }
  read() {
    throw new WebRChannelError(
      "Unable to synchronously read when using the `PostMessage` channel."
    );
  }
  inputOrDispatch() {
    if (__privateGet(this, _promptDepth) > 0) {
      __privateSet(this, _promptDepth, 0);
      const msg = Module.allocateUTF8OnStack(
        "Can't block for input when using the PostMessage communication channel."
      );
      Module._Rf_error(msg);
    }
    __privateWrapper(this, _promptDepth)._++;
    return 0;
  }
  run(_args) {
    const args = _args || [];
    args.unshift("R");
    const argc = args.length;
    const argv = Module._malloc(4 * (argc + 1));
    args.forEach((arg, idx) => {
      const argvPtr = argv + 4 * idx;
      const argPtr = Module.allocateUTF8(arg);
      Module.setValue(argvPtr, argPtr, "*");
    });
    this.writeSystem({
      type: "console.warn",
      data: "WebR is using `PostMessage` communication channel, nested R REPLs are not available."
    });
    Module._Rf_initialize_R(argc, argv);
    Module._setup_Rmainloop();
    Module._R_ReplDLLinit();
    Module._R_ReplDLLdo1();
    void __privateGet(this, _asyncREPL).call(this);
  }
  setDispatchHandler(dispatch2) {
    __privateSet(this, _dispatch3, dispatch2);
  }
  async request(msg, transferables) {
    const req = newRequest(msg, transferables);
    const { resolve, promise: prom } = promiseHandles();
    __privateGet(this, _parked2).set(req.data.uuid, resolve);
    this.write(req);
    return prom;
  }
  setInterrupt() {
    return;
  }
  handleInterrupt() {
    return;
  }
  onMessageFromMainThread(message) {
    const msg = message;
    const uuid = msg.data.uuid;
    const resolve = __privateGet(this, _parked2).get(uuid);
    if (resolve) {
      __privateGet(this, _parked2).delete(uuid);
      resolve(msg.data.resp);
    } else {
      console.warn("Can't find request.");
    }
  }
};
_ep3 = new WeakMap();
_parked2 = new WeakMap();
_dispatch3 = new WeakMap();
_promptDepth = new WeakMap();
_asyncREPL = new WeakMap();

// webR/chan/channel-common.ts
var ChannelType = {
  Automatic: 0,
  SharedArrayBuffer: 1,
  ServiceWorker: 2,
  PostMessage: 3
};
function newChannelWorker(msg) {
  switch (msg.data.channelType) {
    case ChannelType.SharedArrayBuffer:
      return new SharedBufferChannelWorker();
    case ChannelType.ServiceWorker:
      return new ServiceWorkerChannelWorker(msg.data);
    case ChannelType.PostMessage:
      return new PostMessageChannelWorker();
    default:
      throw new WebRChannelError("Unknown worker channel type received");
  }
}

// webR/webr-worker.ts
var initialised = false;
var chan;
var onWorkerMessage = function(msg) {
  if (!msg || !msg.type) {
    return;
  }
  if (msg.type === "init") {
    if (initialised) {
      throw new Error("Can't initialise worker multiple times.");
    }
    const messageInit = msg;
    chan = newChannelWorker(messageInit);
    messageInit.data.config.channelType = messageInit.data.channelType;
    init(messageInit.data.config);
    initialised = true;
    return;
  }
  chan == null ? void 0 : chan.onMessageFromMainThread(msg);
};
if (IN_NODE) {
  const workerThreads = require("worker_threads");
  workerThreads.parentPort.on("message", onWorkerMessage);
  globalThis.XMLHttpRequest = require_XMLHttpRequest().XMLHttpRequest;
} else {
  globalThis.onmessage = (ev) => onWorkerMessage(ev.data);
}
var _config;
function dispatch(msg) {
  switch (msg.type) {
    case "request": {
      const req = msg;
      const reqMsg = req.data.msg;
      const write = (resp, transferables) => chan == null ? void 0 : chan.write(newResponse(req.data.uuid, resp, transferables));
      try {
        switch (reqMsg.type) {
          case "lookupPath": {
            const msg2 = reqMsg;
            const node = Module2.FS.lookupPath(msg2.data.path, {}).node;
            write({
              obj: copyFSNode(node),
              payloadType: "raw"
            });
            break;
          }
          case "mkdir": {
            const msg2 = reqMsg;
            write({
              obj: copyFSNode(Module2.FS.mkdir(msg2.data.path)),
              payloadType: "raw"
            });
            break;
          }
          case "mount": {
            const msg2 = reqMsg;
            const type = msg2.data.type;
            if (type === "IDBFS" && _config.channelType == ChannelType.SharedArrayBuffer) {
              throw new Error(
                "The `IDBFS` filesystem type is not supported under the `SharedArrayBuffer` communication channel. The `PostMessage` communication channel must be used."
              );
            }
            const fs = Module2.FS.filesystems[type];
            Module2.FS.mount(fs, msg2.data.options, msg2.data.mountpoint);
            write({ obj: null, payloadType: "raw" });
            break;
          }
          case "syncfs": {
            const msg2 = reqMsg;
            Module2.FS.syncfs(msg2.data.populate, (err) => {
              if (err) {
                throw new Error(`Emscripten \`syncfs\` error: "${err}".`);
              }
              write({ obj: null, payloadType: "raw" });
            });
            break;
          }
          case "readFile": {
            const msg2 = reqMsg;
            const reqData = msg2.data;
            const out = {
              obj: Module2.FS.readFile(reqData.path, {
                encoding: "binary",
                flags: reqData.flags
              }),
              payloadType: "raw"
            };
            write(out, [out.obj.buffer]);
            break;
          }
          case "rmdir": {
            const msg2 = reqMsg;
            write({
              obj: Module2.FS.rmdir(msg2.data.path),
              payloadType: "raw"
            });
            break;
          }
          case "writeFile": {
            const msg2 = reqMsg;
            const reqData = msg2.data;
            const data = Uint8Array.from(Object.values(reqData.data));
            write({
              obj: Module2.FS.writeFile(reqData.path, data, { flags: reqData.flags }),
              payloadType: "raw"
            });
            break;
          }
          case "unlink": {
            const msg2 = reqMsg;
            write({
              obj: Module2.FS.unlink(msg2.data.path),
              payloadType: "raw"
            });
            break;
          }
          case "unmount": {
            const msg2 = reqMsg;
            write({
              obj: Module2.FS.unmount(msg2.data.path),
              payloadType: "raw"
            });
            break;
          }
          case "newShelter": {
            const id = generateUUID();
            shelters.set(id, []);
            write({
              payloadType: "raw",
              obj: id
            });
            break;
          }
          case "shelterSize": {
            const msg2 = reqMsg;
            const size = shelters.get(msg2.data).length;
            write({ payloadType: "raw", obj: size });
            break;
          }
          case "shelterPurge": {
            const msg2 = reqMsg;
            purge(msg2.data);
            write({ payloadType: "raw", obj: null });
            break;
          }
          case "shelterDestroy": {
            const msg2 = reqMsg;
            destroy(msg2.data.id, msg2.data.obj.obj.ptr);
            write({ payloadType: "raw", obj: null });
            break;
          }
          case "captureR": {
            const msg2 = reqMsg;
            const data = msg2.data;
            const shelter = data.shelter;
            const prot = { n: 0 };
            try {
              const capture = captureR(data.code, data.options);
              protectInc(capture.result, prot);
              protectInc(capture.output, prot);
              const result = capture.result;
              keep(shelter, result);
              const n = capture.output.length;
              const output = [];
              for (let i = 1; i < n + 1; ++i) {
                const out = capture.output.get(i);
                const type = out.pluck(1, 1).toString();
                const data2 = out.get(2);
                if (type === "stdout" || type === "stderr") {
                  const msg3 = data2.toString();
                  output.push({ type, data: msg3 });
                } else {
                  keep(shelter, data2);
                  const payload = {
                    obj: {
                      ptr: data2.ptr,
                      type: data2.type(),
                      methods: RObject.getMethods(data2)
                    },
                    payloadType: "ptr"
                  };
                  output.push({ type, data: payload });
                }
              }
              const resultPayload = {
                payloadType: "ptr",
                obj: {
                  ptr: result.ptr,
                  type: result.type(),
                  methods: RObject.getMethods(result)
                }
              };
              write({
                payloadType: "raw",
                obj: {
                  result: resultPayload,
                  output,
                  images: capture.images
                }
              });
            } finally {
              unprotect(prot.n);
            }
            break;
          }
          case "evalR": {
            const msg2 = reqMsg;
            const result = evalR(msg2.data.code, msg2.data.options);
            keep(msg2.data.shelter, result);
            write({
              obj: {
                type: result.type(),
                ptr: result.ptr,
                methods: RObject.getMethods(result)
              },
              payloadType: "ptr"
            });
            break;
          }
          case "evalRRaw": {
            const msg2 = reqMsg;
            const result = evalR(msg2.data.code, msg2.data.options);
            protect(result);
            const throwType = () => {
              throw new Error(`Can't convert object of type ${result.type()} to ${msg2.data.outputType}.`);
            };
            try {
              let out = void 0;
              switch (msg2.data.outputType) {
                case "void":
                  break;
                case "boolean":
                  switch (result.type()) {
                    case "logical":
                      out = result.toBoolean();
                      break;
                    default:
                      throwType();
                  }
                  break;
                case "boolean[]":
                  switch (result.type()) {
                    case "logical":
                      out = result.toArray();
                      if (out.some((i) => i === null)) {
                        throwType();
                      }
                      break;
                    default:
                      throwType();
                  }
                  break;
                case "number":
                  switch (result.type()) {
                    case "logical":
                      out = result.toBoolean();
                      out = Number(out);
                      break;
                    case "integer":
                      out = result.toNumber();
                      break;
                    case "double":
                      out = result.toNumber();
                      break;
                    default:
                      throwType();
                  }
                  break;
                case "number[]":
                  switch (result.type()) {
                    case "logical":
                      out = result.toArray();
                      out = out.map((i) => i === null ? throwType() : Number(i));
                      break;
                    case "integer":
                      out = result.toArray();
                      if (out.some((i) => i === null)) {
                        throwType();
                      }
                      break;
                    case "double":
                      out = result.toArray();
                      if (out.some((i) => i === null)) {
                        throwType();
                      }
                      break;
                    default:
                      throwType();
                  }
                  break;
                case "string":
                  switch (result.type()) {
                    case "character":
                      out = result.toString();
                      break;
                    default:
                      throwType();
                  }
                  break;
                case "string[]":
                  switch (result.type()) {
                    case "character":
                      out = result.toArray();
                      if (out.some((i) => i === null)) {
                        throwType();
                      }
                      break;
                    default:
                      throwType();
                  }
                  break;
                default:
                  throw new Error("Unexpected output type in `evalRRaw().");
              }
              write({
                obj: out,
                payloadType: "raw"
              });
              break;
            } finally {
              unprotect(1);
            }
          }
          case "newRObject": {
            const msg2 = reqMsg;
            const payload = newRObject(msg2.data.args, msg2.data.objType);
            keep(msg2.data.shelter, payload.obj.ptr);
            write(payload);
            break;
          }
          case "callRObjectMethod": {
            const msg2 = reqMsg;
            const data = msg2.data;
            const obj = data.payload ? RObject.wrap(data.payload.obj.ptr) : RObject;
            const payload = callRObjectMethod(obj, data.prop, data.args);
            if (isWebRPayloadPtr(payload)) {
              keep(data.shelter, payload.obj.ptr);
            }
            write(payload);
            break;
          }
          case "invokeWasmFunction": {
            const msg2 = reqMsg;
            const res = Module2.getWasmTableEntry(msg2.data.ptr)(...msg2.data.args);
            write({
              payloadType: "raw",
              obj: res
            });
            break;
          }
          case "installPackages": {
            const msg2 = reqMsg;
            let pkgs = msg2.data.name;
            let repos = msg2.data.options.repos ? msg2.data.options.repos : _config.repoUrl;
            if (typeof pkgs === "string")
              pkgs = [pkgs];
            if (typeof repos === "string")
              repos = [repos];
            evalR(`webr::install(
              c(${pkgs.map((r) => '"' + r + '"').join(",")}),
              repos = c(${repos.map((r) => '"' + r + '"').join(",")}),
              quiet = ${msg2.data.options.quiet ? "TRUE" : "FALSE"},
              mount = ${msg2.data.options.mount ? "TRUE" : "FALSE"}
            )`);
            write({
              obj: true,
              payloadType: "raw"
            });
            break;
          }
          default:
            throw new Error("Unknown event `" + reqMsg.type + "`");
        }
      } catch (_e) {
        const e = _e;
        write({
          payloadType: "err",
          obj: { name: e.name, message: e.message, stack: e.stack }
        });
        if (e instanceof UnwindProtectException) {
          Module2._R_ContinueUnwind(e.cont);
          throwUnreachable();
        }
      }
      break;
    }
    default:
      throw new Error("Unknown event `" + msg.type + "`");
  }
}
function copyFSNode(obj) {
  const retObj = {
    id: obj.id,
    name: obj.name,
    mode: obj.mode,
    isFolder: obj.isFolder,
    mounted: null,
    contents: {}
  };
  if (obj.isFolder && obj.contents) {
    retObj.contents = Object.fromEntries(
      Object.entries(obj.contents).map(([name, node]) => [name, copyFSNode(node)])
    );
  }
  if (obj.mounted !== null) {
    retObj.mounted = {
      mountpoint: obj.mounted.mountpoint,
      root: copyFSNode(obj.mounted.root)
    };
  }
  return retObj;
}
function downloadFileContent(URL2, headers = []) {
  const request = new XMLHttpRequest();
  request.open("GET", URL2, false);
  request.responseType = "arraybuffer";
  try {
    headers.forEach((header) => {
      const splitHeader = header.split(": ");
      request.setRequestHeader(splitHeader[0], splitHeader[1]);
    });
  } catch {
    const responseText = "An error occurred setting headers in XMLHttpRequest";
    console.error(responseText);
    return { status: 400, response: responseText };
  }
  try {
    request.send(null);
    const status = IN_NODE ? JSON.parse(String(request.status)).data.statusCode : request.status;
    if (status >= 200 && status < 300) {
      return { status, response: request.response };
    } else {
      const responseText = new TextDecoder().decode(request.response);
      console.error(`Error fetching ${URL2} - ${responseText}`);
      return { status, response: responseText };
    }
  } catch {
    return { status: 400, response: "An error occurred in XMLHttpRequest" };
  }
}
function mountImageData(data, metadata, mountpoint) {
  if (IN_NODE) {
    const buf = data;
    const WORKERFS = Module2.FS.filesystems.WORKERFS;
    if (!WORKERFS.reader)
      WORKERFS.reader = {
        readAsArrayBuffer: (chunk) => new Uint8Array(chunk)
      };
    metadata.files.forEach((f) => {
      const contents = buf.subarray(f.start, f.end);
      contents.size = contents.byteLength;
      contents.slice = (start, end) => {
        const sub = contents.subarray(start, end);
        sub.size = sub.byteLength;
        return sub;
      };
      const parts = (mountpoint + f.filename).split("/");
      const file = parts.pop();
      if (!file) {
        throw new Error(`Invalid mount path "${mountpoint}${f.filename}".`);
      }
      const dir = parts.join("/");
      Module2.FS.mkdirTree(dir);
      const dirNode = Module2.FS.lookupPath(dir, {}).node;
      WORKERFS.createNode(dirNode, file, WORKERFS.FILE_MODE, 0, contents);
    });
  } else {
    Module2.FS.mount(Module2.FS.filesystems.WORKERFS, {
      packages: [{
        blob: new Blob([data]),
        metadata
      }]
    }, mountpoint);
  }
}
function mountImageUrl(url, mountpoint) {
  const dataResp = downloadFileContent(url);
  const metaResp = downloadFileContent(url.replace(new RegExp(".data$"), ".js.metadata"));
  if (dataResp.status < 200 || dataResp.status >= 300 || metaResp.status < 200 || metaResp.status >= 300) {
    throw new Error("Unable to download Emscripten filesystem image.See the JavaScript console for further details.");
  }
  mountImageData(
    dataResp.response,
    JSON.parse(new TextDecoder().decode(metaResp.response)),
    mountpoint
  );
}
function mountImagePath(path, mountpoint) {
  const fs = require("fs");
  const buf = fs.readFileSync(path);
  const metadata = JSON.parse(fs.readFileSync(
    path.replace(new RegExp(".data$"), ".js.metadata"),
    "utf8"
  ));
  mountImageData(buf, metadata, mountpoint);
}
function newRObject(args, objType) {
  const RClass = getRWorkerClass(objType);
  const _args = replaceInObject(
    args,
    isWebRPayloadPtr,
    (t) => RObject.wrap(t.obj.ptr)
  );
  const obj = new RClass(..._args);
  return {
    obj: {
      type: obj.type(),
      ptr: obj.ptr,
      methods: RObject.getMethods(obj)
    },
    payloadType: "ptr"
  };
}
function callRObjectMethod(obj, prop, args) {
  if (!(prop in obj)) {
    throw new ReferenceError(`${prop} is not defined`);
  }
  const fn = obj[prop];
  if (typeof fn !== "function") {
    throw Error("Requested property cannot be invoked");
  }
  const res = fn.apply(
    obj,
    args.map((arg) => {
      if (arg.payloadType === "ptr") {
        return RObject.wrap(arg.obj.ptr);
      }
      return replaceInObject(
        arg.obj,
        isWebRPayloadPtr,
        (t) => RObject.wrap(t.obj.ptr)
      );
    })
  );
  const ret = replaceInObject(res, isRObject, (obj2) => {
    return {
      obj: { type: obj2.type(), ptr: obj2.ptr, methods: RObject.getMethods(obj2) },
      payloadType: "ptr"
    };
  });
  return { obj: ret, payloadType: "raw" };
}
function captureR(expr, options = {}) {
  var _a;
  const _options = Object.assign(
    {
      env: objs.globalEnv,
      captureStreams: true,
      captureConditions: true,
      captureGraphics: typeof OffscreenCanvas !== "undefined",
      withAutoprint: false,
      throwJsException: true,
      withHandlers: true
    },
    replaceInObject(
      options,
      isWebRPayloadPtr,
      (t) => RObject.wrap(t.obj.ptr)
    )
  );
  const prot = { n: 0 };
  const devEnvObj = new REnvironment({});
  protectInc(devEnvObj, prot);
  Module2.setValue(Module2._R_Interactive, 0, "i8");
  try {
    const envObj = new REnvironment(_options.env);
    protectInc(envObj, prot);
    if (envObj.type() !== "environment") {
      throw new Error("Attempted to evaluate R code with invalid environment object");
    }
    if (_options.captureGraphics) {
      if (typeof OffscreenCanvas === "undefined") {
        throw new Error(
          "This environment does not have support for OffscreenCanvas. Consider disabling plot capture using `captureGraphics: false`."
        );
      }
      devEnvObj.bind("canvas_options", new RList(Object.assign({
        capture: true
      }, _options.captureGraphics)));
      parseEvalBare(`{
        old_dev <- dev.cur()
        do.call(webr::canvas, canvas_options)
        new_dev <- dev.cur()
        old_cache <- webr::canvas_cache()
        plots <- numeric()
      }`, devEnvObj);
    }
    const tPtr = objs.true.ptr;
    const fPtr = objs.false.ptr;
    const fn = parseEvalBare("webr::eval_r", objs.baseEnv);
    const qu = parseEvalBare("quote", objs.baseEnv);
    protectInc(fn, prot);
    protectInc(qu, prot);
    const exprObj = new RObject(expr);
    protectInc(exprObj, prot);
    const call = Module2._Rf_lang6(
      fn.ptr,
      Module2._Rf_lang2(qu.ptr, exprObj.ptr),
      _options.captureConditions ? tPtr : fPtr,
      _options.captureStreams ? tPtr : fPtr,
      _options.withAutoprint ? tPtr : fPtr,
      _options.withHandlers ? tPtr : fPtr
    );
    protectInc(call, prot);
    const capture = RList.wrap(safeEval(call, envObj));
    protectInc(capture, prot);
    if (_options.captureConditions && _options.throwJsException) {
      const output = capture.get("output");
      const error = output.toArray().find(
        (out) => out.get("type").toString() === "error"
      );
      if (error) {
        const call2 = error.pluck("data", "call");
        const source = call2 && call2.type() === "call" ? `\`${call2.deparse()}\`` : "unknown source";
        const message = ((_a = error.pluck("data", "message")) == null ? void 0 : _a.toString()) || "An error occurred evaluating R code.";
        throw new Error(`Error in ${source}: ${message}`);
      }
    }
    let images = [];
    if (_options.captureGraphics) {
      const plots = parseEvalBare(`{
        new_cache <- webr::canvas_cache()
        plots <- setdiff(new_cache, old_cache)
      }`, devEnvObj);
      protectInc(plots, prot);
      images = plots.toArray().map((idx) => {
        return Module2.webr.canvas[idx].offscreen.transferToImageBitmap();
      });
    }
    return {
      result: capture.get("result"),
      output: capture.get("output"),
      images
    };
  } finally {
    Module2.setValue(Module2._R_Interactive, _config.interactive ? 1 : 0, "i8");
    const newDev = devEnvObj.get("new_dev");
    if (_options.captureGraphics && newDev.type() !== "null") {
      parseEvalBare(`{
        dev.off(new_dev)
        dev.set(old_dev)
        webr::canvas_destroy(plots)
      }`, devEnvObj);
    }
    unprotect(prot.n);
  }
}
function evalR(expr, options = {}) {
  var _a, _b;
  options = Object.assign({
    captureGraphics: false
  }, options);
  const prot = { n: 0 };
  const capture = captureR(expr, options);
  try {
    protectInc(capture.output, prot);
    protectInc(capture.result, prot);
    for (let i = 1; i <= capture.output.length; i++) {
      const out = capture.output.get(i);
      const outputType = out.get("type").toString();
      switch (outputType) {
        case "stdout":
          chan == null ? void 0 : chan.writeSystem({ type: "console.log", data: out.get("data").toString() });
          break;
        case "stderr":
          chan == null ? void 0 : chan.writeSystem({ type: "console.warn", data: out.get("data").toString() });
          break;
        case "message":
          chan == null ? void 0 : chan.writeSystem({
            type: "console.warn",
            data: ((_a = out.pluck("data", "message")) == null ? void 0 : _a.toString()) || ""
          });
          break;
        case "warning":
          chan == null ? void 0 : chan.writeSystem({
            type: "console.warn",
            data: `Warning message: 
${((_b = out.pluck("data", "message")) == null ? void 0 : _b.toString()) || ""}`
          });
          break;
        default:
          chan == null ? void 0 : chan.writeSystem({ type: "console.warn", data: `Output of type ${outputType}:` });
          chan == null ? void 0 : chan.writeSystem({ type: "console.warn", data: out.get("data").toJs() });
          break;
      }
    }
    return capture.result;
  } finally {
    unprotect(prot.n);
  }
}
function init(config) {
  _config = config;
  const env = { ...config.REnv };
  if (!env.TZ) {
    const fmt = new Intl.DateTimeFormat();
    env.TZ = fmt.resolvedOptions().timeZone;
  }
  Module2.preRun = [];
  Module2.arguments = _config.RArgs;
  Module2.noExitRuntime = true;
  Module2.noImageDecoding = true;
  Module2.noAudioDecoding = true;
  Module2.noInitialRun = true;
  Module2.noWasmDecoding = true;
  Module2.preRun.push(() => {
    if (IN_NODE) {
      globalThis.FS = Module2.FS;
      globalThis.chan = chan;
    }
    if (_config.createLazyFilesystem) {
      Module2.createLazyFilesystem();
    }
    Module2.FS.mkdirTree(_config.homedir);
    Module2.ENV.HOME = _config.homedir;
    Module2.FS.chdir(_config.homedir);
    Module2.ENV = Object.assign(Module2.ENV, env);
  });
  chan == null ? void 0 : chan.setDispatchHandler(dispatch);
  Module2.onRuntimeInitialized = () => {
    chan == null ? void 0 : chan.run(_config.RArgs);
  };
  Module2.webr = {
    UnwindProtectException,
    evalR,
    captureR,
    canvas: {},
    resolveInit: () => {
      initPersistentObjects();
      chan == null ? void 0 : chan.setInterrupt(Module2._Rf_onintr);
      Module2.setValue(Module2._R_Interactive, _config.interactive ? 1 : 0, "i8");
      evalR(`options(webr_pkg_repos="${_config.repoUrl}")`);
      chan == null ? void 0 : chan.resolve();
    },
    readConsole: () => {
      if (!chan) {
        throw new Error("Can't read console input without a communication channel");
      }
      return chan.inputOrDispatch();
    },
    handleEvents: () => {
      chan == null ? void 0 : chan.handleInterrupt();
    },
    dataViewer: (ptr, title) => {
      const data = RList.wrap(ptr).toObject({ depth: 0 });
      chan == null ? void 0 : chan.write({ type: "view", data: { data, title } });
    },
    evalJs: (code) => {
      try {
        return (0, eval)(Module2.UTF8ToString(code));
      } catch (e) {
        if (e instanceof UnwindProtectException) {
          Module2._R_ContinueUnwind(e.cont);
          throwUnreachable();
        } else if (e === Infinity) {
          throw e;
        }
        const msg = Module2.allocateUTF8OnStack(
          `An error occurred during JavaScript evaluation:
  ${e.message}`
        );
        Module2._Rf_error(msg);
      }
      throwUnreachable();
      return 0;
    },
    setTimeoutWasm: (ptr, delay, ...args) => {
      chan == null ? void 0 : chan.writeSystem({ type: "setTimeoutWasm", data: { ptr, delay, args } });
    }
  };
  Module2.locateFile = (path) => _config.baseUrl + path;
  Module2.downloadFileContent = downloadFileContent;
  Module2.mountImageUrl = mountImageUrl;
  Module2.mountImagePath = mountImagePath;
  Module2.print = (text) => {
    chan == null ? void 0 : chan.write({ type: "stdout", data: text });
  };
  Module2.printErr = (text) => {
    chan == null ? void 0 : chan.write({ type: "stderr", data: text });
  };
  Module2.setPrompt = (prompt) => {
    chan == null ? void 0 : chan.write({ type: "prompt", data: prompt });
  };
  globalThis.Module = Module2;
  setTimeout(() => {
    const scriptSrc = `${_config.baseUrl}R.bin.js`;
    void loadScript(scriptSrc);
  });
}
/*! Bundled license information:

xmlhttprequest-ssl/lib/XMLHttpRequest.js:
  (**
   * Wrapper for built-in http.js to emulate the browser XMLHttpRequest object.
   *
   * This can be used with JS designed for browsers to improve reuse of code and
   * allow the use of existing libraries.
   *
   * Usage: include("XMLHttpRequest.js") and use XMLHttpRequest per W3C specs.
   *
   * @author Dan DeFelippi <dan@driverdan.com>
   * @contributor David Ellis <d.f.ellis@ieee.org>
   * @license MIT
   *)
*/
//# sourceMappingURL=webr-worker.js.map
