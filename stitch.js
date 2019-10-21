/***************************
This file is a copy of the
one run in the Stitch app
****************************/

// This function is the webhook's request handler.
exports = async function (payload) {
   const mongodb = context.services.get("mongodb-atlas");
   const slack = mongodb.db("slack");
   const wallmsg = slack.collection("wallmsg");

  // const args = payload.query.text.split(" ");
  const msg = payload.query.text;

  // switch (args[0]) {
  //     case "stash":
  //         const result = await wallmsg.insertOne({
  //             user_id: payload.query.user_id,
  //             when: Date.now(),
  //             url: args[1]
  //         });
  //         if (result) {
  //             return {
  //                 text: `Stashed ${args[1]}`
  //             };
  //         }
  //         return {
  //             text: `Error stashing`
  //         };
  //     case "list":
  //         const findresult = await wallmsg.find({}).toArray();
  //         const strres = findresult.map(x => `<${x.url}|${x.url}>  by <@${x.user_id}> at ${new Date(x.when).toLocaleString()}`).join("\n");
  //         return {
  //             text: `Stash as of ${new Date().toLocaleString()}\n${strres}`
  //         };
  //     case "remove":
  //         const delresult = await wallmsg.deleteOne({
  //             user_id: {
  //                 $eq: payload.query.user_id
  //             },
  //             url: {
  //                 $eq: args[1]
  //             }
  //         });
  //         return {
  //             text: `Deleted ${delresult.deletedCount} stashed items`
  //         };
  //     default:
  //         return {
  //             text: "Unrecognized"
  //         };
  // }
  
  const result = await wallmsg.insertOne({
               user_id: payload.query.user_id,
               user_name: payload.query.user_name,
               when: Date.now(),
               msg: msg,
              // payload: payload,
           });
           if (result) {
               return {
                   text: `The writing is on the wall... ${msg}`
               };
           }
           return {
               text: `Error stashing`
           };
}
