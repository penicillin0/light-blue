export const getAtCoderDisplayStatus = (status: string[]): string | null => {
  status.sort();
  if (status.length === 0) return null;

  if (status.includes("AC")){
    return "AC";
  }
  
  return status[0];
};

export const getColorFromAtCoderStatus = (status: string) => {
  if (status === "AC") {
    return "primary";
  }
  return "secondary";
};

export const getAizuDisplayStatus = (status: number[]): string | null => {
  status.sort();
  if (status.length === 0) return null;

  if (status.includes(4)){
    return "Accept"
  }
  
  return 'No Accept';
};

export const getColorFromAizuStatus = (status: string) => {
  if (status === "Accept") {
    return "primary";
  }
  return "secondary";
};
