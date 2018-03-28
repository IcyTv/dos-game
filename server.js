const fs = require("fs");
const express = require("express");
const app = express();

let content = fs.readFileSync("text.txt").toString();
console.log(content);
content = content.split("\n");
let tmp = [[]];
let texts = [];

let i = 0;

for(let line of content){
  if(line.startsWith("-----")){
    tmp.push([]);
    i++;
  } else {
    tmp[i].push(line.trim());
  }
}

for(let text of tmp){
  //Convert to object

  texts.push({
    "info": JSON.parse(text[0]),
    "text": text.slice(1, -1),
    "source": text[text.length - 1]
  });
}

app.use("/", express.static("htdocs"));
app.use("/text", (req, res) => {
  let r = Math.floor(Math.random() * texts.length);
  res.send(texts[r]);
});
app.listen(80);
