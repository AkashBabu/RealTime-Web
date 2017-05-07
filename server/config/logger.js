var jsonfile = require("jsonfile")

var configFile = __dirname + "/config.json"
var config = jsonfile.readFileSync(configFile)
var env = config.env

var Logger = require("logger-switch")
var TestLog = new Logger("Test")
var GenLog = new Logger("Gen")
var ErrLog = new Logger("Err")

global.testLog = TestLog
global.genLog = GenLog
global.errLog = ErrLog

if(env == 'dev') {
    TestLog.activate()
    GenLog.activate()
    ErrLog.activate()
} else if (env == 'prod') {
    TestLog.timestamp("D MM 'YY, h:mm a Z")
    GenLog.timestamp("D MM 'YY, h:mm a Z")
    ErrLog.timestamp("D MM 'YY, h:mm a Z")
    
    TestLog.deactivate()
    GenLog.activate()
    ErrLog.activate()

} else {
    throw new Error("Invalid Environment in config.json. It can only be 'dev'/'prod'")
}