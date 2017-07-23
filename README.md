# RealTime-Web
An end-2-end realtime connection architecture. Right from backend to frontend rendering.

## Introduction

Well what have we seen all these days on the web ?
* HTTP

Now we shall see the pros and cons of HTTP  
- `Pros`    
    * Support for Restfull creation of APIS
    * Supports files upload and download
    * Cookies
    * Security
- `Cons`  
    * Server overload at peak requests, hence a few request might be ignored
    * Cannot queue a request
    * Clients timeout
    * Doesn't support live updates on data
    * Cannot talk to other client directly
    * Client initiated Request, which means Server can never initialize a Conversation with any of the clients
    * Every Server needs a Public Address to communicate with a client globally (Which can be overcome by using reverse proxy tunnels, but not many uses this approach).
    * Client cannot wait for multiple requests on the same port.

So now lets see what the other Protocol can offer us?
* MQTT

Pros and Cons of MQTT  
- `Pros`  
    * E2E communication
    * Light Weight
    * RealTime data updates
    * A client can listen to many responses on the same port.
    * Overhead on the Broker and not on a Client acting as Server
- `Cons`  
    * Not As Secure as HTTP
    * Not Restful
    * Nearly an impossible task if HTTP should be replaced with MQTT
    * Doesn't support huge data transfers like file-upload/download

So What's next ????  
Well after looking at HTTP and MQTT, its pretty obvious that you would have started to scratch your brain, thinking about - what if the Two protocols are Merged ??? Do we get to have the benefits from both ??   
Ofcourse yes, and that is exactly what we will be developing in this project.

### Contributions and support
Apparently this project is still a New Born kid, so any suggestions or support for development would be really appreciated.

There is a lot of thought about the future for this project. For more discussions please write a mail to `001akashbabu@gmail.com`

### Dependencies
* Nodejs
* MQTT-broker with Web-Sockets enabled (Can also use public brokers)
* RabbitMQ

### Installation
After you have resolved all the dependencies  
> cd server/  
> npm install  
> npm install pm2 -g  
> pm2 start ecosystem.json      

The above lines will spawn a Sample Mqtt-Echo-Server, which echoes every single message that was publish on /$req/realtimeweb/* --> /$res/realtimeweb/*

This server could be used for testing while developing mqtt-client on the front-end

