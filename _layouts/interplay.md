---
layout: compress
---

<!DOCTYPE html>
<html lang="en">
  {% include head.md %}

  <script id="fxhash-snippet">
    //---- do not edit the following code
    let search = new URLSearchParams(window.location.search);
    let alphabet =
    "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
    var fxhash =
    search.get("fxhash") ||
    "oo" +
        Array(49)
        .fill(0)
        .map((_) => alphabet[(Math.random() * alphabet.length) | 0])
        .join("");
    let b58dec = (str) =>
    [...str].reduce(
        (p, c) => (p * alphabet.length + alphabet.indexOf(c)) | 0,
        0
    );
    let fxhashTrunc = fxhash.slice(2);
    let regex = new RegExp(".{" + ((fxhash.length / 4) | 0) + "}", "g");
    let hashes = fxhashTrunc.match(regex).map((h) => b58dec(h));
    let sfc32 = (a, b, c, d) => {
    return () => {
        a |= 0;
        b |= 0;
        c |= 0;
        d |= 0;
        var t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
    };
    };
    var fxrand = sfc32(...hashes);
    // true if preview mode active, false otherwise
    // you can append preview=1 to the URL to simulate preview active
    var isFxpreview = search.get("preview") === "1";
    // call this method to trigger the preview
    function fxpreview() {
    window.dispatchEvent(new Event("fxhash-preview"));
    setTimeout(() => fxpreview(), 500);
    }
    //
    // NEW: v2 of the fxhash SDK lol
    //
    // get the byte params from the URL
    let fxparams = search.get("fxparams");
    fxparams = fxparams ? fxparams.replace("0x", "") : fxparams;

    // the parameter processor, used to parse fxparams
    const processors = {
    number: {
        deserialize: (input) => {
        const view = new DataView(new ArrayBuffer(8));
        for (let i = 0; i < 8; i++) {
            view.setUint8(i, parseInt(input.substring(i * 2, i * 2 + 2), 16));
        }
        return view.getFloat64(0);
        },
        bytesLength: () => 8,
        constrain: (value, definition) => {
        let min = Number.MIN_SAFE_INTEGER;
        if (typeof definition.options?.min !== "undefined")
            min = Number(definition.options.min);
        let max = Number.MAX_SAFE_INTEGER;
        if (typeof definition.options?.max !== "undefined")
            max = Number(definition.options.max);
        max = Math.min(max, Number.MAX_SAFE_INTEGER);
        min = Math.max(min, Number.MIN_SAFE_INTEGER);
        const v = Math.min(Math.max(value, min), max);
        return v;
        },
        random: (definition) => {
        let min = Number.MIN_SAFE_INTEGER;
        if (typeof definition.options?.min !== "undefined")
            min = Number(definition.options.min);
        let max = Number.MAX_SAFE_INTEGER;
        if (typeof definition.options?.max !== "undefined")
            max = Number(definition.options.max);
        max = Math.min(max, Number.MAX_SAFE_INTEGER);
        min = Math.max(min, Number.MIN_SAFE_INTEGER);
        const v = Math.random() * (max - min) + min;
        if (definition?.options?.step) {
            const t = 1.0 / definition?.options?.step;
            return Math.round(v * t) / t;
        }
        return v;
        },
    },
    bigint: {
        deserialize: (input) => {
        const view = new DataView(new ArrayBuffer(8));
        for (let i = 0; i < 8; i++) {
            view.setUint8(i, parseInt(input.substring(i * 2, i * 2 + 2), 16));
        }
        return view.getBigInt64(0);
        },
        bytesLength: () => 8,
        random: (definition) => {
        const MIN_SAFE_INT64 = -9223372036854775808n;
        const MAX_SAFE_INT64 = 9223372036854775807n;
        let min = MIN_SAFE_INT64;
        let max = MAX_SAFE_INT64;
        if (typeof definition.options?.min !== "undefined")
            min = BigInt(definition.options.min);
        if (typeof definition.options?.max !== "undefined")
            max = BigInt(definition.options.max);
        const range = max - min;
        const bits = range.toString(2).length;
        let random;
        do {
            random = BigInt(
            "0b" +
                Array.from(
                crypto.getRandomValues(new Uint8Array(Math.ceil(bits / 8)))
                )
                .map((b) => b.toString(2).padStart(8, "0"))
                .join("")
            );
        } while (random > range);
        return random + min;
        },
    },
    boolean: {
        // if value is "00" -> 0 -> false, otherwise we consider it's 1
        deserialize: (input) => {
        return input === "00" ? false : true;
        },
        bytesLength: () => 1,
        random: () => Math.random() < 0.5,
    },
    color: {
        deserialize: (input) => input,
        bytesLength: () => 4,
        transform: (input) => {
        const r = parseInt(input.slice(0, 2), 16);
        const g = parseInt(input.slice(2, 4), 16);
        const b = parseInt(input.slice(4, 6), 16);
        const a = parseInt(input.slice(6, 8), 16);
        return {
            hex: {
            rgb: "#" + input.slice(0, 6),
            rgba: "#" + input,
            },
            obj: {
            rgb: { r, g, b },
            rgba: { r, g, b, a },
            },
            arr: {
            rgb: [r, g, b],
            rgba: [r, g, b, a],
            },
        };
        },
        constrain: (value, definition) => {
        return value.slice(0, 8).padEnd(8, "f");
        },
        random: () =>
        `${[...Array(8)]
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join("")}`,
    },
    string: {
        deserialize: (input) => {
        const hx = input.match(/.{1,4}/g) || [];
        let rtn = "";
        for (let i = 0; i < hx.length; i++) {
            const int = parseInt(hx[i], 16);
            if (int === 0) break;
            rtn += String.fromCharCode(int);
        }
        return rtn;
        },
        bytesLength: () => 64 * 2,
        constrain: (value, definition) => {
        let min = 0;
        if (typeof definition.options?.minLength !== "undefined")
            min = definition.options.minLength;
        let max = 64;
        if (typeof definition.options?.maxLength !== "undefined")
            max = definition.options.maxLength;
        max = Math.min(max, 64);
        let v = value.slice(0, max);
        if (v.length < min) {
            return v.padEnd(min);
        }
        return v;
        },
        random: (definition) => {
        let min = 0;
        if (typeof definition.options?.minLength !== "undefined")
            min = definition.options.minLength;
        let max = 64;
        if (typeof definition.options?.maxLength !== "undefined")
            max = definition.options.maxLength;
        max = Math.min(max, 64);
        const length = Math.round(Math.random() * (max - min) + min);
        return [...Array(length)]
            .map((i) => (~~(Math.random() * 36)).toString(36))
            .join("");
        },
    },
    select: {
        deserialize: (input, definition) => {
        return (
            definition.options.options[parseInt(input, 16)] ||
            definition.default
        );
        },
        bytesLength: () => 1,
        constrain: (value, definition) => {
        if (definition.options.options.includes(value)) {
            return value;
        }
        return definition.options.options[0];
        },
        random: (definition) => {
        const index = Math.round(
            Math.random() * (definition?.options?.options?.length - 1) + 0
        );
        return definition?.options?.options[index];
        },
    },
    };

    // takes the parameters as bytes and outputs an object with the
    // deserialized parameters, identified by their id in an object
    const deserializeParams = (bytes, definition) => {
    const params = {};
    for (const def of definition) {
        const processor = processors[def.type];
        // if we don't have any parameters defined in the URL, set the
        // default value and move on
        if (!bytes) {
        let v;
        if (typeof def.default === "undefined") v = processor.random(def);
        else v = def.default;
        params[def.id] = processor.constrain?.(v, def) || v;
        continue;
        }
        // extract the length from the bytes & shift the initial bytes string
        const valueBytes = bytes.substring(0, processor.bytesLength() * 2);
        bytes = bytes.substring(processor.bytesLength() * 2);
        // deserialize the bytes into the params
        const value = processor.deserialize(valueBytes, def);
        params[def.id] = processor.constrain?.(value, def) || value;
    }
    return params;
    };

    const transformParamValues = (values, definitions) => {
    const paramValues = {};
    for (const def of definitions) {
        const processor = processors[def.type];
        const value = values[def.id];
        // deserialize the bytes into the params
        paramValues[def.id] = processor.transform
        ? processor.transform(value)
        : value;
    }
    return paramValues;
    };

    window.$fx = {
    _processors: processors,
    // where params def & features will be stored
    _params: undefined,
    _features: undefined,
    // where the parameter values are stored
    _paramValues: {},

    hash: fxhash,
    rand: fxrand,
    preview: fxpreview,
    isPreview: isFxpreview,
    params: function (definition) {
        // todo: maybe do some validation on the dev side ?
        // or maybe not ?
        this._params = definition;
        this._rawValues = deserializeParams(fxparams, definition);
        this._paramValues = transformParamValues(this._rawValues, definition);
    },
    features: function (features) {
        this._features = features;
    },
    getFeature: function (id) {
        return this._features[id];
    },
    getFeatures: function () {
        return this._features;
    },
    getParam: function (id) {
        return this._paramValues[id];
    },
    getParams: function () {
        return this._paramValues;
    },
    getRawParam: function (id) {
        return this._rawValues[id];
    },
    getRawParams: function () {
        return this._rawValues;
    },
    getDefinitions: function () {
        return this._params;
    },
    stringifyParams: function (params) {
        return JSON.stringify(
        params,
        (key, value) => {
            if (typeof value === "bigint") return value.toString();
            return value;
        },
        2
        );
    },
    };
    window.addEventListener("message", (event) => {
    if (event.data === "fxhash_getHash") {
        parent.postMessage(
        {
            id: "fxhash_getHash",
            data: window.$fx.hash,
        },
        "*"
        );
    }

    if (event.data === "fxhash_getFeatures") {
        parent.postMessage(
        {
            id: "fxhash_getFeatures",
            data: window.$fx.getFeatures(),
        },
        "*"
        );
    }

    if (event.data === "fxhash_getParams") {
        parent.postMessage(
        {
            id: "fxhash_getParams",
            data: {
            definitions: window.$fx.getDefinitions(),
            values: window.$fx.getRawParams(),
            },
        },
        "*"
        );
    }
    });
    // END NEW

    //---- /do not edit the following code
    </script>
  <body>
    <div class="ui-frame">
      <div class="ui-navbar">
        {% include header.md %}
      </div>
      <div class="ui-content">
        {{ content }}
      </div>
    </div>
    {% include scripts.md %}
  </body>
</html>
