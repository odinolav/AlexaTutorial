'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = "";

const languageStrings = {
    'en': {
        'translation': {
            SKILL_NAME: "",
            WELCOME_MESSAGE: "",
            WELCOME_REPROMT: "",
            HELP_MESSAGE: "",
            HELP_REPROMPT: "",
            STOP_MESSAGE: "Goodbye!",
        }
    }
};

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', this.t('WELCOME_MESSAGE'), this.t('HELP_REPROMPT'));
    },
    'OodleNameIntent': function () {
    
        let firstName = this.event.request.intent.slots.name.value;

        let speechOutput = "Here is an answer!";
        let repromptSpeech = "Wait what?";
        this.emit(':ask', speechOutput, repromptSpeech);
    },
    'OodleSuperheroIntent': function () {
        let index = Math.floor(Math.random() * heroes.length);
        let hero = heroes[index];
        
        let oodleName = makeOodle(hero);
        attemptEmit(this, hero, oodleName);
    },
    'AMAZON.HelpIntent': function () {
        let speechOutput = this.t('HELP_MESSAGE');
        let repromptSpeech = this.t('HELP_REPROMPT');
        this.emit(':ask', speechOutput, repromptSpeech);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'Unhandled': function () {
        this.attributes.speechOutput = this.t('HELP_MESSAGE');
        this.attributes.repromptSpeech = this.t('HELP_REPROMPT');
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
