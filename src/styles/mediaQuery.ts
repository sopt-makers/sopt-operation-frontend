const bp = {
  mobile: 480,
  tablet: 1024,
};

const mq = (label: keyof typeof bp) => {
  const bpArray = Object.keys(bp).map((key) => [
    key,
    bp[key as keyof typeof bp],
  ]);

  const [result] = bpArray.reduce((acc, [name, size]) => {
    if (label === name) return [...acc, `@media (max-width: ${size}px)`];
    return acc;
  }, []);

  return result;
};

export default mq;
