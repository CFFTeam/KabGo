#!/bin/bash

# Configuration
hosts_file="/etc/hosts"
ip_address="127.0.0.1"

host_name_admin="admin.kabgo.local"
host_name_call_center="call-center.kabgo.local"
host_name_kafka="kafka.kabgo.local"
host_name_rabbitmq="rabbitmq.kabgo.local"

host_name_auth_api="api.auth.kabgo.local"
host_name_driver_api="api.driver.kabgo.local"
host_name_customer_api="api.customer.kabgo.local"
host_name_admin_api="api.admin.kabgo.local"
host_name_call_center_api="api.call-center.kabgo.local"

# Function to add an entry if it doesn't exist
add_entry() {
    local host_name=$1
    if grep -q "$host_name" "$hosts_file"; then
        echo "Entry '$host_name' already exists in the hosts file."
    else
        echo "$ip_address $host_name" | sudo tee -a "$hosts_file" >/dev/null
        echo "New entry '$host_name' added to the hosts file."
    fi
}

# Add entries
add_entry "$host_name_admin"
add_entry "$host_name_call_center"

add_entry "$host_name_auth_api"
add_entry "$host_name_driver_api"
add_entry "$host_name_customer_api"
add_entry "$host_name_admin_api"
add_entry "$host_name_call_center_api"
add_entry "$host_name_kafka"
add_entry "$host_name_rabbitmq"