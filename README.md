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
- default_destination - a string value, default destination for calls which will be received by this trunk
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


# Configuration

## Required modules

The following modules should be built additionaly to standard configuration

- mod_xml_curl
- mod_odbc_cdr

## Enable modules

### modules.conf.xml

Uncomment lines for mod_xml_curl and mod_odbc_cdr

## Configure freeswitch to fetch gateway configuration data and a dialplan from the XML endpoint

### xml_curl.conf.xml

```
  <configuration name="xml_curl.conf" description="cURL XML Gateway">
    <bindings>
      <binding name="gateway">
        <param name="gateway-url" value="http://127.0.0.1:3000/conf/directory?node=1" bindings="directory"/>
        <param name="method" value="GET"/>
      </binding>
      <binding name="dialplan">
        <param name="gateway-url" value="http://127.0.0.1:3000/conf/dialplan?node=1" bindings="dialplan"/>
        <param name="method" value="GET"/>
      </binding>
    </bindings>
  </configuration>
```

Node parameter should be an integer value which is the id column value in the database table "nodes" for the appropriate node.

## Configure freeswitch to use ODBC DSN to store CDRs

### odbc_cdr.conf.xml

```
  <configuration name="odbc_cdr.conf" description="ODBC CDR Configuration">
    <settings>
      <param name="odbc-dsn" value="DSN:username:password"/>
      <!-- DSN is a dsn defined in /etc/odbc.ini -->
      <param name="log-leg" value="both"/>
      <!-- global value can be "a-leg", "b-leg", "both" (default is "both") -->
      <param name="write-csv" value="on-db-fail"/>
      <!-- value can be "always", "never", "on-db-fail" -->
      <param name="csv-path" value="/var/log/freeswitch/odbc_cdr"/>
      <param name="csv-path-on-fail" value="/var/log/freeswitch/odbc_cdr/failed"/>
      <param name="debug-sql" value="false"/>
    </settings>
    <tables>
      <!-- only a-legs will be inserted into this table -->
      <table name="cdr_table_a_leg" log-leg="a-leg">
        <field name="CallId" chan-var-name="call_uuid"/>
        <field name="orig_id" chan-var-name="uuid"/>
        <field name="term_id" chan-var-name="sip_call_id"/>
        <field name="ClientId" chan-var-name="uuid"/>
        <field name="IP" chan-var-name="sip_network_ip"/>
        <field name="IPInternal" chan-var-name="sip_via_host"/>
        <field name="CODEC" chan-var-name="read_codec"/>
        <field name="directGateway" chan-var-name="sip_req_host"/>
        <field name="redirectGateway" chan-var-name="sip_redirect_contact_host_0"/>
        <field name="CallerID" chan-var-name="sip_from_user"/>
        <field name="TelNumber" chan-var-name="sip_req_user"/>
        <field name="TelNumberFull" chan-var-name="sip_to_user"/>
        <field name="sip_endpoint_disposition" chan-var-name="endpoint_disposition"/>
        <field name="sip_current_application" chan-var-name="current_application"/>
        <field name="duration" chan-var-name="duration"/>
        <field name="billsec" chan-var-name="billsec"/>
      </table>
      <!-- only b-legs will be inserted into this table -->
      <table name="cdr_table_b_leg" log-leg="b-leg">
        <field name="CallId" chan-var-name="call_uuid"/>
        <field name="orig_id" chan-var-name="uuid"/>
        <field name="term_id" chan-var-name="sip_call_id"/>
        <field name="ClientId" chan-var-name="uuid"/>
        <field name="IP" chan-var-name="sip_network_ip"/>
        <field name="IPInternal" chan-var-name="sip_via_host"/>
        <field name="CODEC" chan-var-name="read_codec"/>
        <field name="directGateway" chan-var-name="sip_req_host"/>
        <field name="redirectGateway" chan-var-name="sip_redirect_contact_host_0"/>
        <field name="CallerID" chan-var-name="sip_from_user"/>
        <field name="TelNumber" chan-var-name="sip_req_user"/>
        <field name="TelNumberFull" chan-var-name="sip_to_user"/>
        <field name="sip_endpoint_disposition" chan-var-name="endpoint_disposition"/>
        <field name="sip_current_application" chan-var-name="current_application"/>
        </table>
        <!-- both legs will be inserted into this table -->
        <table name="cdr_table_both">
        <field name="CallId" chan-var-name="uuid"/>
        <field name="orig_id" chan-var-name="Caller-Unique-ID"/>
        <field name="TEST_id" chan-var-name="sip_from_uri"/>
      </table>
    </tables>
  </configuration>
```

## Known issues

- Fedora 21 contains a broken mysql odbc connector
  
  FIX: yum install http://dev.mysql.com/get/Downloads/Connector-ODBC/5.3/mysql-connector-odbc-5.3.4-1.x86_64.rpm -y
