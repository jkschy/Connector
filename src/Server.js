const dgram = require("dgram")

class Server {
    constructor(address = "0.0.0.0") {
        this.socket = dgram.createSocket("udp4");
        this.port = 2000;
        this.address = address;
    }

    /**
     *
     * @param callback - a callback function
     */
    onMessage(callback) {
        if (typeof callback === "function") {
            this.socket.on("message", (msg, rinfo) => {
                callback(msg, rinfo);
            })
        } else {
            throw TypeError("callback must be a function")
        }
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
        this.socket.send(msg, port, address, callback);
    }

    connect(callback) {
        this.socket.bind(this.port, this.address, callback);
    }


    async start(changePortOnFail, resolve = null, reject = null) {
        if (!changePortOnFail) {
            this.connect(() => {
                console.log("listening on port " + this.port)
            })
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
                            console.log("port in use")
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
        console.log("Closing...")
    }
}

module.exports.default = Server


