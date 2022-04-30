const Products = require("../Models/Store");

const getAllProductsStatic = async (req, res) => {
  const products = await Products.find({ price: { $lt: 25 } })
    .sort("name")
    .select("name price")
    .limit(10);

  res.status(201).json({ nbHits: products.length, products });
};

// --------------------------------------------------------------------------------

const getAllProducts = async (req, res) => {
  const { featured, company, NameSearch, sort, fields, numericFilters } =
    req.query;

  const queryObject = {};

  // SEARCHING............................................................................

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (NameSearch) {
    queryObject.name = { $regex: NameSearch, $options: "i" };
  }

  // NUMERIC FILER...............................................................................
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEx = /\b(>|>=|=|<|<=)\b/g; //regular expression used for replace function.

    let filters = numericFilters.replace(
      // replaces the regular experssion values with opertator map values
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const Properties = ["price", "rating"]; // properties on which this functionality works

    filters = filters.split(",").forEach((item) => {
      // spilitting each property and making it compatible to perform tasks
      const [property_name, operator, value] = item.split("-"); // destructuring each property

      if (Properties.includes(property_name)) {
        queryObject[property_name] = { [operator]: Number(value) };
      }
    });
  }

  // SORTING...............................................................................

  let result = Products.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("created_At");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  } else {
    result = result.select("name price");
  }

  // PAGINAION...............................................................................

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  // .........................................................................................

  console.log(queryObject);
  const products = await result;
  res.status(201).json({ nbHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
