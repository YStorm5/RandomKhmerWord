import { readLines } from "https://deno.land/std@0.202.0/io/mod.ts";
const file = await Deno.open("km_KH.dic", { read: true });

function getRandomNum() {
  const MAX = 75100;
  return Math.floor(Math.random() * (MAX - 1)) + 1;
}
async function getRandomKhmerWord(input: number) {
  let startIndex = 1;
  let _word;
  for await (const line of readLines(file)) {
    if (startIndex == input) {
      _word = line;
      break;
    }
    startIndex++;
  }
  return _word;
}

Deno.serve(async (req) => {
  const word = await getRandomKhmerWord(getRandomNum());
  const body = JSON.stringify({ word: word });
  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
});
