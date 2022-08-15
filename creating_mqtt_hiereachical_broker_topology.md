# List of commands to create hierarchical topology of MQTT brokers using mosquitto MQ

1. Command to create container of eclipse-mosquitto with ip address and name provided 

$docker run -it -p 1883:1883 -p 9001:9001 --ip 192.127.0.1 --name Broker1 eclipse-mosquitto

$docker run -it -p 1884:1883 -p 9002:9001 --ip 192.127.0.2 --name Broker2 eclipse-mosquitto

$docker run -it -p 1885:1883 -p 9003:9001 --ip 192.127.0.3 --name Broker3 eclipse-mosquitto

$docker run -it -p 1886:1883 -p 9004:9001 --ip 192.127.0.4 --name Broker4 eclipse-mosquitto

$docker run -it -p 1887:1883 -p 9005:9001 --ip 192.127.0.5 --name Broker5 eclipse-mosquitto

2.Modify configuration file to create bridge connection and open websocket port for all brokers except Broker5

$vi /mosquitto/config/mosquitto.conf

connection bridge
address 192.127.0.5:1883 
topic # out 0 "" /redmiils/floor_floornumber


3. Restart container after saving config file

