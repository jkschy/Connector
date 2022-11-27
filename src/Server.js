const dgram = require("dgram")

const MSG_TYPES = {
    MSG: "[MSG]-",
    CON: "[CON]-",
    APR: "[APR]-",
}

class Server {
    constructor(address = "0.0.0.0") {
        this.socket = dgram.createSocket("udp4");
        this.port = 2000;
        this.address = address;

        this.socket.on("message", (msg, rinfo) => {
            if (msg.toString().startsWith(MSG_TYPES.CON)) {
                this.sendApproval(rinfo.port, rinfo.address);
            }
        })
    }

    /**
     *
     * @param callback - a callback function
     */
    onMessage(callback) {
        if (typeof callback === "function") {
            this.socket.on("message", (msg, rinfo) => {
                if (msg.toString().startsWith(MSG_TYPES.MSG)) {
                    callback(msg.toString().substring(MSG_TYPES.MSG.length, msg.length), rinfo);
                }
            })
        } else {
        }
    }

    onConnectionSuccess(callback) {
        if (typeof callback !== "function") {
            throw TypeError("callback must be a function")
        }

        this.socket.on("message", (msg, rinfo) => {
            if (msg.toString().startsWith(MSG_TYPES.APR)) {
                callback();
            }
        })
    }

    onError(callback) {
        if (typeof callback === "function") {
            this.socket.on("error", (err) => {
                callback(err)
            })
        } else {
            throw TypeError("callback must be a function")
        }
    }

    sendMessage(msg, port = 5000, address = "0.0.0.0", callback = () => {}) {
        this.socket.send(`${MSG_TYPES.MSG}${msg}`, port, address, callback);
    }

    sendApproval(port, address) {
        this.socket.send(MSG_TYPES.APR, port, address);
    }

    sendConnectionRequest(address, port) {
        this.socket.send(`${MSG_TYPES.CON}`, port, address);
    }

    connect(callback) {
        this.socket.bind(this.port, this.address, callback);
    }


    async start(changePortOnFail, resolve = null, reject = null) {
        if (!changePortOnFail) {
            this.connect();
            return;
        }

        if (resolve && reject) {
            this.connect(() => {
                console.log("listening on port " + this.port)
                resolve(this.port);
            })
        } else {
            return new Promise((resolve, reject) => {
                if (changePortOnFail) {
                    this.onError((err) => {
                        if (err.code === "EADDRINUSE") {
                            this.port++
                            return this.start(true, resolve, reject)
                        }
                    })
                }

                this.connect(() => {
                    console.log("listening on port " + this.port)
                    resolve(this.port);
                })
            });
        }
    }

    serverPort() {
        return this.port
    }
    serverIp() {
        return this.address
    }

    close() {
        this.socket.close();
    }
}

module.exports.default = Server


