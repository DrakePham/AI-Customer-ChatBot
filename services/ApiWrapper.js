import { getStyledText, getToneSuggestion } from "./ApiRequest";

/** 
 * Method to get the result from the API on the basis of the type of request
 * @param {*} param object containing content, type and tone
 * @returns result returned by the API
 */
export const getResult = async ({ content, type, context }) => {
  switch (type) {
    case "style":
      return getStyledText(content, context);
    case "tone":
      return getToneSuggestion(content, context);
    default:
      return "Invalid type";
  }
};