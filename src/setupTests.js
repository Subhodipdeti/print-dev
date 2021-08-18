// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';


// qz.websocket
//     .connect()
//     .then(() => {
//       return qz.printers.find();
//     })
//     .then((printers) => {
//       console.log(printers);
//       let config = qz.configs.create("192.168.0.101");
//       return qz.print(config, [
//         {
//           type: "pixel",
//           format: "html",
//           flavor: "plain",
//           data: "<h1>Hello JavaScript!</h1>",
//         },
//       ]);
//     })
//     .then(() => {
//       return qz.websocket.disconnect();
//     })
//     .then(() => {
//       // process.exit(0);
//     })
//     .catch((err) => {
//       console.error(err);
//       // process.exit(1);
//     });


// function onInit() {
//     // var _this = this;
//     JSPM.JSPrintManager.auto_reconnect = true;
//     JSPM.JSPrintManager.start();
//     JSPM.JSPrintManager.WS.onStatusChanged = function () {
//       // _this.getPrinters().then((p)=>{
//       //   _this.printers = p;
//       // });
//     };
//   }