const snoowrap = require("snoowrap");
const fetch = require("node-fetch");
const CronJob = require("cron").CronJob;

const r = new snoowrap({
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
  clientId: "",
  clientSecret: "",
  refreshToken: ""
});

const getSubreddit = async () => {
  return await r.getSubreddit("LifeProTips").getRandomSubmission();
};

const postStatus = async (message, url, access_token) => {
  const messageEdited = `${message} \n\n\n Hi, I am a bot, and this action was performed automatically. Please contact me (https://www.facebook.com/khoinguyen47) if you have any questions or concerns.`;
  const result = await fetch(
    `https://graph.facebook.com/v3.3/2243130722451508/feed?message=${messageEdited}&link=https://www.reddit.com${url}&access_token=${access_token}`,
    {
      method: "POST"
    }
  );
  const response = await result.json();
  return response;
};

(async () => {
  new CronJob(
    "0 */2 * * *",
    async function() {
      console.log("Post Status");
      const reddit = await getSubreddit();
      const messageReddit = reddit.title;
      const urlReddit = reddit.permalink;
      const access_token = ``;
      const status = await postStatus(messageReddit, urlReddit, access_token);
      console.log(status);
    },
    null,
    true,
    "America/Los_Angeles"
  );
})();
