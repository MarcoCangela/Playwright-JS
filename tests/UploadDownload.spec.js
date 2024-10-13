const { test, expect } = require("@playwright/test");
const excelJs = require("exceljs");

let output = { row: -1, columng: -1 };

/**
 * Function to write to an Excel file.
 * @param {string} texto - text to look for in the Excel file.
 * @param {string} replaceText - text to replace in the Excel file.
 * @param {{rowChange: number, colChange: number}} change - object with row and column changes.
 * @param {string} caminho - path to the Excel file.
 */
async function writeExcelTest(texto, replaceText, change, caminho) {
  const workbook = new excelJs.Workbook();
  await workbook.xlsx.readFile(caminho);
  const currentWorksheet = workbook.getWorksheet("Sheet1");
  // Read the Excel file and find the position of the text to replace.
  readExcel(currentWorksheet, texto);

  // Get the cell that needs to be replaced.
  const cell = currentWorksheet.getCell(
    output.row + change.rowChange,
    output.column + change.colChange
  );
  // Replace the cell value with the new value.
  cell.value = replaceText;
  // Save the changes to the Excel file.
  workbook.xlsx.writeFile(caminho);
}

async function readExcel(currentWorksheet, texto) {
  currentWorksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === texto) {
        output.row = rowNumber;
        output.column = colNumber;
        console.log("Row: " + output.row + " Column: " + output.column);
      }
    });
  });
}

test("Validations with excel with downloads and uploads", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

  const downloadWait = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();
  const download = await downloadWait;
  console.log("Download completed");
  
  await writeExcelTest(
    "Banana",
    850,
    { rowChange: 0, colChange: 2 },
    "/Users/marcogarujo/Downloads/download.xlsx"
  );
  await page.locator("#fileinput").click();
  await page
    .locator("#fileinput")
    .setInputFiles("/Users/marcogarujo/Downloads/download.xlsx");
  await page.pause();
});
