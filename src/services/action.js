export default async function getStockData(input) {
    const data = await fetch(`https://jsonmock.hackerrank.com/api/stocks?date=${input}`)
        .then((response) => response.json())
        .then((data) => {
            return data
        })
        .catch((error) => {
            console.error('Error:', error);
          })
        return data;
}
