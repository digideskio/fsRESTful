# fsRESTful (FreeSWITCH RESTful API)

Base URL of this API: http://54.246.163.128:3000 

##Nodes
    GET /api/nodes

Description: Returns the list of FreeSWITCH nodes.

Parameters:
none

Returns:
JSON encoded node array of objects

    POST /api/nodes
Description: Adds a new FreeSWITCH node. 

Parameters:
- address – the ip address or a domain name of the host running a FreeSWITCH instance
- password – a password for mod_event_socket module
- descr – a description (OPTIONAL)
- port – TCP port to be used (OPTIONAL, 8021 by default)

Returns:
JSON encoded object

    GET /api/nodes/id
Description: Returns a FreeSWITCH node

Parameters:
- URL parameter id – an integer value which is the unique number of the node

Returns:
JSON encoded object with the desired ID

    PUT /api/nodes/id
Description: Modifies one node object

Parameters:
- URL parameter id – an integer value which is the unique number of the node
- address – the ip address or a domain name of the host running a FreeSWITCH instance (OPTIONAL)
- password – a password for mod_event_socket module (OPTIONAL)
- descr – a description (OPTIONAL)
- port – TCP port to be used (OPTIONAL)

Returns:
Modified JSON encoded object with the desired ID
    
    DELETE /api/nodes/id
Description: Deletes the FreeSWITCH node with ID

Parameters:
- URL parameter id – an integer value which is the unique number of the node

Returns:
Deleted JSON encoded object

##Gateways
    GET /api/gateways

Description: Returns the list of gateways (trunks).

Parameters:
none

Returns:
JSON encoded node array of objects

    POST /api/gateways

Description: Adds a new trunk to the node. 

Parameters:
- node_id – a FreeSWITCH node ID where the gateway(trunk) should be placed (integer)
- address – the ip address or a domain name of the host running a FreeSWITCH instance
- profile – a profile to be used, please use “external” value for now
- login – a login (username) for SIP authentication (OPTIONAL)
- password – a password for SIP authentication (OPTIONAL)
- descr – a description (OPTIONAL)
- enabled – Boolean – if the gateway enabled or not (disabled if empty)
- register – Boolean – if the SIP registration needed (not needed if empty)

Returns:
JSON encoded object

    GET /api/gateways/id
Description: Returns a trunk object

Parameters:
- URL parameter id – an integer value which is the unique number of the trunk

Returns:
JSON encoded object with the desired ID

    PUT /api/gateways/id

Description: Modifies one gateway(trunk) object

Parameters:
- URL parameter id – an integer value which is the unique number of the node
- address – the ip address or a domain name of the host running a FreeSWITCH instance (OPTIONAL)
- profile – a profile to be used, please use “external” value for now (OPTIONAL)
- login – a login (username) for SIP authentication (OPTIONAL)
- password – a password for mod_event_socket module (OPTIONAL)
- descr – a description (OPTIONAL)
- enabled – Boolean – if the gateway enabled or not (OPTIONAL)
- register – Boolean – if the SIP registration needed (OPTIONAL)

Returns:
Modified JSON encoded object with the desired ID

    DELETE /api/gateways/id

Description: Deletes the gateway with ID

Parameters:
- URL parameter id – an integer value which is the unique number of the gateway

Returns:
Deleted JSON encoded object

##Numbers
    GET /api/numbers

Description: Returns the list of FreeSWITCH nodes.

Parameters:
none

Returns:
JSON encoded node array of objects

    POST /api/numbers

Description: Adds a new number (DID) 

Parameters:
- gateway_id – a gateway ID where the DID will be called from (integer)
- number – number in form which will be received from the gateway
- destination – SIP URL to be called like xxxx@some.domain.name.or.ip:port 
- descr – a description (OPTIONAL)

Returns:
JSON encoded object

    GET /api/numbers/id

Description: Returns a number object

Parameters:
- URL parameter id – an integer value which is the unique number of the number

Returns:
JSON encoded object with the desired ID

    PUT /api/numbers/id

Description: Modifies one number object

Parameters:
- gateway_id – a gateway ID where the DID will be called from (integer) (OPTIONAL)
- number – number in form which will be received from the gateway (OPTIONAL)
- destination – SIP URL to be called like xxxx@some.domain.name.or.ip:port (OPTIONAL)
- descr – a description (OPTIONAL)

Returns:
Modified JSON encoded object with the desired ID

    DELETE /api/numbers/id

Description: Deletes the number with ID

Parameters:
- URL parameter id – an integer value which is the unique number of the number

Returns:
Deleted JSON encoded object

##Custom headers
    GET /api/headers

Description: Returns the list of headers.

Parameters:
none

Returns:
JSON encoded node array of objects

    POST /api/headers

Description: Adds a new number (DID) 

Parameters:
- number_id – a number ID which destination will be called with this header (integer)
- name – SIP header name
- value – SIP header value

Returns:
JSON encoded object

    GET /api/headers/id

Description: Returns a header object

Parameters:
- URL parameter id – an integer value which is the unique number of the header

Returns:
JSON encoded object with the desired ID

    PUT /api/headers/id

Description: Modifies one header object

Parameters:
- URL parameter id – an integer value which is the unique number of the header
- name – SIP header name (OPTIONAL)
- value – SIP header value (OPTIONAL)

Returns:
Modified JSON encoded object with the desired ID

    DELETE /api/headers/id

Description: Deletes the number with ID

Parameters:
- URL parameter id – an integer value which is the unique number of the header

Returns:
Deleted JSON encoded object

