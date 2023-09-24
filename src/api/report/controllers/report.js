"use strict";
const { OpenAI } = require("openai");

/**
 * report controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::report.report", ({ strapi }) => ({
  async create(ctx) {
    try {
      const bodyData = JSON.parse(ctx.request.body);
      // FIND AI MODEL SETTINGS DATA --------------------------------

      const OpenAiSettings = await strapi.db
        .query("api::open-ai.open-ai")
        .findOne();

      // SETTING UP MESSAGES ARRAY ---------------------------------------------------
      let promptArray = [
        {
          role: "system",
          content: "",
        },
        {
          role: "user",
          content: OpenAiSettings.prompt,
        },
      ];
      const messagesArray = [...promptArray, ...bodyData.messagesArray];

      // OPEN AI KEYS ----------------------------------------------

      const openai = new OpenAI({
        apiKey: OpenAiSettings.key,
      });

      const chatCompletion = await openai.chat.completions.create({
        messages: messagesArray,
        model: OpenAiSettings.model,
        stream: true,
      });

      let ChatData = "";

      for await (const part of chatCompletion) {
        if (part.choices && part.choices.length > 0) {
          const delta = part.choices[0].delta;
          if (delta && delta.content) {
            ctx.status = 200;
            ctx.res.write(`${delta.content}`);
            ChatData += delta.content;
          } else {
            console.log("Content not found in the delta", part);
          }
        }
        if (part.choices[0].finish_reason === "stop") {
          console.log("Stream finished");
          break;
        }
      }

      if (ChatData) {
        const currentUser = bodyData.currentUser;
        await strapi.db.query("api::report.report").create({
          data: {
            studentId: currentUser.studentId,
            OrganizationId: currentUser?.id,
            Chat: ChatData,
          },
        });
      }

      if (!ctx.res.writableEnded) {
        ctx.res.end();
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
