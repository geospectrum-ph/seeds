function decimal(value) {
  const sigfigs = 6;
  
  return (Math.round(value * (10 ** sigfigs)) / (10 ** sigfigs));
}

async function describe(array) {
  const size = array.length;

  const ascending  = array.sort((return_value, working_value) => { return (return_value - working_value); });

  const mean = (array.reduce((return_value, working_value) => (return_value + working_value))) / size;

  const median = size % 2 > 0 ? ascending[Math.ceil(size/2) - 1] : ((ascending[(size/2) - 1] + ascending[(size/2)]) / 2);

  // const frequency = array.reduce((object, value) => { object[value] = (object[value] || 0) + 1; return (object); }, {} );

  // const mode = Object.keys(frequency).filter((value) => { return (frequency[value] === Math.max.apply(null, Object.values(frequency))); }).map((value) => (parseFloat(value)));

  const minimum = array.reduce((return_value, working_value) => (return_value > working_value ? return_value = working_value : return_value));

  const maximum = array.reduce((return_value, working_value) => (return_value < working_value ? return_value = working_value : return_value));

  const variance = (array.map((value) => ((value - mean) ** 2)).reduce((return_value, working_value) => (return_value + working_value))) / (size - 1);

  const standard_deviation = variance ** (1/2);

  // const skewness = (array.map((value) => ((value - mean) ** 3)).reduce((return_value, working_value) => (return_value + working_value))) / ((size - 1) * (standard_deviation ** 3));
  const skewness = size * (array.map((value) => ((value - mean) ** 3)).reduce((return_value, working_value) => (return_value + working_value))) / ((size - 1) * (size - 2) * (standard_deviation ** 3));

  // const kurtosis = (array.map((value) => ((value - mean) ** 4)).reduce((return_value, working_value) => (return_value + working_value))) / ((size - 1) * (standard_deviation ** 4));
  const kurtosis = (((size) * (size + 1)) / ((size - 1) * (size - 2) * (size - 3))) * ((array.map((value) => ((value - mean) ** 4)).reduce((return_value, working_value) => (return_value + working_value))) / (standard_deviation ** 4)) - ((3 * (size - 1) * (size - 1)) / ((size - 2) * (size - 3)));

  return ({
    "mean": decimal(mean),
    "median": decimal(median),
    // "mode": mode.length < size ? mode.map((value) => (decimal(value))) : null,
    "minimum": decimal(minimum),
    "maximum": decimal(maximum),
    "range": decimal(maximum - minimum),
    "variance": decimal(variance),
    "standard_deviation": decimal(standard_deviation),
    "skewness": decimal(skewness),
    "kurtosis": decimal(kurtosis)
  });
}

module.exports = { describe };