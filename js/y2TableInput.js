
/*
 * Json
 * /
/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
(function () {
    function N(p, r) {
        function q(a) {
            if (q[a] !== w) return q[a]; var c; if ("bug-string-char-index" == a) c = "a" != "a"[0]; else if ("json" == a) c = q("json-stringify") && q("json-parse"); else {
                var e; if ("json-stringify" == a) {
                    c = r.stringify; var b = "function" == typeof c && s; if (b) {
                        (e = function () { return 1 }).toJSON = e; try {
                            b = "0" === c(0) && "0" === c(new t) && '""' == c(new A) && c(u) === w && c(w) === w && c() === w && "1" === c(e) && "[1]" == c([e]) && "[null]" == c([w]) && "null" == c(null) && "[null,null,null]" == c([w, u, null]) && '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}' ==
                                c({ a: [e, !0, !1, null, "\x00\b\n\f\r\t"] }) && "1" === c(null, e) && "[\n 1,\n 2\n]" == c([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == c(new C(-864E13)) && '"+275760-09-13T00:00:00.000Z"' == c(new C(864E13)) && '"-000001-01-01T00:00:00.000Z"' == c(new C(-621987552E5)) && '"1969-12-31T23:59:59.999Z"' == c(new C(-1))
                        } catch (f) { b = !1 }
                    } c = b
                } if ("json-parse" == a) {
                    c = r.parse; if ("function" == typeof c) try {
                        if (0 === c("0") && !c(!1)) {
                            e = c('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'); var n = 5 == e.a.length && 1 === e.a[0]; if (n) {
                                try { n = !c('"\t"') } catch (d) { } if (n) try {
                                    n =
                                        1 !== c("01")
                                } catch (g) { } if (n) try { n = 1 !== c("1.") } catch (m) { }
                            }
                        }
                    } catch (X) { n = !1 } c = n
                }
            } return q[a] = !!c
        } p || (p = k.Object()); r || (r = k.Object()); var t = p.Number || k.Number, A = p.String || k.String, H = p.Object || k.Object, C = p.Date || k.Date, G = p.SyntaxError || k.SyntaxError, K = p.TypeError || k.TypeError, L = p.Math || k.Math, I = p.JSON || k.JSON; "object" == typeof I && I && (r.stringify = I.stringify, r.parse = I.parse); var H = H.prototype, u = H.toString, v, B, w, s = new C(-0xc782b5b800cec); try {
            s = -109252 == s.getUTCFullYear() && 0 === s.getUTCMonth() && 1 === s.getUTCDate() &&
                10 == s.getUTCHours() && 37 == s.getUTCMinutes() && 6 == s.getUTCSeconds() && 708 == s.getUTCMilliseconds()
        } catch (Q) { } if (!q("json")) {
            var D = q("bug-string-char-index"); if (!s) var x = L.floor, M = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], E = function (a, c) { return M[c] + 365 * (a - 1970) + x((a - 1969 + (c = +(1 < c))) / 4) - x((a - 1901 + c) / 100) + x((a - 1601 + c) / 400) }; (v = H.hasOwnProperty) || (v = function (a) {
                var c = {}, e; (c.__proto__ = null, c.__proto__ = { toString: 1 }, c).toString != u ? v = function (a) {
                    var c = this.__proto__; a = a in (this.__proto__ = null, this); this.__proto__ =
                        c; return a
                } : (e = c.constructor, v = function (a) { var c = (this.constructor || e).prototype; return a in this && !(a in c && this[a] === c[a]) }); c = null; return v.call(this, a)
            }); B = function (a, c) {
                var e = 0, b, f, n; (b = function () { this.valueOf = 0 }).prototype.valueOf = 0; f = new b; for (n in f) v.call(f, n) && e++; b = f = null; e ? B = 2 == e ? function (a, c) { var e = {}, b = "[object Function]" == u.call(a), f; for (f in a) b && "prototype" == f || v.call(e, f) || !(e[f] = 1) || !v.call(a, f) || c(f) } : function (a, c) {
                    var e = "[object Function]" == u.call(a), b, f; for (b in a) e && "prototype" ==
                        b || !v.call(a, b) || (f = "constructor" === b) || c(b); (f || v.call(a, b = "constructor")) && c(b)
                } : (f = "valueOf toString toLocaleString propertyIsEnumerable isPrototypeOf hasOwnProperty constructor".split(" "), B = function (a, c) { var e = "[object Function]" == u.call(a), b, h = !e && "function" != typeof a.constructor && F[typeof a.hasOwnProperty] && a.hasOwnProperty || v; for (b in a) e && "prototype" == b || !h.call(a, b) || c(b); for (e = f.length; b = f[--e]; h.call(a, b) && c(b)); }); return B(a, c)
            }; if (!q("json-stringify")) {
                var U = {
                    92: "\\\\", 34: '\\"', 8: "\\b",
                    12: "\\f", 10: "\\n", 13: "\\r", 9: "\\t"
                }, y = function (a, c) { return ("000000" + (c || 0)).slice(-a) }, R = function (a) { for (var c = '"', b = 0, h = a.length, f = !D || 10 < h, n = f && (D ? a.split("") : a); b < h; b++) { var d = a.charCodeAt(b); switch (d) { case 8: case 9: case 10: case 12: case 13: case 34: case 92: c += U[d]; break; default: if (32 > d) { c += "\\u00" + y(2, d.toString(16)); break } c += f ? n[b] : a.charAt(b) } } return c + '"' }, O = function (a, c, b, h, f, n, d) {
                    var g, m, k, l, p, r, s, t, q; try { g = c[a] } catch (z) { } if ("object" == typeof g && g) if (m = u.call(g), "[object Date]" != m || v.call(g,
                        "toJSON")) "function" == typeof g.toJSON && ("[object Number]" != m && "[object String]" != m && "[object Array]" != m || v.call(g, "toJSON")) && (g = g.toJSON(a)); else if (g > -1 / 0 && g < 1 / 0) {
                            if (E) { l = x(g / 864E5); for (m = x(l / 365.2425) + 1970 - 1; E(m + 1, 0) <= l; m++); for (k = x((l - E(m, 0)) / 30.42); E(m, k + 1) <= l; k++); l = 1 + l - E(m, k); p = (g % 864E5 + 864E5) % 864E5; r = x(p / 36E5) % 24; s = x(p / 6E4) % 60; t = x(p / 1E3) % 60; p %= 1E3 } else m = g.getUTCFullYear(), k = g.getUTCMonth(), l = g.getUTCDate(), r = g.getUTCHours(), s = g.getUTCMinutes(), t = g.getUTCSeconds(), p = g.getUTCMilliseconds();
                            g = (0 >= m || 1E4 <= m ? (0 > m ? "-" : "+") + y(6, 0 > m ? -m : m) : y(4, m)) + "-" + y(2, k + 1) + "-" + y(2, l) + "T" + y(2, r) + ":" + y(2, s) + ":" + y(2, t) + "." + y(3, p) + "Z"
                        } else g = null; b && (g = b.call(c, a, g)); if (null === g) return "null"; m = u.call(g); if ("[object Boolean]" == m) return "" + g; if ("[object Number]" == m) return g > -1 / 0 && g < 1 / 0 ? "" + g : "null"; if ("[object String]" == m) return R("" + g); if ("object" == typeof g) {
                            for (a = d.length; a--;)if (d[a] === g) throw K(); d.push(g); q = []; c = n; n += f; if ("[object Array]" == m) {
                                k = 0; for (a = g.length; k < a; k++)m = O(k, g, b, h, f, n, d), q.push(m === w ? "null" :
                                    m); a = q.length ? f ? "[\n" + n + q.join(",\n" + n) + "\n" + c + "]" : "[" + q.join(",") + "]" : "[]"
                            } else B(h || g, function (a) { var c = O(a, g, b, h, f, n, d); c !== w && q.push(R(a) + ":" + (f ? " " : "") + c) }), a = q.length ? f ? "{\n" + n + q.join(",\n" + n) + "\n" + c + "}" : "{" + q.join(",") + "}" : "{}"; d.pop(); return a
                        }
                }; r.stringify = function (a, c, b) {
                    var h, f, n, d; if (F[typeof c] && c) if ("[object Function]" == (d = u.call(c))) f = c; else if ("[object Array]" == d) { n = {}; for (var g = 0, k = c.length, l; g < k; l = c[g++], (d = u.call(l), "[object String]" == d || "[object Number]" == d) && (n[l] = 1)); } if (b) if ("[object Number]" ==
                        (d = u.call(b))) { if (0 < (b -= b % 1)) for (h = "", 10 < b && (b = 10); h.length < b; h += " "); } else "[object String]" == d && (h = 10 >= b.length ? b : b.slice(0, 10)); return O("", (l = {}, l[""] = a, l), f, n, h, "", [])
                }
            } if (!q("json-parse")) {
                var V = A.fromCharCode, W = { 92: "\\", 34: '"', 47: "/", 98: "\b", 116: "\t", 110: "\n", 102: "\f", 114: "\r" }, b, J, l = function () { b = J = null; throw G(); }, z = function () {
                    for (var a = J, c = a.length, e, h, f, k, d; b < c;)switch (d = a.charCodeAt(b), d) {
                        case 9: case 10: case 13: case 32: b++; break; case 123: case 125: case 91: case 93: case 58: case 44: return e =
                            D ? a.charAt(b) : a[b], b++ , e; case 34: e = "@"; for (b++; b < c;)if (d = a.charCodeAt(b), 32 > d) l(); else if (92 == d) switch (d = a.charCodeAt(++b), d) { case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114: e += W[d]; b++; break; case 117: h = ++b; for (f = b + 4; b < f; b++)d = a.charCodeAt(b), 48 <= d && 57 >= d || 97 <= d && 102 >= d || 65 <= d && 70 >= d || l(); e += V("0x" + a.slice(h, b)); break; default: l() } else { if (34 == d) break; d = a.charCodeAt(b); for (h = b; 32 <= d && 92 != d && 34 != d;)d = a.charCodeAt(++b); e += a.slice(h, b) } if (34 == a.charCodeAt(b)) return b++ , e; l(); default: h =
                                b; 45 == d && (k = !0, d = a.charCodeAt(++b)); if (48 <= d && 57 >= d) { for (48 == d && (d = a.charCodeAt(b + 1), 48 <= d && 57 >= d) && l(); b < c && (d = a.charCodeAt(b), 48 <= d && 57 >= d); b++); if (46 == a.charCodeAt(b)) { for (f = ++b; f < c && (d = a.charCodeAt(f), 48 <= d && 57 >= d); f++); f == b && l(); b = f } d = a.charCodeAt(b); if (101 == d || 69 == d) { d = a.charCodeAt(++b); 43 != d && 45 != d || b++; for (f = b; f < c && (d = a.charCodeAt(f), 48 <= d && 57 >= d); f++); f == b && l(); b = f } return +a.slice(h, b) } k && l(); if ("true" == a.slice(b, b + 4)) return b += 4, !0; if ("false" == a.slice(b, b + 5)) return b += 5, !1; if ("null" == a.slice(b,
                                    b + 4)) return b += 4, null; l()
                    }return "$"
                }, P = function (a) { var c, b; "$" == a && l(); if ("string" == typeof a) { if ("@" == (D ? a.charAt(0) : a[0])) return a.slice(1); if ("[" == a) { for (c = []; ; b || (b = !0)) { a = z(); if ("]" == a) break; b && ("," == a ? (a = z(), "]" == a && l()) : l()); "," == a && l(); c.push(P(a)) } return c } if ("{" == a) { for (c = {}; ; b || (b = !0)) { a = z(); if ("}" == a) break; b && ("," == a ? (a = z(), "}" == a && l()) : l()); "," != a && "string" == typeof a && "@" == (D ? a.charAt(0) : a[0]) && ":" == z() || l(); c[a.slice(1)] = P(z()) } return c } l() } return a }, T = function (a, b, e) {
                    e = S(a, b, e); e ===
                        w ? delete a[b] : a[b] = e
                }, S = function (a, b, e) { var h = a[b], f; if ("object" == typeof h && h) if ("[object Array]" == u.call(h)) for (f = h.length; f--;)T(h, f, e); else B(h, function (a) { T(h, a, e) }); return e.call(a, b, h) }; r.parse = function (a, c) { var e, h; b = 0; J = "" + a; e = P(z()); "$" != z() && l(); b = J = null; return c && "[object Function]" == u.call(c) ? S((h = {}, h[""] = e, h), "", c) : e }
            }
        } r.runInContext = N; return r
    } var K = typeof define === "function" && define.amd, F = { "function": !0, object: !0 }, G = F[typeof exports] && exports && !exports.nodeType && exports, k = F[typeof window] &&
        window || this, t = G && F[typeof module] && module && !module.nodeType && "object" == typeof global && global; !t || t.global !== t && t.window !== t && t.self !== t || (k = t); if (G && !K) N(k, G); else { var L = k.JSON, Q = k.JSON3, M = !1, A = N(k, k.JSON3 = { noConflict: function () { M || (M = !0, k.JSON = L, k.JSON3 = Q, L = Q = null); return A } }); k.JSON = { parse: A.parse, stringify: A.stringify } } K && define(function () { return A })
}).call(this);

// 键盘事件处理库
(function (r, v, f) {
    function w(a, b, g) { a.addEventListener ? a.addEventListener(b, g, !1) : a.attachEvent("on" + b, g) } function A(a) { if ("keypress" == a.type) { var b = String.fromCharCode(a.which); a.shiftKey || (b = b.toLowerCase()); return b } return p[a.which] ? p[a.which] : t[a.which] ? t[a.which] : String.fromCharCode(a.which).toLowerCase() } function F(a) { var b = []; a.shiftKey && b.push("shift"); a.altKey && b.push("alt"); a.ctrlKey && b.push("ctrl"); a.metaKey && b.push("meta"); return b } function x(a) {
        return "shift" == a || "ctrl" == a || "alt" == a ||
            "meta" == a
    } function B(a, b) { var g, c, d, f = []; g = a; "+" === g ? g = ["+"] : (g = g.replace(/\+{2}/g, "+plus"), g = g.split("+")); for (d = 0; d < g.length; ++d) c = g[d], C[c] && (c = C[c]), b && "keypress" != b && D[c] && (c = D[c], f.push("shift")), x(c) && f.push(c); g = c; d = b; if (!d) { if (!n) { n = {}; for (var q in p) 95 < q && 112 > q || p.hasOwnProperty(q) && (n[p[q]] = q) } d = n[g] ? "keydown" : "keypress" } "keypress" == d && f.length && (d = "keydown"); return { key: c, modifiers: f, action: d } } function E(a, b) { return null === a || a === v ? !1 : a === b ? !0 : E(a.parentNode, b) } function c(a) {
        function b(a) {
            a =
                a || {}; var b = !1, l; for (l in n) a[l] ? b = !0 : n[l] = 0; b || (y = !1)
        } function g(a, b, u, e, c, g) { var l, m, k = [], f = u.type; if (!h._callbacks[a]) return []; "keyup" == f && x(a) && (b = [a]); for (l = 0; l < h._callbacks[a].length; ++l) if (m = h._callbacks[a][l], (e || !m.seq || n[m.seq] == m.level) && f == m.action) { var d; (d = "keypress" == f && !u.metaKey && !u.ctrlKey) || (d = m.modifiers, d = b.sort().join(",") === d.sort().join(",")); d && (d = e && m.seq == e && m.level == g, (!e && m.combo == c || d) && h._callbacks[a].splice(l, 1), k.push(m)) } return k } function f(a, b, c, e) {
            h.stopCallback(b,
                b.target || b.srcElement, c, e) || !1 !== a(b, c) || (b.preventDefault ? b.preventDefault() : b.returnValue = !1, b.stopPropagation ? b.stopPropagation() : b.cancelBubble = !0)
        } function d(a) { "number" !== typeof a.which && (a.which = a.keyCode); var b = A(a); b && ("keyup" == a.type && z === b ? z = !1 : h.handleKey(b, F(a), a)) } function p(a, c, u, e) {
            function l(c) { return function () { y = c; ++n[a]; clearTimeout(r); r = setTimeout(b, 1E3) } } function g(c) { f(u, c, a); "keyup" !== e && (z = A(c)); setTimeout(b, 10) } for (var d = n[a] = 0; d < c.length; ++d) {
                var m = d + 1 === c.length ? g : l(e ||
                    B(c[d + 1]).action); q(c[d], m, e, a, d)
            }
        } function q(a, b, c, e, d) { h._directMap[a + ":" + c] = b; a = a.replace(/\s+/g, " "); var f = a.split(" "); 1 < f.length ? p(a, f, b, c) : (c = B(a, c), h._callbacks[c.key] = h._callbacks[c.key] || [], g(c.key, c.modifiers, { type: c.action }, e, a, d), h._callbacks[c.key][e ? "unshift" : "push"]({ callback: b, modifiers: c.modifiers, action: c.action, seq: e, level: d, combo: a })) } var h = this; a = a || v; if (!(h instanceof c)) return new c(a); h.target = a; h._callbacks = {}; h._directMap = {}; var n = {}, r, z = !1, t = !1, y = !1; h._handleKey = function (a,
            c, d) { var e = g(a, c, d), k; c = {}; var h = 0, l = !1; for (k = 0; k < e.length; ++k) e[k].seq && (h = Math.max(h, e[k].level)); for (k = 0; k < e.length; ++k) e[k].seq ? e[k].level == h && (l = !0, c[e[k].seq] = 1, f(e[k].callback, d, e[k].combo, e[k].seq)) : l || f(e[k].callback, d, e[k].combo); e = "keypress" == d.type && t; d.type != y || x(a) || e || b(c); t = l && "keydown" == d.type }; h._bindMultiple = function (a, b, c) { for (var d = 0; d < a.length; ++d) q(a[d], b, c) }; w(a, "keypress", d); w(a, "keydown", d); w(a, "keyup", d)
    } if (r) {
        var p = {
            8: "backspace", 9: "tab", 13: "enter", 16: "shift", 17: "ctrl",
            18: "alt", 20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home", 37: "left", 38: "up", 39: "right", 40: "down", 45: "ins", 46: "del", 91: "meta", 93: "meta", 224: "meta"
        }, t = { 106: "*", 107: "+", 109: "-", 110: ".", 111: "/", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'" }, D = { "~": "`", "!": "1", "@": "2", "#": "3", $: "4", "%": "5", "^": "6", "&": "7", "*": "8", "(": "9", ")": "0", _: "-", "+": "=", ":": ";", '"': "'", "<": ",", ">": ".", "?": "/", "|": "\\" }, C = {
            option: "alt", command: "meta", "return": "enter",
            escape: "esc", plus: "+", mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"
        }, n; for (f = 1; 20 > f; ++f) p[111 + f] = "f" + f; for (f = 0; 9 >= f; ++f) p[f + 96] = f.toString(); c.prototype.bind = function (a, b, c) { a = a instanceof Array ? a : [a]; this._bindMultiple.call(this, a, b, c); return this }; c.prototype.unbind = function (a, b) { return this.bind.call(this, a, function () { }, b) }; c.prototype.trigger = function (a, b) { if (this._directMap[a + ":" + b]) this._directMap[a + ":" + b]({}, a); return this }; c.prototype.reset = function () {
            this._callbacks = {};
            this._directMap = {}; return this
        }; c.prototype.stopCallback = function (a, b) { return -1 < (" " + b.className + " ").indexOf(" mousetrap ") || E(b, this.target) ? !1 : "INPUT" == b.tagName || "SELECT" == b.tagName || "TEXTAREA" == b.tagName || b.isContentEditable }; c.prototype.handleKey = function () { return this._handleKey.apply(this, arguments) }; c.addKeycodes = function (a) { for (var b in a) a.hasOwnProperty(b) && (p[b] = a[b]); n = null }; c.init = function () {
            var a = c(v), b; for (b in a) "_" !== b.charAt(0) && (c[b] = function (b) {
                return function () {
                    return a[b].apply(a,
                        arguments)
                }
            }(b))
        }; c.init(); r.Mousetrap = c; "undefined" !== typeof module && module.exports && (module.exports = c); "function" === typeof define && define.amd && define(function () { return c })
    }
})("undefined" !== typeof window ? window : null, "undefined" !== typeof window ? document : null);
(function (window) {
    window.y2TIFactory = y2TIFactory;

    // 默认设置
    var defConfig = {
        isIndexCol: true // 是否包含序号列
    }

    // tableInput对象
    function y2TableInput() {

    }

    y2TableInput.prototype.init = init;
    y2TableInput.prototype.getByClass = function (className, tag) {
        if (tag === undefined) tag = '*';
        var eleArray = this.node.getElementsByTagName(tag);
        var array = [];
        for (var i = 0; i < eleArray.length; i++) {
            if (hasClass(eleArray[i], className))
                array.push(eleArray[i]);
        }
        return array;
    }
    y2TableInput.prototype.relizeWidth = function(){
        var headTr = this.getByClass("y2_tableInput_head_tr", "tr")[0];
        var bodyTr = this.getByClass("y2_tableInput_body_tr", "tr")[0];
        var footTr = this.getByClass("y2_tableInput_foot_tr", "tr")[0];
        var headTds = headTr.getElementsByTagName("td");
        var bodyTds = bodyTr.getElementsByTagName("td");
        var footTds = footTr.getElementsByTagName("td");
        var modalTds = this.config.modalTr.getElementsByTagName("td");
        for (var i = 0; i < headTds.length; i++) {
            var colIndex = headTds[i].getAttribute("data-colIndex");
            if (colIndex && this.config.field[colIndex]) {
                headTds[i].style.width = this.config.field[colIndex].width;
                bodyTds[i].style.width = this.config.field[colIndex].width;
                footTds[i].style.width = this.config.field[colIndex].width ;
                modalTds[i].style.width = this.config.field[colIndex].width;
            }
        }

    }
    /**验证数据 */
    y2TableInput.prototype.validateAll = function () {
        var field = this.config.field;
        var illArray = [];
        var flag = true;
        for (var i = 0; i < this.data.length; i++) {
            for (var j = 0; j < field.length; j++) {
                if (field[j].validation) {
                    var tdFlag = validate(field[j].validation, this.data[i][field[j].field]);
                    flag = flag && tdFlag;
                    if (!tdFlag) {
                        illArray.push({trIndex:i,colIndex:j});
                    }
                }
                
            }
        }
        if (illArray.length > 0) {
            var tbody = this.getByClass("y2_tableInput_body", "tbody")[0];
            var trs = tbody.getElementsByTagName("tr");
            for (var i = 0; i < illArray.length; i++) {
                var theTr = trs[illArray[i]["trIndex"]];
                if (theTr) {
                    var tds = theTr.getElementsByTagName("td");
                    var theTd = tds[illArray[i]["colIndex"]];
                    addClass(theTd,"y2_tableInput_illtd")
                }
            }
        }
        return flag;
    }
    /**
     * 获取数据
     * @param {any} dataType 数据类型 1. '◇','◆' 拼接起来 2 json
     * @param {any} needArray 需要的数据及顺序
     */
    y2TableInput.prototype.getData = function (dataType, needArray) {
        if (dataType === undefined) dataType = 'str';
        if (needArray === undefined) {
            var needArray = [];
            for (var i = 0; i < this.config.field.length; i++) {
                needArray.push(this.config.field[i]["field"]);
            }
        }
        var str = "";
        if (dataType == 'str') {
            for (var i = 0, oLen = this.data.length; i < oLen; i++) {
                for (var j = 0, iLen = needArray.length; j < iLen; j++) {
                    str += this.data[i][needArray[j]];
                    if (j < iLen - 1) {
                        str += '◇';
                    }
                }
                if (i < oLen - 1) {
                    str += '◆';
                }
            }
        }
        if (dataType == "json") {
            str = JSON.stringify(this.data)
        }
        return str;
    }
    // 创建表格工厂
    function y2TIFactory(config) {
        var obj = new y2TableInput();
        obj.config = extendObj(defConfig, config);
        Mousetrap.bind('del', function (e) {
            if (obj.checkedTrArray && obj.checkedTrArray.length > 0 && confirm("是否删除这" + obj.checkedTrArray.length + "条数据?")) {
                var sortArray = [];
                for (var i = 0; i < obj.checkedTrArray.length; i++) {
                    sortArray.push(obj.checkedTrArray[i].getAttribute("data-Index") * 1)                                      
                }
                sortArray = sortArray.sort(function (a, b) {
                    return a - b;
                });
                for (var i = sortArray.length - 1; i > -1; i--) {
                    deleteRow(obj, sortArray[i] , true);
                }
                  
                obj.checkedTrArray = [];
                sortTable(obj);
                
            }
        });
        config && obj.init();
        return obj;
    }

    function init() {
        var config = this.config;
        this.data = config.data;        
        // 既没有数据有没有设置
        if (isNullOrEmptyArray(config.field) && isNullOrEmptyArray(this.data)) {
            return;
        }
        if (isNullOrEmptyArray(config.field)) {
            config.field = initField(this.data[0]);
        }
        //将一些不规范的数据集重新整理 如select数据源不包含 value lable;
        config.field = sortField(config.field);
        //初始化width宽度
        if (!config.width) {
            initWidth(config)
        }
        //如果没有数据,添加一条空数据 
        if (isNullOrEmptyArray(this.data)) {
            this.data = initData(config);
        }
        // 初始化模板数据
        if (!config.modalData) {
            config.modalData = initModalData(config);
        }
        // 初始化模板行
        if(!config.modalTr){
            config.modalTr = initModalTr(config);
        }
        this.node = createY2TableInput(this);
    }

    function initData(config) {
        var fieldConfig = config.field;
        var obj = {},data=[];
        for (var i = 0; i < fieldConfig.length; i++) {
            obj[fieldConfig[i]["field"]] = "";
        }
        data.push(obj);
        return data;
    }

    function initField(data) {
        var field = [];
        for (var key in data) {
            field.push({ text: key, field: key })
        }
        return field;
    }

    function sortField(field) {
        for (var i = 0; i < field.length; i++) {
            if (field[i]["cType"] === "select") {
                var bindData = field[i]["bindData"];
                if (!isNullOrEmptyArray(bindData) && (!bindData[0].hasOwnProperty("value") || !bindData[0].hasOwnProperty("label")))
                    field[i]["bindData"] = sortBindData(bindData);
            }
        }
        return field;
    }

    function sortBindData(bindData) {
        var array = [];
        for (var key in bindData[0]) {
            array.push(key);
        }
        for (var i = 0; i < bindData.length; i++) {
            if (array.length === 1) {
                bindData[i]["value"] = bindData[i][array[0]];
                bindData[i]["label"] = bindData[i][array[0]];
            } else {
                bindData[i]["value"] = bindData[i][array[0]];
                bindData[i]["label"] = bindData[i][array[1]];
            }
        }
        return bindData;
    }

    //初始化width宽度
    function initWidth(config) {
        if (!config) return;
        var tableWidth = 0;
        for (var i = 0; i < config.field.length; i++) {
            if (!config.field[i].hidden) {
                config.field[i].width = config.field[i].width || "100px";
                config.width = (config.width || 0) + (config.field[i].width.replace('px', '') * 1);
                tableWidth += config.field[i].width.replace('px', '') * 1;
            }
        }
        config.width += 17;
        if (!config.tableWidth) {
            if (config.isIndexCol) {
                tableWidth = tableWidth + 30;
            }
            config.tableWidth = tableWidth + 30;
        }
    }

    function initModalTr(config) {
        var fieldConfig = config.field;
        var tr = y2CreateElement('tr', { className:"y2_tableInput_body_tr" });
        //序号列
        if (config.isIndexCol) {
            var td = y2CreateElement("td", { className: "y2_tableInput_body_index" })
            td.style.width = "30px";
            td.setAttribute("data-readOnly", "true");
            tr.appendChild(td);
        }
        for (var j = 0; j < fieldConfig.length; j++) {
            if (!fieldConfig[j].hidden) {
                var td = y2CreateElement('td');
                td.style.width = fieldConfig[j].width;
                td.setAttribute("data-field", fieldConfig[j]["field"]);
                td.setAttribute("data-colindex", j);
                td.setAttribute("data-ctype", fieldConfig[j]["cType"] || "input");
                td.setAttribute("data-readOnly", fieldConfig[j]["readOnly"] + "");
                td.setAttribute("data-copy", fieldConfig[j]["copy"]);
                var value = changeUN(fieldConfig[j]["defValue"]);
                if (fieldConfig[j]["cType"] === "select") {
                    value = getValueByArray(fieldConfig[j]["bindData"], value);
                }
                setTdValue(td, value);
                tr.appendChild(td);
            }
        }
        return tr;
    }

    function initModalData(config) {
        var fieldConfig = config.field;
        var obj = {};
        for (var j = 0; j < fieldConfig.length; j++) {
            obj[fieldConfig[j]["field"]] = fieldConfig[j]["defValue"] === undefined ? "" : fieldConfig[j]["defValue"];
        }
        return obj;
    }
    // 创建
    function createY2TableInput(y2TI) {
        var config = y2TI.config;
        var div = y2CreateElement("div", { className: "y2_tableInput_wrapper" });
        var head = initHead(y2TI);
        var body = initBody(y2TI);
        var foot = initFoot(y2TI);
        div.style.width = config.width + 'px';
        div.appendChild(head);
        div.appendChild(body);
        div.appendChild(foot);
        return div;

    }

    // 创建表头
    function initHead(y2TI) {
        var headConfig = y2TI.config.field;
        if(headConfig){
            var tr = y2CreateElement('tr', { className: "y2_tableInput_head_tr" }), td = null;
            //序号列
            if (y2TI.config.isIndexCol) {
                var td = y2CreateElement("td", { className: "y2_tableInput_head_index" });
                td.setAttribute("data-readOnly", "true");                
                td.style.width = "30px";
                td.onclick = function () {
                    showMoreConfig(y2TI);
                }
                td.innerHTML = "<div style='width:100%'><div>";
                tr.appendChild(td);
            }
            for (var i = 0; i < headConfig.length; i++){
                if (headConfig[i].hidden) continue;
                td = y2CreateElement('td');
                td.style.width = headConfig[i]["width"];
                td.innerText = headConfig[i]["text"];
                td.setAttribute("unselectable", "on");
                td.setAttribute("data-colIndex", i);
                tr.appendChild(td);
                var lineLeft = y2CreateElement("div", { className: "y2_tableInput_line y2_tableInput_line_left" });
                var lineRight = y2CreateElement("div", { className: "y2_tableInput_line y2_tableInput_line_right" });
               
                var ps, targetTd, isstretching;
                // 缩放表格
                td.onmousemove = function (e) {
                    e = e || window.event;        
                    if (!isstretching) {
                        if (e.offsetX < 3 || e.offsetX > (this.clientWidth - 3)) {
                            this.style.cursor = "col-resize";
                            if (e.offsetX < 3) ps = "left";
                            else ps = "right";
                        } else {
                            this.style.cursor = "auto";
                        }
                    }
                }
                //将鼠标移动事件绑定到document 这样即使鼠标移出浏览器也能监听到具体位置
                document.onmousemove = function (e) {
                    var wrapOffsetLeft = 0;
                    var wrap = y2TI.node;
                    while (wrap) {
                        wrapOffsetLeft += wrap.offsetLeft || 0;
                        wrap = wrap.offsetParent;
                    }
                    e = e || window.event;
                    if (isstretching) {
                        if (ps == "left" && (targetTd.clientWidth + targetTd.offsetLeft - (e.clientX - wrapOffsetLeft) > 20)) {                           
                            lineLeft.style.left = e.clientX - wrapOffsetLeft + "px";
                        }
                        else if (ps == "right" && e.clientX - wrapOffsetLeft - targetTd.offsetLeft > 20) {
                            lineRight.style.left = e.clientX - wrapOffsetLeft + "px";
                        }
                    }
                }

                td.onmousedown = function (e) {
                    e = e || window.event;
                    // 先获取y2_tableInput_wrapper的父元素的offsetLeft的合计
                    var offsetParent = 0;
                    var pNode = this;
                    while (pNode && !hasClass(pNode,"y2_tableInput_wrapper")) {
                        offsetParent += pNode.offsetLeft || 0;
                        pNode = pNode.offsetParent;
                    }
                    if (this.style.cursor == "col-resize") {                        
                        lineLeft.style.left = offsetParent + "px";
                        lineRight.style.left = (offsetParent + this.clientWidth) + "px";
                        y2TI.node.appendChild(lineLeft);
                        y2TI.node.appendChild(lineRight);
                        isstretching = true;
                        targetTd = this; 
                    }
                }

                document.onmouseup = function (e) {
                    e = e || window.event;
                    var targetTable = targetTd;
                    if (isstretching) {
                        isstretching = false;
                        while (targetTable && targetTable.nodeName.toLowerCase() != "table") {
                            targetTable = targetTable.parentNode;
                        }
                        var newWidth = (lineRight.style.left.replace('px', '') - lineLeft.style.left.replace('px', '') - 2) - targetTd.style.width.replace("px", "");
                        computeWidth(targetTd, newWidth, y2TI,ps);
                                        
                        // 移除线条
                        y2TI.node.removeChild(lineLeft);
                        y2TI.node.removeChild(lineRight);
                    }
                } 

            }
            var eleList = y2AppendChild(y2CreateElement('div', { className: "y2_tableInput_head_div" }),
                y2CreateElement('table', { className: "y2_tableInput_head_table " }),
                y2CreateElement('thead', { className: "y2_tableInput_head_thead" }),
                tr);

            // 尾部再加上滚动条宽度的空白
            eleList[1].style.width = y2TI.config.tableWidth + 'px';
            return eleList[0];
        } 
    }

    // 创建表体
    function initBody(y2TI) {
        var fieldConfig = y2TI.config.field,
            data = y2TI.data;
            modalTr = y2TI.config.modalTr;
        var tbody = y2CreateElement("tbody", { className: "y2_tableInput_body" });
        var div = y2AppendChild(y2CreateElement('div', { className: "y2_tableInput_body_div" }),
            y2CreateElement('table', { className: "y2_tableInput_body_table " }),
            tbody);
        for (var i = 0; i < data.length; i++) {
            var tr = modalTr.cloneNode(true);
            if (i % 2 === 1) addClass(tr, "y2_tableInput_oddRow");
            tr.setAttribute("data-index", i);           
            var tds = tr.getElementsByTagName("td"),
                datai = data[i],
                startIndex = 0;
            if (y2TI.config.isIndexCol) {
                tds[0].innerHTML = "<div>" + (i + 1) + "</div>";
                startIndex = 1;
            }         
            for (var j = startIndex; j < tds.length; j++) {
                var field = tds[j].getAttribute("data-field");
                var colIndex = tds[j].getAttribute("data-colindex");
                var value = datai[field];
                if (fieldConfig[colIndex]["cType"] === "select") {
                    var text = getValueByArray(fieldConfig[colIndex]["bindData"], value);
                    toggleTdStatus(tds[j], "display", y2TI,text);
                } else {
                    toggleTdStatus(tds[j], "display", y2TI);
                }
                
            }
            tbody.appendChild(tr);
        }      
        div[1].style.width = y2TI.config.tableWidth + 'px';
        div[1].onclick = function (e) {
            onTableClick(e, y2TI);
        }
        tbody.onpaste = function (e) {
            var str = getClipboard();
            if (str != null) {
                var e = e || window.event;
                var target = e.srcElement || e.target;
                var theTd = target.parentNode;
                var theTr = theTd.parentNode;
                var theTbody = theTr.parentNode;
                var trDetailArry = str.split('\n');
                var index = theTr.getAttribute("data-index") * 1;
                var field = y2TI.config.field;
                var colIndex = theTd.getAttribute("data-colIndex") * 1;
                var data = y2TI.data;
                if (trDetailArry.length > 1) {
                   
                    if (confirm('是否复制多行数据？')) {
                        var flag = false;
                        var trs = theTbody.getElementsByTagName("tr");
                        for (var i = 0, len = trDetailArry.length; i < len; i++) {
                            if (trDetailArry[i]) {
                                var tdDetailArry = trDetailArry[i].split('\t');
                                var arrayIndex = 0;
                                if (!data[index + i]) {
                                    //addRow(y2TI, 0);
                                    var tr = y2TI.config.modalTr.cloneNode(true);
                                    tr.getElementsByTagName("td")[0].innerHTML = (index + i + 1);
                                    tr.setAttribute("data-index", index + i);
                                    if ((index + i) % 2 == 1) addClass(tr, "y2_tableInput_oddRow");
                                    data[index + i] = deepCloneObj(y2TI.config.modalData);
                                    flag = true;
                                } else {
                                    tr = trs[index + i];
                                    
                                }
                                for (var j = colIndex; j < field.length && arrayIndex < tdDetailArry.length; j++) {
                                    if (!field[j].readOnly && !field.hidden) {
                                        var fieldName = field[j]["field"];
                                        data[index + i][fieldName] = tdDetailArry[arrayIndex] || "";
                                        arrayIndex++;
                                    }
                                }
                               
                                fillTr(data[index + i], tr, y2TI);
                                flag && theTbody.appendChild(tr);
                            }
                        }
                        //sortTable(y2TI);
                        initFoot(y2TI);
                        y2TI.validateAll();
                        return false;
                    }
                   
                }

            }

        }
        return div[0];
    }

    /**
     * 更新tr数据
     * @param {any} data
     * @param {any} tr
     * @param {any} y2TI
     */
    function fillTr(data, tr, y2TI) {
        var field = y2TI.config.field;
        var tds = tr.getElementsByTagName("td");
        for (var i = 0; i < tds.length; i++) {
            var fieldName = tds[i].getAttribute("data-field");
            var colIndex = tds[i].getAttribute("data-colindex");
            if (fieldName && colIndex) {
                setTdValue(tds[i], getLabel(data[fieldName], field[colIndex]));                
            }
        }

    }

    /**
     * 根据值取出显示值
     * @param {any} value
     * @param {any} field
     */
    function getLabel(value, field) {
        var data = field.bindData;
        if (!data) {
            return value;
        }
        if (getObjFormArray(data, "value", value) > -1) {
            return data[getObjFormArray(data, "value", value)]["label"];
        }
    }

    // 创建合计
    function initFoot(y2TI,nowfield) {
        var fieldConfig = y2TI.config.field;
        var tbody = null,tr = null;
        if (y2TI.node && y2TI.getByClass("y2_tableInput_foot_tr", "tr")[0]) {
            tr = y2TI.getByClass("y2_tableInput_foot_tr", "tr")[0];
        } else {
            tbody = y2CreateElement("tbody", { className: "y2_tableInput_foot_tbody" });
            var div = y2AppendChild(y2CreateElement('div', { className: "y2_tableInput_foot_div" }),
                y2CreateElement('table', { className: "y2_tableInput_foot_table " }),
                tbody);
            tr = y2TI.config.modalTr.cloneNode(true);
            tr.className = "y2_tableInput_foot_tr";
            tbody.appendChild(tr);
            div[1].style.width = y2TI.config.tableWidth + 'px';
            div = div[0];
        }
        var tds = tr.getElementsByTagName("td");
        setTdValue(tds[0], "合计");
        
        for (var i = 1; i < tds.length; i++) {
            var td = tds[i];            
            var field = fieldConfig[td.getAttribute("data-colIndex")];
            if (field.isSum) {
                if (nowfield && nowfield == field.field || !nowfield)
                    setTdValue(td,getSum(field.field, y2TI.data));
            } else {
                setTdValue(td,"");
            }
        }
        if (!y2TI.config.hasSum) {
            div.style.display = "none";
        }
        return div;
    }

    /**
     *  重新计算宽度
     * @param {any} targetTd 目标td
     * @param {any} newWidth 调整宽度
     * @param {any} y2TI
     * @param {any} ps  方向
     */
    function computeWidth(targetTd, newWidth, y2TI,ps) {
        var colIdnex = targetTd.getAttribute("data-colIndex");
        var anoIndex = colIdnex + (ps === "left" ? -1 : 1);
        var field = y2TI.config.field;
        if (field[anoIndex]) {
            var oldWidth = field[anoIndex].width.replace("px", "") * 1 + field[colIdnex].width.replace("px", "") * 1;
            var zWidth = field[colIdnex].width.replace("px", "") * 1 + newWidth;
            var aWidth = (oldWidth - zWidth * 1);
            if (zWidth < 20) {
                zWidth = 20;
                aWidth = oldWidth - 20;
            }
            if (aWidth < 20) {
                aWidth = 20;
                zWidth = oldWidth - 20;
            }
            field[colIdnex].width = zWidth + "px";
            field[anoIndex].width = aWidth + "px";
        }
        y2TI.relizeWidth();
    }

    function getSum(fieldName, data) {
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += data[i][fieldName] * 1 || 0;
        }
        return (sum || 0).toFixed(2);
    }

    /**
     * 增加行
     * @param {any} y2TI：对象
     * @param {any} type:增加类型 0:最末尾插入,1:本行下方插入,2:本行上方插入
     * @param {any} tr:当前行
     * @param {any} isCopy:是否复制当前行
     */
    function addRow(y2TI, type, tr,isCopy) {
        var newTr = y2TI.config.modalTr.cloneNode(true);
        var newData = deepCloneObj(y2TI.config.modalData);
        if (isCopy) {
            newTr = tr.cloneNode(true);
            newData = deepCloneObj(y2TI.data[tr.getAttribute("data-index")]);
        }
        var tbody = y2TI.getByClass("y2_tableInput_body", "tbody")[0];  
        var index = -1;
        if (type == 0) {
            y2TI.data.push(newData);
            tbody.appendChild(newTr);
            index = tbody.getElementsByTagName("tr").length - 1;
        }
        else if (type == 1) {
            index = tr.getAttribute("data-index") * 1;
            y2TI.data.splice(index + 1, 0, newData);
            insertAfter(newTr, tr);
            index++;
        } else if (type == 2) {
            index = tr.getAttribute("data-index") * 1;
            y2TI.data.splice(index, 0, newData);
            tbody.insertBefore(newTr, tr);           
        }
        newTr.setAttribute("data-index", index);
        if (index % 2 === 1) addClass(newTr, "y2_tableInput_oddRow");
        if (!isCopy) {
            //检查是否有复制上列值
            var tds = newTr.getElementsByTagName("td");
            for (var i = 0; i < tds.length; i++) {
                if (tds[i].getAttribute("data-copy") == "1") {
                    var value = y2TI.data[index - 1][tds[i].getAttribute("data-field")];
                    y2TI.data[index][tds[i].getAttribute("data-field")] = value;
                    setTdValue(tds[i], value);
                }
            }
        }
        if (y2TI.config.isIndexCol) {
            newTr.getElementsByTagName("td")[0].innerHTML = "<div>" + (index + 1) + "</div>";
        }
        toggleCheckedTr(newTr, y2TI);
        if (type != 0) {
            sortTable(y2TI);
        }
        adjustTableHeight(y2TI);
        return newTr;
    }

    /**
    * 删减行
    * @param {any} y2TI：对象
    * @param {any} index:当前行位置
    * @param {any} isBatch:是否有提示,批量删除是不需要提示
    */
    function deleteRow(y2TI, index ,isBatch) {        
        if (index === undefined) return;
        if (isBatch || confirm("确定删除第" + (index+1) + "行数据吗?")) {
            var tbody = y2TI.getByClass("y2_tableInput_body", "tbody")[0];
            var trs = tbody.getElementsByTagName("tr");
            y2TI.data.splice(index, 1);
            tbody.removeChild(trs[index]);
            if (y2TI.data.length === 0) {
                addRow(y2TI, 0)
            }
            if (!isBatch) sortTable(y2TI);
        }
        adjustTableHeight(y2TI);
    }

    /**
     * 整理顺序
     * @param {any} tbody
     */
    function sortTable(y2TI) {
        var tbody = y2TI.getByClass("y2_tableInput_body", "tbody")[0];
        var trs = tbody.getElementsByTagName("tr");
        for (var i = 0; i < trs.length; i++) {            
            var tr = trs[i];
           //if (tr.getAttribute("data-index") != i ) {               
                tr.setAttribute("data-index", i);
                var first = tr.getElementsByTagName("td")[0];
            if (first && hasClass(first, "y2_tableInput_body_index")) {
                first.innerText = i + 1;
                }
            //}
            if (i % 2 == 1) {
                addClass(tr, "y2_tableInput_oddRow");
            } else {
                removeClass(tr, "y2_tableInput_oddRow");
            }
        }
        adjustTableHeight(y2TI);
    }


    /**
     * 切换单元格状态
     * @param {any} td 单元格
     * @param {any} status 状态 "display":显示 , "input" 输入
     * @param {any} text 显示值 用于显示和输入不一致的控件 如 select
     */
    function toggleTdStatus(td, status, y2TI, text) {
        var tr = td.parentNode;
        var readOnly = td.getAttribute("data-readOnly");
        var dataStatus = td.getAttribute("data-status");
        if (dataStatus != status) {
            var index = tr.getAttribute("data-Index")
            text = text || changeUN(y2TI.data[index][td.getAttribute("data-field")]);
            td.setAttribute("data-status", status);
            if (status === "display") {
                setTdValue(td,text)
            }
            if (status === "input" && readOnly != "true") {
                focusOn(td, text, y2TI);
            }
        }
    }



    function onTableClick(e, y2TI) {
        onTdClick(e, y2TI);
    }

    function onTdClick(e, y2TI) {
        var e = e || window.event;
        var target = e.srcElement || e.target;
        while (target && target.nodeName.toLowerCase() !== "td") {
            target = target.parentNode;
        }
        if (hasClass(target, "y2_tableInput_body_display")) target = target.parentNode;
        if (e.ctrlKey) {
            if (!y2TI.checkedTrArray) y2TI.checkedTrArray = [];
            addClass(target.parentNode, "y2_tableInput_checkedTr");
            var index = -1;
            for (var i = 0; i < y2TI.checkedTrArray.length; i++) {
                if (y2TI.checkedTrArray[i] == target.parentNode) {
                    index = i;
                    break;
                }
            }
            if (index === -1) y2TI.checkedTrArray.push(target.parentNode);
            else {
                y2TI.checkedTrArray.splice(index, 1)
                removeClass(target.parentNode, "y2_tableInput_checkedTr");
            }
        } else if (e.shiftKey) {
            if (!y2TI.checkedTrArray) y2TI.checkedTrArray = [];
            var currIndex = target.parentNode.getAttribute("data-Index") * 1;
            if (y2TI.checkedTrArray.length > 0) {
                var lastTr = y2TI.checkedTrArray[y2TI.checkedTrArray.length - 1];
                var lastIndex = lastTr.getAttribute("data-Index") * 1;
                for (var i = 0; i < y2TI.checkedTrArray.length; i++) {
                    removeClass(y2TI.checkedTrArray[i], "y2_tableInput_checkedTr");
                }
                y2TI.checkedTrArray = [];
                var tbody = y2TI.getByClass("y2_tableInput_body", "tbody")[0];
                var trs = tbody.getElementsByTagName("tr");
                if (lastIndex < currIndex) {
                    currIndex = lastIndex;
                    lastIndex = target.parentNode.getAttribute("data-Index") * 1;
                }
                for (var j = currIndex; j <= lastIndex; j++) {
                    y2TI.checkedTrArray.push(trs[j]);
                    addClass(trs[j], "y2_tableInput_checkedTr");
                }
                

            }
        } else {
            toggleCheckedTr(target.parentNode, y2TI);
        }
        if (!hasClass(target, "y2_tableInput_body_index")) {
            toggleTdStatus(target, "input", y2TI);
        }
    }

    /**
     * 中间内容有一个高度，超过这个高度生成滚动条，低于这个高度去掉滚动条
     * @param {any} y2TI
     */
    function adjustTableHeight(y2TI) {
        var head = y2TI.getByClass("y2_tableInput_head_div", "div")[0];
        var bodydiv = y2TI.getByClass("y2_tableInput_body_div", "div")[0];
        var foot = y2TI.getByClass("y2_tableInput_foot_div", "div")[0];
        var table = y2TI.getByClass("y2_tableInput_body_table ", "table")[0];
        if (table) {
            if (table.offsetHeight > y2TI.config.height) {
                bodydiv.style.height = y2TI.config.height + "px";
                bodydiv.style.overflow = "auto";
                head.style.borderRight = "17px solid #F0F0F0";
                foot.style.borderRight = "17px solid #F0F0F0";
            }
            if (table.offsetHeight <= y2TI.config.height) {
                bodydiv.style.height = "auto";
                head.style.borderRight = "none";
                foot.style.borderRight = "none";
            }
        }
    }

    // 将tr设置为选中状态
    function toggleCheckedTr(tr, y2TI) {
        if (!y2TI.checkedTrArray) y2TI.checkedTrArray = [];
        for (var i = 0; i < y2TI.checkedTrArray.length; i++) {
            removeClass(y2TI.checkedTrArray[i], "y2_tableInput_checkedTr");
        }
        y2TI.checkedTrArray = [];
        addClass(tr, "y2_tableInput_checkedTr");
        y2TI.checkedTrArray.push(tr);
    }


    /**
     * 将焦点置于目标元素，使得该元素处于可编辑状态
     * @param {any} target 目标td
     */
    function focusOn(target, value, y2TI) {
        var field = target.getAttribute("data-field");
        var colIndex = target.getAttribute("data-colIndex");
        var ctype = target.getAttribute("data-ctype");
        var ele = null;
        target.innerHTML = "";
        toggleCheckedTr(target.parentNode, y2TI)
        switch (ctype) {
            case "choosePage":
            case "input":
                ele = y2CreateElement("input", { className: "y2Input" });
                ele.value = value;
                ele.onkeydown = function (e) {
                    var e = e || window.event;
                    var keyCode = e.keyCode;
                    if (keyCode == "13" || keyCode == "9") {
                        try {
                            if (ctype == "choosePage" && keyCode == "13") {
                                var path = y2TI.config.field[colIndex]["chooseConfig"]["path"];
                                var reString = y2TI.config.field[colIndex]["chooseConfig"]["reString"].split(",");
                                var win = window.showModalDialog(path, "", "scroll:yes;status:no;dialogWidth:800px;dialogHeight:600px");
                                if (Object.prototype.toString.call(win) === "[object Array]") {
                                    for (var i = 0; i < win.length; i++) {
                                        if (reString[i]) {
                                            setAllValue(getTd(target.parentNode, reString[i]), y2TI, win[i]);
                                        }
                                    }
                                } else {
                                    setValue(target, this.value, y2TI);
                                }
                                toggleTdStatus(target, "display", y2TI);
                                moveCursor(target, "r", 1, y2TI);
                            } else {
                                setValue(target, this.value, y2TI);
                                toggleTdStatus(target, "display", y2TI);
                                moveCursor(target, "r", 1, y2TI);
                            }
                        } catch (e) {
                        }
                        event.preventDefault ? event.preventDefault() : event.returnValue = false;
                    } else if (keyCode == "37") {// 左
                        var poistion = getTxt1CursorPosition(this)
                        if (poistion == 0) {
                            setValue(target, this.value, y2TI);
                            toggleTdStatus(target, "display", y2TI);
                            moveCursor(target, "l", 1, y2TI);
                        }
                    } else if (keyCode == "38") {// 上
                        setValue(target, this.value, y2TI);
                        toggleTdStatus(target, "display", y2TI);
                        if (e.ctrlKey) {
                            addRow(y2TI, 2, target.parentNode)
                        } else if (e.altKey) {
                            addRow(y2TI, 2, target.parentNode,true)
                        }
                        moveCursor(target, "t", 1, y2TI);
                    } else if (keyCode == "39") {// 右
                        var poistion = getTxt1CursorPosition(this)
                        if (!this.value || this.value.length === poistion) {
                            setValue(target, this.value, y2TI);
                            toggleTdStatus(target, "display", y2TI);
                            moveCursor(target, "r", 1, y2TI);
                        }
                    } else if (keyCode == "40") {// 下
                        setValue(target, this.value, y2TI);
                        toggleTdStatus(target, "display", y2TI);
                        if (e.ctrlKey) {
                            addRow(y2TI, 1, target.parentNode)
                        } else if (e.altKey) {
                            addRow(y2TI, 1, target.parentNode, true)
                        }
                        moveCursor(target, "b", 1, y2TI);
                    } else if (keyCode == "46") {
                        deleteRow(y2TI, target.parentNode.getAttribute("data-Index"))
                    }
                   
                }
                ele.onblur = function () {
                    setValue(target, this.value, y2TI);
                    
                    toggleTdStatus(target, "display", y2TI);
                }
                target.appendChild(ele);
                ele.focus();
                break;
            case "date":
                ele = y2CreateElement("input", { className: "y2Input" });
                ele.value = value;
                ele.onclick = function () {
                    setday(this);
                }
                target.appendChild(ele);
                setTimeout(function () { ele.click(); ele.focus(); }, 200)
                window.DateCallBack = function () {
                    setValue(target, ele.value, y2TI);
                    toggleTdStatus(target, "display", y2TI, ele.value);
                    moveCursor(target, "r", 1, y2TI);
                }
                ele.onkeydown = function (e) {
                    var e = e || window.event;
                    var keyCode = e.keyCode;
                    if (keyCode == "13" || keyCode == "9") {
                        toggleTdStatus(target, "display", y2TI);
                        moveCursor(target, "r", 1, y2TI);
                        event.preventDefault ? event.preventDefault() : event.returnValue = false;
                    } else if (keyCode == "37") {// 左
                        toggleTdStatus(target, "display", y2TI);
                        moveCursor(target, "l", 1, y2TI);
                    } else if (keyCode == "38") {// 上
                        toggleTdStatus(target, "display", y2TI);
                        moveCursor(target, "t", 1, y2TI);
                    } else if (keyCode == "39") {// 右
                        toggleTdStatus(target, "display", y2TI);
                        moveCursor(target, "r", 1, y2TI);
                    } else if (keyCode == "40") {// 下
                        toggleTdStatus(target, "display", y2TI);
                        moveCursor(target, "b", 1, y2TI);
                    } else {
                        event.preventDefault ? event.preventDefault() : event.returnValue = false;
                    }

                }
                
                break;
            case 'select':
                var bindData = null;
                for (var i = 0, fieldConfig = y2TI.config.field; i < fieldConfig.length; i++) {
                    if (fieldConfig[i].field == field) {
                        bindData = fieldConfig[i].bindData || [];
                        break;
                    }
                }

                ele = buildSelect(bindData, y2TI, target, value);
               
                //$(ele).select2();
                //$(ele).val(value).trigger("change");;
                //$(ele).on("select2:close", function (e) {
                //    var value = $(ele).select2("val");
                //    var text = $(ele).select2('data')[0] && $(ele).select2('data')[0].text;
                //    setValue(target, value, y2TI);
                //    toggleTdStatus(target, "display", y2TI ,text);
                //    moveCursor(target, "r", 1, y2TI);
                //}) 
                //$(ele).select2("open");
                break;
            default:
                ele = y2CreateElement("input", { className: "y2Input" })
                break;
        }      
    }

    /**
     * 更多设置
     * @param {any} y2TI
     */
    function showMoreConfig(y2TI) {
        var diag = new Dialog();
        var config = y2TI.config;
        var field = config.field;
        diag.Width = 800;
        diag.Height = screen.availHeight - 250;
        diag.Title = "更多设置";
        var str = '';
        str = '<div class="y2_tableInput_configdiv" style="height:' + (screen.availHeight - 400) + '">';
        str += '<ul class="y2_tableInput_configul" sty>';
        str += '<li><label>主要设置</label></li>';
        for (var i = 0; i < field.length; i++) {
            str += buildConfigLi(field[i],i);
        }
        str += '</ul></div>'
        diag.InnerHtml = str;


        //diag.OKEvent = function () {
        //    var table = getByClassName(document, 'showConfigTable', 'table')[0];
        //    var tbody = table.getElementsByTagName('tbody')[0];
        //    var trList = tbody.getElementsByTagName('tr');
        //    var isSaveWidth = obj._Config.isSaveWidth;
        //    var array = [];
        //    for (var i = 0; i < trList.length; i++) {
        //        var tr = trList[i];
        //        var typeSelect = tr.cells[4].getElementsByTagName('select')[0];
        //        var nobj = {
        //            name: tr.cells[0].innerText,
        //            isShow: tr.cells[2].getElementsByTagName('input')[0].checked ? true : false,
        //            fieldType: typeSelect.options[typeSelect.selectedIndex].value
        //        };
        //        if (isSaveWidth) nobj['width'] = tr.cells[1].getElementsByTagName('input')[0].value;
        //        array.push(nobj);
        //    }
        //    var perConfig = {
        //        itemList: array,
        //        isSaveWidth: isSaveWidth
        //    };
        //    Ajax.post(obj._Config.path.save, 'methodType=save&tableId=' + obj._Config.id + '&href=' + location.pathname + location.search + '&config=' + JSON.stringify(perConfig), function () {

        //    })

        //    diag.close();
        //    if (isSaveWidth) {
        //        obj._Config.isFixedWidth = true;
        //    } else {
        //        getWidthObj(obj);
        //    }
        //    obj._Config.itemList = array;

        //    obj.PageTurnTo(1, true);

        //    obj.getElement('theaddiv', 'div')[0].scrollLeft = obj.getElement('bodytablediv', 'div')[0].scrollLeft = 0;
        //    if (obj._Config.sumConfig.isShow) obj.getElement('sumDiv', 'div')[0].scrollLeft = 0;
        //    //存储设置
        //    //var ajData = deepCloneObj(obj._Config);
        //    //ajData.data = null;
        //    //ajData.searchedData = null;
        //    //ajData.currentData = null;


        //};//点击确定后调用的方法
        diag.show();

        //var table = getByClassName(document, 'showConfigTable', 'table')[0];
        //table.onclick = function (e) {
        //    var e = e || window.event;
        //    var target = e.srcElement || e.target;
        //    var tr = target;
        //    if (tr && tr.nodeName.toUpperCase() != 'TR') {
        //        tr = tr.parentNode;
        //    }
        //    if (target.nodeName.toUpperCase() == 'I') {
        //        var tr = target.parentNode.parentNode;
        //        var tbody = tr.parentNode;
        //        var oldtr = '';
        //        if (hasClass(target, 'topre')) {
        //            oldtr = tr.previousElementSibling || tr.previousSibling;
        //            oldtr && tbody.insertBefore(tr, oldtr);
        //        }
        //        if (hasClass(target, 'tonext')) {
        //            oldtr = tr.nextElementSibling || tr.nextSibling;
        //            oldtr && tbody.insertBefore(oldtr, tr);
        //        }
        //        if (hasClass(tr, 'oddrow')) {
        //            removeClass(tr, 'oddrow');
        //            addClass(tr, 'evenrow');
        //            if (oldtr) {
        //                removeClass(oldtr, 'evenrow');
        //                addClass(oldtr, 'oddrow');
        //            }
        //        } else {
        //            removeClass(tr, 'evenrow');
        //            addClass(tr, 'oddrow');
        //            if (oldtr) {
        //                removeClass(oldtr, 'oddrow');
        //                addClass(oldtr, 'evenrow');
        //            }
        //        }



        //    }
        //    else if (target.nodeName.toUpperCase() == 'A' && hasClass(target, 'isPersist')) {
        //        var isPersist = hasClass(target, 'persisted');
        //        if (!isPersist) {
        //            addClass(target, 'persisted');
        //            obj._Config.isSaveWidth = true;
        //        } else {
        //            removeClass(target, 'persisted');
        //            obj._Config.isSaveWidth = false;
        //        }
        //    }
        //    if (tr) {
        //        var trList = tr.parentNode.getElementsByTagName('tr');
        //        for (var i = 0; i < trList.length; i++) {
        //            removeClass(trList[i], 'activeTr');
        //        }
        //        addClass(tr, 'activeTr');

        //    }
        //}
    }

    /**
     * 配置设置项
     * @param {any} config
     */
    function buildConfigLi(config,index) {
        var str = "<li>" +
            "<label>" + config.text + "</label>" +
            "<table>" +
            "<tbody>" +
            "<tr>" +
            "<td class=\"label\">字段名</td>" +
            "<td class=\"value\"><input type=\"text\" value=\"" + config["text"] + "\" /></td>" +
            "<td class=\"label\">数据库字段</td>" +
            "<td class=\"value\"><input type=\"text\" value=\"" + config["field"] + "\" /></td>" +
            "<td class=\"label\">类型</td>" +
            "<td class=\"value\"><select>" +
            "<option value=\"input\" " + (config["cType"] === "input" ? "selected=\"true\"":"") + ">输入框</option>" +
            "<option value=\"date\" " + (config["cType"] === "date" ? "selected=\"true\"" : "") + ">日期</option>" +
            "<option value=\"select\" " + (config["cType"] === "select" ? "selected=\"true\"" : "") + ">下拉选择</option>" +
            "<option value=\"choose\" " + (config["cType"] === "choose" ? "selected=\"true\"" : "") + ">弹框选择</option>" +
            "</select></td>" +
            "</tr>" +
            "<tr>" +
            "<td class=\"label\">宽度</td>" +
            "<td class=\"value\"><input type=\"text\" value=\"" + config["width"] + "\" /></td>" +
            "<td class=\"label\">默认值</td>" +
            "<td class=\"value\"><input type=\"text\" value=\"" + (config["defValue"] || "") + "\" /></td>" +
            "<td class=\"label\">只读</td>" +
            "<td class=\"value\"><select>" +
            "<option value=\"true\" " + (config["readOnly"] ? "selected=\"true\"" : "") + ">是</option>" +
            "<option value=\"false\" " + (!config["readOnly"] ? "selected=\"true\"" : "") + ">否</option>" +
            "</select></td>" +
            "</tr>" +
            "<tr>" +
            "<td class=\"label\">位置</td>" +
            "<td class=\"value\"><input type=\"text\" value=\"" + index + "\" /></td>" +
            "<td class=\"label\">是否合计</td>" +
            "<td class=\"value\"><select>" +
            "<option value=\"true\" " + (config["isSum"] ? "selected=\"true\"" : "") + ">是</option>" +
            "<option value=\"false\" " + (!config["isSum"] ? "selected=\"true\"" : "") + ">否</option>" +
            "</select></td>" +
            "<td class=\"label\">是否隐藏</td>" +
            "<td class=\"value\"><select>" +
            "<option value=\"true\" " + (config["hidden"] ? "selected=\"true\"" : "") + ">是</option>" +
            "<option value=\"false\" " + (!config["hidden"] ? "selected=\"true\"" : "") + ">否</option>" +
            "</select></td>" +
            "</tr>" +
        "</table></li>";
        return str;
    }

    /**
     * 获取目标td
     * @param {any} y2TI
     * @param {any} trIndex
     * @param {any} colIndex
     */
    function getTd(tr, colIndex) {
        var tds = tr.getElementsByTagName("td");
        var td = null;
        for (var i = 0; i < tds.length; i++) {
            if (tds[i].getAttribute("data-colIndex") == colIndex) {
                td = tds[i];
                break;
            }
        }
        return td;
    }

    /**
     * 设置值和显示值
     * @param {any} target
     * @param {any} value 值
     * @param {any} y2TI
     * @param {any} text 显示值
     */
    function setAllValue(target, y2TI, value,text) {
        setValue(target, value, y2TI);
        setTdValue(target, text === undefined ? value :text);
    }

    /**
     * 更新显示值
     * @param {any} td
     * @param {any} value
     */
    function setTdValue(td, value) {
        td.innerHTML = "";
        var div = y2CreateElement("div", { className: "y2_tableInput_body_display" });
        div.innerText = value || "";
        td.appendChild(div);
        //td.innerHTML = value || "";
    }

    /**
     * 更新data值
     * @param {any} target 目标td
     * @param {any} value 值
     * @param {any} data 要更新的数据集
     * 
     */
    function setValue(target, value, y2TI) {
        var tr = target.parentNode;
        var index = tr.getAttribute("data-Index");        
        var colIndex = target.getAttribute("data-colIndex");
        var field = target.getAttribute("data-field");
        var fieldConfig = y2TI.config.field[colIndex];
        if (fieldConfig.validation) {
            var flag = validate(fieldConfig.validation, value);
            if (!flag) {
                return false;
            }
        }
        y2TI.data[index][field] = value;
        removeClass(target,"y2_tableInput_illtd")
        //自定义事件
        if (fieldConfig["event"]) {
            for (var eventName in fieldConfig["event"]) {
                if (eventName == "change") {
                    var tds = tr.getElementsByTagName("td");
                    var data = fieldConfig["event"]["change"](target, deepCloneObj(y2TI.data[index]));
                    for (var key in y2TI.data[index]) {
                        if (data[key] != y2TI.data[index][key]) {
                            //y2TI.data[index][key] = data[key];
                            var diffIndex = getIndexByKey(y2TI.config.field, key,"field");
                            var diffField = y2TI.config.field[diffIndex];
                            var diffTarget = null;
                            for (var i = 0; i < tds.length; i++) {
                                if (tds[i].getAttribute("data-colIndex") == diffIndex) {
                                    diffTarget = tds[i];
                                    break;
                                }
                            }
                            if (diffTarget) {
                                setValue(diffTarget, data[key], y2TI);
                                setTdValue(diffTarget, data[key]);
                            }
                        }
                    }
                }
            }
        }        
        initFoot(y2TI, field)
    }



    /**
     * 验证数据格式
     * @param {any} validation
     * @param {any} value
     */
    function validate(validation,value){
        if (!validation["allowEmpty"] && value === "") {
            return false;
        }
        if (!validation["type"] || validation["type"] == "any") {
            return true;
        }
        if (validation["type"] === "int") {
            return ~~value === value;
        }
        if (validation["type"] === "numeric") {
            var patten = /^-?\d+\.?\d*$/;
            var flag = patten.test(value);
            if (validation["length"] * 1 && flag) {
                var array = (value + "").split(".");
                if (array[1]) {
                    flag = array[1].length <= validation["length"] * 1;
                }               
            }                
            return flag;
        }
    }

    /**
     * 移动光标
     * @param {any} now  现在所处位置
     * @param {any} direction  移动方向 lrtb 上下左右 
     * @param {any} count   移动格数 
     * @param {any} data   数据
     */
    function moveCursor(now, direction, count, y2TI) {
        var target = null;
        while (now && now.nodeName.toLowerCase() != "td") {
            now = now.parentNode;
        }
        if (now) {
            var tr = now.parentNode;
            // 左
            if (direction === "l") {
                target = getEditableTd(now, 'l', y2TI);
            }
            // 右
            if (direction === "r") {
                target = getEditableTd(now, 'r', y2TI);
            }
            // 上
            if (direction === "t") {               
                if (getPrevNode(tr)) {
                    var tds = getPrevNode(tr).getElementsByTagName("td");
                    for (var i = 0; i < tds.length; i++) {
                        if (tds[i].getAttribute("data-field") == now.getAttribute("data-field")) {
                            target = tds[i];
                            break;
                        }
                    }
                }
            }
            // 下
            if (direction === "b") {
                if (!getNextNode(tr)) addRow(y2TI,0);
                var tds = getNextNode(tr).getElementsByTagName("td");
                for (var i = 0; i < tds.length; i++) {
                    if (tds[i].getAttribute("data-field") == now.getAttribute("data-field")) {
                        target = tds[i];
                        break;
                    }
                }                
            }
            target && toggleTdStatus(target, "input", y2TI);
        }
    }

    /**
     * 获取相邻可编辑单元格
     * @param {any} td 本单元格
     * @param {any} direction 方向
     */
    function getEditableTd(td, direction, y2TI) {
        var target = null;
        if (td) {
            var tr = td.parentNode;
            if (direction === "l") {
                if (getPrevNode(td)) {
                    target = getPrevNode(td);
                } else {
                    if (getPrevNode(tr)) {
                        var prevTds = getPrevNode(tr).getElementsByTagName("td");
                        for (var i = prevTds.length; i > -1; i--) {
                            if (prevTds[i].getAttribute("data-readOnly") !== "true") {
                                target = prevTds[i];
                                break;
                            }
                        }
                    }
                }
            } else if (direction === "r") {
                if (getNextNode(td)) {
                    target = getNextNode(td);
                } else {
                    if (getNextNode(tr)) {
                        var nextTds = getNextNode(tr).getElementsByTagName("td");
                        for (var i = 0; i < nextTds.length; i++) {
                            if (nextTds[i].getAttribute("data-readOnly") !== "true") {
                                target = nextTds[i];
                                break;
                            }
                        }
                    } else {
                        var newRow = addRow(y2TI, 0);
                        var nextTds = newRow.getElementsByTagName("td");
                        for (var i = 0; i < nextTds.length; i++) {
                            if (nextTds[i].getAttribute("data-readOnly") !== "true") {
                                target = nextTds[i];
                                break;
                            }
                        }
                    }
                }
            }
            if (target.getAttribute("data-readOnly") === "true") {
                target = getEditableTd(target, direction);
            }
        }
        return target;
    }

    // 根据类型创建控件
    function buildControl(config){
        switch(config.type){
           case "input":
                
        }
    }


    /**
     * 创建控件区域
     * 
     */

    function buildSelect(bindData, y2TI,target,value) {        
        if (bindData) {
            var outSpan = y2CreateElement("span", { className: "y2_select_warpper" });
            var div = y2CreateElement("div", { className: "y2_select" });
            var span = y2CreateElement("span", { className: "y2_select_text" });
            for (var i = 0; i < bindData.length; i++) {
                if (lrTrim(bindData[i]["value"]) == lrTrim(value)) {
                    span.innerHTML = bindData[i]["label"] || "";
                    break;
                }
            }
            
            var optionsDiv = y2CreateElement("div", { className: "y2_select_opinions" });
            var searchDiv = y2CreateElement("div", { className: "y2_select_search" });
            var searchInput = y2CreateElement("input", { className: "y2_select_search_input" });
            searchDiv.appendChild(searchInput);
            optionsDiv.appendChild(searchDiv);
            var ul = createLiList(bindData, null, target, y2TI);
            optionsDiv.appendChild(ul);
            div.appendChild(span);
            div.appendChild(optionsDiv);
            
            
            outSpan.appendChild(div);
            target.appendChild(outSpan);
            searchInput.focus();
            searchInput.onkeydown = function (e) {
                e = e || event;
                var keyCode = e.keyCode;
                if (keyCode == "13" || keyCode == "9") {
                    toggleTdStatus(target, "display", y2TI, span.innerHTML);
                    moveCursor(target, "r", 1, y2TI);
                    event.preventDefault ? event.preventDefault() : event.returnValue = false;
                } else if (keyCode == "37") {// 左
                    var poistion = getTxt1CursorPosition(this)
                    if (poistion == 0) {
                        toggleTdStatus(target, "display", y2TI, span.innerHTML);
                        moveCursor(target, "l", 1, y2TI);
                    }
                } else if (keyCode == "38") {// 上
                    toggleTdStatus(target, "display", y2TI,span.innerHTML);
                    moveCursor(target, "t", 1, y2TI);
                } else if (keyCode == "39") {// 右
                    var poistion = getTxt1CursorPosition(this)
                    if (!this.value || this.value.length === poistion) {
                        toggleTdStatus(target, "display", y2TI, span.innerHTML);
                        moveCursor(target, "r", 1, y2TI);
                    }
                } else if (keyCode == "40") {// 下
                    ul.getElementsByTagName("li")[0].focus();
                    ul.getElementsByTagName("li")[0].style.backgroundColor = "#ccc";
                    stopBubble(e)
                } 
            }
            searchInput.onkeyup = function (e) {
                    var value = this.value;
                    e = e || event;
                    if (e.keyCode != "40") {
                        var newdata = [];
                        ul.innerHTML = "";
                        for (var i = 0; i < bindData.length; i++) {
                            if (bindData[i]["label"].toString().toUpperCase().indexOf(value.toString().toUpperCase()) > -1) {
                                newdata.push(bindData[i]);
                            }
                        }
                        createLiList(newdata, ul, target, y2TI);
                    }

                }
            //for (var i = 0; i < bindData.length; i++) {
            //    var option = y2CreateElement("option");
            //    option.value = lrTrim(bindData[i]["value"]);
            //    option.innerHTML = lrTrim(bindData[i]["label"]);
            //    ele.appendChild(option);
            //}
            return outSpan;
        }

        return outSpan;
    }


    function createLiList(data, ul, target, y2TI) {
        var ul = ul || y2CreateElement("ul", { className: "y2_select_ul" });
        ul.innerHTML = "";
        if (data) {           
            for (var i = 0; i < data.length; i++) {
                var li = document.createElement("li");
                li.setAttribute("data-value", data[i]["value"].toString());
                li.innerHTML = data[i]["label"].toString();
                li.setAttribute("tabIndex", i);
                li.onclick = function () {
                    var value = this.getAttribute("data-value").toString();
                    var label = this.innerHTML;
                    setValue(target, value, y2TI);
                    toggleTdStatus(target, "display", y2TI, label);
                    moveCursor(target, "r", 1, y2TI);
                }
                li.onkeydown = function (e) {

                    e = e || event;
                    if (e.keyCode == 13) {
                        this.click();
                        stopBubble(e);
                    } else if (e.keyCode == 38) {

                        var target = this.previousElementSibling || this.previousSibling;
                        if (target) {
                            this.style.backgroundColor = "#FFF";
                            target.focus();
                            target.style.backgroundColor = "#ccc";
                        }
                        stopBubble(e);
                    } else if (e.keyCode == 40) {
                        var target = this.nextElementSibling || this.nextSibling;
                        if (target) {
                            this.style.backgroundColor = "#FFF";
                            target.focus();
                            target.style.backgroundColor = "#ccc";
                        }
                        stopBubble(e);
                    }
                }
                ul.appendChild(li);
            }
        }
        return ul;
    }
    /**
     *  基础方法
     * 
     * 
     * 
     * 
     * 
     */

    /**
     * 根据属性值获取index
     * @param {any} array 数组
     * @param {any} key  属性值
     * @param {any} name 属性名
     */
    function getIndexByKey(array, key, name) {
        var index = -1;
        for (var i = 0; i < array.length; i++) {
            if (lrTrim(array[i][name]) == lrTrim(key)) {
                index = i;
                break;
            }
        }
        return index;
    }

    function insertAfter(newElement, targetElement) {
        var parent = targetElement.parentNode;
        //如果要插入的目标元素是其父元素的最后一个元素节点，直接插入该元素
        //否则，在目标元素的下一个兄弟元素之前插入
        if (parent.lastChild == targetElement) {
            parent.appendChild(targetElement);
        } else {
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    }

    function isNullOrEmptyArray(array) {
        return !(array && array.length > 0)
    }
    // 从数组中根据value获取label
    function getValueByArray(array, value) {
        var label = "";
        if (!isNullOrEmptyArray(array)) {
            for (var i = 0; i < array.length; i++)
            {
                if (lrTrim(array[i]["value"]) == lrTrim(value)) {
                    label = array[i]["label"];
                    break;
                }
            }
        }
        return label;
    }
    // 去除前后空格
    function lrTrim(str) {
        if (!str) return "";
        return str.replace(/^\s+|\s+$/g, "")
    }

    function changeUN(o) {
        if (o === undefined || o === null) return "";
        return o;
    }

    function extendObj() { // 扩展对象
        var args = arguments;
        if (args.length < 2) return;
        var temp = args[0]; // 调用复制对象方法
        for (var n = 1; n < args.length; n++) {
            for (var i in args[n]) {
                if ("object" == typeof args[n][i] && temp[i] && !temp[i].length) {
                    extendObj(temp[i], args[n][i]);
                } else {
                    temp[i] = args[n][i];
                }
            }
        }
        return temp;
    }

    //光标在字符串位置
    function getTxt1CursorPosition(ele) {
        var cursurPosition = 0;
        if (ele.selectionStart) {//非IE
            cursurPosition = ele.selectionStart;
        } else {//IE
            try {
                var range = document.selection.createRange();
                range.moveStart("character", -ele.value.length);
                cursurPosition = range.text.length;

            } catch (e) {
                cursurPosition = 0;
            }
        }
        return cursurPosition;//打印当前索引
    }

    //对象深克隆
    function deepCloneObj(obj) {
        var result = {}, oClass = isClass(obj);
        for (key in obj) {
            var copy = obj[key];
            if (isClass(copy) == "Object") {
                result[key] = arguments.callee(copy);
            } else if (isClass(copy) == "Array") {
                result[key] = arguments.callee(copy);
            } else {
                result[key] = obj[key];
            }
        }
        return result;
    }

    function isClass(o) {
        if (o === null) return "Null";
        if (o === undefined) return "Undefined";
        return Object.prototype.toString.call(o).slice(8, -1);
    }

    //获取上一个兄弟节点
    function getPrevNode(n) {
        return n.previousElementSibling || n.previousSibling;
    }

    //获取下一个兄弟节点
    function getNextNode(n) {
        return n.nextElementSibling || n.nextSibling;
    }

    /**
     * 从数组中查询对象
     * @param {any} array
     * @param {any} name
     * @param {any} value
     */
    function getObjFormArray(array, name, value) {
        var index = -1;
        if (array) {
            for (var i = 0; i < array.length; i++) {
                if (lrTrim(array[i][name]) == lrTrim(value)) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }


    // 创建元素
    function y2CreateElement(tag,attr,props){
        var ele = document.createElement(tag);
        if(attr)
            for(var key in attr){
                ele[key] = attr[key]
            }  
        if(props)      
            for(var key in props){
                ele.setAttribute(key,props);
            }
        return ele;
    }

    function getClipboard() {
        if (window.clipboardData) {
            return (window.clipboardData.getData('Text'));
        }
        else if (window.netscape) {
            netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
            var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
            if (!clip) return;
            var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
            if (!trans) return;
            trans.addDataFlavor('text/unicode');
            clip.getData(trans, clip.kGlobalClipboard);
            var str = new Object();
            var len = new Object();
            try {
                trans.getTransferData('text/unicode', str, len);
            }
            catch (error) {
                return null;
            }
            if (str) {
                if (Components.interfaces.nsISupportsWString) str = str.value.QueryInterface(Components.interfaces.nsISupportsWString);
                else if (Components.interfaces.nsISupportsString) str = str.value.QueryInterface(Components.interfaces.nsISupportsString);
                else str = null;
            }
            if (str) {
                return (str.data.substring(0, len.value / 2));
            }
        }
        return null;
    }

    // 链式添加元素 
    function y2AppendChild() {
        var result,array = [];
        if (arguments.length > 0) {
            result = arguments[arguments.length - 1];
            array.push(result);
            for (var i = arguments.length - 2; i >= 0; i--) {                
                arguments[i].appendChild(result);
                result = arguments[i];
                array.unshift(result);
            }
        }
        return array; 
    }

    function hasClass(elements, cName) {
        return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
    };
    function addClass(elements, cName) {
        if (!hasClass(elements, cName)) {
            elements.className += " " + cName;
        };
    };
    //转换class
    function toggleClass(elements, cName) {
        if (hasClass(elements, cName)) removeClass(elements, cName);
        else addClass(elements, cName);
    }
    function removeClass(elements, cName) {
        if (hasClass(elements, cName)) {
            elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
        };
    };


    function stopBubble(e) {
        if (e && e.stopPropagation) { //非IE 
            e.stopPropagation();

        } else { //IE 
            e.cancelBubble = true;
            e.returnValue = false;
        }
        (e.returnValue && (e.returnValue = false)) || (e.preventDefault && e.preventDefault());
    }
})(window)