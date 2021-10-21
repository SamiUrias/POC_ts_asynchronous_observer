"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.restClient = void 0;
var uuid_1 = require("uuid");
var Subject = /** @class */ (function () {
    function Subject() {
        this.subscribers = [];
    }
    // Add new subscriber
    Subject.prototype.addSubcriber = function (s) {
        console.log("Adding subscriber: " + s.id);
        this.subscribers.push(s);
    };
    // Remove existing subscriber
    Subject.prototype.removeSubscriber = function (s) {
        var isExist = this.subscribers.findIndex(function (element) { return (element.id = s.id); });
        if (isExist !== -1) {
            console.log("Removing subscriber:: " + s.id);
            this.subscribers.splice(isExist, 1);
        }
    };
    Subject.prototype.notify = function (value) {
        var _this = this;
        console.log("Notifying all the  subscribers");
        var tmpSubscribers = __spreadArray([], this.subscribers);
        tmpSubscribers.forEach(function (element) {
            element.notify(value);
            _this.removeSubscriber(element);
        });
    };
    return Subject;
}());
var ConcreteSubject = /** @class */ (function (_super) {
    __extends(ConcreteSubject, _super);
    function ConcreteSubject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConcreteSubject.prototype.getState = function () {
        return this.state;
    };
    ConcreteSubject.prototype.setState = function (state) {
        this.state = state;
    };
    return ConcreteSubject;
}(Subject));
var ConcreteSubscriber = /** @class */ (function () {
    function ConcreteSubscriber(subject, callback) {
        this.id = uuid_1.v4();
        this.subject = subject;
        this.callback = callback;
    }
    ConcreteSubscriber.prototype.notify = function (message) {
        console.log(this.id + " - Reciving notifycation");
        this.state = this.subject.getState();
        this.callback();
    };
    ConcreteSubscriber.prototype.getSubject = function () {
        return this.subject;
    };
    ConcreteSubscriber.prototype.setSubject = function (subject) {
        this.subject = subject;
    };
    return ConcreteSubscriber;
}());
var refreshToken = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(console.log("Token refreshed"));
                }, 1000);
            })];
    });
}); };
var RestClient = /** @class */ (function () {
    function RestClient() {
        this.subject = new ConcreteSubject();
        this.queue = [];
        this.isRefreshingToken = false;
    }
    RestClient.prototype.get = function (value, time) {
        var _this = this;
        if (time === void 0) { time = 300; }
        if (!this.isRefreshingToken) {
            this.queue.push(1);
            return new Promise(function (resolve) {
                setTimeout(function () {
                    // Remove element from the queue
                    _this.queue.shift();
                    resolve({ value: value, q: _this.queue.length });
                    if (!_this.queue.length) {
                        _this.isRefreshingToken = true;
                        refreshToken().then(function (response) {
                            _this.isRefreshingToken = false;
                            console.log("Pending::", _this.queue.length);
                            _this.subject.notify(_this.isRefreshingToken);
                        });
                    }
                }, time);
            });
        }
        else {
            // This happens when the token was refreshing
            return new Promise(function (innerResolver) {
                var resolver = function () {
                    console.log("Resolving pending promise");
                    //this.subject.removeSubscriber(subscriber); // This fucking line >:
                    innerResolver(_this.get(value, time));
                };
                var subscriber = new ConcreteSubscriber(_this.subject, resolver);
                _this.subject.addSubcriber(subscriber);
            });
        }
    };
    return RestClient;
}());
exports.restClient = new RestClient();
