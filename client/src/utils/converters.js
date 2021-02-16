export const initials = name => {
  const names = name.split(' ');
  return `${names[0][0]}${names[1][0]}`;
};

export const convertName = name => {
  const names = name.split(' ');
  return `${names[0]} ${names[1][0]}.`;
};
