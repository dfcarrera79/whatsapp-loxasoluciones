const XLSX = require("xlsx");
const workBook = XLSX.readFile("datos.xls");

let worksheet = workBook.Sheets[workBook.SheetNames[0]];

let id = [];
let message = [];

const ref = worksheet["!ref"];

const afterB = Number(ref.substring(ref.indexOf("B") + 1));

console.log(afterB);

for (let i = 1; i < afterB; i++) {
  id.push(worksheet[`A${i}`].v);
  message.push(worksheet[`B${i}`].v);
}

const newId = [];

for (let j = 0; j < id.length; j++) {
  newId.push("593" + id[j].substring(1, 10));
}

const wbm = require("wbm");

wbm
  .start()
  .then(async () => {
    const phones = newId;
    const messages = message;

    for (let k = 0; k < phones.length; k++) {
      let message = messages[k];
      let phone = phones[k];
      await wbm.sendTo(phone, message);
    }
    await wbm.end();
  })
  .catch((err) => console.log(err));


// console.log(newId);
// console.log(message);

// const wbm = require("wbm");

// wbm
//   .start()
//   .then(async () => {
//     const phones = ["593988142106", "593981516201", "593998694621"];

//     const messages = [
//       "Mensaje de prueba 1",
//       "Mensaje de prueba 2",
//       "Mensaje de prueba 3",
//     ];

//     for (let k = 0; k < phones.length; k++) {
//       let message = messages[k];
//       let phone = phones[k];
//       await wbm.sendTo(phone, message);
//     }
//     await wbm.end();
//   })
//   .catch((err) => console.log(err));
