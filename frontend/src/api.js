import axios from "axios";

const BASE_URL = "";

export const analyzeSentence = async (sentence, language) => {
  const res = await axios.post(`${BASE_URL}/analyze`, { sentence, language });
  return res.data;
};

export const fetchLanguages = async () => {
  const res = await axios.get(`${BASE_URL}/languages`);
  return res.data.languages;
};

export const fetchExamples = async () => {
  const res = await axios.get(`${BASE_URL}/examples`);
  return res.data.examples;
};
