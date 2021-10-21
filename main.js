"use strict";
exports.__esModule = true;
var extra_1 = require("./extra");
console.log("== Hello World ==");
extra_1.restClient.get("test1", 100).then(function (response) { return console.log(response); });
extra_1.restClient.get("test2", 200).then(function (response) { return console.log(response); });
setTimeout(function () {
    extra_1.restClient.get("test3", 100).then(function (response) { return console.log(response); });
    extra_1.restClient.get("test4", 200).then(function (response) { return console.log(response); });
}, 500);
setTimeout(function () {
    extra_1.restClient.get("test5", 300).then(function (response) { return console.log(response); });
}, 600);
setTimeout(function () {
    extra_1.restClient.get("test6").then(function (response) { return console.log(response); });
    extra_1.restClient.get("test7").then(function (response) { return console.log(response); });
    extra_1.restClient.get("test8").then(function (response) { return console.log(response); });
}, 1001);
setTimeout(function () {
    extra_1.restClient.get("test 9").then(function (response) { return console.log(response); });
    extra_1.restClient.get("test 10").then(function (response) { return console.log(response); });
}, 1501);
