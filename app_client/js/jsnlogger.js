var logger = JL();
var consoleAppender = JL.createConsoleAppender('consoleAppender');
logger.setOptions({
    "appenders": [consoleAppender]
});