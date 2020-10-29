let company_name = "Arizona State University          ";

const stripName = (name) => {
    name = name.trim();
    name = name.split(' ').join('-');
    name = name.toLowerCase();
    return name;
}

console.log(stripName(company_name));