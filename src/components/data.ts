export const chars = () => {
  const gen = (charA: string, charZ: string) => {
    var a = [],
      i = charA.charCodeAt(0),
      j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
      a.push(String.fromCharCode(i));
    }
    return a;
  };

  const uppercase = gen('A', 'Z');
  const lowercase = gen('a', 'z');
  const numbers = Array.from(Array(10).keys()).map((n: number) => n.toString());

  return [...uppercase, ...lowercase, ...numbers];
};

export const messages = [
  'Matrix has you',
  'Appearances can be deceiving',
  'Follow the white rabbit',
  'There is no spoon',
  'Choice. The problem is choice.',
];
