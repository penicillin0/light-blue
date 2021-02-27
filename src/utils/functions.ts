export const getAtCoderDisplayStatus = (status: string[]): string | null => {
  status.sort();
  if (status.length === 0) return null;

  if (status.includes("AC")){
    return "AC"
  }
  
  return status[0];
};

export const getColorFromAtCoderStatus = (status: string) => {
  if (status === "AC") {
    return "primary"
  }
  return "secondary";
}
