const api = {
  validateNumber: async (number: number): Promise<boolean> => {
    const response =  await fetch(`http://apilayer.net/api/validate?access_key=b63d6b11c2871c38f0d17ff886cf438e&country_code=RU&number=${number}`)
    const json = await response.json();
    return Boolean(json.valid);
  }
}

export default api;

