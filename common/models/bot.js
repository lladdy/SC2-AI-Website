'use strict';

module.exports = function(Bot) {
  Bot.disableRemoteMethodByName('create');
  Bot.disableRemoteMethodByName('upsert');
  Bot.disableRemoteMethodByName('deleteById');
  Bot.disableRemoteMethodByName('updateAll');
  Bot.disableRemoteMethodByName('createChangeStream');
  Bot.disableRemoteMethodByName('exists');

  Bot.upload = function (ctx,options,callback) {
    if(!options) options = {};
    console.log(ctx);
    console.log("\n");
    console.log(options);
    ctx.req.params.container = 'botdll';
    Bot.app.models.UserUpload.upload(ctx.req,
                                     ctx.result,
                                     options,
                                     function (err, fileObj) {
      if(err) {
        callback(err);
      } else {
        var fileInfo = fileObj.files.file[0];
        Bot.create({
            name: fileObj.fields.bot_name,
            authorId: fileObj.fields.user_id,
            race: "terran",
            dll: '/api/user-uploads/download/'+fileInfo.name
        }, function (err,obj) {
          if (err !== null) {
            callback(err);
          } else {
            callback(null, obj);
          }
        });
      }
    });
  };

  Bot.remoteMethod(
    'upload',
    {
      description: 'Uploads a file',
      accepts: [
        { arg: 'ctx', type: 'object', http: { source:'context' } },
        { arg: 'options', type: 'object', http:{ source: 'query'} }
      ],
      returns: {
        arg: 'fileObject', type: 'object', root: true
      },
      http: {verb: 'post'}
    }
  );
};