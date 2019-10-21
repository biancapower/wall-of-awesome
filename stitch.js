/***************************
This file is a copy of the
one run in the Stitch app
****************************/

// This function is the webhook's request handler.
exports = async function (payload) {
    const mongodb = context.services.get("mongodb-atlas");
    const slack = mongodb.db("slack");
    const wallmsg = slack.collection("wallmsg");
    const msg = payload.query.text;

    const result = await wallmsg.insertOne({
        user_id: payload.query.user_id,
        user_name: payload.query.user_name,
        when: Date.now(),
        msg: msg,
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
