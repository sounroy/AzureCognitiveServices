# AzureCognitiveServices

This is an attempt to build bot, to direct end users to buy Game subscriptions, built and deployed on Azure with ARM templates, integrated with LUIS and direct channel as webchat.

#Technologies used 
---------------------
Azure Bot Service
Bot Framework Node V4 
Node.js as Programming Language

Emulator : Azure Bot Framework Emulator
Azure Cognitive Services : Azure Bot Service, Azure LUIS for intelligent conversation , Azure QnA

#Features covered 
-------------------

Bot built using Bot Builder package(Adapter, Activity Handler, Turn Context)

Suggested Actions


<img width="1728" alt="Screenshot 2022-11-24 at 12 28 47 AM" src="https://user-images.githubusercontent.com/20036322/203626672-1fcc6a79-4c95-4014-932e-e7176ad3d4ea.png">

Component Dialog with State and Store management to hold conversational states

<img width="1728" alt="Screenshot 2022-11-24 at 12 33 26 AM" src="https://user-images.githubusercontent.com/20036322/203627442-66d7c3a0-9a90-4b45-979d-5e83f9f702bf.png">

Adaptive Card

<img width="1728" alt="Screenshot 2022-11-24 at 12 35 24 AM" src="https://user-images.githubusercontent.com/20036322/203627762-bbed726d-fc0a-4025-b367-c2d27a073c81.png">


LUIS integration(Intents & Entities) to add intelligence to BOT

<img width="1728" alt="Screenshot 2022-11-24 at 12 41 19 AM" src="https://user-images.githubusercontent.com/20036322/203628567-a3144fb1-a11b-4472-a617-1ee10f670ef2.png">


Deployment in Azure using Azure CLI, ARM templates

Integration into Direct Channel as WebChat

Knowhow of integration with Social Networking Site like Facebook

## Prerequisites

- [Node.js](https://nodejs.org) version 10.14.1 or higher

    ```bash
    # determine node version
    node --version
    ```

## To run the bot

- Install modules

    ```bash
    npm install
    ```

- Start the bot

    ```bash
    npm start
    ```

## Testing the bot using Bot Framework Emulator

[Bot Framework Emulator](https://github.com/microsoft/botframework-emulator) is a desktop application that allows bot developers to test and debug their bots on localhost or running remotely through a tunnel.

- Install the Bot Framework Emulator version 4.3.0 or greater from [here](https://github.com/Microsoft/BotFramework-Emulator/releases)

### Connect to the bot using Bot Framework Emulator

- Launch Bot Framework Emulator
- File -> Open Bot
- Enter a Bot URL of `http://localhost:3978/api/messages`

## Deploy the bot to Azure

To learn more about deploying a bot to Azure, see [Deploy your bot to Azure](https://aka.ms/azuredeployment) for a complete list of deployment instructions.

