const axios = require("axios");
const express = require("express");

const createService = async () => {
  const app = express();
  const dictionaryURL = "https://raw.githubusercontent.com/qualified/challenge-data/master/words_alpha.txt";
  const { data } = await axios.get(dictionaryURL)
  const dict = new Set(data.split('\n'))
  /* TODO add your solution here */
  app.get('/', (req, res) => {
    const stem = req.query.stem || ''
    if(!dict) {
      return res.json({ data: [] })
    }
    if((stem && ["", stem.slice(0, 1), stem.slice(0, 2), stem.slice(0, 3)].includes(stem))) {
      return res.json({ data: [ ...dict ] })
    }
    const rgex = new RegExp(`^${stem}`, 'g')
    const filteredData = Array.from(dict).filter(word => word.startsWith(stem))
    
    if(!filteredData.size) {
      return res.sendStatus(204)
    }
    return res.status(200).json({ data: [...filteredData] })
  })
  
  return app; // instead of app.listen
};

module.exports = {createService};