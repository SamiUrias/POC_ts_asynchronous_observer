import { restClient } from "./extra";
console.log("== Hello World ==");

restClient.get("test1", 100).then((response) => console.log(response));
restClient.get("test2", 200).then((response) => console.log(response));

setTimeout(() => {
  restClient.get("test3", 100).then((response) => console.log(response));
  restClient.get("test4", 200).then((response) => console.log(response));
}, 500);

setTimeout(() => {
  restClient.get("test5", 300).then((response) => console.log(response));
}, 600);

setTimeout(() => {
  restClient.get("test6").then((response) => console.log(response));
  restClient.get("test7").then((response) => console.log(response));
  restClient.get("test8").then((response) => console.log(response));
}, 1001);

setTimeout(() => {
  restClient.get("test 9").then((response) => console.log(response));
  restClient.get("test 10").then((response) => console.log(response));
}, 1501);
