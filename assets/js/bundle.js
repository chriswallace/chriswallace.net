/*! For license information please see bundle.js.LICENSE.txt */
(() => {
  var r = {
      46: (r, e, t) => {
        var n;
        !(function () {
          "use strict";
          var a = 0.5 * (Math.sqrt(3) - 1),
            o = (3 - Math.sqrt(3)) / 6,
            f = 1 / 6,
            i = (Math.sqrt(5) - 1) / 4,
            c = (5 - Math.sqrt(5)) / 20;
          function u(r) {
            var e;
            (e =
              "function" == typeof r
                ? r
                : r
                ? (function () {
                    var r,
                      e = 0,
                      t = 0,
                      n = 0,
                      a = 1,
                      o =
                        ((r = 4022871197),
                        function (e) {
                          e = e.toString();
                          for (var t = 0; t < e.length; t++) {
                            var n =
                              0.02519603282416938 * (r += e.charCodeAt(t));
                            (n -= r = n >>> 0),
                              (r = (n *= r) >>> 0),
                              (r += 4294967296 * (n -= r));
                          }
                          return 2.3283064365386963e-10 * (r >>> 0);
                        });
                    (e = o(" ")), (t = o(" ")), (n = o(" "));
                    for (var f = 0; f < arguments.length; f++)
                      (e -= o(arguments[f])) < 0 && (e += 1),
                        (t -= o(arguments[f])) < 0 && (t += 1),
                        (n -= o(arguments[f])) < 0 && (n += 1);
                    return (
                      (o = null),
                      function () {
                        var r = 2091639 * e + 2.3283064365386963e-10 * a;
                        return (e = t), (t = n), (n = r - (a = 0 | r));
                      }
                    );
                  })(r)
                : Math.random),
              (this.p = l(e)),
              (this.perm = new Uint8Array(512)),
              (this.permMod12 = new Uint8Array(512));
            for (var t = 0; t < 512; t++)
              (this.perm[t] = this.p[255 & t]),
                (this.permMod12[t] = this.perm[t] % 12);
          }
          function l(r) {
            var e,
              t = new Uint8Array(256);
            for (e = 0; e < 256; e++) t[e] = e;
            for (e = 0; e < 255; e++) {
              var n = e + ~~(r() * (256 - e)),
                a = t[e];
              (t[e] = t[n]), (t[n] = a);
            }
            return t;
          }
          (u.prototype = {
            grad3: new Float32Array([
              1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0,
              -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1,
            ]),
            grad4: new Float32Array([
              0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1,
              0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 1, 0, 1, 1, 1, 0, 1,
              -1, 1, 0, -1, 1, 1, 0, -1, -1, -1, 0, 1, 1, -1, 0, 1, -1, -1, 0,
              -1, 1, -1, 0, -1, -1, 1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1,
              0, -1, -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1, 1,
              1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1,
              1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0,
            ]),
            noise2D: function (r, e) {
              var t,
                n,
                f = this.permMod12,
                i = this.perm,
                c = this.grad3,
                u = 0,
                l = 0,
                h = 0,
                s = (r + e) * a,
                d = Math.floor(r + s),
                b = Math.floor(e + s),
                g = (d + b) * o,
                p = r - (d - g),
                v = e - (b - g);
              p > v ? ((t = 1), (n = 0)) : ((t = 0), (n = 1));
              var m = p - t + o,
                y = v - n + o,
                w = p - 1 + 2 * o,
                k = v - 1 + 2 * o,
                M = 255 & d,
                x = 255 & b,
                _ = 0.5 - p * p - v * v;
              if (_ >= 0) {
                var E = 3 * f[M + i[x]];
                u = (_ *= _) * _ * (c[E] * p + c[E + 1] * v);
              }
              var A = 0.5 - m * m - y * y;
              if (A >= 0) {
                var N = 3 * f[M + t + i[x + n]];
                l = (A *= A) * A * (c[N] * m + c[N + 1] * y);
              }
              var F = 0.5 - w * w - k * k;
              if (F >= 0) {
                var P = 3 * f[M + 1 + i[x + 1]];
                h = (F *= F) * F * (c[P] * w + c[P + 1] * k);
              }
              return 70 * (u + l + h);
            },
            noise3D: function (r, e, t) {
              var n,
                a,
                o,
                i,
                c,
                u,
                l,
                h,
                s,
                d,
                b = this.permMod12,
                g = this.perm,
                p = this.grad3,
                v = (r + e + t) * (1 / 3),
                m = Math.floor(r + v),
                y = Math.floor(e + v),
                w = Math.floor(t + v),
                k = (m + y + w) * f,
                M = r - (m - k),
                x = e - (y - k),
                _ = t - (w - k);
              M >= x
                ? x >= _
                  ? ((c = 1), (u = 0), (l = 0), (h = 1), (s = 1), (d = 0))
                  : M >= _
                  ? ((c = 1), (u = 0), (l = 0), (h = 1), (s = 0), (d = 1))
                  : ((c = 0), (u = 0), (l = 1), (h = 1), (s = 0), (d = 1))
                : x < _
                ? ((c = 0), (u = 0), (l = 1), (h = 0), (s = 1), (d = 1))
                : M < _
                ? ((c = 0), (u = 1), (l = 0), (h = 0), (s = 1), (d = 1))
                : ((c = 0), (u = 1), (l = 0), (h = 1), (s = 1), (d = 0));
              var E = M - c + f,
                A = x - u + f,
                N = _ - l + f,
                F = M - h + 2 * f,
                P = x - s + 2 * f,
                R = _ - d + 2 * f,
                T = M - 1 + 0.5,
                C = x - 1 + 0.5,
                S = _ - 1 + 0.5,
                B = 255 & m,
                D = 255 & y,
                L = 255 & w,
                I = 0.6 - M * M - x * x - _ * _;
              if (I < 0) n = 0;
              else {
                var O = 3 * b[B + g[D + g[L]]];
                n = (I *= I) * I * (p[O] * M + p[O + 1] * x + p[O + 2] * _);
              }
              var U = 0.6 - E * E - A * A - N * N;
              if (U < 0) a = 0;
              else {
                var G = 3 * b[B + c + g[D + u + g[L + l]]];
                a = (U *= U) * U * (p[G] * E + p[G + 1] * A + p[G + 2] * N);
              }
              var q = 0.6 - F * F - P * P - R * R;
              if (q < 0) o = 0;
              else {
                var j = 3 * b[B + h + g[D + s + g[L + d]]];
                o = (q *= q) * q * (p[j] * F + p[j + 1] * P + p[j + 2] * R);
              }
              var X = 0.6 - T * T - C * C - S * S;
              if (X < 0) i = 0;
              else {
                var Y = 3 * b[B + 1 + g[D + 1 + g[L + 1]]];
                i = (X *= X) * X * (p[Y] * T + p[Y + 1] * C + p[Y + 2] * S);
              }
              return 32 * (n + a + o + i);
            },
            noise4D: function (r, e, t, n) {
              var a,
                o,
                f,
                u,
                l,
                h,
                s,
                d,
                b,
                g,
                p,
                v,
                m,
                y,
                w,
                k,
                M,
                x = this.perm,
                _ = this.grad4,
                E = (r + e + t + n) * i,
                A = Math.floor(r + E),
                N = Math.floor(e + E),
                F = Math.floor(t + E),
                P = Math.floor(n + E),
                R = (A + N + F + P) * c,
                T = r - (A - R),
                C = e - (N - R),
                S = t - (F - R),
                B = n - (P - R),
                D = 0,
                L = 0,
                I = 0,
                O = 0;
              T > C ? D++ : L++,
                T > S ? D++ : I++,
                T > B ? D++ : O++,
                C > S ? L++ : I++,
                C > B ? L++ : O++,
                S > B ? I++ : O++;
              var U = T - (h = D >= 3 ? 1 : 0) + c,
                G = C - (s = L >= 3 ? 1 : 0) + c,
                q = S - (d = I >= 3 ? 1 : 0) + c,
                j = B - (b = O >= 3 ? 1 : 0) + c,
                X = T - (g = D >= 2 ? 1 : 0) + 2 * c,
                Y = C - (p = L >= 2 ? 1 : 0) + 2 * c,
                $ = S - (v = I >= 2 ? 1 : 0) + 2 * c,
                z = B - (m = O >= 2 ? 1 : 0) + 2 * c,
                W = T - (y = D >= 1 ? 1 : 0) + 3 * c,
                V = C - (w = L >= 1 ? 1 : 0) + 3 * c,
                H = S - (k = I >= 1 ? 1 : 0) + 3 * c,
                K = B - (M = O >= 1 ? 1 : 0) + 3 * c,
                Z = T - 1 + 4 * c,
                J = C - 1 + 4 * c,
                Q = S - 1 + 4 * c,
                rr = B - 1 + 4 * c,
                er = 255 & A,
                tr = 255 & N,
                nr = 255 & F,
                ar = 255 & P,
                or = 0.6 - T * T - C * C - S * S - B * B;
              if (or < 0) a = 0;
              else {
                var fr = (x[er + x[tr + x[nr + x[ar]]]] % 32) * 4;
                a =
                  (or *= or) *
                  or *
                  (_[fr] * T + _[fr + 1] * C + _[fr + 2] * S + _[fr + 3] * B);
              }
              var ir = 0.6 - U * U - G * G - q * q - j * j;
              if (ir < 0) o = 0;
              else {
                var cr =
                  (x[er + h + x[tr + s + x[nr + d + x[ar + b]]]] % 32) * 4;
                o =
                  (ir *= ir) *
                  ir *
                  (_[cr] * U + _[cr + 1] * G + _[cr + 2] * q + _[cr + 3] * j);
              }
              var ur = 0.6 - X * X - Y * Y - $ * $ - z * z;
              if (ur < 0) f = 0;
              else {
                var lr =
                  (x[er + g + x[tr + p + x[nr + v + x[ar + m]]]] % 32) * 4;
                f =
                  (ur *= ur) *
                  ur *
                  (_[lr] * X + _[lr + 1] * Y + _[lr + 2] * $ + _[lr + 3] * z);
              }
              var hr = 0.6 - W * W - V * V - H * H - K * K;
              if (hr < 0) u = 0;
              else {
                var sr =
                  (x[er + y + x[tr + w + x[nr + k + x[ar + M]]]] % 32) * 4;
                u =
                  (hr *= hr) *
                  hr *
                  (_[sr] * W + _[sr + 1] * V + _[sr + 2] * H + _[sr + 3] * K);
              }
              var dr = 0.6 - Z * Z - J * J - Q * Q - rr * rr;
              if (dr < 0) l = 0;
              else {
                var br =
                  (x[er + 1 + x[tr + 1 + x[nr + 1 + x[ar + 1]]]] % 32) * 4;
                l =
                  (dr *= dr) *
                  dr *
                  (_[br] * Z + _[br + 1] * J + _[br + 2] * Q + _[br + 3] * rr);
              }
              return 27 * (a + o + f + u + l);
            },
          }),
            (u._buildPermutationTable = l),
            void 0 !==
              (n = function () {
                return u;
              }.call(e, t, e, r)) && (r.exports = n),
            (e.SimplexNoise = u),
            (r.exports = u);
        })();
      },
      670: function (r) {
        r.exports = (function () {
          "use strict";
          for (
            var r = function (r, e, t) {
                return (
                  void 0 === e && (e = 0),
                  void 0 === t && (t = 1),
                  r < e ? e : r > t ? t : r
                );
              },
              e = r,
              t = {},
              n = 0,
              a = [
                "Boolean",
                "Number",
                "String",
                "Function",
                "Array",
                "Date",
                "RegExp",
                "Undefined",
                "Null",
              ];
            n < a.length;
            n += 1
          ) {
            var o = a[n];
            t["[object " + o + "]"] = o.toLowerCase();
          }
          var f = function (r) {
              return t[Object.prototype.toString.call(r)] || "object";
            },
            i = f,
            c = f,
            u = Math.PI,
            l = {
              clip_rgb: function (r) {
                (r._clipped = !1), (r._unclipped = r.slice(0));
                for (var t = 0; t <= 3; t++)
                  t < 3
                    ? ((r[t] < 0 || r[t] > 255) && (r._clipped = !0),
                      (r[t] = e(r[t], 0, 255)))
                    : 3 === t && (r[t] = e(r[t], 0, 1));
                return r;
              },
              limit: r,
              type: f,
              unpack: function (r, e) {
                return (
                  void 0 === e && (e = null),
                  r.length >= 3
                    ? Array.prototype.slice.call(r)
                    : "object" == i(r[0]) && e
                    ? e
                        .split("")
                        .filter(function (e) {
                          return void 0 !== r[0][e];
                        })
                        .map(function (e) {
                          return r[0][e];
                        })
                    : r[0]
                );
              },
              last: function (r) {
                if (r.length < 2) return null;
                var e = r.length - 1;
                return "string" == c(r[e]) ? r[e].toLowerCase() : null;
              },
              PI: u,
              TWOPI: 2 * u,
              PITHIRD: u / 3,
              DEG2RAD: u / 180,
              RAD2DEG: 180 / u,
            },
            h = { format: {}, autodetect: [] },
            s = l.last,
            d = l.clip_rgb,
            b = l.type,
            g = h,
            p = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t = this;
              if (
                "object" === b(r[0]) &&
                r[0].constructor &&
                r[0].constructor === this.constructor
              )
                return r[0];
              var n = s(r),
                a = !1;
              if (!n) {
                (a = !0),
                  g.sorted ||
                    ((g.autodetect = g.autodetect.sort(function (r, e) {
                      return e.p - r.p;
                    })),
                    (g.sorted = !0));
                for (var o = 0, f = g.autodetect; o < f.length; o += 1) {
                  var i = f[o];
                  if ((n = i.test.apply(i, r))) break;
                }
              }
              if (!g.format[n]) throw new Error("unknown format: " + r);
              var c = g.format[n].apply(null, a ? r : r.slice(0, -1));
              (t._rgb = d(c)), 3 === t._rgb.length && t._rgb.push(1);
            };
          p.prototype.toString = function () {
            return "function" == b(this.hex)
              ? this.hex()
              : "[" + this._rgb.join(",") + "]";
          };
          var v = p,
            m = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              return new (Function.prototype.bind.apply(
                m.Color,
                [null].concat(r)
              ))();
            };
          (m.Color = v), (m.version = "2.4.2");
          var y = m,
            w = l.unpack,
            k = Math.max,
            M = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t = w(r, "rgb"),
                n = t[0],
                a = t[1],
                o = t[2],
                f = 1 - k((n /= 255), k((a /= 255), (o /= 255))),
                i = f < 1 ? 1 / (1 - f) : 0;
              return [(1 - n - f) * i, (1 - a - f) * i, (1 - o - f) * i, f];
            },
            x = l.unpack,
            _ = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t = (r = x(r, "cmyk"))[0],
                n = r[1],
                a = r[2],
                o = r[3],
                f = r.length > 4 ? r[4] : 1;
              return 1 === o
                ? [0, 0, 0, f]
                : [
                    t >= 1 ? 0 : 255 * (1 - t) * (1 - o),
                    n >= 1 ? 0 : 255 * (1 - n) * (1 - o),
                    a >= 1 ? 0 : 255 * (1 - a) * (1 - o),
                    f,
                  ];
            },
            E = y,
            A = v,
            N = h,
            F = l.unpack,
            P = l.type,
            R = M;
          (A.prototype.cmyk = function () {
            return R(this._rgb);
          }),
            (E.cmyk = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              return new (Function.prototype.bind.apply(
                A,
                [null].concat(r, ["cmyk"])
              ))();
            }),
            (N.format.cmyk = _),
            N.autodetect.push({
              p: 2,
              test: function () {
                for (var r = [], e = arguments.length; e--; )
                  r[e] = arguments[e];
                if (((r = F(r, "cmyk")), "array" === P(r) && 4 === r.length))
                  return "cmyk";
              },
            });
          var T = l.unpack,
            C = l.last,
            S = function (r) {
              return Math.round(100 * r) / 100;
            },
            B = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t = T(r, "hsla"),
                n = C(r) || "lsa";
              return (
                (t[0] = S(t[0] || 0)),
                (t[1] = S(100 * t[1]) + "%"),
                (t[2] = S(100 * t[2]) + "%"),
                "hsla" === n || (t.length > 3 && t[3] < 1)
                  ? ((t[3] = t.length > 3 ? t[3] : 1), (n = "hsla"))
                  : (t.length = 3),
                n + "(" + t.join(",") + ")"
              );
            },
            D = l.unpack,
            L = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t = (r = D(r, "rgba"))[0],
                n = r[1],
                a = r[2];
              (t /= 255), (n /= 255), (a /= 255);
              var o,
                f,
                i = Math.min(t, n, a),
                c = Math.max(t, n, a),
                u = (c + i) / 2;
              return (
                c === i
                  ? ((o = 0), (f = Number.NaN))
                  : (o = u < 0.5 ? (c - i) / (c + i) : (c - i) / (2 - c - i)),
                t == c
                  ? (f = (n - a) / (c - i))
                  : n == c
                  ? (f = 2 + (a - t) / (c - i))
                  : a == c && (f = 4 + (t - n) / (c - i)),
                (f *= 60) < 0 && (f += 360),
                r.length > 3 && void 0 !== r[3] ? [f, o, u, r[3]] : [f, o, u]
              );
            },
            I = l.unpack,
            O = l.last,
            U = B,
            G = L,
            q = Math.round,
            j = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t = I(r, "rgba"),
                n = O(r) || "rgb";
              return "hsl" == n.substr(0, 3)
                ? U(G(t), n)
                : ((t[0] = q(t[0])),
                  (t[1] = q(t[1])),
                  (t[2] = q(t[2])),
                  ("rgba" === n || (t.length > 3 && t[3] < 1)) &&
                    ((t[3] = t.length > 3 ? t[3] : 1), (n = "rgba")),
                  n + "(" + t.slice(0, "rgb" === n ? 3 : 4).join(",") + ")");
            },
            X = l.unpack,
            Y = Math.round,
            $ = function () {
              for (var r, e = [], t = arguments.length; t--; )
                e[t] = arguments[t];
              var n,
                a,
                o,
                f = (e = X(e, "hsl"))[0],
                i = e[1],
                c = e[2];
              if (0 === i) n = a = o = 255 * c;
              else {
                var u = [0, 0, 0],
                  l = [0, 0, 0],
                  h = c < 0.5 ? c * (1 + i) : c + i - c * i,
                  s = 2 * c - h,
                  d = f / 360;
                (u[0] = d + 1 / 3), (u[1] = d), (u[2] = d - 1 / 3);
                for (var b = 0; b < 3; b++)
                  u[b] < 0 && (u[b] += 1),
                    u[b] > 1 && (u[b] -= 1),
                    6 * u[b] < 1
                      ? (l[b] = s + 6 * (h - s) * u[b])
                      : 2 * u[b] < 1
                      ? (l[b] = h)
                      : 3 * u[b] < 2
                      ? (l[b] = s + (h - s) * (2 / 3 - u[b]) * 6)
                      : (l[b] = s);
                (n = (r = [Y(255 * l[0]), Y(255 * l[1]), Y(255 * l[2])])[0]),
                  (a = r[1]),
                  (o = r[2]);
              }
              return e.length > 3 ? [n, a, o, e[3]] : [n, a, o, 1];
            },
            z = $,
            W = h,
            V = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/,
            H =
              /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/,
            K =
              /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/,
            Z =
              /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/,
            J =
              /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/,
            Q =
              /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/,
            rr = Math.round,
            er = function (r) {
              var e;
              if (((r = r.toLowerCase().trim()), W.format.named))
                try {
                  return W.format.named(r);
                } catch (r) {}
              if ((e = r.match(V))) {
                for (var t = e.slice(1, 4), n = 0; n < 3; n++) t[n] = +t[n];
                return (t[3] = 1), t;
              }
              if ((e = r.match(H))) {
                for (var a = e.slice(1, 5), o = 0; o < 4; o++) a[o] = +a[o];
                return a;
              }
              if ((e = r.match(K))) {
                for (var f = e.slice(1, 4), i = 0; i < 3; i++)
                  f[i] = rr(2.55 * f[i]);
                return (f[3] = 1), f;
              }
              if ((e = r.match(Z))) {
                for (var c = e.slice(1, 5), u = 0; u < 3; u++)
                  c[u] = rr(2.55 * c[u]);
                return (c[3] = +c[3]), c;
              }
              if ((e = r.match(J))) {
                var l = e.slice(1, 4);
                (l[1] *= 0.01), (l[2] *= 0.01);
                var h = z(l);
                return (h[3] = 1), h;
              }
              if ((e = r.match(Q))) {
                var s = e.slice(1, 4);
                (s[1] *= 0.01), (s[2] *= 0.01);
                var d = z(s);
                return (d[3] = +e[4]), d;
              }
            };
          er.test = function (r) {
            return (
              V.test(r) ||
              H.test(r) ||
              K.test(r) ||
              Z.test(r) ||
              J.test(r) ||
              Q.test(r)
            );
          };
          var tr = y,
            nr = v,
            ar = h,
            or = l.type,
            fr = j,
            ir = er;
          (nr.prototype.css = function (r) {
            return fr(this._rgb, r);
          }),
            (tr.css = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              return new (Function.prototype.bind.apply(
                nr,
                [null].concat(r, ["css"])
              ))();
            }),
            (ar.format.css = ir),
            ar.autodetect.push({
              p: 5,
              test: function (r) {
                for (var e = [], t = arguments.length - 1; t-- > 0; )
                  e[t] = arguments[t + 1];
                if (!e.length && "string" === or(r) && ir.test(r)) return "css";
              },
            });
          var cr = v,
            ur = y,
            lr = l.unpack;
          (h.format.gl = function () {
            for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
            var t = lr(r, "rgba");
            return (t[0] *= 255), (t[1] *= 255), (t[2] *= 255), t;
          }),
            (ur.gl = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              return new (Function.prototype.bind.apply(
                cr,
                [null].concat(r, ["gl"])
              ))();
            }),
            (cr.prototype.gl = function () {
              var r = this._rgb;
              return [r[0] / 255, r[1] / 255, r[2] / 255, r[3]];
            });
          var hr = l.unpack,
            sr = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t,
                n = hr(r, "rgb"),
                a = n[0],
                o = n[1],
                f = n[2],
                i = Math.min(a, o, f),
                c = Math.max(a, o, f),
                u = c - i,
                l = (100 * u) / 255,
                h = (i / (255 - u)) * 100;
              return (
                0 === u
                  ? (t = Number.NaN)
                  : (a === c && (t = (o - f) / u),
                    o === c && (t = 2 + (f - a) / u),
                    f === c && (t = 4 + (a - o) / u),
                    (t *= 60) < 0 && (t += 360)),
                [t, l, h]
              );
            },
            dr = l.unpack,
            br = Math.floor,
            gr = function () {
              for (var r, e, t, n, a, o, f = [], i = arguments.length; i--; )
                f[i] = arguments[i];
              var c,
                u,
                l,
                h = (f = dr(f, "hcg"))[0],
                s = f[1],
                d = f[2];
              d *= 255;
              var b = 255 * s;
              if (0 === s) c = u = l = d;
              else {
                360 === h && (h = 0),
                  h > 360 && (h -= 360),
                  h < 0 && (h += 360);
                var g = br((h /= 60)),
                  p = h - g,
                  v = d * (1 - s),
                  m = v + b * (1 - p),
                  y = v + b * p,
                  w = v + b;
                switch (g) {
                  case 0:
                    (c = (r = [w, y, v])[0]), (u = r[1]), (l = r[2]);
                    break;
                  case 1:
                    (c = (e = [m, w, v])[0]), (u = e[1]), (l = e[2]);
                    break;
                  case 2:
                    (c = (t = [v, w, y])[0]), (u = t[1]), (l = t[2]);
                    break;
                  case 3:
                    (c = (n = [v, m, w])[0]), (u = n[1]), (l = n[2]);
                    break;
                  case 4:
                    (c = (a = [y, v, w])[0]), (u = a[1]), (l = a[2]);
                    break;
                  case 5:
                    (c = (o = [w, v, m])[0]), (u = o[1]), (l = o[2]);
                }
              }
              return [c, u, l, f.length > 3 ? f[3] : 1];
            },
            pr = l.unpack,
            vr = l.type,
            mr = y,
            yr = v,
            wr = h,
            kr = sr;
          (yr.prototype.hcg = function () {
            return kr(this._rgb);
          }),
            (mr.hcg = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              return new (Function.prototype.bind.apply(
                yr,
                [null].concat(r, ["hcg"])
              ))();
            }),
            (wr.format.hcg = gr),
            wr.autodetect.push({
              p: 1,
              test: function () {
                for (var r = [], e = arguments.length; e--; )
                  r[e] = arguments[e];
                if (((r = pr(r, "hcg")), "array" === vr(r) && 3 === r.length))
                  return "hcg";
              },
            });
          var Mr = l.unpack,
            xr = l.last,
            _r = Math.round,
            Er = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t = Mr(r, "rgba"),
                n = t[0],
                a = t[1],
                o = t[2],
                f = t[3],
                i = xr(r) || "auto";
              void 0 === f && (f = 1),
                "auto" === i && (i = f < 1 ? "rgba" : "rgb");
              var c =
                "000000" +
                (
                  ((n = _r(n)) << 16) |
                  ((a = _r(a)) << 8) |
                  (o = _r(o))
                ).toString(16);
              c = c.substr(c.length - 6);
              var u = "0" + _r(255 * f).toString(16);
              switch (((u = u.substr(u.length - 2)), i.toLowerCase())) {
                case "rgba":
                  return "#" + c + u;
                case "argb":
                  return "#" + u + c;
                default:
                  return "#" + c;
              }
            },
            Ar = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
            Nr = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/,
            Fr = function (r) {
              if (r.match(Ar)) {
                (4 !== r.length && 7 !== r.length) || (r = r.substr(1)),
                  3 === r.length &&
                    (r =
                      (r = r.split(""))[0] + r[0] + r[1] + r[1] + r[2] + r[2]);
                var e = parseInt(r, 16);
                return [e >> 16, (e >> 8) & 255, 255 & e, 1];
              }
              if (r.match(Nr)) {
                (5 !== r.length && 9 !== r.length) || (r = r.substr(1)),
                  4 === r.length &&
                    (r =
                      (r = r.split(""))[0] +
                      r[0] +
                      r[1] +
                      r[1] +
                      r[2] +
                      r[2] +
                      r[3] +
                      r[3]);
                var t = parseInt(r, 16);
                return [
                  (t >> 24) & 255,
                  (t >> 16) & 255,
                  (t >> 8) & 255,
                  Math.round(((255 & t) / 255) * 100) / 100,
                ];
              }
              throw new Error("unknown hex color: " + r);
            },
            Pr = y,
            Rr = v,
            Tr = l.type,
            Cr = h,
            Sr = Er;
          (Rr.prototype.hex = function (r) {
            return Sr(this._rgb, r);
          }),
            (Pr.hex = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              return new (Function.prototype.bind.apply(
                Rr,
                [null].concat(r, ["hex"])
              ))();
            }),
            (Cr.format.hex = Fr),
            Cr.autodetect.push({
              p: 4,
              test: function (r) {
                for (var e = [], t = arguments.length - 1; t-- > 0; )
                  e[t] = arguments[t + 1];
                if (
                  !e.length &&
                  "string" === Tr(r) &&
                  [3, 4, 5, 6, 7, 8, 9].indexOf(r.length) >= 0
                )
                  return "hex";
              },
            });
          var Br = l.unpack,
            Dr = l.TWOPI,
            Lr = Math.min,
            Ir = Math.sqrt,
            Or = Math.acos,
            Ur = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t,
                n = Br(r, "rgb"),
                a = n[0],
                o = n[1],
                f = n[2],
                i = Lr((a /= 255), (o /= 255), (f /= 255)),
                c = (a + o + f) / 3,
                u = c > 0 ? 1 - i / c : 0;
              return (
                0 === u
                  ? (t = NaN)
                  : ((t = (a - o + (a - f)) / 2),
                    (t /= Ir((a - o) * (a - o) + (a - f) * (o - f))),
                    (t = Or(t)),
                    f > o && (t = Dr - t),
                    (t /= Dr)),
                [360 * t, u, c]
              );
            },
            Gr = l.unpack,
            qr = l.limit,
            jr = l.TWOPI,
            Xr = l.PITHIRD,
            Yr = Math.cos,
            $r = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t,
                n,
                a,
                o = (r = Gr(r, "hsi"))[0],
                f = r[1],
                i = r[2];
              return (
                isNaN(o) && (o = 0),
                isNaN(f) && (f = 0),
                o > 360 && (o -= 360),
                o < 0 && (o += 360),
                (o /= 360) < 1 / 3
                  ? (n =
                      1 -
                      ((a = (1 - f) / 3) +
                        (t = (1 + (f * Yr(jr * o)) / Yr(Xr - jr * o)) / 3)))
                  : o < 2 / 3
                  ? (a =
                      1 -
                      ((t = (1 - f) / 3) +
                        (n =
                          (1 + (f * Yr(jr * (o -= 1 / 3))) / Yr(Xr - jr * o)) /
                          3)))
                  : (t =
                      1 -
                      ((n = (1 - f) / 3) +
                        (a =
                          (1 + (f * Yr(jr * (o -= 2 / 3))) / Yr(Xr - jr * o)) /
                          3))),
                [
                  255 * (t = qr(i * t * 3)),
                  255 * (n = qr(i * n * 3)),
                  255 * (a = qr(i * a * 3)),
                  r.length > 3 ? r[3] : 1,
                ]
              );
            },
            zr = l.unpack,
            Wr = l.type,
            Vr = y,
            Hr = v,
            Kr = h,
            Zr = Ur;
          (Hr.prototype.hsi = function () {
            return Zr(this._rgb);
          }),
            (Vr.hsi = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              return new (Function.prototype.bind.apply(
                Hr,
                [null].concat(r, ["hsi"])
              ))();
            }),
            (Kr.format.hsi = $r),
            Kr.autodetect.push({
              p: 2,
              test: function () {
                for (var r = [], e = arguments.length; e--; )
                  r[e] = arguments[e];
                if (((r = zr(r, "hsi")), "array" === Wr(r) && 3 === r.length))
                  return "hsi";
              },
            });
          var Jr = l.unpack,
            Qr = l.type,
            re = y,
            ee = v,
            te = h,
            ne = L;
          (ee.prototype.hsl = function () {
            return ne(this._rgb);
          }),
            (re.hsl = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              return new (Function.prototype.bind.apply(
                ee,
                [null].concat(r, ["hsl"])
              ))();
            }),
            (te.format.hsl = $),
            te.autodetect.push({
              p: 2,
              test: function () {
                for (var r = [], e = arguments.length; e--; )
                  r[e] = arguments[e];
                if (((r = Jr(r, "hsl")), "array" === Qr(r) && 3 === r.length))
                  return "hsl";
              },
            });
          var ae = l.unpack,
            oe = Math.min,
            fe = Math.max,
            ie = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t,
                n,
                a,
                o = (r = ae(r, "rgb"))[0],
                f = r[1],
                i = r[2],
                c = oe(o, f, i),
                u = fe(o, f, i),
                l = u - c;
              return (
                (a = u / 255),
                0 === u
                  ? ((t = Number.NaN), (n = 0))
                  : ((n = l / u),
                    o === u && (t = (f - i) / l),
                    f === u && (t = 2 + (i - o) / l),
                    i === u && (t = 4 + (o - f) / l),
                    (t *= 60) < 0 && (t += 360)),
                [t, n, a]
              );
            },
            ce = l.unpack,
            ue = Math.floor,
            le = function () {
              for (var r, e, t, n, a, o, f = [], i = arguments.length; i--; )
                f[i] = arguments[i];
              var c,
                u,
                l,
                h = (f = ce(f, "hsv"))[0],
                s = f[1],
                d = f[2];
              if (((d *= 255), 0 === s)) c = u = l = d;
              else {
                360 === h && (h = 0),
                  h > 360 && (h -= 360),
                  h < 0 && (h += 360);
                var b = ue((h /= 60)),
                  g = h - b,
                  p = d * (1 - s),
                  v = d * (1 - s * g),
                  m = d * (1 - s * (1 - g));
                switch (b) {
                  case 0:
                    (c = (r = [d, m, p])[0]), (u = r[1]), (l = r[2]);
                    break;
                  case 1:
                    (c = (e = [v, d, p])[0]), (u = e[1]), (l = e[2]);
                    break;
                  case 2:
                    (c = (t = [p, d, m])[0]), (u = t[1]), (l = t[2]);
                    break;
                  case 3:
                    (c = (n = [p, v, d])[0]), (u = n[1]), (l = n[2]);
                    break;
                  case 4:
                    (c = (a = [m, p, d])[0]), (u = a[1]), (l = a[2]);
                    break;
                  case 5:
                    (c = (o = [d, p, v])[0]), (u = o[1]), (l = o[2]);
                }
              }
              return [c, u, l, f.length > 3 ? f[3] : 1];
            },
            he = l.unpack,
            se = l.type,
            de = y,
            be = v,
            ge = h,
            pe = ie;
          (be.prototype.hsv = function () {
            return pe(this._rgb);
          }),
            (de.hsv = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              return new (Function.prototype.bind.apply(
                be,
                [null].concat(r, ["hsv"])
              ))();
            }),
            (ge.format.hsv = le),
            ge.autodetect.push({
              p: 2,
              test: function () {
                for (var r = [], e = arguments.length; e--; )
                  r[e] = arguments[e];
                if (((r = he(r, "hsv")), "array" === se(r) && 3 === r.length))
                  return "hsv";
              },
            });
          var ve = {
              Kn: 18,
              Xn: 0.95047,
              Yn: 1,
              Zn: 1.08883,
              t0: 0.137931034,
              t1: 0.206896552,
              t2: 0.12841855,
              t3: 0.008856452,
            },
            me = ve,
            ye = l.unpack,
            we = Math.pow,
            ke = function (r) {
              return (r /= 255) <= 0.04045
                ? r / 12.92
                : we((r + 0.055) / 1.055, 2.4);
            },
            Me = function (r) {
              return r > me.t3 ? we(r, 1 / 3) : r / me.t2 + me.t0;
            },
            xe = function (r, e, t) {
              return (
                (r = ke(r)),
                (e = ke(e)),
                (t = ke(t)),
                [
                  Me((0.4124564 * r + 0.3575761 * e + 0.1804375 * t) / me.Xn),
                  Me((0.2126729 * r + 0.7151522 * e + 0.072175 * t) / me.Yn),
                  Me((0.0193339 * r + 0.119192 * e + 0.9503041 * t) / me.Zn),
                ]
              );
            },
            _e = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t = ye(r, "rgb"),
                n = t[0],
                a = t[1],
                o = t[2],
                f = xe(n, a, o),
                i = f[0],
                c = f[1],
                u = 116 * c - 16;
              return [u < 0 ? 0 : u, 500 * (i - c), 200 * (c - f[2])];
            },
            Ee = ve,
            Ae = l.unpack,
            Ne = Math.pow,
            Fe = function (r) {
              return (
                255 *
                (r <= 0.00304 ? 12.92 * r : 1.055 * Ne(r, 1 / 2.4) - 0.055)
              );
            },
            Pe = function (r) {
              return r > Ee.t1 ? r * r * r : Ee.t2 * (r - Ee.t0);
            },
            Re = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t,
                n,
                a,
                o = (r = Ae(r, "lab"))[0],
                f = r[1],
                i = r[2];
              return (
                (n = (o + 16) / 116),
                (t = isNaN(f) ? n : n + f / 500),
                (a = isNaN(i) ? n : n - i / 200),
                (n = Ee.Yn * Pe(n)),
                (t = Ee.Xn * Pe(t)),
                (a = Ee.Zn * Pe(a)),
                [
                  Fe(3.2404542 * t - 1.5371385 * n - 0.4985314 * a),
                  Fe(-0.969266 * t + 1.8760108 * n + 0.041556 * a),
                  Fe(0.0556434 * t - 0.2040259 * n + 1.0572252 * a),
                  r.length > 3 ? r[3] : 1,
                ]
              );
            },
            Te = l.unpack,
            Ce = l.type,
            Se = y,
            Be = v,
            De = h,
            Le = _e;
          (Be.prototype.lab = function () {
            return Le(this._rgb);
          }),
            (Se.lab = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              return new (Function.prototype.bind.apply(
                Be,
                [null].concat(r, ["lab"])
              ))();
            }),
            (De.format.lab = Re),
            De.autodetect.push({
              p: 2,
              test: function () {
                for (var r = [], e = arguments.length; e--; )
                  r[e] = arguments[e];
                if (((r = Te(r, "lab")), "array" === Ce(r) && 3 === r.length))
                  return "lab";
              },
            });
          var Ie = l.unpack,
            Oe = l.RAD2DEG,
            Ue = Math.sqrt,
            Ge = Math.atan2,
            qe = Math.round,
            je = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t = Ie(r, "lab"),
                n = t[0],
                a = t[1],
                o = t[2],
                f = Ue(a * a + o * o),
                i = (Ge(o, a) * Oe + 360) % 360;
              return 0 === qe(1e4 * f) && (i = Number.NaN), [n, f, i];
            },
            Xe = l.unpack,
            Ye = _e,
            $e = je,
            ze = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t = Xe(r, "rgb"),
                n = t[0],
                a = t[1],
                o = t[2],
                f = Ye(n, a, o),
                i = f[0],
                c = f[1],
                u = f[2];
              return $e(i, c, u);
            },
            We = l.unpack,
            Ve = l.DEG2RAD,
            He = Math.sin,
            Ke = Math.cos,
            Ze = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t = We(r, "lch"),
                n = t[0],
                a = t[1],
                o = t[2];
              return isNaN(o) && (o = 0), [n, Ke((o *= Ve)) * a, He(o) * a];
            },
            Je = l.unpack,
            Qe = Ze,
            rt = Re,
            et = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t = (r = Je(r, "lch"))[0],
                n = r[1],
                a = r[2],
                o = Qe(t, n, a),
                f = o[0],
                i = o[1],
                c = o[2],
                u = rt(f, i, c);
              return [u[0], u[1], u[2], r.length > 3 ? r[3] : 1];
            },
            tt = l.unpack,
            nt = et,
            at = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t = tt(r, "hcl").reverse();
              return nt.apply(void 0, t);
            },
            ot = l.unpack,
            ft = l.type,
            it = y,
            ct = v,
            ut = h,
            lt = ze;
          (ct.prototype.lch = function () {
            return lt(this._rgb);
          }),
            (ct.prototype.hcl = function () {
              return lt(this._rgb).reverse();
            }),
            (it.lch = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              return new (Function.prototype.bind.apply(
                ct,
                [null].concat(r, ["lch"])
              ))();
            }),
            (it.hcl = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              return new (Function.prototype.bind.apply(
                ct,
                [null].concat(r, ["hcl"])
              ))();
            }),
            (ut.format.lch = et),
            (ut.format.hcl = at),
            ["lch", "hcl"].forEach(function (r) {
              return ut.autodetect.push({
                p: 2,
                test: function () {
                  for (var e = [], t = arguments.length; t--; )
                    e[t] = arguments[t];
                  if (((e = ot(e, r)), "array" === ft(e) && 3 === e.length))
                    return r;
                },
              });
            });
          var ht = {
              aliceblue: "#f0f8ff",
              antiquewhite: "#faebd7",
              aqua: "#00ffff",
              aquamarine: "#7fffd4",
              azure: "#f0ffff",
              beige: "#f5f5dc",
              bisque: "#ffe4c4",
              black: "#000000",
              blanchedalmond: "#ffebcd",
              blue: "#0000ff",
              blueviolet: "#8a2be2",
              brown: "#a52a2a",
              burlywood: "#deb887",
              cadetblue: "#5f9ea0",
              chartreuse: "#7fff00",
              chocolate: "#d2691e",
              coral: "#ff7f50",
              cornflower: "#6495ed",
              cornflowerblue: "#6495ed",
              cornsilk: "#fff8dc",
              crimson: "#dc143c",
              cyan: "#00ffff",
              darkblue: "#00008b",
              darkcyan: "#008b8b",
              darkgoldenrod: "#b8860b",
              darkgray: "#a9a9a9",
              darkgreen: "#006400",
              darkgrey: "#a9a9a9",
              darkkhaki: "#bdb76b",
              darkmagenta: "#8b008b",
              darkolivegreen: "#556b2f",
              darkorange: "#ff8c00",
              darkorchid: "#9932cc",
              darkred: "#8b0000",
              darksalmon: "#e9967a",
              darkseagreen: "#8fbc8f",
              darkslateblue: "#483d8b",
              darkslategray: "#2f4f4f",
              darkslategrey: "#2f4f4f",
              darkturquoise: "#00ced1",
              darkviolet: "#9400d3",
              deeppink: "#ff1493",
              deepskyblue: "#00bfff",
              dimgray: "#696969",
              dimgrey: "#696969",
              dodgerblue: "#1e90ff",
              firebrick: "#b22222",
              floralwhite: "#fffaf0",
              forestgreen: "#228b22",
              fuchsia: "#ff00ff",
              gainsboro: "#dcdcdc",
              ghostwhite: "#f8f8ff",
              gold: "#ffd700",
              goldenrod: "#daa520",
              gray: "#808080",
              green: "#008000",
              greenyellow: "#adff2f",
              grey: "#808080",
              honeydew: "#f0fff0",
              hotpink: "#ff69b4",
              indianred: "#cd5c5c",
              indigo: "#4b0082",
              ivory: "#fffff0",
              khaki: "#f0e68c",
              laserlemon: "#ffff54",
              lavender: "#e6e6fa",
              lavenderblush: "#fff0f5",
              lawngreen: "#7cfc00",
              lemonchiffon: "#fffacd",
              lightblue: "#add8e6",
              lightcoral: "#f08080",
              lightcyan: "#e0ffff",
              lightgoldenrod: "#fafad2",
              lightgoldenrodyellow: "#fafad2",
              lightgray: "#d3d3d3",
              lightgreen: "#90ee90",
              lightgrey: "#d3d3d3",
              lightpink: "#ffb6c1",
              lightsalmon: "#ffa07a",
              lightseagreen: "#20b2aa",
              lightskyblue: "#87cefa",
              lightslategray: "#778899",
              lightslategrey: "#778899",
              lightsteelblue: "#b0c4de",
              lightyellow: "#ffffe0",
              lime: "#00ff00",
              limegreen: "#32cd32",
              linen: "#faf0e6",
              magenta: "#ff00ff",
              maroon: "#800000",
              maroon2: "#7f0000",
              maroon3: "#b03060",
              mediumaquamarine: "#66cdaa",
              mediumblue: "#0000cd",
              mediumorchid: "#ba55d3",
              mediumpurple: "#9370db",
              mediumseagreen: "#3cb371",
              mediumslateblue: "#7b68ee",
              mediumspringgreen: "#00fa9a",
              mediumturquoise: "#48d1cc",
              mediumvioletred: "#c71585",
              midnightblue: "#191970",
              mintcream: "#f5fffa",
              mistyrose: "#ffe4e1",
              moccasin: "#ffe4b5",
              navajowhite: "#ffdead",
              navy: "#000080",
              oldlace: "#fdf5e6",
              olive: "#808000",
              olivedrab: "#6b8e23",
              orange: "#ffa500",
              orangered: "#ff4500",
              orchid: "#da70d6",
              palegoldenrod: "#eee8aa",
              palegreen: "#98fb98",
              paleturquoise: "#afeeee",
              palevioletred: "#db7093",
              papayawhip: "#ffefd5",
              peachpuff: "#ffdab9",
              peru: "#cd853f",
              pink: "#ffc0cb",
              plum: "#dda0dd",
              powderblue: "#b0e0e6",
              purple: "#800080",
              purple2: "#7f007f",
              purple3: "#a020f0",
              rebeccapurple: "#663399",
              red: "#ff0000",
              rosybrown: "#bc8f8f",
              royalblue: "#4169e1",
              saddlebrown: "#8b4513",
              salmon: "#fa8072",
              sandybrown: "#f4a460",
              seagreen: "#2e8b57",
              seashell: "#fff5ee",
              sienna: "#a0522d",
              silver: "#c0c0c0",
              skyblue: "#87ceeb",
              slateblue: "#6a5acd",
              slategray: "#708090",
              slategrey: "#708090",
              snow: "#fffafa",
              springgreen: "#00ff7f",
              steelblue: "#4682b4",
              tan: "#d2b48c",
              teal: "#008080",
              thistle: "#d8bfd8",
              tomato: "#ff6347",
              turquoise: "#40e0d0",
              violet: "#ee82ee",
              wheat: "#f5deb3",
              white: "#ffffff",
              whitesmoke: "#f5f5f5",
              yellow: "#ffff00",
              yellowgreen: "#9acd32",
            },
            st = h,
            dt = l.type,
            bt = ht,
            gt = Fr,
            pt = Er;
          (v.prototype.name = function () {
            for (
              var r = pt(this._rgb, "rgb"), e = 0, t = Object.keys(bt);
              e < t.length;
              e += 1
            ) {
              var n = t[e];
              if (bt[n] === r) return n.toLowerCase();
            }
            return r;
          }),
            (st.format.named = function (r) {
              if (((r = r.toLowerCase()), bt[r])) return gt(bt[r]);
              throw new Error("unknown color name: " + r);
            }),
            st.autodetect.push({
              p: 5,
              test: function (r) {
                for (var e = [], t = arguments.length - 1; t-- > 0; )
                  e[t] = arguments[t + 1];
                if (!e.length && "string" === dt(r) && bt[r.toLowerCase()])
                  return "named";
              },
            });
          var vt = l.unpack,
            mt = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t = vt(r, "rgb");
              return (t[0] << 16) + (t[1] << 8) + t[2];
            },
            yt = l.type,
            wt = y,
            kt = v,
            Mt = h,
            xt = l.type,
            _t = mt;
          (kt.prototype.num = function () {
            return _t(this._rgb);
          }),
            (wt.num = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              return new (Function.prototype.bind.apply(
                kt,
                [null].concat(r, ["num"])
              ))();
            }),
            (Mt.format.num = function (r) {
              if ("number" == yt(r) && r >= 0 && r <= 16777215)
                return [r >> 16, (r >> 8) & 255, 255 & r, 1];
              throw new Error("unknown num color: " + r);
            }),
            Mt.autodetect.push({
              p: 5,
              test: function () {
                for (var r = [], e = arguments.length; e--; )
                  r[e] = arguments[e];
                if (
                  1 === r.length &&
                  "number" === xt(r[0]) &&
                  r[0] >= 0 &&
                  r[0] <= 16777215
                )
                  return "num";
              },
            });
          var Et = y,
            At = v,
            Nt = h,
            Ft = l.unpack,
            Pt = l.type,
            Rt = Math.round;
          (At.prototype.rgb = function (r) {
            return (
              void 0 === r && (r = !0),
              !1 === r ? this._rgb.slice(0, 3) : this._rgb.slice(0, 3).map(Rt)
            );
          }),
            (At.prototype.rgba = function (r) {
              return (
                void 0 === r && (r = !0),
                this._rgb.slice(0, 4).map(function (e, t) {
                  return t < 3 ? (!1 === r ? e : Rt(e)) : e;
                })
              );
            }),
            (Et.rgb = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              return new (Function.prototype.bind.apply(
                At,
                [null].concat(r, ["rgb"])
              ))();
            }),
            (Nt.format.rgb = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t = Ft(r, "rgba");
              return void 0 === t[3] && (t[3] = 1), t;
            }),
            Nt.autodetect.push({
              p: 3,
              test: function () {
                for (var r = [], e = arguments.length; e--; )
                  r[e] = arguments[e];
                if (
                  ((r = Ft(r, "rgba")),
                  "array" === Pt(r) &&
                    (3 === r.length ||
                      (4 === r.length &&
                        "number" == Pt(r[3]) &&
                        r[3] >= 0 &&
                        r[3] <= 1)))
                )
                  return "rgb";
              },
            });
          var Tt = Math.log,
            Ct = function (r) {
              var e,
                t,
                n,
                a = r / 100;
              return (
                a < 66
                  ? ((e = 255),
                    (t =
                      a < 6
                        ? 0
                        : -155.25485562709179 -
                          0.44596950469579133 * (t = a - 2) +
                          104.49216199393888 * Tt(t)),
                    (n =
                      a < 20
                        ? 0
                        : 0.8274096064007395 * (n = a - 10) -
                          254.76935184120902 +
                          115.67994401066147 * Tt(n)))
                  : ((e =
                      351.97690566805693 +
                      0.114206453784165 * (e = a - 55) -
                      40.25366309332127 * Tt(e)),
                    (t =
                      325.4494125711974 +
                      0.07943456536662342 * (t = a - 50) -
                      28.0852963507957 * Tt(t)),
                    (n = 255)),
                [e, t, n, 1]
              );
            },
            St = Ct,
            Bt = l.unpack,
            Dt = Math.round,
            Lt = y,
            It = v,
            Ot = h,
            Ut = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              for (
                var t, n = Bt(r, "rgb"), a = n[0], o = n[2], f = 1e3, i = 4e4;
                i - f > 0.4;

              ) {
                var c = St((t = 0.5 * (i + f)));
                c[2] / c[0] >= o / a ? (i = t) : (f = t);
              }
              return Dt(t);
            };
          (It.prototype.temp =
            It.prototype.kelvin =
            It.prototype.temperature =
              function () {
                return Ut(this._rgb);
              }),
            (Lt.temp =
              Lt.kelvin =
              Lt.temperature =
                function () {
                  for (var r = [], e = arguments.length; e--; )
                    r[e] = arguments[e];
                  return new (Function.prototype.bind.apply(
                    It,
                    [null].concat(r, ["temp"])
                  ))();
                }),
            (Ot.format.temp = Ot.format.kelvin = Ot.format.temperature = Ct);
          var Gt = l.unpack,
            qt = Math.cbrt,
            jt = Math.pow,
            Xt = Math.sign,
            Yt = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t = Gt(r, "rgb"),
                n = t[0],
                a = t[1],
                o = t[2],
                f = [$t(n / 255), $t(a / 255), $t(o / 255)],
                i = f[0],
                c = f[1],
                u = f[2],
                l = qt(0.4122214708 * i + 0.5363325363 * c + 0.0514459929 * u),
                h = qt(0.2119034982 * i + 0.6806995451 * c + 0.1073969566 * u),
                s = qt(0.0883024619 * i + 0.2817188376 * c + 0.6299787005 * u);
              return [
                0.2104542553 * l + 0.793617785 * h - 0.0040720468 * s,
                1.9779984951 * l - 2.428592205 * h + 0.4505937099 * s,
                0.0259040371 * l + 0.7827717662 * h - 0.808675766 * s,
              ];
            };
          function $t(r) {
            var e = Math.abs(r);
            return e < 0.04045
              ? r / 12.92
              : (Xt(r) || 1) * jt((e + 0.055) / 1.055, 2.4);
          }
          var zt = l.unpack,
            Wt = Math.pow,
            Vt = Math.sign,
            Ht = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t = (r = zt(r, "lab"))[0],
                n = r[1],
                a = r[2],
                o = Wt(t + 0.3963377774 * n + 0.2158037573 * a, 3),
                f = Wt(t - 0.1055613458 * n - 0.0638541728 * a, 3),
                i = Wt(t - 0.0894841775 * n - 1.291485548 * a, 3);
              return [
                255 *
                  Kt(4.0767416621 * o - 3.3077115913 * f + 0.2309699292 * i),
                255 *
                  Kt(-1.2684380046 * o + 2.6097574011 * f - 0.3413193965 * i),
                255 *
                  Kt(-0.0041960863 * o - 0.7034186147 * f + 1.707614701 * i),
                r.length > 3 ? r[3] : 1,
              ];
            };
          function Kt(r) {
            var e = Math.abs(r);
            return e > 0.0031308
              ? (Vt(r) || 1) * (1.055 * Wt(e, 1 / 2.4) - 0.055)
              : 12.92 * r;
          }
          var Zt = l.unpack,
            Jt = l.type,
            Qt = y,
            rn = v,
            en = h,
            tn = Yt;
          (rn.prototype.oklab = function () {
            return tn(this._rgb);
          }),
            (Qt.oklab = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              return new (Function.prototype.bind.apply(
                rn,
                [null].concat(r, ["oklab"])
              ))();
            }),
            (en.format.oklab = Ht),
            en.autodetect.push({
              p: 3,
              test: function () {
                for (var r = [], e = arguments.length; e--; )
                  r[e] = arguments[e];
                if (((r = Zt(r, "oklab")), "array" === Jt(r) && 3 === r.length))
                  return "oklab";
              },
            });
          var nn = l.unpack,
            an = Yt,
            on = je,
            fn = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t = nn(r, "rgb"),
                n = t[0],
                a = t[1],
                o = t[2],
                f = an(n, a, o),
                i = f[0],
                c = f[1],
                u = f[2];
              return on(i, c, u);
            },
            cn = l.unpack,
            un = Ze,
            ln = Ht,
            hn = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              var t = (r = cn(r, "lch"))[0],
                n = r[1],
                a = r[2],
                o = un(t, n, a),
                f = o[0],
                i = o[1],
                c = o[2],
                u = ln(f, i, c);
              return [u[0], u[1], u[2], r.length > 3 ? r[3] : 1];
            },
            sn = l.unpack,
            dn = l.type,
            bn = y,
            gn = v,
            pn = h,
            vn = fn;
          (gn.prototype.oklch = function () {
            return vn(this._rgb);
          }),
            (bn.oklch = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              return new (Function.prototype.bind.apply(
                gn,
                [null].concat(r, ["oklch"])
              ))();
            }),
            (pn.format.oklch = hn),
            pn.autodetect.push({
              p: 3,
              test: function () {
                for (var r = [], e = arguments.length; e--; )
                  r[e] = arguments[e];
                if (((r = sn(r, "oklch")), "array" === dn(r) && 3 === r.length))
                  return "oklch";
              },
            });
          var mn = v,
            yn = l.type;
          (mn.prototype.alpha = function (r, e) {
            return (
              void 0 === e && (e = !1),
              void 0 !== r && "number" === yn(r)
                ? e
                  ? ((this._rgb[3] = r), this)
                  : new mn([this._rgb[0], this._rgb[1], this._rgb[2], r], "rgb")
                : this._rgb[3]
            );
          }),
            (v.prototype.clipped = function () {
              return this._rgb._clipped || !1;
            });
          var wn = v,
            kn = ve;
          (wn.prototype.darken = function (r) {
            void 0 === r && (r = 1);
            var e = this.lab();
            return (
              (e[0] -= kn.Kn * r), new wn(e, "lab").alpha(this.alpha(), !0)
            );
          }),
            (wn.prototype.brighten = function (r) {
              return void 0 === r && (r = 1), this.darken(-r);
            }),
            (wn.prototype.darker = wn.prototype.darken),
            (wn.prototype.brighter = wn.prototype.brighten),
            (v.prototype.get = function (r) {
              var e = r.split("."),
                t = e[0],
                n = e[1],
                a = this[t]();
              if (n) {
                var o = t.indexOf(n) - ("ok" === t.substr(0, 2) ? 2 : 0);
                if (o > -1) return a[o];
                throw new Error("unknown channel " + n + " in mode " + t);
              }
              return a;
            });
          var Mn = v,
            xn = l.type,
            _n = Math.pow;
          Mn.prototype.luminance = function (r) {
            if (void 0 !== r && "number" === xn(r)) {
              if (0 === r) return new Mn([0, 0, 0, this._rgb[3]], "rgb");
              if (1 === r) return new Mn([255, 255, 255, this._rgb[3]], "rgb");
              var e = this.luminance(),
                t = 20,
                n = function (e, a) {
                  var o = e.interpolate(a, 0.5, "rgb"),
                    f = o.luminance();
                  return Math.abs(r - f) < 1e-7 || !t--
                    ? o
                    : f > r
                    ? n(e, o)
                    : n(o, a);
                },
                a = (
                  e > r
                    ? n(new Mn([0, 0, 0]), this)
                    : n(this, new Mn([255, 255, 255]))
                ).rgb();
              return new Mn(a.concat([this._rgb[3]]));
            }
            return En.apply(void 0, this._rgb.slice(0, 3));
          };
          var En = function (r, e, t) {
              return (
                0.2126 * (r = An(r)) + 0.7152 * (e = An(e)) + 0.0722 * An(t)
              );
            },
            An = function (r) {
              return (r /= 255) <= 0.03928
                ? r / 12.92
                : _n((r + 0.055) / 1.055, 2.4);
            },
            Nn = {},
            Fn = v,
            Pn = l.type,
            Rn = Nn,
            Tn = function (r, e, t) {
              void 0 === t && (t = 0.5);
              for (var n = [], a = arguments.length - 3; a-- > 0; )
                n[a] = arguments[a + 3];
              var o = n[0] || "lrgb";
              if ((Rn[o] || n.length || (o = Object.keys(Rn)[0]), !Rn[o]))
                throw new Error("interpolation mode " + o + " is not defined");
              return (
                "object" !== Pn(r) && (r = new Fn(r)),
                "object" !== Pn(e) && (e = new Fn(e)),
                Rn[o](r, e, t).alpha(r.alpha() + t * (e.alpha() - r.alpha()))
              );
            },
            Cn = v,
            Sn = Tn;
          Cn.prototype.mix = Cn.prototype.interpolate = function (r, e) {
            void 0 === e && (e = 0.5);
            for (var t = [], n = arguments.length - 2; n-- > 0; )
              t[n] = arguments[n + 2];
            return Sn.apply(void 0, [this, r, e].concat(t));
          };
          var Bn = v;
          Bn.prototype.premultiply = function (r) {
            void 0 === r && (r = !1);
            var e = this._rgb,
              t = e[3];
            return r
              ? ((this._rgb = [e[0] * t, e[1] * t, e[2] * t, t]), this)
              : new Bn([e[0] * t, e[1] * t, e[2] * t, t], "rgb");
          };
          var Dn = v,
            Ln = ve;
          (Dn.prototype.saturate = function (r) {
            void 0 === r && (r = 1);
            var e = this.lch();
            return (
              (e[1] += Ln.Kn * r),
              e[1] < 0 && (e[1] = 0),
              new Dn(e, "lch").alpha(this.alpha(), !0)
            );
          }),
            (Dn.prototype.desaturate = function (r) {
              return void 0 === r && (r = 1), this.saturate(-r);
            });
          var In = v,
            On = l.type;
          In.prototype.set = function (r, e, t) {
            void 0 === t && (t = !1);
            var n = r.split("."),
              a = n[0],
              o = n[1],
              f = this[a]();
            if (o) {
              var i = a.indexOf(o) - ("ok" === a.substr(0, 2) ? 2 : 0);
              if (i > -1) {
                if ("string" == On(e))
                  switch (e.charAt(0)) {
                    case "+":
                    case "-":
                      f[i] += +e;
                      break;
                    case "*":
                      f[i] *= +e.substr(1);
                      break;
                    case "/":
                      f[i] /= +e.substr(1);
                      break;
                    default:
                      f[i] = +e;
                  }
                else {
                  if ("number" !== On(e))
                    throw new Error("unsupported value for Color.set");
                  f[i] = e;
                }
                var c = new In(f, a);
                return t ? ((this._rgb = c._rgb), this) : c;
              }
              throw new Error("unknown channel " + o + " in mode " + a);
            }
            return f;
          };
          var Un = v;
          Nn.rgb = function (r, e, t) {
            var n = r._rgb,
              a = e._rgb;
            return new Un(
              n[0] + t * (a[0] - n[0]),
              n[1] + t * (a[1] - n[1]),
              n[2] + t * (a[2] - n[2]),
              "rgb"
            );
          };
          var Gn = v,
            qn = Math.sqrt,
            jn = Math.pow;
          Nn.lrgb = function (r, e, t) {
            var n = r._rgb,
              a = n[0],
              o = n[1],
              f = n[2],
              i = e._rgb,
              c = i[0],
              u = i[1],
              l = i[2];
            return new Gn(
              qn(jn(a, 2) * (1 - t) + jn(c, 2) * t),
              qn(jn(o, 2) * (1 - t) + jn(u, 2) * t),
              qn(jn(f, 2) * (1 - t) + jn(l, 2) * t),
              "rgb"
            );
          };
          var Xn = v;
          Nn.lab = function (r, e, t) {
            var n = r.lab(),
              a = e.lab();
            return new Xn(
              n[0] + t * (a[0] - n[0]),
              n[1] + t * (a[1] - n[1]),
              n[2] + t * (a[2] - n[2]),
              "lab"
            );
          };
          var Yn = v,
            $n = function (r, e, t, n) {
              var a, o, f, i, c, u, l, h, s, d, b, g, p;
              return (
                "hsl" === n
                  ? ((f = r.hsl()), (i = e.hsl()))
                  : "hsv" === n
                  ? ((f = r.hsv()), (i = e.hsv()))
                  : "hcg" === n
                  ? ((f = r.hcg()), (i = e.hcg()))
                  : "hsi" === n
                  ? ((f = r.hsi()), (i = e.hsi()))
                  : "lch" === n || "hcl" === n
                  ? ((n = "hcl"), (f = r.hcl()), (i = e.hcl()))
                  : "oklch" === n &&
                    ((f = r.oklch().reverse()), (i = e.oklch().reverse())),
                ("h" !== n.substr(0, 1) && "oklch" !== n) ||
                  ((c = (a = f)[0]),
                  (l = a[1]),
                  (s = a[2]),
                  (u = (o = i)[0]),
                  (h = o[1]),
                  (d = o[2])),
                isNaN(c) || isNaN(u)
                  ? isNaN(c)
                    ? isNaN(u)
                      ? (g = Number.NaN)
                      : ((g = u), (1 != s && 0 != s) || "hsv" == n || (b = h))
                    : ((g = c), (1 != d && 0 != d) || "hsv" == n || (b = l))
                  : (g =
                      c +
                      t *
                        (u > c && u - c > 180
                          ? u - (c + 360)
                          : u < c && c - u > 180
                          ? u + 360 - c
                          : u - c)),
                void 0 === b && (b = l + t * (h - l)),
                (p = s + t * (d - s)),
                new Yn("oklch" === n ? [p, b, g] : [g, b, p], n)
              );
            },
            zn = $n,
            Wn = function (r, e, t) {
              return zn(r, e, t, "lch");
            };
          (Nn.lch = Wn), (Nn.hcl = Wn);
          var Vn = v;
          Nn.num = function (r, e, t) {
            var n = r.num(),
              a = e.num();
            return new Vn(n + t * (a - n), "num");
          };
          var Hn = $n;
          Nn.hcg = function (r, e, t) {
            return Hn(r, e, t, "hcg");
          };
          var Kn = $n;
          Nn.hsi = function (r, e, t) {
            return Kn(r, e, t, "hsi");
          };
          var Zn = $n;
          Nn.hsl = function (r, e, t) {
            return Zn(r, e, t, "hsl");
          };
          var Jn = $n;
          Nn.hsv = function (r, e, t) {
            return Jn(r, e, t, "hsv");
          };
          var Qn = v;
          Nn.oklab = function (r, e, t) {
            var n = r.oklab(),
              a = e.oklab();
            return new Qn(
              n[0] + t * (a[0] - n[0]),
              n[1] + t * (a[1] - n[1]),
              n[2] + t * (a[2] - n[2]),
              "oklab"
            );
          };
          var ra = $n;
          Nn.oklch = function (r, e, t) {
            return ra(r, e, t, "oklch");
          };
          var ea = v,
            ta = l.clip_rgb,
            na = Math.pow,
            aa = Math.sqrt,
            oa = Math.PI,
            fa = Math.cos,
            ia = Math.sin,
            ca = Math.atan2,
            ua = function (r, e) {
              for (
                var t = r.length, n = [0, 0, 0, 0], a = 0;
                a < r.length;
                a++
              ) {
                var o = r[a],
                  f = e[a] / t,
                  i = o._rgb;
                (n[0] += na(i[0], 2) * f),
                  (n[1] += na(i[1], 2) * f),
                  (n[2] += na(i[2], 2) * f),
                  (n[3] += i[3] * f);
              }
              return (
                (n[0] = aa(n[0])),
                (n[1] = aa(n[1])),
                (n[2] = aa(n[2])),
                n[3] > 0.9999999 && (n[3] = 1),
                new ea(ta(n))
              );
            },
            la = y,
            ha = l.type,
            sa = Math.pow,
            da = function (r) {
              var e = "rgb",
                t = la("#ccc"),
                n = 0,
                a = [0, 1],
                o = [],
                f = [0, 0],
                i = !1,
                c = [],
                u = !1,
                l = 0,
                h = 1,
                s = !1,
                d = {},
                b = !0,
                g = 1,
                p = function (r) {
                  if (
                    ((r = r || ["#fff", "#000"]) &&
                      "string" === ha(r) &&
                      la.brewer &&
                      la.brewer[r.toLowerCase()] &&
                      (r = la.brewer[r.toLowerCase()]),
                    "array" === ha(r))
                  ) {
                    1 === r.length && (r = [r[0], r[0]]), (r = r.slice(0));
                    for (var e = 0; e < r.length; e++) r[e] = la(r[e]);
                    o.length = 0;
                    for (var t = 0; t < r.length; t++)
                      o.push(t / (r.length - 1));
                  }
                  return w(), (c = r);
                },
                v = function (r) {
                  return r;
                },
                m = function (r) {
                  return r;
                },
                y = function (r, n) {
                  var a, u;
                  if ((null == n && (n = !1), isNaN(r) || null === r)) return t;
                  (u = n
                    ? r
                    : i && i.length > 2
                    ? (function (r) {
                        if (null != i) {
                          for (
                            var e = i.length - 1, t = 0;
                            t < e && r >= i[t];

                          )
                            t++;
                          return t - 1;
                        }
                        return 0;
                      })(r) /
                      (i.length - 2)
                    : h !== l
                    ? (r - l) / (h - l)
                    : 1),
                    (u = m(u)),
                    n || (u = v(u)),
                    1 !== g && (u = sa(u, g)),
                    (u = f[0] + u * (1 - f[0] - f[1])),
                    (u = Math.min(1, Math.max(0, u)));
                  var s = Math.floor(1e4 * u);
                  if (b && d[s]) a = d[s];
                  else {
                    if ("array" === ha(c))
                      for (var p = 0; p < o.length; p++) {
                        var y = o[p];
                        if (u <= y) {
                          a = c[p];
                          break;
                        }
                        if (u >= y && p === o.length - 1) {
                          a = c[p];
                          break;
                        }
                        if (u > y && u < o[p + 1]) {
                          (u = (u - y) / (o[p + 1] - y)),
                            (a = la.interpolate(c[p], c[p + 1], u, e));
                          break;
                        }
                      }
                    else "function" === ha(c) && (a = c(u));
                    b && (d[s] = a);
                  }
                  return a;
                },
                w = function () {
                  return (d = {});
                };
              p(r);
              var k = function (r) {
                var e = la(y(r));
                return u && e[u] ? e[u]() : e;
              };
              return (
                (k.classes = function (r) {
                  if (null != r) {
                    if ("array" === ha(r))
                      (i = r), (a = [r[0], r[r.length - 1]]);
                    else {
                      var e = la.analyze(a);
                      i = 0 === r ? [e.min, e.max] : la.limits(e, "e", r);
                    }
                    return k;
                  }
                  return i;
                }),
                (k.domain = function (r) {
                  if (!arguments.length) return a;
                  (l = r[0]), (h = r[r.length - 1]), (o = []);
                  var e = c.length;
                  if (r.length === e && l !== h)
                    for (var t = 0, n = Array.from(r); t < n.length; t += 1) {
                      var f = n[t];
                      o.push((f - l) / (h - l));
                    }
                  else {
                    for (var i = 0; i < e; i++) o.push(i / (e - 1));
                    if (r.length > 2) {
                      var u = r.map(function (e, t) {
                          return t / (r.length - 1);
                        }),
                        s = r.map(function (r) {
                          return (r - l) / (h - l);
                        });
                      s.every(function (r, e) {
                        return u[e] === r;
                      }) ||
                        (m = function (r) {
                          if (r <= 0 || r >= 1) return r;
                          for (var e = 0; r >= s[e + 1]; ) e++;
                          var t = (r - s[e]) / (s[e + 1] - s[e]);
                          return u[e] + t * (u[e + 1] - u[e]);
                        });
                    }
                  }
                  return (a = [l, h]), k;
                }),
                (k.mode = function (r) {
                  return arguments.length ? ((e = r), w(), k) : e;
                }),
                (k.range = function (r, e) {
                  return p(r), k;
                }),
                (k.out = function (r) {
                  return (u = r), k;
                }),
                (k.spread = function (r) {
                  return arguments.length ? ((n = r), k) : n;
                }),
                (k.correctLightness = function (r) {
                  return (
                    null == r && (r = !0),
                    (s = r),
                    w(),
                    (v = s
                      ? function (r) {
                          for (
                            var e = y(0, !0).lab()[0],
                              t = y(1, !0).lab()[0],
                              n = e > t,
                              a = y(r, !0).lab()[0],
                              o = e + (t - e) * r,
                              f = a - o,
                              i = 0,
                              c = 1,
                              u = 20;
                            Math.abs(f) > 0.01 && u-- > 0;

                          )
                            n && (f *= -1),
                              f < 0
                                ? ((i = r), (r += 0.5 * (c - r)))
                                : ((c = r), (r += 0.5 * (i - r))),
                              (f = (a = y(r, !0).lab()[0]) - o);
                          return r;
                        }
                      : function (r) {
                          return r;
                        }),
                    k
                  );
                }),
                (k.padding = function (r) {
                  return null != r
                    ? ("number" === ha(r) && (r = [r, r]), (f = r), k)
                    : f;
                }),
                (k.colors = function (e, t) {
                  arguments.length < 2 && (t = "hex");
                  var n = [];
                  if (0 === arguments.length) n = c.slice(0);
                  else if (1 === e) n = [k(0.5)];
                  else if (e > 1) {
                    var o = a[0],
                      f = a[1] - o;
                    n = (function (r, e, t) {
                      for (
                        var n = [],
                          a = r < e,
                          o = t ? (a ? e + 1 : e - 1) : e,
                          f = r;
                        a ? f < o : f > o;
                        a ? f++ : f--
                      )
                        n.push(f);
                      return n;
                    })(0, e, !1).map(function (r) {
                      return k(o + (r / (e - 1)) * f);
                    });
                  } else {
                    r = [];
                    var u = [];
                    if (i && i.length > 2)
                      for (
                        var l = 1, h = i.length, s = 1 <= h;
                        s ? l < h : l > h;
                        s ? l++ : l--
                      )
                        u.push(0.5 * (i[l - 1] + i[l]));
                    else u = a;
                    n = u.map(function (r) {
                      return k(r);
                    });
                  }
                  return (
                    la[t] &&
                      (n = n.map(function (r) {
                        return r[t]();
                      })),
                    n
                  );
                }),
                (k.cache = function (r) {
                  return null != r ? ((b = r), k) : b;
                }),
                (k.gamma = function (r) {
                  return null != r ? ((g = r), k) : g;
                }),
                (k.nodata = function (r) {
                  return null != r ? ((t = la(r)), k) : t;
                }),
                k
              );
            };
          var ba = v,
            ga = da,
            pa = y,
            va = function (r, e, t) {
              if (!va[t]) throw new Error("unknown blend mode " + t);
              return va[t](r, e);
            },
            ma = function (r) {
              return function (e, t) {
                var n = pa(t).rgb(),
                  a = pa(e).rgb();
                return pa.rgb(r(n, a));
              };
            },
            ya = function (r) {
              return function (e, t) {
                var n = [];
                return (
                  (n[0] = r(e[0], t[0])),
                  (n[1] = r(e[1], t[1])),
                  (n[2] = r(e[2], t[2])),
                  n
                );
              };
            };
          (va.normal = ma(
            ya(function (r) {
              return r;
            })
          )),
            (va.multiply = ma(
              ya(function (r, e) {
                return (r * e) / 255;
              })
            )),
            (va.screen = ma(
              ya(function (r, e) {
                return 255 * (1 - (1 - r / 255) * (1 - e / 255));
              })
            )),
            (va.overlay = ma(
              ya(function (r, e) {
                return e < 128
                  ? (2 * r * e) / 255
                  : 255 * (1 - 2 * (1 - r / 255) * (1 - e / 255));
              })
            )),
            (va.darken = ma(
              ya(function (r, e) {
                return r > e ? e : r;
              })
            )),
            (va.lighten = ma(
              ya(function (r, e) {
                return r > e ? r : e;
              })
            )),
            (va.dodge = ma(
              ya(function (r, e) {
                return 255 === r ||
                  (r = ((e / 255) * 255) / (1 - r / 255)) > 255
                  ? 255
                  : r;
              })
            )),
            (va.burn = ma(
              ya(function (r, e) {
                return 255 * (1 - (1 - e / 255) / (r / 255));
              })
            ));
          for (
            var wa = va,
              ka = l.type,
              Ma = l.clip_rgb,
              xa = l.TWOPI,
              _a = Math.pow,
              Ea = Math.sin,
              Aa = Math.cos,
              Na = y,
              Fa = v,
              Pa = Math.floor,
              Ra = Math.random,
              Ta = f,
              Ca = Math.log,
              Sa = Math.pow,
              Ba = Math.floor,
              Da = Math.abs,
              La = function (r, e) {
                void 0 === e && (e = null);
                var t = {
                  min: Number.MAX_VALUE,
                  max: -1 * Number.MAX_VALUE,
                  sum: 0,
                  values: [],
                  count: 0,
                };
                return (
                  "object" === Ta(r) && (r = Object.values(r)),
                  r.forEach(function (r) {
                    e && "object" === Ta(r) && (r = r[e]),
                      null == r ||
                        isNaN(r) ||
                        (t.values.push(r),
                        (t.sum += r),
                        r < t.min && (t.min = r),
                        r > t.max && (t.max = r),
                        (t.count += 1));
                  }),
                  (t.domain = [t.min, t.max]),
                  (t.limits = function (r, e) {
                    return Ia(t, r, e);
                  }),
                  t
                );
              },
              Ia = function (r, e, t) {
                void 0 === e && (e = "equal"),
                  void 0 === t && (t = 7),
                  "array" == Ta(r) && (r = La(r));
                var n = r.min,
                  a = r.max,
                  o = r.values.sort(function (r, e) {
                    return r - e;
                  });
                if (1 === t) return [n, a];
                var f = [];
                if (
                  ("c" === e.substr(0, 1) && (f.push(n), f.push(a)),
                  "e" === e.substr(0, 1))
                ) {
                  f.push(n);
                  for (var i = 1; i < t; i++) f.push(n + (i / t) * (a - n));
                  f.push(a);
                } else if ("l" === e.substr(0, 1)) {
                  if (n <= 0)
                    throw new Error(
                      "Logarithmic scales are only possible for values > 0"
                    );
                  var c = Math.LOG10E * Ca(n),
                    u = Math.LOG10E * Ca(a);
                  f.push(n);
                  for (var l = 1; l < t; l++)
                    f.push(Sa(10, c + (l / t) * (u - c)));
                  f.push(a);
                } else if ("q" === e.substr(0, 1)) {
                  f.push(n);
                  for (var h = 1; h < t; h++) {
                    var s = ((o.length - 1) * h) / t,
                      d = Ba(s);
                    if (d === s) f.push(o[d]);
                    else {
                      var b = s - d;
                      f.push(o[d] * (1 - b) + o[d + 1] * b);
                    }
                  }
                  f.push(a);
                } else if ("k" === e.substr(0, 1)) {
                  var g,
                    p = o.length,
                    v = new Array(p),
                    m = new Array(t),
                    y = !0,
                    w = 0,
                    k = null;
                  (k = []).push(n);
                  for (var M = 1; M < t; M++) k.push(n + (M / t) * (a - n));
                  for (k.push(a); y; ) {
                    for (var x = 0; x < t; x++) m[x] = 0;
                    for (var _ = 0; _ < p; _++)
                      for (
                        var E = o[_], A = Number.MAX_VALUE, N = void 0, F = 0;
                        F < t;
                        F++
                      ) {
                        var P = Da(k[F] - E);
                        P < A && ((A = P), (N = F)), m[N]++, (v[_] = N);
                      }
                    for (var R = new Array(t), T = 0; T < t; T++) R[T] = null;
                    for (var C = 0; C < p; C++)
                      null === R[(g = v[C])] ? (R[g] = o[C]) : (R[g] += o[C]);
                    for (var S = 0; S < t; S++) R[S] *= 1 / m[S];
                    y = !1;
                    for (var B = 0; B < t; B++)
                      if (R[B] !== k[B]) {
                        y = !0;
                        break;
                      }
                    (k = R), ++w > 200 && (y = !1);
                  }
                  for (var D = {}, L = 0; L < t; L++) D[L] = [];
                  for (var I = 0; I < p; I++) D[(g = v[I])].push(o[I]);
                  for (var O = [], U = 0; U < t; U++)
                    O.push(D[U][0]), O.push(D[U][D[U].length - 1]);
                  (O = O.sort(function (r, e) {
                    return r - e;
                  })),
                    f.push(O[0]);
                  for (var G = 1; G < O.length; G += 2) {
                    var q = O[G];
                    isNaN(q) || -1 !== f.indexOf(q) || f.push(q);
                  }
                }
                return f;
              },
              Oa = { analyze: La, limits: Ia },
              Ua = v,
              Ga = v,
              qa = Math.sqrt,
              ja = Math.pow,
              Xa = Math.min,
              Ya = Math.max,
              $a = Math.atan2,
              za = Math.abs,
              Wa = Math.cos,
              Va = Math.sin,
              Ha = Math.exp,
              Ka = Math.PI,
              Za = v,
              Ja = v,
              Qa = y,
              ro = da,
              eo = {
                cool: function () {
                  return ro([Qa.hsl(180, 1, 0.9), Qa.hsl(250, 0.7, 0.4)]);
                },
                hot: function () {
                  return ro(["#000", "#f00", "#ff0", "#fff"]).mode("rgb");
                },
              },
              to = {
                OrRd: [
                  "#fff7ec",
                  "#fee8c8",
                  "#fdd49e",
                  "#fdbb84",
                  "#fc8d59",
                  "#ef6548",
                  "#d7301f",
                  "#b30000",
                  "#7f0000",
                ],
                PuBu: [
                  "#fff7fb",
                  "#ece7f2",
                  "#d0d1e6",
                  "#a6bddb",
                  "#74a9cf",
                  "#3690c0",
                  "#0570b0",
                  "#045a8d",
                  "#023858",
                ],
                BuPu: [
                  "#f7fcfd",
                  "#e0ecf4",
                  "#bfd3e6",
                  "#9ebcda",
                  "#8c96c6",
                  "#8c6bb1",
                  "#88419d",
                  "#810f7c",
                  "#4d004b",
                ],
                Oranges: [
                  "#fff5eb",
                  "#fee6ce",
                  "#fdd0a2",
                  "#fdae6b",
                  "#fd8d3c",
                  "#f16913",
                  "#d94801",
                  "#a63603",
                  "#7f2704",
                ],
                BuGn: [
                  "#f7fcfd",
                  "#e5f5f9",
                  "#ccece6",
                  "#99d8c9",
                  "#66c2a4",
                  "#41ae76",
                  "#238b45",
                  "#006d2c",
                  "#00441b",
                ],
                YlOrBr: [
                  "#ffffe5",
                  "#fff7bc",
                  "#fee391",
                  "#fec44f",
                  "#fe9929",
                  "#ec7014",
                  "#cc4c02",
                  "#993404",
                  "#662506",
                ],
                YlGn: [
                  "#ffffe5",
                  "#f7fcb9",
                  "#d9f0a3",
                  "#addd8e",
                  "#78c679",
                  "#41ab5d",
                  "#238443",
                  "#006837",
                  "#004529",
                ],
                Reds: [
                  "#fff5f0",
                  "#fee0d2",
                  "#fcbba1",
                  "#fc9272",
                  "#fb6a4a",
                  "#ef3b2c",
                  "#cb181d",
                  "#a50f15",
                  "#67000d",
                ],
                RdPu: [
                  "#fff7f3",
                  "#fde0dd",
                  "#fcc5c0",
                  "#fa9fb5",
                  "#f768a1",
                  "#dd3497",
                  "#ae017e",
                  "#7a0177",
                  "#49006a",
                ],
                Greens: [
                  "#f7fcf5",
                  "#e5f5e0",
                  "#c7e9c0",
                  "#a1d99b",
                  "#74c476",
                  "#41ab5d",
                  "#238b45",
                  "#006d2c",
                  "#00441b",
                ],
                YlGnBu: [
                  "#ffffd9",
                  "#edf8b1",
                  "#c7e9b4",
                  "#7fcdbb",
                  "#41b6c4",
                  "#1d91c0",
                  "#225ea8",
                  "#253494",
                  "#081d58",
                ],
                Purples: [
                  "#fcfbfd",
                  "#efedf5",
                  "#dadaeb",
                  "#bcbddc",
                  "#9e9ac8",
                  "#807dba",
                  "#6a51a3",
                  "#54278f",
                  "#3f007d",
                ],
                GnBu: [
                  "#f7fcf0",
                  "#e0f3db",
                  "#ccebc5",
                  "#a8ddb5",
                  "#7bccc4",
                  "#4eb3d3",
                  "#2b8cbe",
                  "#0868ac",
                  "#084081",
                ],
                Greys: [
                  "#ffffff",
                  "#f0f0f0",
                  "#d9d9d9",
                  "#bdbdbd",
                  "#969696",
                  "#737373",
                  "#525252",
                  "#252525",
                  "#000000",
                ],
                YlOrRd: [
                  "#ffffcc",
                  "#ffeda0",
                  "#fed976",
                  "#feb24c",
                  "#fd8d3c",
                  "#fc4e2a",
                  "#e31a1c",
                  "#bd0026",
                  "#800026",
                ],
                PuRd: [
                  "#f7f4f9",
                  "#e7e1ef",
                  "#d4b9da",
                  "#c994c7",
                  "#df65b0",
                  "#e7298a",
                  "#ce1256",
                  "#980043",
                  "#67001f",
                ],
                Blues: [
                  "#f7fbff",
                  "#deebf7",
                  "#c6dbef",
                  "#9ecae1",
                  "#6baed6",
                  "#4292c6",
                  "#2171b5",
                  "#08519c",
                  "#08306b",
                ],
                PuBuGn: [
                  "#fff7fb",
                  "#ece2f0",
                  "#d0d1e6",
                  "#a6bddb",
                  "#67a9cf",
                  "#3690c0",
                  "#02818a",
                  "#016c59",
                  "#014636",
                ],
                Viridis: [
                  "#440154",
                  "#482777",
                  "#3f4a8a",
                  "#31678e",
                  "#26838f",
                  "#1f9d8a",
                  "#6cce5a",
                  "#b6de2b",
                  "#fee825",
                ],
                Spectral: [
                  "#9e0142",
                  "#d53e4f",
                  "#f46d43",
                  "#fdae61",
                  "#fee08b",
                  "#ffffbf",
                  "#e6f598",
                  "#abdda4",
                  "#66c2a5",
                  "#3288bd",
                  "#5e4fa2",
                ],
                RdYlGn: [
                  "#a50026",
                  "#d73027",
                  "#f46d43",
                  "#fdae61",
                  "#fee08b",
                  "#ffffbf",
                  "#d9ef8b",
                  "#a6d96a",
                  "#66bd63",
                  "#1a9850",
                  "#006837",
                ],
                RdBu: [
                  "#67001f",
                  "#b2182b",
                  "#d6604d",
                  "#f4a582",
                  "#fddbc7",
                  "#f7f7f7",
                  "#d1e5f0",
                  "#92c5de",
                  "#4393c3",
                  "#2166ac",
                  "#053061",
                ],
                PiYG: [
                  "#8e0152",
                  "#c51b7d",
                  "#de77ae",
                  "#f1b6da",
                  "#fde0ef",
                  "#f7f7f7",
                  "#e6f5d0",
                  "#b8e186",
                  "#7fbc41",
                  "#4d9221",
                  "#276419",
                ],
                PRGn: [
                  "#40004b",
                  "#762a83",
                  "#9970ab",
                  "#c2a5cf",
                  "#e7d4e8",
                  "#f7f7f7",
                  "#d9f0d3",
                  "#a6dba0",
                  "#5aae61",
                  "#1b7837",
                  "#00441b",
                ],
                RdYlBu: [
                  "#a50026",
                  "#d73027",
                  "#f46d43",
                  "#fdae61",
                  "#fee090",
                  "#ffffbf",
                  "#e0f3f8",
                  "#abd9e9",
                  "#74add1",
                  "#4575b4",
                  "#313695",
                ],
                BrBG: [
                  "#543005",
                  "#8c510a",
                  "#bf812d",
                  "#dfc27d",
                  "#f6e8c3",
                  "#f5f5f5",
                  "#c7eae5",
                  "#80cdc1",
                  "#35978f",
                  "#01665e",
                  "#003c30",
                ],
                RdGy: [
                  "#67001f",
                  "#b2182b",
                  "#d6604d",
                  "#f4a582",
                  "#fddbc7",
                  "#ffffff",
                  "#e0e0e0",
                  "#bababa",
                  "#878787",
                  "#4d4d4d",
                  "#1a1a1a",
                ],
                PuOr: [
                  "#7f3b08",
                  "#b35806",
                  "#e08214",
                  "#fdb863",
                  "#fee0b6",
                  "#f7f7f7",
                  "#d8daeb",
                  "#b2abd2",
                  "#8073ac",
                  "#542788",
                  "#2d004b",
                ],
                Set2: [
                  "#66c2a5",
                  "#fc8d62",
                  "#8da0cb",
                  "#e78ac3",
                  "#a6d854",
                  "#ffd92f",
                  "#e5c494",
                  "#b3b3b3",
                ],
                Accent: [
                  "#7fc97f",
                  "#beaed4",
                  "#fdc086",
                  "#ffff99",
                  "#386cb0",
                  "#f0027f",
                  "#bf5b17",
                  "#666666",
                ],
                Set1: [
                  "#e41a1c",
                  "#377eb8",
                  "#4daf4a",
                  "#984ea3",
                  "#ff7f00",
                  "#ffff33",
                  "#a65628",
                  "#f781bf",
                  "#999999",
                ],
                Set3: [
                  "#8dd3c7",
                  "#ffffb3",
                  "#bebada",
                  "#fb8072",
                  "#80b1d3",
                  "#fdb462",
                  "#b3de69",
                  "#fccde5",
                  "#d9d9d9",
                  "#bc80bd",
                  "#ccebc5",
                  "#ffed6f",
                ],
                Dark2: [
                  "#1b9e77",
                  "#d95f02",
                  "#7570b3",
                  "#e7298a",
                  "#66a61e",
                  "#e6ab02",
                  "#a6761d",
                  "#666666",
                ],
                Paired: [
                  "#a6cee3",
                  "#1f78b4",
                  "#b2df8a",
                  "#33a02c",
                  "#fb9a99",
                  "#e31a1c",
                  "#fdbf6f",
                  "#ff7f00",
                  "#cab2d6",
                  "#6a3d9a",
                  "#ffff99",
                  "#b15928",
                ],
                Pastel2: [
                  "#b3e2cd",
                  "#fdcdac",
                  "#cbd5e8",
                  "#f4cae4",
                  "#e6f5c9",
                  "#fff2ae",
                  "#f1e2cc",
                  "#cccccc",
                ],
                Pastel1: [
                  "#fbb4ae",
                  "#b3cde3",
                  "#ccebc5",
                  "#decbe4",
                  "#fed9a6",
                  "#ffffcc",
                  "#e5d8bd",
                  "#fddaec",
                  "#f2f2f2",
                ],
              },
              no = 0,
              ao = Object.keys(to);
            no < ao.length;
            no += 1
          ) {
            var oo = ao[no];
            to[oo.toLowerCase()] = to[oo];
          }
          var fo = to,
            io = y;
          return (
            (io.average = function (r, e, t) {
              void 0 === e && (e = "lrgb"), void 0 === t && (t = null);
              var n = r.length;
              t ||
                (t = Array.from(new Array(n)).map(function () {
                  return 1;
                }));
              var a =
                n /
                t.reduce(function (r, e) {
                  return r + e;
                });
              if (
                (t.forEach(function (r, e) {
                  t[e] *= a;
                }),
                (r = r.map(function (r) {
                  return new ea(r);
                })),
                "lrgb" === e)
              )
                return ua(r, t);
              for (
                var o = r.shift(), f = o.get(e), i = [], c = 0, u = 0, l = 0;
                l < f.length;
                l++
              )
                if (
                  ((f[l] = (f[l] || 0) * t[0]),
                  i.push(isNaN(f[l]) ? 0 : t[0]),
                  "h" === e.charAt(l) && !isNaN(f[l]))
                ) {
                  var h = (f[l] / 180) * oa;
                  (c += fa(h) * t[0]), (u += ia(h) * t[0]);
                }
              var s = o.alpha() * t[0];
              r.forEach(function (r, n) {
                var a = r.get(e);
                s += r.alpha() * t[n + 1];
                for (var o = 0; o < f.length; o++)
                  if (!isNaN(a[o]))
                    if (((i[o] += t[n + 1]), "h" === e.charAt(o))) {
                      var l = (a[o] / 180) * oa;
                      (c += fa(l) * t[n + 1]), (u += ia(l) * t[n + 1]);
                    } else f[o] += a[o] * t[n + 1];
              });
              for (var d = 0; d < f.length; d++)
                if ("h" === e.charAt(d)) {
                  for (var b = (ca(u / i[d], c / i[d]) / oa) * 180; b < 0; )
                    b += 360;
                  for (; b >= 360; ) b -= 360;
                  f[d] = b;
                } else f[d] = f[d] / i[d];
              return (s /= n), new ea(f, e).alpha(s > 0.99999 ? 1 : s, !0);
            }),
            (io.bezier = function (r) {
              var e = (function (r) {
                var e, t, n, a, o, f, i;
                if (
                  2 ===
                  (r = r.map(function (r) {
                    return new ba(r);
                  })).length
                )
                  (e = r.map(function (r) {
                    return r.lab();
                  })),
                    (o = e[0]),
                    (f = e[1]),
                    (a = function (r) {
                      var e = [0, 1, 2].map(function (e) {
                        return o[e] + r * (f[e] - o[e]);
                      });
                      return new ba(e, "lab");
                    });
                else if (3 === r.length)
                  (t = r.map(function (r) {
                    return r.lab();
                  })),
                    (o = t[0]),
                    (f = t[1]),
                    (i = t[2]),
                    (a = function (r) {
                      var e = [0, 1, 2].map(function (e) {
                        return (
                          (1 - r) * (1 - r) * o[e] +
                          2 * (1 - r) * r * f[e] +
                          r * r * i[e]
                        );
                      });
                      return new ba(e, "lab");
                    });
                else if (4 === r.length) {
                  var c;
                  (n = r.map(function (r) {
                    return r.lab();
                  })),
                    (o = n[0]),
                    (f = n[1]),
                    (i = n[2]),
                    (c = n[3]),
                    (a = function (r) {
                      var e = [0, 1, 2].map(function (e) {
                        return (
                          (1 - r) * (1 - r) * (1 - r) * o[e] +
                          3 * (1 - r) * (1 - r) * r * f[e] +
                          3 * (1 - r) * r * r * i[e] +
                          r * r * r * c[e]
                        );
                      });
                      return new ba(e, "lab");
                    });
                } else {
                  if (!(r.length >= 5))
                    throw new RangeError(
                      "No point in running bezier with only one color."
                    );
                  var u, l, h;
                  (u = r.map(function (r) {
                    return r.lab();
                  })),
                    (h = r.length - 1),
                    (l = (function (r) {
                      for (var e = [1, 1], t = 1; t < r; t++) {
                        for (var n = [1], a = 1; a <= e.length; a++)
                          n[a] = (e[a] || 0) + e[a - 1];
                        e = n;
                      }
                      return e;
                    })(h)),
                    (a = function (r) {
                      var e = 1 - r,
                        t = [0, 1, 2].map(function (t) {
                          return u.reduce(function (n, a, o) {
                            return (
                              n +
                              l[o] * Math.pow(e, h - o) * Math.pow(r, o) * a[t]
                            );
                          }, 0);
                        });
                      return new ba(t, "lab");
                    });
                }
                return a;
              })(r);
              return (
                (e.scale = function () {
                  return ga(e);
                }),
                e
              );
            }),
            (io.blend = wa),
            (io.cubehelix = function (r, e, t, n, a) {
              void 0 === r && (r = 300),
                void 0 === e && (e = -1.5),
                void 0 === t && (t = 1),
                void 0 === n && (n = 1),
                void 0 === a && (a = [0, 1]);
              var o,
                f = 0;
              "array" === ka(a) ? (o = a[1] - a[0]) : ((o = 0), (a = [a, a]));
              var i = function (i) {
                var c = xa * ((r + 120) / 360 + e * i),
                  u = _a(a[0] + o * i, n),
                  l = ((0 !== f ? t[0] + i * f : t) * u * (1 - u)) / 2,
                  h = Aa(c),
                  s = Ea(c);
                return Na(
                  Ma([
                    255 * (u + l * (-0.14861 * h + 1.78277 * s)),
                    255 * (u + l * (-0.29227 * h - 0.90649 * s)),
                    255 * (u + l * (1.97294 * h)),
                    1,
                  ])
                );
              };
              return (
                (i.start = function (e) {
                  return null == e ? r : ((r = e), i);
                }),
                (i.rotations = function (r) {
                  return null == r ? e : ((e = r), i);
                }),
                (i.gamma = function (r) {
                  return null == r ? n : ((n = r), i);
                }),
                (i.hue = function (r) {
                  return null == r
                    ? t
                    : ("array" === ka((t = r))
                        ? 0 == (f = t[1] - t[0]) && (t = t[1])
                        : (f = 0),
                      i);
                }),
                (i.lightness = function (r) {
                  return null == r
                    ? a
                    : ("array" === ka(r)
                        ? ((a = r), (o = r[1] - r[0]))
                        : ((a = [r, r]), (o = 0)),
                      i);
                }),
                (i.scale = function () {
                  return Na.scale(i);
                }),
                i.hue(t),
                i
              );
            }),
            (io.mix = io.interpolate = Tn),
            (io.random = function () {
              for (var r = "#", e = 0; e < 6; e++)
                r += "0123456789abcdef".charAt(Pa(16 * Ra()));
              return new Fa(r, "hex");
            }),
            (io.scale = da),
            (io.analyze = Oa.analyze),
            (io.contrast = function (r, e) {
              (r = new Ua(r)), (e = new Ua(e));
              var t = r.luminance(),
                n = e.luminance();
              return t > n ? (t + 0.05) / (n + 0.05) : (n + 0.05) / (t + 0.05);
            }),
            (io.deltaE = function (r, e, t, n, a) {
              void 0 === t && (t = 1),
                void 0 === n && (n = 1),
                void 0 === a && (a = 1);
              var o = function (r) {
                  return (360 * r) / (2 * Ka);
                },
                f = function (r) {
                  return (2 * Ka * r) / 360;
                };
              (r = new Ga(r)), (e = new Ga(e));
              var i = Array.from(r.lab()),
                c = i[0],
                u = i[1],
                l = i[2],
                h = Array.from(e.lab()),
                s = h[0],
                d = h[1],
                b = h[2],
                g = (c + s) / 2,
                p = (qa(ja(u, 2) + ja(l, 2)) + qa(ja(d, 2) + ja(b, 2))) / 2,
                v = 0.5 * (1 - qa(ja(p, 7) / (ja(p, 7) + ja(25, 7)))),
                m = u * (1 + v),
                y = d * (1 + v),
                w = qa(ja(m, 2) + ja(l, 2)),
                k = qa(ja(y, 2) + ja(b, 2)),
                M = (w + k) / 2,
                x = o($a(l, m)),
                _ = o($a(b, y)),
                E = x >= 0 ? x : x + 360,
                A = _ >= 0 ? _ : _ + 360,
                N = za(E - A) > 180 ? (E + A + 360) / 2 : (E + A) / 2,
                F =
                  1 -
                  0.17 * Wa(f(N - 30)) +
                  0.24 * Wa(f(2 * N)) +
                  0.32 * Wa(f(3 * N + 6)) -
                  0.2 * Wa(f(4 * N - 63)),
                P = A - E;
              (P = za(P) <= 180 ? P : A <= E ? P + 360 : P - 360),
                (P = 2 * qa(w * k) * Va(f(P) / 2));
              var R = s - c,
                T = k - w,
                C = 1 + (0.015 * ja(g - 50, 2)) / qa(20 + ja(g - 50, 2)),
                S = 1 + 0.045 * M,
                B = 1 + 0.015 * M * F,
                D = 30 * Ha(-ja((N - 275) / 25, 2)),
                L = -2 * qa(ja(M, 7) / (ja(M, 7) + ja(25, 7))) * Va(2 * f(D)),
                I = qa(
                  ja(R / (t * C), 2) +
                    ja(T / (n * S), 2) +
                    ja(P / (a * B), 2) +
                    L * (T / (n * S)) * (P / (a * B))
                );
              return Ya(0, Xa(100, I));
            }),
            (io.distance = function (r, e, t) {
              void 0 === t && (t = "lab"), (r = new Za(r)), (e = new Za(e));
              var n = r.get(t),
                a = e.get(t),
                o = 0;
              for (var f in n) {
                var i = (n[f] || 0) - (a[f] || 0);
                o += i * i;
              }
              return Math.sqrt(o);
            }),
            (io.limits = Oa.limits),
            (io.valid = function () {
              for (var r = [], e = arguments.length; e--; ) r[e] = arguments[e];
              try {
                return (
                  new (Function.prototype.bind.apply(Ja, [null].concat(r)))(),
                  !0
                );
              } catch (r) {
                return !1;
              }
            }),
            (io.scales = eo),
            (io.colors = ht),
            (io.brewer = fo),
            io
          );
        })();
      },
    },
    e = {};
  function t(n) {
    var a = e[n];
    if (void 0 !== a) return a.exports;
    var o = (e[n] = { exports: {} });
    return r[n].call(o.exports, o, o.exports, t), o.exports;
  }
  (t.n = (r) => {
    var e = r && r.__esModule ? () => r.default : () => r;
    return t.d(e, { a: e }), e;
  }),
    (t.d = (r, e) => {
      for (var n in e)
        t.o(e, n) &&
          !t.o(r, n) &&
          Object.defineProperty(r, n, { enumerable: !0, get: e[n] });
    }),
    (t.o = (r, e) => Object.prototype.hasOwnProperty.call(r, e)),
    (() => {
      "use strict";
      var r = t(46),
        e = t.n(r);
      function n(r, e, t) {
        const n = r.createShader(e);
        if (
          (r.shaderSource(n, t),
          r.compileShader(n),
          !r.getShaderParameter(n, r.COMPILE_STATUS))
        ) {
          const e = r.getShaderInfoLog(n);
          throw (
            (r.deleteShader(n),
            new Error("Could not compile WebGL shader: " + e))
          );
        }
        return n;
      }
      function a(r, e) {
        return $fx.rand() * (e - r) + r;
      }
      function o(r, e, t, n, a) {
        return [
          { x: e.x + (t.x - r.x) * a, y: e.y + (t.y - r.y) * a },
          { x: t.x - (n.x - e.x) * a, y: t.y - (n.y - e.y) * a },
          t,
        ];
      }
      function f(r, e) {
        if (r.length !== e.length)
          throw new Error(
            "The length of options and probabilities arrays must be equal."
          );
        const t = e.reduce((r, e) => r + e, 0),
          n = e.map((r) => r / t),
          o = a(0, 1);
        let f = 0;
        for (let e = 0; e < n.length; e++)
          if (((f += n[e]), o <= f)) return r[e];
        return r[r.length - 1];
      }
      const i = [
          {
            name: "San Francisco",
            colors: [
              "#ec5526",
              "#f4ac12",
              "#9ebbc1",
              "#f7f4e2",
              "#eb5627",
              "#eebb20",
              "#f7f5d0",
              "#e7e8d4",
            ],
            blendMode: "source-over",
          },
          {
            name: "Chicago",
            colors: [
              "#291B00",
              "#E8D1A7",
              "#FFA600",
              "#F95426",
              "#F40558",
              "#895C97",
              "#308599",
              "#16B7AF",
              "#02C1BC",
            ],
            background: "#E8D1A7",
            blendMode: "source-over",
          },
          {
            name: "Mono",
            colors: ["#1f1e43", "#f7f2df"],
            background: "#f7f2df",
            blendMode: "source-over",
          },
          {
            name: "Los Angeles",
            colors: [
              "#1A140F",
              "#ffffff",
              "#f0d790",
              "#d9b788",
              "#e5b750",
              "#f15b3e",
              "#cee4ee",
            ],
            background: "#eda68e",
            blendMode: "source-over",
          },
          {
            name: "Seattle",
            colors: [
              "#243826",
              "#899382",
              "#d9bb9b",
              "#b1c6b6",
              "#809388",
              "#3e3a37",
              "#ded5ba",
              "#d58667",
              "#9a6643",
            ],
          },
          {
            name: "Fidenza",
            colors: [
              "#121a33",
              "#315f8c",
              "#7ca9bf",
              "#9BC9B3",
              "#67AB86",
              "#fcd265",
              "#fcbc19",
              "#e67d32",
              "#f7b1a1",
              "#d12a2f",
              "#db4f54",
            ],
          },
          {
            name: "Toronto",
            colors: [
              "#E1DBCD",
              "#19A8B1",
              "#003C4F",
              "#DCC253",
              "#005068",
              "#3BA2A8",
            ],
            background: "#E9E3D5",
            blendMode: "source-over",
          },
          {
            name: "Grant",
            colors: ["#E7B10A", "#898121", "#f9f0de", "#4C4B16"],
            blendMode: "source-over",
          },
          {
            name: "Omentejovum",
            colors: ["#dbb315", "#e15b26", "#2e3893", "#252429", "#f0f0ca"],
            blendMode: "source-over",
          },
          {
            name: "America",
            colors: ["#FFF5E0", "#FF6969", "#BB2525", "#141E46"],
            blendMode: "source-over",
          },
          {
            name: "Harvest 2",
            colors: [
              "#1294B5",
              "#781823",
              "#DF3C29",
              "#C90E56",
              "#F2632C",
              "#F8952C",
              " #E6867C",
            ],
            blendMode: "source-over",
          },
          {
            name: "Xie",
            colors: [
              "#b1c6b6",
              "#809388",
              "#3e3a37",
              "#ded5ba",
              "#97987e",
              "#d58667",
              "#9a6643",
            ],
          },
        ],
        c = i,
        u = i.map((r) => r.name);
      function l(r, e) {
        const t = r.colors.filter((r) => r !== e);
        return t[Math.floor($fx.rand() * t.length)];
      }
      const h =
          "\nattribute vec4 a_position;\n\nvoid main() {\n    gl_Position = a_position;\n}\n",
        s =
          "\nprecision mediump float;\n\nuniform float time;\nuniform vec2 u_direction;\nuniform sampler2D texture;\nuniform vec2 u_resolution;\nuniform float intensity;\n\n\nvec2 random(vec2 st) {\n    st = vec2(dot(st, vec2(127.1, 311.7)), dot(st, vec2(269.5, 183.3)));\n    return -1.0 + 2.0 * fract(sin(st) * 43758.5453123);\n}\n\nvoid main() {\n    vec2 uv = vec2(gl_FragCoord.x / u_resolution.x, 1.0 - gl_FragCoord.y / u_resolution.y);\n\n    vec2 flow = mix(random(uv * time) * 2.0 - 1.0, u_direction, 0.5);\n    \n    vec4 color = texture2D(texture, uv + flow * intensity);\n\n    gl_FragColor = color;\n}\n";
      t(670), new URLSearchParams(window.location.search);
      const d = document.getElementById("artCanvas"),
        b = d.getContext("2d"),
        g = new (e())(),
        p = d.height,
        v = d.width,
        m = document.createElement("canvas");
      (m.height = p), (m.width = v);
      const y = m.getContext("2d"),
        w = document.createElement("canvas");
      (w.width = d.width), (w.height = d.height);
      const k = w.getContext("webgl2");
      let M = [],
        x = [],
        _ = [],
        E = [],
        A = 1;
      const N = f(["Outlines", "Solid", "Mixed"], [0.1, 0.4, 0.5]),
        F = f([20, 40, 60, 80], [0.25, 0.25, 0.25, 0.25]),
        P = f([0, 0.1, 0.2, 0.9, 0.95, 1], [0.02, 0.03, 0.05, 0.3, 0.3, 0.4]),
        R = f([0.4, 0.5, 0.7, 1], [0.1, 0.4, 0.4, 0.1]),
        T = f(
          [0.15, 0.25, 0.5, 0.6, 0.75, 1],
          [0.05, 0.1, 0.3, 0.3, 0.2, 0.05]
        ),
        C = f([0, 10, 20, 30], [0.1, 0.3, 0.3, 0.3]),
        S = a(0.07, 0.18),
        B = f(
          u,
          [0.1, 0.1, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08]
        ),
        D = c.find((r) => r.name === B),
        L = D
          ? D.background || l(D)
          : (console.error("Error: selectedPalette is undefined."), "#000000"),
        I = f([l(D, L), "white", L], [0.4, 0.1, 0.5]),
        O = (() => {
          const r = Number(C);
          return r
            ? 10 == r
              ? "Small"
              : 20 == r
              ? "Medium"
              : 30 == r
              ? "Large"
              : void 0
            : "None";
        })();
      let U = 0;
      function G(r, e, t, n, a, o) {
        const f = t - r,
          i = n - e,
          c = f * f + i * i,
          u = E[o] || Math.sqrt(c);
        E[o] = u;
        for (let t = 0; t < u; t++) {
          const n = t / u,
            c = r + n * f,
            l = e + n * i,
            h = M[o]?.[t] * A || A * (T + Math.pow(R, 3));
          M[o] || (M[o] = []),
            (M[o][t] = h / A),
            a.beginPath(),
            c >= 0 &&
              c <= a.canvas.width &&
              l >= 0 &&
              l <= a.canvas.height &&
              ((U += u), a.arc(c, l, h, 0, 2 * Math.PI));
        }
      }
      async function q(r, e, t, f, i = "source-over") {
        const c = f.getContext("2d"),
          u = v,
          l = p;
        let b, g, M, E, N, T;
        if (((M = ($fx.rand() * P) / 1.8 + 0.3), _[e])) {
          const t = _[e];
          (b = t.numControlPoints),
            (g = t.perturbationFactor),
            (E = t.centerX),
            (N = t.centerY),
            (T = t.radius),
            (r = t.color);
        } else
          (b = 12),
            "outline" === t
              ? ((g = a(1, 3)), (T = A * (d.width / 4)))
              : ((g = a(0.16, 0.6)), (T = A * (120 - F) * 5)),
            (E = u / 2 + (2 * $fx.rand() - 1) * u * M),
            (N = l / 2 + (2 * $fx.rand() - 1) * l * M),
            (_[e] = {
              centerX: E,
              centerY: N,
              radius: T,
              numControlPoints: b,
              perturbationFactor: g,
              maxCenterDisplacement: M,
              color: r,
            });
        const C = T;
        let B,
          D,
          L = x[e]
            ? (function (r, e) {
                return r.map((r) => ({ x: r.x * e, y: r.y * e }));
              })(x[e], A)
            : [];
        L.length ||
          ((B = C / 2.2),
          (L = (function (r, e, t, n, o, f) {
            let i = [];
            for (let c = 0; c < r; c++) {
              let u = 0,
                l = !1;
              for (; !l && u < 80; ) {
                const h = ((2 * Math.PI) / r) * c,
                  s = e + n * Math.cos(h),
                  d = t + n * Math.sin(h),
                  b = 2 * $fx.rand() * Math.PI,
                  g = a(0, n * o),
                  p = s + g * Math.cos(b),
                  v = d + g * Math.sin(b);
                let m = !1,
                  y = !1;
                for (const r of i) {
                  if (
                    Math.sqrt(Math.pow(r.x - p, 2) + Math.pow(r.y - v, 2)) < f
                  ) {
                    m = !0;
                    break;
                  }
                  if (i.length > 1) {
                    const r = i[i.length - 1],
                      e = i[i.length - 2],
                      t = { x: r.x - e.x, y: r.y - e.y },
                      n = { x: p - r.x, y: v - r.y };
                    if (
                      (t.x * n.x + t.y * n.y) /
                        (Math.sqrt(t.x * t.x + t.y * t.y) *
                          Math.sqrt(n.x * n.x + n.y * n.y)) >
                      Math.cos(Math.PI / 4)
                    ) {
                      y = !0;
                      break;
                    }
                  }
                }
                m || y
                  ? 79 === u && (i.push({ x: s, y: d }), (l = !0))
                  : (i.push({ x: p, y: v }), (l = !0)),
                  u++;
              }
            }
            return i;
          })(b, E, N, T, g, B)),
          (x[e] = L)),
          y.beginPath(),
          y.moveTo(L[0].x, L[0].y),
          (y.fillStyle = r),
          (y.strokeStyle = r);
        for (let r = 0; r <= L.length; r++) {
          const e = L[r % b],
            t = L[(r + 1) % b],
            n = L[(r + 2) % b],
            a = L[(r + 3) % b],
            [f, i, c] = o(e, t, n, a, S);
          y.bezierCurveTo(f.x, f.y, i.x, i.y, c.x, c.y);
        }
        switch (t) {
          case "filled":
            (D = a(0.03, 0.1)), y.beginPath(), y.moveTo(L[0].x, L[0].y);
            for (let r = 0; r <= L.length - 2; r++) {
              const e = L[r % b],
                t = L[(r + 1) % b],
                n = L[(r + 2) % b],
                a = L[(r + 3) % b],
                [f, i, c] = o(e, t, n, a, S);
              y.bezierCurveTo(f.x, f.y, i.x, i.y, c.x, c.y);
            }
            y.closePath(), (y.fillStyle = r), y.fill(), y.drawImage(m, 0, 0);
            break;
          case "outline":
            D = a(0.06, 0.1);
            for (let r = 0; r < L.length; r++) {
              const e = L[r % b],
                t = L[(r + 1) % b],
                n = L[(r + 2) % b],
                a = L[(r + 3) % b],
                [f, i, c] = o(e, t, n, a, S),
                u = Math.round(500 * R);
              for (let e = 0; e < u; e++) {
                const n = e / u,
                  a = (e + 1) / u;
                G(
                  t.x * Math.pow(1 - n, 3) +
                    3 * f.x * n * Math.pow(1 - n, 2) +
                    3 * i.x * n * n * (1 - n) +
                    c.x * n * n * n,
                  t.y * Math.pow(1 - n, 3) +
                    3 * f.y * n * Math.pow(1 - n, 2) +
                    3 * i.y * n * n * (1 - n) +
                    c.y * n * n * n,
                  t.x * Math.pow(1 - a, 3) +
                    3 * f.x * a * Math.pow(1 - a, 2) +
                    3 * i.x * a * a * (1 - a) +
                    c.x * a * a * a,
                  t.y * Math.pow(1 - a, 3) +
                    3 * f.y * a * Math.pow(1 - a, 2) +
                    3 * i.y * a * a * (1 - a) +
                    c.y * a * a * a,
                  y,
                  r * b + e
                ),
                  y.fill();
              }
            }
        }
        !(function (r, e) {
          (w.width = v * A), (w.height = p * A);
          const t = (function (r, e, t) {
              const a = n(r, r.VERTEX_SHADER, e),
                o = n(r, r.FRAGMENT_SHADER, t),
                f = r.createProgram();
              if (
                (r.attachShader(f, a),
                r.attachShader(f, o),
                r.linkProgram(f),
                !r.getProgramParameter(f, r.LINK_STATUS))
              ) {
                const e = r.getProgramInfoLog(f);
                throw new Error("Could not link WebGL program: " + e);
              }
              return f;
            })(k, h, s),
            a = (function (r, e) {
              const t = r.createBuffer();
              return (
                r.bindBuffer(r.ARRAY_BUFFER, t),
                r.bufferData(
                  r.ARRAY_BUFFER,
                  new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
                  r.STATIC_DRAW
                ),
                t
              );
            })(k),
            o = k.getAttribLocation(t, "a_position");
          k.enableVertexAttribArray(o),
            k.bindBuffer(k.ARRAY_BUFFER, a),
            k.vertexAttribPointer(o, 2, k.FLOAT, !1, 0, 0);
          const f = k.createTexture();
          k.bindTexture(k.TEXTURE_2D, f),
            k.texImage2D(
              k.TEXTURE_2D,
              0,
              k.RGBA,
              k.RGBA,
              k.UNSIGNED_BYTE,
              r.canvas
            ),
            k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_S, k.CLAMP_TO_EDGE),
            k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_T, k.CLAMP_TO_EDGE),
            k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MIN_FILTER, k.LINEAR),
            k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MAG_FILTER, k.LINEAR),
            k.useProgram(t);
          const i = [0.2, 0.3],
            c = k.getUniformLocation(t, "u_direction");
          k.uniform2f(c, i[0], i[1]),
            k.uniform2f(
              k.getUniformLocation(t, "u_resolution"),
              w.width,
              w.height
            ),
            k.uniform1f(
              k.getUniformLocation(t, "time"),
              performance.now() / 1e3
            ),
            k.uniform1f(k.getUniformLocation(t, "scaleFactor"), A),
            k.uniform1f(k.getUniformLocation(t, "intensity"), e),
            k.viewport(0, 0, d.width, d.height),
            k.clear(k.COLOR_BUFFER_BIT),
            k.drawArrays(k.TRIANGLE_STRIP, 0, 4),
            r.drawImage(w, 0, 0);
        })(y, D),
          c.drawImage(m, 0, 0),
          y.clearRect(0, 0, m.width, m.height);
      }
      async function j() {
        $fx.resetFxRand;
        (d.width = v * A),
          (d.height = p * A),
          (m.width = v * A),
          (m.height = p * A),
          (w.width = v * A),
          (w.height = p * A),
          (b.fillStyle = L),
          b.fillRect(0, 0, d.width, d.height);
        var r = (function (r) {
          var e = r.blendMode;
          if (Array.isArray(e)) {
            var t = e,
              n = e.length,
              a = 1 / n;
            return f(t, new Array(n).fill(a));
          }
          return e;
        })(D);
        let e;
        const t = F,
          n = document.getElementById("loadingBar"),
          o = document.getElementById("loadingBarProgress");
        for (let n = 0; n < t; n++) {
          const f = l(D);
          if (
            ((e =
              ("Mixed" == N && n > t / 2) || "Outlines" === N
                ? "outline"
                : "filled"),
            q(f, n, e, d, r, a(0.5, 0.6)),
            n % (Math.round(t / 10 / A) || 1) == 0)
          ) {
            const r = ((n + 1) / t) * 100;
            (o.style.width = `${r}%`),
              "outline" === e &&
                (await new Promise((r) => requestAnimationFrame(r)));
          }
        }
        C &&
          (function (r, e, t) {
            y.clearRect(0, 0, m.width, m.height), y.beginPath();
            for (let t = 0; t <= m.width; t++) {
              const n = g.noise2D(t / e, 0) * r;
              y.lineTo(t, n);
            }
            for (let t = 0; t <= m.height; t++) {
              const n = g.noise2D(m.width / e, t / e) * r;
              y.lineTo(m.width - n, t);
            }
            for (let t = m.width; t >= 0; t--) {
              const n = g.noise2D(t / e, m.height / e) * r;
              y.lineTo(t, m.height - n);
            }
            for (let t = m.height; t >= 0; t--) {
              const n = g.noise2D(0, t / e) * r;
              y.lineTo(n, t);
            }
            y.closePath(),
              (y.lineWidth = 8 * A),
              (y.strokeStyle = I),
              y.stroke(),
              t.drawImage(m, 0, 0);
          })(1 * A, 20 * A, b),
          (function (r) {
            if (!C || 0 === C) return;
            const e = C * A,
              t = r.getContext("2d"),
              n = r.width + 2 * e,
              a = r.height + 2 * e;
            (m.width = n),
              (m.height = a),
              (y.fillStyle = I),
              y.fillRect(0, 0, n, a),
              y.drawImage(r, e, e),
              (r.width = n),
              (r.height = a),
              t.drawImage(m, 0, 0);
          })(d),
          (n.style.display = "none"),
          $fx.preview();
      }
      j(),
        (function () {
          let r = {
            "Shape Style": N,
            Palette: D.name,
            "Background Color": L,
            "Shape Count": F,
            Tension: S,
            "Shape Spread": Number(P).toLocaleString(void 0, {
              style: "percent",
              minimumFractionDigits: 0,
            }),
          };
          C && ((r["Border Size"] = O), (r["Border Color"] = I)),
            "Solid" != N &&
              ((r["Outline Strength"] = Number(R).toLocaleString(void 0, {
                style: "percent",
                minimumFractionDigits: 0,
              })),
              (r["Outline Stroke Width"] = Number(T).toLocaleString(void 0, {
                style: "percent",
                minimumFractionDigits: 0,
              }))),
            $fx.features(r);
        })(),
        document.addEventListener("keydown", (r) => {
          const e = r.key.toLowerCase();
          "s" === e
            ? (function () {
                const r = document.createElement("a");
                (r.href = d.toDataURL("image/png")),
                  (r.download = `${fxhash}_sd.png`),
                  r.click();
              })()
            : "h" === e &&
              ((loadingBar.style.display = "block"),
              (A = 6),
              j().then(() => {
                const r = document.createElement("a");
                (r.href = d.toDataURL("image/png")),
                  (r.download = `${fxhash}_hd.png`),
                  r.click(),
                  (loadingBar.style.display = "hidden"),
                  (A = 1);
              }));
        });
    })();
})();
