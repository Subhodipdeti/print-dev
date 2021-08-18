import React from "react";
import JSPM from "jsprintmanager";
// import qz from "qz-tray";
import PrintJobForRawCommands from "./PrintJobForRawCommands";
// import Printers from "./Printers";
// import Scanning from './Scanning';
import PrinterInfoSample from './PrinterInfoSample';

class PrintingRawCommandsSample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: null,
      clientPrinter: null,
      printerCommands: "",
      printerCommandsCodePage: -1,
    };
  }

  componentDidMount() {
    // qz.websocket
    //   .connect()
    //   .then(() => {
    //     return qz.printers.find();
    //   })
    //   .then((printers) => {
    //     console.log(printers);
    //     let config = qz.configs.create("Thermal Printer H58 Printer USB");
    //     return qz.print(config, [
    //       {
    //         type: "pixel",
    //         format: "html",
    //         flavor: "plain",
    //         data: "<h1>Hello JavaScript!</h1>",
    //       },
    //     ]);
    //   })

    //   .then(() => {
    //     return qz.websocket.disconnect();
    //   })
    //   .then(() => {
    //     // process.exit(0);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     // process.exit(1);
    //   });

    JSPM.JSPrintManager.auto_reconnect = true;
    JSPM.JSPrintManager.start();

    JSPM.JSPrintManager.MainApp = this;

    JSPM.JSPrintManager.getPrinters().then(function (myPrinters) {
      console.log("=====>>> myPrinters", myPrinters);
    }).catch(err => console.log('====>>>', err))

    JSPM.JSPrintManager.WS.onOpen = function () {
      JSPM.JSPrintManager.MainApp.jspmWsStatusChanged(
        JSPM.WSStatus[JSPM.JSPrintManager.WS.status]
      );

      JSPM.JSPrintManager.MainApp.printersInfoChanged(null);
      //get client installed printers with detailed info
      JSPM.JSPrintManager.getPrintersInfo().then(function (printersList) {
        JSPM.JSPrintManager.MainApp.printersInfoChanged(printersList);
      });
    };

    JSPM.JSPrintManager.WS.onStatusChanged = function () {
      JSPM.JSPrintManager.MainApp.jspmWsStatusChanged(
        JSPM.WSStatus[JSPM.JSPrintManager.WS.status]
      );
    };

    JSPM.JSPrintManager.WS.onClose = function () {
      JSPM.JSPrintManager.MainApp.jspmWsStatusChanged(
        JSPM.WSStatus[JSPM.JSPrintManager.WS.status]
      );
    };

    let os = (function () {
      var ua = navigator.userAgent.toLowerCase();
      return {
        isWindows: /(windows|win32|win64)/.test(ua),
        isLinux: /(linux)/.test(ua),
        isIntelMac: /(intel mac)/.test(ua),
        isRPi: /(Linux arm)/.test(ua),
      };
    })();

    if (os.isWindows) {
      this.OS = "win";
    } else if (os.isLinux) {
      this.OS = "linux";
    } else if (os.isIntelMac) {
      this.OS = "mac";
    } else if (os.isRPi) {
      this.OS = "rpi";
    } else {
      this.OS = "other";
    }
  }

  getPrinters() {
    // JSPM.JSPrintManager.auto_reconnect = true;
    // JSPM.JSPrintManager.start();

    return new Promise((ok, err) => {
      let printers = [];
      if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Open) {
        console.log("=OK");
        JSPM.JSPrintManager.getPrinters()
          .then(function (myPrinters) {
            console.log("===>>>>", myPrinters);
            printers = myPrinters;
            console.log(printers);
            ok(printers);
          })
          .catch((e) => err(e));
      } else {
        console.warn("JSPM WS not open");
        ok(printers);
      }
    });
  }

  doPrinting() {
    if (this.state.job) {
      let cpj = this.state.job;
      cpj.sendToClient();
    }
  }

  updateJob() {
    var cpj = new JSPM.ClientPrintJob();
    cpj.clientPrinter = this.state.clientPrinter;
    cpj.printerCommands = this.state.printerCommands;
    cpj.printerCommandsCodePage = this.state.printerCommandsCodePage;
    //no need to re-render
    this.state.job = cpj;
  }

  onPrinterChange(newPrinter) {
    //No need to re-render!
    this.state.clientPrinter = newPrinter;
    this.updateJob();
  }

  onPrinterCommandsChange(newPrinterCommands) {
    //No need to re-render!
    this.state.printerCommands = newPrinterCommands;
    this.updateJob();
  }

  onPrinterCommandsCodePageChange(newCodepage) {
    //No need to re-render!
    this.state.printerCommandsCodePage = newCodepage;
    this.updateJob();
  }

  render() {
    return (
      <div>
        {/* <Scanning /> */}
        <PrinterInfoSample />
        <h1 onClick={this.getPrinters}>Hmmm</h1>
        <div className="row">
          <div className="col-md-1">
            <button
              className="btn btn-dark btn-lg"
              onClick={() => this.props.setSample(0)}
            >
              <i className="fa fa-arrow-left" />
            </button>
          </div>
          <div className="col-md-11">
            <h2 className="text-center">
              <i className="fa fa-barcode" />
              &nbsp;Raw Data Printing
            </h2>
            <hr />
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            {/* <Printers
              JobContentType={0}
              onPrinterChange={this.onPrinterChange.bind(this)}
            /> */}
          </div>
          <div className="row">
            <PrintJobForRawCommands
              jobIndex={0}
              onPrinterCommandsChange={this.onPrinterCommandsChange.bind(this)}
              onPrinterCommandsCodePageChange={this.onPrinterCommandsCodePageChange.bind(
                this
              )}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <br />
            <div className="text-center">
              <button
                className="btn btn-success btn-lg"
                onClick={this.doPrinting.bind(this)}
              >
                <i className="fa fa-print" /> Print Now...
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PrintingRawCommandsSample;
