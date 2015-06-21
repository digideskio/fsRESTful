DROP TABLE IF EXISTS `cdr_table_a_leg`;
CREATE TABLE IF NOT EXISTS `cdr_table_a_leg` (
`CallId` varchar(30) DEFAULT NULL,
`orig_id` varchar(30) DEFAULT NULL,
`term_id` varchar(30) DEFAULT NULL,
`ClientId` varchar(30) DEFAULT NULL,
`IP` varchar(30) DEFAULT NULL,
`IPInternal` varchar(30) DEFAULT NULL,
`CODEC` varchar(30) DEFAULT NULL,
`directGateway` varchar(30) DEFAULT NULL,
`redirectGateway` varchar(30) DEFAULT NULL,
`CallerID` varchar(30) DEFAULT NULL,
`TelNumber` varchar(30) DEFAULT NULL,
`TelNumberFull` varchar(30) DEFAULT NULL,
`sip_endpoint_disposition` varchar(30) DEFAULT NULL,
`sip_current_application` varchar(30) DEFAULT NULL,
`duration` varchar(30) NOT NULL,
`billsec` varchar(30) NOT NULL
);

DROP TABLE IF EXISTS `cdr_table_b_leg`;
CREATE TABLE IF NOT EXISTS `cdr_table_b_leg` (
`CallId` varchar(30) DEFAULT NULL,
`orig_id` varchar(30) DEFAULT NULL,
`term_id` varchar(30) DEFAULT NULL,
`ClientId` varchar(30) DEFAULT NULL,
`IP` varchar(30) DEFAULT NULL,
`IPInternal` varchar(30) DEFAULT NULL,
`CODEC` varchar(30) DEFAULT NULL,
`directGateway` varchar(30) DEFAULT NULL,
`redirectGateway` varchar(30) DEFAULT NULL,
`CallerID` varchar(30) DEFAULT NULL,
`TelNumber` varchar(30) DEFAULT NULL,
`TelNumberFull` varchar(30) DEFAULT NULL,
`sip_endpoint_disposition` varchar(30) DEFAULT NULL,
`sip_current_application` varchar(30) DEFAULT NULL
);

DROP TABLE IF EXISTS `cdr_table_both`;
CREATE TABLE IF NOT EXISTS `cdr_table_both` (
`CallId` varchar(30) DEFAULT NULL,
`orig_id` varchar(30) DEFAULT NULL,
`TEST_id` varchar(30) DEFAULT NULL
);
