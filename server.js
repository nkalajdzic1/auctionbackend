const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./server/database.js");
const app = express();

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "https://webauctioning.herokuapp.com",
  })
);
app.use(express.json());

//routes
app.use(
  `/${process.env.TMDB_API_KEY}/auction`,
  require("./server/routes/auction.js")
);
app.use(
  `/${process.env.TMDB_API_KEY}/category`,
  require("./server/routes/category.js")
);
app.use(
  `/${process.env.TMDB_API_KEY}/price`,
  require("./server/routes/price.js")
);
app.use(
  `/${process.env.TMDB_API_KEY}/color`,
  require("./server/routes/color.js")
);
app.use(
  `/${process.env.TMDB_API_KEY}/size`,
  require("./server/routes/size.js")
);
app.use(
  `/${process.env.TMDB_API_KEY}/shop`,
  require("./server/routes/shop.js")
);
app.use(
  `/${process.env.TMDB_API_KEY}/auth`,
  require("./server/routes/auth.js")
);

//check connection to database
db.authenticate()
  .then(() => console.log("Connected to auctionDB database."))
  .catch(console.log);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => console.log(`Server listening on ${PORT}`));
