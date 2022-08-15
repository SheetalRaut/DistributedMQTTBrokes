# List of commands to create MQTT Broker cluster

It contains commands to create MQTT broker cluster using HiveMQ 

1. Command to start a single node Swarm cluster.
	$docker swarm init

2. Command to create an overlay network on which cluster nodes can communicate 
	$docker network create -d overlay --attachable myNetwork

3. Command to create HiveMQ service on the network with the current version of the HiveMQ DNS 	  Discovery Image. This procedure creates a three-node cluster that forwards the MQTT(1883) 
	and Web UI(8080) ports to the host network. The HiveMQ Control Center can be used in a single node cluster. A sticky session for the HTTP requests in clusters with multiple nodes cannot be upheld with this configuration because the internal load balancer forwards requests in an alternating fashion. The Docker Swarm Enterprise version is required for sticky sessions.

	$docker service create \
	  --replicas 3 --network myNetwork \
	  --env HIVEMQ_DNS_DISCOVERY_ADDRESS=tasks.hivemq \
	  --publish target=1883,published=1883 \
	  --publish target=8080,published=8080 \
	  -p 8000:8000/udp \
	  --name hivemq \
		hivemq/hivemq4:dns-latest

4. Command to scale the cluster up to 5 nodes
	$docker service scale hivemq=5

5. Command to remove the cluster
	$docker service rm hivemq

6. Command to read the logs for all HiveMQ nodes in real time
	$docker service logs hivemq -f

7. Command to get the log for a single node, get the list of service containers using
	$docker service ps hivemq

reference : https://www.hivemq.com/docs/hivemq/4.8/user-guide/docker.html 