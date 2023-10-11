# OpenCAGE

Welcome to the DRAFT release of OpenCAGE from CAGE Technologies

The purpose of OpenCAGE is to 

Architecture

The DRAFT release of OpenCAGE contains a client and server component that rely on a document database like MongoDB or compatible.

Note that this version is for testing purposes.

In-progress:

- OpenCAGE runs as a peer in a decentralized knowledge-sharing network.
- OpenCAGE also has electron.js desktop mode

Requirements:

- Node.js
- Node Package Manager
- MongoDB or compatible database

To compile the server:

    cd opencage/server
    npm install
    npm run build


To start the server for testing purposes:

    npm run start

or

    npm run dev

To compile the client:

    cd opencage/client
    npm install
    ng build

To run the client for testing purposes:

    ng serve -o

(The -o will automatically open a browser window to the main page)



