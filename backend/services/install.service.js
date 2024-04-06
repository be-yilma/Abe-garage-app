// import the db connection file
const connection = require("../config/db.config");
//  Import the fs module to read and write files
const fs = require("fs");

// a function to install Database directly form the api endpoint
async function installDatabase() {
  //  temporary variable to store the response and the all queries
  let queries = []; // to hold SQL queries
  let finalMessages = {}; // to store a final message indicating success or failure
  //   console.log("Installing Database directly from the api endpoint");
  // Query file
  const queryfile = __dirname + "/sql/initial-queries.sql";
  //   console.log(queryfile);
  let templine = "";
  // read the entire file
  const lines = await fs.readFileSync(queryfile, "utf8").split("\n");
  // Loop through each line
  const executed = await new Promise((resolve, reject) => {
    // Iterate through the lines
    lines.forEach((line) => {
      //  check if the line is a comment line or an empty line
      if (line.trim().startsWith("--") || line.trim() === "") {
        // skip those lines
        return;
      }
      templine += line; // templine = old templine + line
      //  checks if the line ends wiht a semicolon
      if (line.trim().endsWith(";")) {
        // execute the query
        const sqlQuery = templine.trim();
        queries.push(sqlQuery);
        // resets templine for the next query
        templine = "";
      }
    });
    resolve("Queries are added to the list of queries");
  });
  // executing the queries
  for (let i = 0; i < queries.length; i++) {
    try {
      console.log(queries);
      const result = await connection.query(queries[i]);
      console.log("Table Created");
    } catch (error) {
      finalMessages.message = "Not all tables are created" + error;
    }
  }
  console.log(finalMessages);
  if (!finalMessages.message) {
    finalMessages.message = "All tables are created";
  }
  return finalMessages;
}

// export the function

module.exports = {
  installDatabase,
};
