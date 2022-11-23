// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory } = require('botbuilder');

const { MakeSubscriptionDialog } = require('./componentDialogs/makeSubscriptionDialog');
const { CancelSubscriptionDialog } = require('./componentDialogs/cancelSubscriptionDialog')
const {LuisRecognizer, QnAMaker}  = require('botbuilder-ai');



class RRBOT extends ActivityHandler {
    constructor(conversationState,userState) {
        super();

        this.conversationState = conversationState;
        this.userState = userState;
        this.dialogState = conversationState.createProperty("dialogState");
        this.makeSubscriptionDialog = new MakeSubscriptionDialog(this.conversationState,this.userState);
        this.cancelSubscriptionDialog = new CancelSubscriptionDialog(this.conversationState,this.userState);
   
        
        this.previousIntent = this.conversationState.createProperty("previousIntent");
        this.conversationData = this.conversationState.createProperty('conservationData');
        

        const dispatchRecognizer = new LuisRecognizer({
            applicationId: process.env.LuisAppId,
            endpointKey: process.env.LuisAPIKey,
            endpoint: `https://cyborgluis-authoring.cognitiveservices.azure.com/`
        }, {
            includeAllIntents: true
        }, true);

       
        const qnaMaker = new QnAMaker({
            knowledgeBaseId: process.env.QnAKnowledgebaseId,
            endpointKey: process.env.QnAEndpointKey,
            host: process.env.QnAEndpointHostName
        });
    
   
        
        
        this.qnaMaker = qnaMaker;


        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {

        const luisResult = await dispatchRecognizer.recognize(context)
        const intent = LuisRecognizer.topIntent(luisResult); 
       
        
        const entities = luisResult.entities;

        await this.dispatchToIntentAsync(context,intent,entities);
        
        await next();

        });

    this.onDialog(async (context, next) => {
           
            await this.conversationState.saveChanges(context, false);
            await this.userState.saveChanges(context, false);
            await next();
        });   
    this.onMembersAdded(async (context, next) => {
            await this.sendWelcomeMessage(context)
          
            await next();
        });
    }

  

    async sendWelcomeMessage(turnContext) {
        const { activity } = turnContext;

        for (const idx in activity.membersAdded) {
            if (activity.membersAdded[idx].id !== activity.recipient.id) {
                const welcomeMessage = `Welcome to Game Subscription buying Bot ${ activity.membersAdded[idx].name }. `;
                await turnContext.sendActivity(welcomeMessage);
                await this.sendSuggestedActions(turnContext);
            }
        }
    }

    async sendSuggestedActions(turnContext) {
        var reply = MessageFactory.suggestedActions(['Make Subscription','Cancel Subscription','Game Details'],'What would you like to do today ?');
        await turnContext.sendActivity(reply);
    }


    async dispatchToIntentAsync(context,intent,entities){

        var currentIntent = '';
        const previousIntent = await this.previousIntent.get(context,{});
        const conversationData = await this.conversationData.get(context,{});   

        if(previousIntent.intentName && conversationData.endDialog === false )
        {
           currentIntent = previousIntent.intentName;

        }
        else if (previousIntent.intentName && conversationData.endDialog === true)
        {
             currentIntent = intent;

        }
        else if(intent == "None" && !previousIntent.intentName)
        {

            var result = await this.qnaMaker.getAnswers(context)
            await context.sendActivity(`${ result[0].answer}`);
            await this.sendSuggestedActions(context);
        }
        
        else
        {
            currentIntent = intent;
            await this.previousIntent.set(context,{intentName: intent});

        }
    switch(currentIntent)
    {

        case 'Make_Subscription':
        console.log("Inside Make Subscription Case");
        await this.conversationData.set(context,{endDialog: false});
        await this.makeSubscriptionDialog.run(context,this.dialogState,entities);
        conversationData.endDialog = await this.makeSubscriptionDialog.isDialogComplete();
        if(conversationData.endDialog)
        {
            await this.previousIntent.set(context,{intentName: null});
            await this.sendSuggestedActions(context);

        } 
        break;


        case 'Cancel_Subscription':
            console.log("Inside Cancel Subscription Case");
            await this.conversationData.set(context,{endDialog: false});
            await this.cancelSubscriptionDialog.run(context,this.dialogState);
            conversationData.endDialog = await this.cancelSubscriptionDialog.isDialogComplete();
            if(conversationData.endDialog)
            {   
                await this.previousIntent.set(context,{intentName: null});
                await this.sendSuggestedActions(context);
    
            }
            
            break;


        default:
            console.log("Did not match Make Subscription case");
            break;
    }


    }


}



module.exports.RRBOT = RRBOT;
