var _ = require('underscore');
var fs = require('fs');
var settings;

try {
    var file = fs.readFileSync('./conf/settings.json');
    settings = JSON.parse(file.toString());
} catch (e) {
    throw new Error('Invalid settings: /conf/settings.json invalid or does not exist');
}

module.exports = {
    server : {
        port : 80,
        compression : true,
        cache : false
    // 86400000
    },

    https : {
        domain : 'ch4t.io',
        key : './ssl/myserver.key',
        cert : './ssl/server.crt',
        port : 443
    },

    speak : {
        0 : 1,
        1 : 1,
        2 : {
            time : 10000,
            max : 1
        },
        'default' : {
            time : 20000,
            max : 1
        }
    },

    throttle : {
        updateMousePosition : {
            errorMessage : false,
            user : {
                time : 1000,
                max : 100
            },
            channel : {
                time : 1000,
                max : 500
            },
            global : {
                time : 1000,
                max : 1000
            },
            banned : {
                limits : []
            }
        },
        'default' : {
            errorMessage : true,
            user : {
                time : 1000,
                max : 2
            },
            channel : {
                time : 1000,
                max : 10
            },
            global : {
                time : 1000,
                max : 20
            },
            banned : {
                limits : [ {
                    time : 1000,
                    max : 5
                }, {
                    time : 60 * 1000,
                    max : 20
                } ],
                unban : 5 * 60 * 1000
            }
        }
    },

    password : {
        iterations : 1000
    },

    emailRegex : /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/,

    db : {
        host : 'localhost',
        schema : 'nodejs_chat'
    },

    log : {
        error : true,
        info : true,
        debug : false,
        db : false
    },

    registrationEmail : {
        from : 'Chat Server <donotreply@ch4t.io>',
        subject : 'Registering Chat Nickname',
        text : 'You are registering the nickname {0}.\r\nTo verify your account, all you have to do is type out the following: /verify {1}'
    },

    limits : {
        message : 5000,
        nick : 100,
        spoken : 250,
        part : 140
    },

    // emailServer : {
    // user : "username",
    // password : "password",
    // host : "smtp.your-email.com",
    // ssl : true
    // },

    msgs : {
        get : function(key) {
            var value = this[key];
            if (value) {
                for ( var i = 1; i < arguments.length; i++) {
                    value = value.replace('{' + (i - 1) + '}', arguments[i]);
                }
            }
            return value;
        },

        error : 'ERROR',
        banned : 'You are banned',
        banned_by : 'You have been banned by: {0}',
        banned_reason : 'You have been banned by: {0}, Reason {1}',
        cannotBan: 'You may not ban someone with a higher role and/or access level',
        kicked : 'You have been kicked by: {0}',
        kicked_reason : 'You have been kicked by: {0}, Reason: {1}',
        cannotKick : 'You may not kick someone with a higher role and/or access level',
        ghosted : 'Someone else logged in using your username',
        pmOffline : 'Cannot PM a nick unless they are online',
        notRegistered : 'Not registered yet',
        alreadyRegistered : 'Already registered',
        alreadyVerified : 'Already verified',
        invalidCode : 'The verification code provided was incorrect',
        invalidPassword : 'Invalid password',
        invalidPermissions : 'Can\'t put someone\'s access above your own',
        invalidEmail : 'Invalid email address',
        invalidAccess : 'Invalid access_level',
        invalidCommand : 'Invalid command',
        invalidCommandParams : 'Invalid command parameters',
        invalidCommandAccess : 'You do not have the required permission for this command',
        invalidLogin : 'The password you provided was incorrect',
        invalidRole : 'Invalid role or access level',
        nickVerified : 'The nick has been taken, please use /login instead',
        nickNotVerified : 'You cannot login to a nick that was not registered or verified',
        change_password_login : 'You must register before you can change the password',
        alreadyBeingUsed : 'That nick is already being used by someone else',
        loggedOut : 'You are not logged in!',
        tabOverflow : 'Too many tabs open!',
        captcha: 'The captcha was incorrect',
        registered : 'You have registered the nick',
        registeredAndVerified : 'Your nick was registered and verified',
        unregistered : 'You have unregistered the nick',
        banlist : 'Globally banned: {0}',
        channel_banlist : 'Channel banned: {0}',
        access_granted : 'User {0} now has level {1}',
        role_granted: '{0} now has role {1} and access level {2}',
        whoami : 'You are {0} with role {1} with access_level {2} with ip {3}',
        whois : '{0} \nRole: {1}\nLevel: {2}\nIP: {3}\nMask: {4}\nUser ID: {5}',
        whoiss : '{0} ({4}) \nRole: {1}\nLevel: {2}\nIP: {3}',
        user_doesnt_exist : '{0} does not exist',
        find_ip : 'ip {0} uses: {1}',
        find_ip_empty : 'Could not find ip {0}',
        banned_channel : '{0} is now banned on this channel',
        banned_global : '{0} is now banned globally',
        unbanned_channel : '{0} is no longer banned on this channel',
        unbanned_global : '{0} is no longer banned globally',
        not_banned_channel : '{0} is not banned on this channel',
        not_banned_global : '{0} is not banned globally',
        already_banned_channel : '{0} is already banned on this channel',
        already_banned_global : '{0} is already banned globally',
        banned_file : '{0} is banned in a file and cannot be unbanned',
        no_banned_channel : 'There is nothing banned on this channel',
        no_banned_global : 'There is nothing banned globally',
        reset_user : '{0} has been reset',
        alreadyStatus : 'Channel is already {0}',
        channelStatus : 'Channel has been made {0}',
        isPrivate : 'Channel is private',
        alreadyUser : '{0} has already been {1}',
        updatedUser : '{0} has been {1}',
        invalidUser : '{0} wasn\'t invited',
        apocalypseSurvivor : 'You may not remove the last person from the whitelist',
        whitelist_empty : 'Nobody whitelisted on this channel',
        wasGhost : '{0} was a ghost!',
        wasHuman : '{0} was a human.',
        locked : '{0} is now locked for {1} {2} and up',
        change_password : 'You have changed your password',
        enterSamePassword : 'Please enter the same password that you did when you registered',
        oldPasswordWrong : 'Your old password is not correct',
        user_exist_not_registered : '{0} exists but is not registered',
        throttled : 'Either you are doing that too much, or the site is under too much load',
        temporary_ban : 'You are way too fast, you have been banned for a while, try again later',
        muted : 'You have been muted, please try again later',
        registeredName : 'That nick is already registered',
        vhosttaken : '{0} has already been taken as a mask',
        InvalidCharacters : 'Name contained invalid character(s)',
        clear_channel : '{0} has cleared the banlist',
        same_topic : 'That is already the topic'
    }
};

_.each(settings, function(setting, key) {
    var override = module.exports[key];
    if (override) {
        if (setting) {
            _.extend(override, setting);
        } else {
            module.exports[key] = null;
        }
    } else {
        module.exports[key] = setting;
    }
});
