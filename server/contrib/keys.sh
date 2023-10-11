#!/usr/bash
ssh-keygen -t rsa -f ./id_rsa -C build@cagetechnolgies.com -q -N "" 
openssl ecparam -name secp256r1 -genkey -out private.pem 
openssl ec -in private.pem -pubout -out public.pem
