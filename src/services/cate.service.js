function makeCateService() {
  const baseUrl = '/api/categories';

  async function getCate() {
    return await fetch(`${baseUrl}`).then((res) => res.json());
  }

  return {
    getCate
  };
}
export default makeCateService();